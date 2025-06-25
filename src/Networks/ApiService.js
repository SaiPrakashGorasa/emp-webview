import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { STATUS_CODE_601, STATUS_CODE_SUCCESS_200 } from './ApiConfig';
// Replace these with actual utility functions or constants
async function getDeviceId() {
  return DeviceInfo.getUniqueId();
}
async function getAppVersionCode() {
  return DeviceInfo.getBuildNumber();
}
async function getAppVersionName() {
  return DeviceInfo.getVersion();
}
async function getAppName(){
  return DeviceInfo.getApplicationName();
}

function constructFailureObject(message) {
  message = message == undefined ? translate('something_went_wrong') : message;
  var newResponse = {
    statusCode: 0,
    message: message,
    response: '',
  };

  return newResponse;
}

function forceLogoutUser() {

}


class ApiService {
  static async getCommonHeaders(extraHeaders = {}) {
    const deviceId = await getDeviceId();
    const versionCode = await getAppVersionCode();
    const versionName = await getAppVersionName();
    const appName = await getAppName();
    return {
      // 'Content-Type': 'application/json',
      // deviceId: deviceId,
      // deviceToken: '',
      // versioncode: versionCode,
      // versionname: versionName,
      // deviceType: Platform.OS,
      // fcmToken: "",
      // languageId:1,
      // applicationName: appName,
      ...extraHeaders,
    };
  }

  static async post(url, body = {}, extraHeaders = {}) {
    const headers = await this.getCommonHeaders(extraHeaders);
    console.log("URL===>", url)
    console.log("headers", headers)
    console.log("body", body)
    console.log("extraHeaders", extraHeaders)

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
      });

      const responseJson = await response.json();
      console.log("responseJson", JSON.stringify(responseJson))
      if (responseJson.statusCode == 200 || responseJson.statusCode == STATUS_CODE_SUCCESS_200) {
        return responseJson;
      }
      else if (responseJson.status == 404 || responseJson.statusCode == 404) {
        return constructFailureObject('No Http resource found');
      } else if (responseJson.status == 401 || responseJson.statusCode == 401) {
        return constructFailureObject('Unauthorised Request');
      } else if (responseJson.status == 500 || responseJson.statusCode == 500) {
        return constructFailureObject('Internal Server Error');
      } else if (responseJson.status == 503 || responseJson.statusCode == 503) {
        return constructFailureObject('Server down');
      } else if (responseJson.status == 504 || responseJson.statusCode == 504) {
        return constructFailureObject('Request Timed out');
      } else if ((responseJson.statusCode == 601) || (response.statusCode == STATUS_CODE_601)) {
        forceLogoutUser();
        return;
      } else {
        return constructFailureObject('Something went wrong');
      }

    } catch (error) {
  return constructFailureObject(error.message);    }
  }

  static async get(url, extraHeaders = {}) {
    const headers = await this.getCommonHeaders(extraHeaders);
    console.log("URL===>", url)
    console.log("headers", headers)
    console.log("extraHeaders", extraHeaders)
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers,
      });
      const responseJson = await response.json();
      console.log("responseJsonGet", JSON.stringify(responseJson))
      if (responseJson.statusCode == 200 || responseJson.statusCode == STATUS_CODE_SUCCESS_200 ||responseJson.responseCode==STATUS_CODE_SUCCESS_200) {
        return responseJson;
      }
      else if (responseJson.status == 404 || responseJson.statusCode == 404) {
        return constructFailureObject('No Http resource found');
      } else if (responseJson.status == 401 || responseJson.statusCode == 401) {
        return constructFailureObject('Unauthorised Request');
      } else if (responseJson.status == 500 || responseJson.statusCode == 500) {
        return constructFailureObject('Internal Server Error');
      } else if (responseJson.status == 503 || responseJson.statusCode == 503) {
        return constructFailureObject('Server down');
      } else if (responseJson.status == 504 || responseJson.statusCode == 504) {
        return constructFailureObject('Request Timed out');
      } else if ((responseJson.statusCode == 601) || (response.statusCode == STATUS_CODE_601)) {
        forceLogoutUser();
        return;
      } else {
        return constructFailureObject('Something went wrong');
      }
    } catch (error) {
  return constructFailureObject(error.message);    }
  }
}

export default ApiService;
