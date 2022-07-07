# Full Stack Starter

This project is built on the following technologies:

- React (create-react-app)
  - tailwind
  - Typescript
- GraphQL
  - Apollo Client
  - Apollo Server
- Node
  - Typescript
  - Express
- MongoDB
- Docker

## Setup

1. Run `npm run setup` to install all node modules for the root, frontend, and backend.

2. Request the firebase certs to put in the backend `private/firebase.env` file. This should be in the following form:

```
FIREBASE_SERVICE="<stringified services JSON>"
```

### macOS

This section might not be necessary since everything is in Docker now

1. Install Homebrew, Node, Docker
2. Run `brew bundle`

## Development

Run the following command in the project root directory to start development in Docker: `npm start`

- App should be running at `localhost:8080`

If you want to force containers to be rebuilt (i.e. after adding a new dependency) run `npm run start:build`
