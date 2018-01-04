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

export const onSignIn = (userName, password, callback, successCallback, failureCallback) => {
  const userPool = new CognitoUserPool(AWS_COGNITO);
  const authDetails = new AuthenticationDetails({
    Username: userName,
    Password: password
  });
  const cognitoUser = new CognitoUser({
    Username: userName,
    Pool: userPool
  });

  // this will trigger loading
  callback();

  const start = new Date().getTime()
  cognitoUser.authenticateUser(authDetails, {
    onSuccess: (result) => {
      console.log('authenticateUser timey', new Date().getTime() - start)

      const loginCred = `cognito-idp.${awsmobile.aws_project_region}.amazonaws.com/${awsmobile.aws_user_pools_id}`;

      const cognitoParams = {
        IdentityPoolId: awsmobile.aws_cognito_identity_pool_id,
        Logins: {
          [loginCred]: result.getIdToken().getJwtToken()
        },
      };

      AWS.config.credentials = new AWS.CognitoIdentityCredentials(cognitoParams);

      // GET FEDERAL IDENTITY ID AND STORE IN REDUX
      AWS.config.credentials.get(function(err) {
        if (err) {
          console.warn("Error: "+err);
          failureCallback(err)
          return;
        }
        console.warn("Cognito Identity Id: " + AWS.config.credentials.identityId);
        successCallback(AWS.config.credentials.identityId);
      });
    },
    onFailure: (err) => {
      failureCallback(err)
    }
  });
};

export const onSignUp = (username, password, email, phone, callback, successCallback, failureCallback) => {
  const attributeList = [];
  const attributeEmail = new CognitoUserAttribute(email);
  const attributePhone = new CognitoUserAttribute(phone);

  if (email.Value) {
    attributeList.push(attributeEmail);
  }
  if (phone.Value) {
    attributeList.push(attributePhone);
  }

  const userPool = new CognitoUserPool(AWS_COGNITO);

  callback();
  userPool.signUp(username, password, attributeList, null, (err, res) => {
    if (err) {
      failureCallback(err)
      return
    }
    successCallback(res)
  });
}

export const onVerifyCode = (username, code, callback, successCallback, failureCallback) => {
  const userPool = new CognitoUserPool(AWS_COGNITO);

  const cognitoUser = new CognitoUser({
    Username: username,
    Pool: userPool,
  });
  callback()
  cognitoUser.confirmRegistration(code, true, (err, result) => {
    if (err) {
      failureCallback(err);
      return
    }
    successCallback(result)
  });
}

export const onSignOut = (token, successCallback) => {
  if (token.loginType === 'email') {
    const cognitoCredentials = getCognitoCredentials(token);
    // console.warn('token', token)
    cognitoCredentials.clearCachedId();
  
    AWS.config.credentials = cognitoCredentials;
  
    const cognitoUser = getCurrentUser();
    cognitoUser.signOut();
  }
  successCallback();
}

const getCognitoCredentials = function getCognitoCredentials(token) {
  const loginCred = `cognito-idp.${awsmobile.aws_project_region}.amazonaws.com/${awsmobile.aws_user_pools_id}`;

  const cognitoParams = {
    IdentityPoolId: awsmobile.aws_cognito_identity_pool_id,
    Logins: {
      [loginCred]: token.identityId
    },
  };

  return new AWS.CognitoIdentityCredentials(cognitoParams);
};

function getCurrentUser() {
  const userPool = new CognitoUserPool({
    UserPoolId: awsmobile.aws_user_pools_id, // Your user pool id here
    ClientId: awsmobile.aws_user_pools_web_client_id, // Your client id here
  });

  return userPool.getCurrentUser();
}

