# oauth-testing-monorepo
Monorepo for setting up testing front/back end applications. Using Keycloak Docker for provider testing.

# The Setup
- I'm utilizing [bun](https://bun.sh/) on the Vue app (mainly wanted to test). Yarn and NPM will still work.
- You will need docker if using the Keycloak setup.
- Create a network `docker create network auth-network`
- cd to docker-files and run `docker compose -f bitnami-keycloak-docker-compose.yml up -d`
- cd to the vue-oath-ui and run `bun run dev` to run the Vue app.