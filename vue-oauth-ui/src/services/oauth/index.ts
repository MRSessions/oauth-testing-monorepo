import {
  OauthUser,
  DomainUser,
  UserManager,
  OidcClient,
  SigninResponse,
  StandardAuthFlow,
  DirectAuthFlow
} from './oauth'
const standardAuthFlow = new StandardAuthFlow()
const directAuthFlow = new DirectAuthFlow()

export type {
  OauthUser,
  DomainUser
}
export { UserManager, OidcClient, SigninResponse, standardAuthFlow, directAuthFlow }
