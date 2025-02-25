import PrivateAxiosInstance from './privateAxiosInstance';

// eslint-disable-next-line import/prefer-default-export
export const getRentals = async () => {
  const response = await PrivateAxiosInstance.get('/admin/rentals');
  return response.data;
};
