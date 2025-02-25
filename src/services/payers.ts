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

export const deletePayer = async (payerIds: number[]) => {
  const response = await PrivateAxiosInstance.delete('/admin/members/payers', {
    data: { payerIds }, // DELETE 요청의 본문에 payerIds를 포함
  });
  return response.data;
};
