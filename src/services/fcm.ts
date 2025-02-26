import privateAxiosInstance from '@/services/privateAxiosInstance';

const postFCMToken = async (token: string) => {
  const response = await privateAxiosInstance.post('/members/me/fcm-token', {
    token,
  });

  return response.data;
};

export default postFCMToken;
