import PrivateAxiosInstance from './privateAxiosInstance';

const userNotificationGet = async () => {
  try {
    const response = await PrivateAxiosInstance.get('/notifications');
    return response.data;
  } catch (error) {
    return [];
  }
};

const adminNotificationGet = async () => {
  try {
    const response = await PrivateAxiosInstance.get('/admin/notifications');
    return response.data;
  } catch (error) {
    return [];
  }
};

const readNotificationPost = async (notificationId: number) => {
  try {
    const response = await PrivateAxiosInstance.patch(
      `notifications/${notificationId}`,
    );
    return response.data;
  } catch (error) {
    return [];
  }
};

export { adminNotificationGet, userNotificationGet, readNotificationPost };
