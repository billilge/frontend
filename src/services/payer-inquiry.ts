import PublicAxiosInstance from './publicAxiosInstance';
import PrivateAxiosInstance from './privateAxiosInstance';

export const getPayer = async () => {
  const response = await PrivateAxiosInstance.get('/admin/members/payers');
  return response.data;
};

export const addPayer = async (data: {
  payers: { studentId: string; name: string }[];
}) => {
  const response = await PrivateAxiosInstance.post(
    '/admin/members/payers',
    data,
  );
  return response.data;
};
