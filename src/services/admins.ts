import PublicAxiosInstance from '@/services/publicAxiosInstance';
import PrivateAxiosInstance from './privateAxiosInstance';

export const getAdmins = async () => {
  const response = await PrivateAxiosInstance.get('/admin/members/admins');
  return response.data;
};

export const getMembers = async () => {
  const response = await PrivateAxiosInstance.get('/admin/members');
  return response.data;
};

export const addAdmins = async (memberIds: number[]) => {
  const response = await PrivateAxiosInstance.post('/admin/members/admins', {
    memberIds,
  });
  return response.data;
};

export const deleteAdmins = async (memberIds: number[]) => {
  const response = await PrivateAxiosInstance.delete('/admin/members/admins', {
    data: { memberIds },
  });
  return response.data;
};

interface AdminLoginProps {
  studentId: string;
  password: string;
}

export const postAdminLogin = async ({
  studentId,
  password,
}: AdminLoginProps) => {
  const response = await PublicAxiosInstance.post('/auth/admin-login', {
    studentId,
    password,
  });

  return response.data;
};
