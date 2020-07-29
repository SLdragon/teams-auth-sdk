import * as microsoftTeams from "@microsoft/teams-js";
import { Client, AuthProviderCallback } from "@microsoft/microsoft-graph-client";
import { SSOTokenInfo } from './models/ssoTokenInfo';
import { UserInfo } from './models/userInfo';
import { Utils } from './utils';

export class Auth {
    private static _authClient: Auth;
    private ssoToken: string;
    private tokenInfo: SSOTokenInfo;
    private userInfo: UserInfo;
    private graphClient: Client | undefined;

    private constructor(ssoToken: string) {
        this.ssoToken = ssoToken;
        this.tokenInfo = Utils.parseJwt(ssoToken) as SSOTokenInfo;
        this.userInfo = new UserInfo(this.tokenInfo.name, this.tokenInfo.preferred_username);
    }

    public static async init() {
        return new Promise((resolve, reject) => {
            if (Auth._authClient) {
                resolve();
                return;
            }
            microsoftTeams.initialize(() => {
                microsoftTeams.authentication.getAuthToken({
                    successCallback: (token: string) => {
                        console.log("Init success:" + token);
                        Auth._authClient = new Auth(token);
                        resolve();
                    },
                    failureCallback: (error: any) => {
                        console.log("Init failed:" + error);
                        reject(error);
                    },
                    resources: []
                });
            });
        });
    }

    public static getUserInfo() {
        return Auth._authClient.userInfo;
    }

    public static getSSOToken() {
        return Auth._authClient.ssoToken;
    }

    public static async getMicrosoftGraphClient(accessToken?: string): Promise<Client> {
        if (!Auth._authClient.graphClient) {
            if (!accessToken) {
                var tokenResult = await this.getGraphAccessToken();
                accessToken = tokenResult.accessToken;
            }

            Auth._authClient.graphClient = Client.init({
                defaultVersion: "v1.0",
                debugLogging: true,
                authProvider: (done: AuthProviderCallback) => {
                    if (accessToken) {
                        done(null, accessToken);
                    }
                    else {
                        done("Get access token failed", null);
                    }
                },
            });
        }
        return Auth._authClient.graphClient;
    }

    public static async getGraphAccessToken(): Promise<any> {
        return new Promise((resolve, reject) => {
            microsoftTeams.initialize(() => {
                microsoftTeams.authentication.authenticate({
                    url: window.location.origin + "/lib/simple-start?clientId=" + Auth._authClient.tokenInfo.aud,
                    width: 600,
                    height: 535,
                    successCallback: (result: any) => {
                        console.log("Get graph access token success:" + result);
                        let tokenResult = JSON.parse(result);
                        resolve(tokenResult);
                    },
                    failureCallback: (reason: any) => {
                        console.log("Get graph access token failed: " + reason);
                        reject("Login failed: " + reason);
                    },
                });
            });
        });
    }
}
