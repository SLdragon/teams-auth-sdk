import * as axios from 'axios';

export class Auth {
    private constructor() {
    }

    public static async getGraphAccessToken(url: string): Promise<any> {
        let microsoftTeams = require('@microsoft/teams-js');
        return new Promise((resolve, reject) => {
            microsoftTeams.initialize(() => {
                microsoftTeams.authentication.authenticate({
                    url: window.location.origin + "/simple-start",
                    width: 600,
                    height: 535,
                    successCallback: function (result: string) {
                        let data: any = localStorage.getItem(result);
                        localStorage.removeItem(result);
                        let tokenResult = JSON.parse(data);
                        resolve(tokenResult);
                    },
                    failureCallback: function (reason: string) {
                        console.log("Login failed: " + reason);
                        reject("Login failed: " + reason);
                    },
                });
            });
        });
    }

    public static async getUserProfile(accessToken: string) {
        return new Promise(async (resolve, reject) => {
            let headers: { [key: string]: string } = {
                Authorization: "Bearer " + accessToken,
            };

            var _axios: axios.AxiosInstance = axios.default.create({
                headers: headers
            });

            var response = await _axios.get("https://graph.microsoft.com/v1.0/me/")
            resolve(response.data);
        });
    }

    public static parseJwt(token: string) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }
}
