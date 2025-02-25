import PrivateAxiosInstance from './privateAxiosInstance';

const userNotificationGet = async () => {
  try {
    const response = await PrivateAxiosInstance.get('/notifications');
    return response.data;
  } catch (error) {
    return [];
  }
};

export { userNotificationGet };
