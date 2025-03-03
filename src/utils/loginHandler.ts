import { decode } from 'js-base64';

export const handleLoginSuccess = (accessToken: string | null) => {
  if (accessToken) {
    const payload = accessToken.split('.')[1] || '';
    const decodedPayload = decode(payload);
    const payloadObject = JSON.parse(decodedPayload);
    const { role: tokenRole, name: tokenName, sub: tokenId } = payloadObject;

    const userInfo = { name: tokenName, id: tokenId, role: tokenRole };

    localStorage.setItem('token', accessToken);
    localStorage.setItem('user', JSON.stringify(userInfo));
  }
};
