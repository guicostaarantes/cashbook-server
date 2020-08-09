export interface ITokenPayload {
  type: string;
  subject: string;
  sessionId?: string;
  [key: string]: unknown;
}

export interface ITokenProvider {
  generate(token: ITokenPayload): Promise<string>;
  check(token: string): Promise<ITokenPayload>;
  decode(token: string): Promise<ITokenPayload>;
}
