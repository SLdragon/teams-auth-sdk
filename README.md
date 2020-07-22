# Teams authetication library

## Notice:
This SDK is for the authentication in the teams

## Build
Run `npm run build` to build the library

## Usage
```
// Reference from html 
<script src="./teamsauth.min.js" ></script>

// login
var tokenResult = await teamsauth.Auth.login(url);

// get user profile
var profile = await teamsauth.Auth.getUserProfile(tokenResult.accessToken);

// parse JWT token
var token = teamsauth.Auth.parseJwt(idToken)

```