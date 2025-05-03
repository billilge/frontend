import PrivateAxiosInstance from './privateAxiosInstance';

// eslint-disable-next-line import/prefer-default-export
export const getRentals = async (page?: number) => {
  const response = await PrivateAxiosInstance.get('/admin/rentals', {
    params: {
      pageNo: page || 0,
    },
  });
  return response.data;
};
