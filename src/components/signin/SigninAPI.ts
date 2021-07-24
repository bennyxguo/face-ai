import request from '../../utils/request';

export const fetchSignin = async (data: {
  email: string;
  password: string;
}) => {
  const response = await request.post('/login', data);
  return response.data;
};
