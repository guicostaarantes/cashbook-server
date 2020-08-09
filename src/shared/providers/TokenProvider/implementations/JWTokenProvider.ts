import { sign, verify, decode } from 'jsonwebtoken';
import { ITokenProvider, ITokenPayload } from '../ITokenProvider';

class JWTokenProvider implements ITokenProvider {
  public async generate({
    subject,
    type,
    ...rest
  }: ITokenPayload): Promise<string> {
    return sign(
      { sub: subject, typ: type, ...rest },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    );
  }

  public async check(token: string): Promise<ITokenPayload> {
    const payload = verify(token, process.env.JWT_SECRET_KEY) as {
      typ: string;
      sub: string;
    };
    const result = { ...payload, type: payload.typ, subject: payload.sub };
    delete result.typ;
    delete result.sub;
    return result;
  }

  public async decode(token: string): Promise<ITokenPayload> {
    const payload = decode(token) as {
      typ: string;
      sub: string;
    };
    const result = { ...payload, type: payload.typ, subject: payload.sub };
    delete result.typ;
    delete result.sub;
    return result;
  }
}

export default JWTokenProvider;
