// Mock for the JWT service

export class JwtMock {
  constructor() {}
  public getJwt(): string {
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.'
  }
  private createJwt(): string {
    const secret = new TextEncoder().encode('Super Secret Key')

    // Create a new token


    return ''
  }
}
