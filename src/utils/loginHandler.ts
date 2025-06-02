import { decode } from 'js-base64';
import Cookies from 'js-cookie';

export const handleLoginSuccess = (accessToken: string | null) => {
  if (accessToken) {
    const payload = accessToken.split('.')[1] || '';
    const decodedPayload = decode(payload);
    const payloadObject = JSON.parse(decodedPayload);
    const {
      role: tokenRole,
      name: tokenName,
      sub: tokenId,
      isFeePaid: tokenFeePaid,
    } = payloadObject;

    const userInfo = {
      name: tokenName,
      id: tokenId,
      role: tokenRole,
      isFeePaid: tokenFeePaid,
    };

    Cookies.set('token', accessToken);
    Cookies.set('user', JSON.stringify(userInfo));
  }
};
