import PrivateAxiosInstance from './privateAxiosInstance';

export const getItems = async (searchQuery?: string, page?: number) => {
  const response = await PrivateAxiosInstance.get('/admin/items', {
    params: {
      pageNo: page || 0,
      search: searchQuery || '',
    },
  });
  return response.data;
};

export const addItems = async (data: FormData) => {
  const response = await PrivateAxiosInstance.post('/admin/items', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const deleteItems = async (id: number) => {
  const response = await PrivateAxiosInstance.delete(`/admin/items/${id}`);
  return response.data;
};
