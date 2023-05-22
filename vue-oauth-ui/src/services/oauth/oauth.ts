import {OidcClient, User, UserManager, SigninResponse} from "oidc-client-ts";
import axios from "axios";

interface OauthUser extends User {}

interface DomainUser extends OauthUser {
  domain_token?: String;
}

// class AuthenticateOauthUser {
//   private readonly settings: OidcClient | UserManager;
//   private readonly manager?: UserManager;
//   private readonly client?: OidcClient;
//   _user?: DomainUser;
//
//   //Since both are not required, we only need to pass one of them
//   public constructor(settings: OidcClient | UserManager) {
//     this.settings = settings;
//     if (settings instanceof OidcClient) {
//       this.client = settings;
//     }
//     if (settings instanceof UserManager) {
//       this.manager = settings;
//     }
//   }
//
//   public async loginRedirect(returnUrl: string): Promise<OauthUser | null> {
//     localStorage.setItem("returnUrl", returnUrl);
//     let user: OauthUser | null = null
//     try {
//       user = await (this.manager as UserManager).signinRedirectCallback()
//     } catch {
//       if(!user){
//         await (this.manager as UserManager).signinRedirect()
//       }
//     }
//     // console.log(user)
//
//     return user
//     // return await (this.manager as UserManager).signinRedirectCallback()
//   }
//
//   public async loginDirect(username: string, password: string): Promise<SigninResponse | null> {
//     try {
//       return await (this.client as OidcClient).processResourceOwnerPasswordCredentials({
//         username, password
//       })
//     } catch {
//       return null
//     }
//   }
//
//   public async loginRedirectWithDomain(returnUrl: string): Promise<void> {
//     const domainUser: DomainUser = await this.loginRedirect(returnUrl) as DomainUser;
//     // http://localhost:5270/Security/GetWindowsToken?domain=HCA&userName=NCE4564
//     //Create an axios call to get the domain token
//     let domainToken= await axios.get<String>('http://localhost:5270/Security/GetWindowsToken', {
//       params: {
//         domain: domainUser.profile.domain,
//         userName: domainUser.profile.sub
//       }
//     })
//
//     this._user = domainUser
//   }
//
//   public async logout(): Promise<void> {
//     await (this.manager as UserManager).signoutRedirect();
//   }
//
//   public async getUser(): Promise<OauthUser | null> {
//     return await (this.manager as UserManager).getUser();
//   }
//
//   public async getDomainUser(): Promise<void> {
//     const domainUser: DomainUser = await this.getUser() as DomainUser;
//     let domainToken= await axios.get<String>('http://localhost:5270/Security/GetWindowsToken', {
//       params: {
//         domain: domainUser.profile.domain,
//         userName: domainUser.profile.sub
//       }
//     })
//   }
// }

/**
 * Provides a standard authentication flow for the application.
 *
 * @public
 */
class StandardAuthFlow {
  private _userManager: UserManager;
  private _user?: DomainUser;
  private _includeDomainToken: boolean

  constructor() {
    const settings = {
      authority: import.meta.env.VITE_OAUTH_AUTHORITY,
      client_id: import.meta.env.VITE_OAUTH_CLIENT_ID_STANDARD,
      redirect_uri: import.meta.env.VITE_OAUTH_REDIRECT_URI,
      response_type: import.meta.env.VITE_OAUTH_RESPONSE_TYPE_STANDARD,
      scope: import.meta.env.VITE_OAUTH_SCOPE
    }
    console.log('ctor')
    this._userManager = new UserManager(settings)
    this._includeDomainToken = false
  }

  public async getUser(): Promise<User | null> {
    console.log('getUser')
    let user = await this._userManager.getUser()
    if(user && !user.expired) {
      this._user = user
    }
    return user
  }

  public isLoggedIn() {
    console.log('isLoggedIn')
    return this._user && this._user.access_token && !this._user.expired;
  }

  public async loginRedirect(returnUrl: string): Promise<void> {
    console.log('loginRedirect')
    localStorage.setItem("returnUrl", returnUrl);
    await this._userManager.signinRedirect()
  }

  public async loginRedirectCallback(): Promise<DomainUser> {
    console.log('loginRedirectCallback')
    return await this._userManager.signinRedirectCallback()
  }

  public async fetchDomainToken(returnUrl: string): Promise<void> {
    console.log('fetchDomainToken')
    const options = {
      method: 'GET',
      url: 'http://localhost:5270/Security/GetWindowsToken',
      params: {},
      headers: {accept: 'text/plain'}
    }
    let user = this._user as DomainUser

    axios.request(options).then(function (response: {data: any}){
      user.domain_token = response.data
    })
  }

  public getAccessToken(): string {
    return this._user ? this._user.access_token : "";
  }

  public getCurrentUser(): User | undefined {
    return this._user
  }

  public isAuthenticated() {
    return this.isLoggedIn()
  }

  getDomainToken = () => {
    return this._user ? this._user.domain_token : "";
  }

  getUserDomainInfo = () => {
    return {
      domain: this._user?.profile.domain,
      userName: this._user?.profile.sub,
    }
  }

  useWindowsAuthentication = (includeDomainToken: boolean) => {
    this._includeDomainToken = includeDomainToken;
  }

}

class DirectAuthFlow {
  private _oidcClient: OidcClient;
  private _user?: DomainUser;
  private _includeDomainToken: boolean

  constructor() {
    const settings = {
      authority: import.meta.env.VITE_OAUTH_AUTHORITY,
      client_id: import.meta.env.VITE_OAUTH_CLIENT_ID_DIRECT,
      redirect_uri: import.meta.env.VITE_OAUTH_REDIRECT_URI,
      response_type: import.meta.env.VITE_OAUTH_RESPONSE_TYPE_DIRECT,
      scope: import.meta.env.VITE_OAUTH_SCOPE
    }
    console.log('ctor')
    this._oidcClient = new OidcClient(settings)
    this._includeDomainToken = false
  }

  public async loginDirect(username: string, password: string): Promise<SigninResponse | null> {
    console.log('loginDirect')
    try {
      return await this._oidcClient.processResourceOwnerPasswordCredentials({
        username, password
      })
    } catch {
      return null
    }
  }

}





export type {
  OauthUser,
  DomainUser,
  // OauthClient,
  // OauthManager,
};

export { UserManager, OidcClient, SigninResponse, StandardAuthFlow, DirectAuthFlow }
