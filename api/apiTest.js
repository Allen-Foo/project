import appSecrets from '../appSecrets';
import axios from 'axios';

export const doPost = (service, userInfo) => {
  return axios.post(appSecrets.aws.apiURL, {
      'bodyParam1': `you sent me to the server, and now I'm back!`,
    })
    .then((response) => {
      if (response.status !== 200) {
        console.warn('error', response.status)
      }
      else {
        console.warn('response', response.data.message)
        return response;
      }
    })
    .catch(function (err) {   
      console.log("error: ", err);
    })
}

export const doGet = (service, userInfo) => {
  return axios.get(appSecrets.aws.apiURL)
    .then((response) => {
      if (response.status !== 200) {
        console.warn('error', response.status)
      }
      else {
        console.warn('response', response.data.message)
        return response.text();
      }
    })
    .catch(function (err) {   
      console.log("error: ", err);
    })
}

