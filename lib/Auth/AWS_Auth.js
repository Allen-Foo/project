/*
 * Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with
 * the License. A copy of the License is located at
 *
 *     http://aws.amazon.com/apache2.0/
 *
 * or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions
 * and limitations under the License.
 */
import AWS from 'aws-sdk';
import {
  CognitoUserPool,
  CognitoUserAttribute,
  AuthenticationDetails,
  CognitoUser,
  CognitoUserSession,
  CognitoIdToken,
} from './aws-cognito-identity';

import awsmobile from '../../aws-exports';

const AWS_COGNITO = {
  UserPoolId: awsmobile.aws_user_pools_id,
  ClientId: awsmobile.aws_user_pools_web_client_id,
};

export const onSignInEmail = (username, password) => {
  const userPool = new CognitoUserPool(AWS_COGNITO);
  const authDetails = new AuthenticationDetails({
    Username: username,
    Password: password
  });
  const cognitoUser = new CognitoUser({
    Username: username,
    Pool: userPool
  });

  const start = new Date().getTime()

  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authDetails, {
      onSuccess: (result) => {
        console.log('authenticateUser timey', new Date().getTime() - start)

        AWS.config.credentials = getCognitoCredentials(result.getIdToken().getJwtToken())

        // GET FEDERAL IDENTITY ID AND STORE IN REDUX
        AWS.config.credentials.refresh(function(err) {
          if (err) {
            console.warn("Error: "+err);
            reject(err)
            return;
          }
          console.warn("Cognito Identity Id: " + AWS.config.credentials.identityId);
          resolve(AWS.config.credentials.identityId);
        });
      },
      onFailure: (err) => {
        reject(err)
      }
    });
  })
};

export const onSignUpEmail = (profile) => {
  const { username, password, email, phone } = profile;

  const attributeList = [];
  const attributeEmail = new CognitoUserAttribute({
    Name: 'email',
    Value: email
  });
  const attributePhone = new CognitoUserAttribute({
    Name: 'phone_number',
    Value: phone
  });

  if (email) {
    attributeList.push(attributeEmail);
  }
  if (phone) {
    attributeList.push(attributePhone);
  }

  const userPool = new CognitoUserPool(AWS_COGNITO);

  return new Promise((resolve, reject) => {
    userPool.signUp(username, password, attributeList, null, (err, res) => {
      if (err) {
        reject(err)
        return
      }
      resolve(res)
    });
  })
}

export const onVerifyCode = (username, code) => {
  const userPool = new CognitoUserPool(AWS_COGNITO);

  const cognitoUser = new CognitoUser({
    Username: username,
    Pool: userPool,
  });

  return new Promise((resolve, reject) => {
    cognitoUser.confirmRegistration(code, true, (err, result) => {
      if (err) {
        reject(err);
        return
      }
      resolve(result)
    });
  })
}

export const onSignOut = (token, successCallback) => {
  if (token.loginType === 'email') {
    const cognitoCredentials = getCognitoCredentials(token.identityId);
    // console.warn('token', token)
    cognitoCredentials.clearCachedId();
  
    AWS.config.credentials = cognitoCredentials;
  
    const cognitoUser = getCurrentUser();
    cognitoUser.signOut();
  }
  successCallback();
}

const getCognitoCredentials = token => {
  const loginCred = `cognito-idp.${awsmobile.aws_project_region}.amazonaws.com/${awsmobile.aws_user_pools_id}`;

  const cognitoParams = {
    IdentityPoolId: awsmobile.aws_cognito_identity_pool_id,
    Logins: {
      [loginCred]: token
    },
  };

  return new AWS.CognitoIdentityCredentials(cognitoParams);
};

const getCurrentUser = () => {
  const userPool = new CognitoUserPool(AWS_COGNITO);

  return userPool.getCurrentUser();
}

