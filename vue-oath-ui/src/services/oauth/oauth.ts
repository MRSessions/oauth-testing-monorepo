import {OidcClient, User, UserManager} from "oidc-client-ts";
import axios from "axios";


interface OauthUser extends User {}

interface DomainUser extends OauthUser {
  domain_token: string;
}

// interface OauthClient extends OidcClient {}
//
// interface OauthManager extends UserManager {}

class AuthenticateStandardFlow {
  private readonly settings: OidcClient | UserManager;
  private readonly manager?: UserManager;
  private readonly client?: OidcClient;

  //Since both are not required, we only need to pass one of them
  public constructor(settings: OidcClient | UserManager) {
    this.settings = settings;
    if (settings instanceof OidcClient) {
      this.client = settings;
    }
    if (settings instanceof UserManager) {
      this.manager = settings;
    }
  }

  public async login(): Promise<OauthUser> {
    const {signinRedirect, signinRedirectCallback} = this.manager as UserManager;
    await signinRedirect();
    return await signinRedirectCallback();
  }

  public async loginWithDomain(): Promise<void> {
    const domainUser: DomainUser = await this.login() as DomainUser;
    //Create an axios call to get the domain token
    let domainToken= await axios.get<String>('https://localhost:5001/api/DomainToken', {
      params: {
        domain: domainUser.profile.domain,
        userName: domainUser.profile.sub
      }
    })
  }

  public async logout(): Promise<void> {
    const {signoutRedirect} = this.manager as UserManager;
    await signoutRedirect();
  }

  public async getUser(): Promise<User | null> {
    const {getUser} = this.manager as UserManager;
    return await getUser();
  }
}

export type {
  OauthUser,
  DomainUser,
  UserManager,
  OidcClient,
  // OauthClient,
  // OauthManager,
  AuthenticateStandardFlow
};
