import request from '../../utils/request';

export const fetchRegister = async (data: {
  email: string;
  password: string;
  name: string;
}) => {
  const response = await request.post('/register', data);
  return response.data;
};
