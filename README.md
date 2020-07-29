# Teams authetication library

## Notice:
This SDK is for the authentication in the teams

## Build
Run `npm run build` to build the library

## Usage
```
// Initialize the auth class
await teamscloud.Auth.init();

// Get basic user info from SSO token
var userInfo = teamscloud.Auth.getUserInfo();

// Get graph client
var tokenResult = await teamscloud.Auth.getGraphAccessToken();
var graphClient = await teamscloud.Auth.getMicrosoftGraphClient(tokenResult.accessToken);

// The above two lines can be simplified as below:
// var graphClient = await teamscloud.Auth.getMicrosoftGraphClient();

// Call graph api
var profile = await graphClient.api("/me").get();
var photoBlob = await graphClient.api("/me/photos('120x120')/$value").get();
```