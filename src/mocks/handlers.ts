import { rest } from 'msw';
import { faceData, userData, tokenData } from './data';

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3030';

export const handlers = [
  rest.get(`${apiUrl}/user`, (req, res, ctx) => {
    const authToken = req.headers.get('Authorization');
    if (authToken) {
      return res(ctx.status(200), ctx.json(userData));
    } else {
      return res(ctx.status(401), ctx.json('Unauthorized'));
    }
  }),

  rest.put(`${apiUrl}/user`, (req, res, ctx) => {
    userData.age = '100';
    return res(ctx.status(200), ctx.json('Updated completed.'));
  }),

  rest.post(`${apiUrl}/login`, (req, res, ctx) => {
    let data;
    if (typeof req.body === 'string') data = JSON.parse(req.body);
    else data = req.body;

    const { email, password } = data;
    if (email !== 'test@test.com' || password !== '123') {
      return res(ctx.status(400), ctx.json('Incorrect credentials.'));
    }
    return res(ctx.status(200), ctx.json(tokenData));
  }),

  rest.post(`${apiUrl}/register`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(tokenData));
  }),

  rest.post(`${apiUrl}/image/faceRecognition`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(faceData));
  }),

  rest.put(`${apiUrl}/image/updateEntry`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(4));
  })
];
