# oauth-testing-monorepo (Work in Progress)
Monorepo for setting up testing front/back end applications. Using Keycloak Docker for provider testing.

# The Setup
- I'm utilizing [bun](https://bun.sh/) on the Vue app (mainly wanted to test). Yarn and NPM will still work.
- You will need docker if using the Keycloak setup.
- Create a network `docker create network auth-network`
- cd to docker-files and run `docker compose -f bitnami-keycloak-docker-compose.yml up -d`
- cd to the vue-oath-ui and run `bun run dev` to run the Vue app.

# Keycloak Setup
- Create users in the Keycloak UI
- Create the following clients in the Keycloak UI
    - `standard-flow-client`
        - Authentication flow: Only check `Standard Flow`
    - `implicit-flow-client`
        - Authentication flow: Only check `Implicit Flow` and turn on `Client authentication`
    - `direct-access-client`
        - Authentication flow: Only check `Direct Access Grants`
- When creating the clients, you'll need to make sure to setup valid redirect URIs based on the ports used for `standard-flow-client`
    - `http://localhost:3000/*`
- Web origins: `*` Note that you would not want to do this in production.