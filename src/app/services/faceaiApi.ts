import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const faceaiApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:3030' }),
  endpoints: (builder) => ({})
});
