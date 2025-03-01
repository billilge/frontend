import PrivateAxiosInstance from './privateAxiosInstance';

export const getItems = async (searchQuery?: string) => {
  const response = await PrivateAxiosInstance.get('/admin/items', {
    params: searchQuery ? { search: searchQuery } : {},
  });
  return response.data;
};

export const addItems = async (data: FormData) => {
  const response = await PrivateAxiosInstance.post('/admin/items', data);
  return response.data;
};

export const deleteItems = async (id: number) => {
  const response = await PrivateAxiosInstance.delete(`/admin/items/${id}`);
  return response.data;
};
