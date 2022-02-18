# Tesla Simple API

The project's goal is to make a simplified version of common Tesla API routes.

# Installation

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https%3A%2F%2Fgithub.com%2Fplanecore%2Ftesla-api&referralCode=matan)

## Manual:

```
git clone https://github.com/planecore/tesla-api
yarn install
yarn start
```

# Authentication

You need to create a refresh token. You can use apps like [Auth App for Tesla (iOS)](https://apps.apple.com/il/app/auth-app-for-tesla/id1552058613) and [Tesla Tokens (Android)](https://play.google.com/store/apps/details?id=net.leveugle.teslatokens).

After you created your refresh token, simply add it to the autherization header on every request in the following format:

```
Autherization: Bearer YOUR_REFRESH_TOKEN
```

# Routes

Note: All routes wake up the car before performing the desired action.

## POST /sentry

Turns on sentry mode on your vehicle.

### Body:

`{on: boolean}`

If the body is empty, it defaults to `true`.

### Response:

`{success: boolean}`
