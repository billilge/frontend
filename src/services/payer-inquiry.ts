import PublicAxiosInstance from './publicAxiosInstance';
import PrivateAxiosInstance from './privateAxiosInstance';

export const fetchOriginalData = async () => {
  const response = await PrivateAxiosInstance.get('/admin/members/payers');
  return response.data; // 반환 값은 필요에 따라 수정하세요.
};

export const addStudent = async (studentId: string, studentName: string) => {
  // API 요청
  const response = await PrivateAxiosInstance.post('/admin/members/payers', {
    studentId,
    name: studentName,
  });
  return response.data;
};
