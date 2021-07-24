import request from '../../utils/request';

export const updateEntry = async (id: number) => {
  const response = await request.put('/image/updateEntry', { id });
  return response.data;
};

export const faceRecognition = async (imageUrl: string) => {
  const response = await request.post('/image/faceRecognition', {
    input: imageUrl
  });
  return response.data;
};
