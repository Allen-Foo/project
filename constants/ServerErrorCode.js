export const ServerErrorCode = {

  API_CODE_OK: 200,

  // system error
  API_CODE_DB_ERROR: 100,
  API_CODE_DB_NOT_FOUND: 101,

  //comon error
  API_CODE_USER_NOT_FOUND: 201,
  API_CODE_TARGET_USER_NOT_FOUND: 202,
  API_CODE_INVALID_PARAMS: 203,

  //account error
  API_CODE_ACC_DUPLICATE_USERNAME: 300,
	API_CODE_ACC_DUPLICATE_EMAIL: 301,
	API_CODE_ACC_INVALID_FIELDS: 302,
	API_CODE_ACC_INCORRECT_PASSWORD: 303,
	API_CODE_ACC_ALREADY_LINKED_AWS_ID: 304,
	API_CODE_ACC_EMAIL_NOT_VERIFIED: 305,
	API_CODE_ACC_NOT_LINKED_AWS_ID: 306,
	API_CODE_ACC_INCORRECT_USERNAME: 307,

  API_CODE_ACC_UNAUTHORIZED: 401,


  // Not API !!!
  FACEBOOK_LOGIN_CANCEL: 9901,
  FACEBOOK_LOGIN_FAIL: 9902,
  FACEBOOK_GET_PROFILE_FAIL: 9903,
  FACEBOOK_GET_PICTURE_FAIL: 9904,
}

export function getLocaleErrorMessage (locale, fetchErrorMsg) {
  var errMessage = "";
  if (fetchErrorMsg) {
    if (fetchErrorMsg.type == -1) {
      // AWS Lambda error
      errMessage = fetchErrorMsg.message;
    }
    else {
      // Custom error
      var isCustom = false;
      for ( property in ServerErrorCode ) {
        if (ServerErrorCode[property]
          && ServerErrorCode[property] == fetchErrorMsg.type) {
          errMessage = locale.error[property];
          isCustom = true;
          break;
        }
      }

      if (!isCustom) {
        errMessage = fetchErrorMsg.message;
      }
    }
  }

  return errMessage;

}