import PublicAxiosInstance from '@/services/publicAxiosInstance';

const userNotificationGet = async () => {
  try {
    const response = await PublicAxiosInstance.get('/notifications');
    return response.data;
  } catch (error) {
    return [];
  }
};

export { userNotificationGet };
