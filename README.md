# React Rails Auth App

Welcome to the React Rails Auth App, a full-stack web application that demonstrates authentication using Rails and React.

## Setup Instructions

Before getting started, make sure you have Ruby 3.0.1 installed on your machine.

1. Run `bin/setup` to set up the app. Make sure you enter your MySQL password in the `config/database.yml` file.
2. Run `bin/dev` to start the server and frontend.
3. The app should now be running at `localhost:3000`.

## API

This app is also available via API. Here are the endpoints:

### Login

`POST /login`

Params:

```json
{
  "user": {
    "email": "string",
    "password": "string"
  }
}
```

Returns the user with an `auth_token`.

### Register

`POST /register`

Params:

```json
{
  "user": {
    "email": "string",
    "password": "string"
  }
}
```

Returns the newly created user with the `auth_token` and other information.

### Authenticated Routes

For authenticated routes, you need to set the following headers:

- `X-Auth-Email`: User email
- `X-Auth-Token`: User auth token

### Referrals

`GET /referrals`

Fetches all the referrals.

`POST /referrals`

Params:

```json
{
  "referral": {
    "email": "string"
  }
}
```

Returns the referral object.
