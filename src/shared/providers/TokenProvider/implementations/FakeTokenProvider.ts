import { JsonWebTokenError } from 'jsonwebtoken';
import { ITokenProvider, ITokenPayload } from '../ITokenProvider';

class FakeTokenProvider implements ITokenProvider {
  public tokens: string[] = [];

  public async generate({
    subject,
    type,
    ...rest
  }: ITokenPayload): Promise<string> {
    const token = Buffer.from(
      JSON.stringify({ subject, type, date: Date.now(), ...rest }),
    ).toString('base64');
    this.tokens.push(token);
    return token;
  }

  public async check(token: string): Promise<ITokenPayload> {
    const index = this.tokens.findIndex(_token => _token === token);

    if (!this.tokens[index]) {
      throw new JsonWebTokenError('');
    }

    return JSON.parse(
      Buffer.from(this.tokens[index], 'base64').toString('utf8'),
    );
  }

  public async decode(token: string): Promise<ITokenPayload> {
    return JSON.parse(Buffer.from(token, 'base64').toString('utf8'));
  }
}

export default FakeTokenProvider;
