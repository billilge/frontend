import PublicAxiosInstance from '@/services/publicAxiosInstance';

interface SignUpProps {
  email: string;
  studentId: string;
  name: string;
}

export const postSignUp = async ({ email, studentId, name }: SignUpProps) => {
  const response = await PublicAxiosInstance.post('/auth/sign-up', {
    email,
    studentId,
    name,
  });
  return response.data;
};
