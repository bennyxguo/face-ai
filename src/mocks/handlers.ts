import { rest } from 'msw';

export const handlers = [
  rest.get(`${process.env.REACT_APP_API_URL}/user`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        age: null,
        avatar: 'https://gravatar.com/avatar/b642b4217b34b1e8d3bd915fc65c4452?s=100&d=robohash&r=x',
        createdAt: '2021-07-26T13:08:44.000Z',
        email: 'test@test.com',
        entries: 2,
        hobby: null,
        id: 1,
        name: 'Test_User',
        updatedAt: '2021-07-28T04:06:20.000Z'
      })
    );
  }),

  rest.post(`${process.env.REACT_APP_API_URL}/login`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI3NzE0MTQzLCJleHAiOjE2Mjc4ODY5NDN9.9xRiCOKVKngG-nVD2mqoyjemE8yl6Se0tki8Z39lPEE',
        type: 'Bearer'
      })
    );
  }),

  rest.post(`${process.env.REACT_APP_API_URL}/register`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI3NzE0MTQzLCJleHAiOjE2Mjc4ODY5NDN9.9xRiCOKVKngG-nVD2mqoyjemE8yl6Se0tki8Z39lPEE',
        type: 'Bearer'
      })
    );
  })
];
