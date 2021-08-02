import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { store } from './app/store';
import App from './App';
import { revokeToken, signToken } from './components/user/userSlice';
import { renderWithRouter } from './utils/test-utils';
import { server } from './mocks/server';

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

describe('App component', () => {
  test('should go to login page', () => {
    renderWithRouter(<App />);
    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });

  test('should sign in and go to home page', async () => {
    store.dispatch(signToken('JWT_TOKEN'));

    renderWithRouter(<App />, { route: '/' });

    await waitFor(() => {
      expect(screen.getByText('Test_User')).toBeInTheDocument();
    });
  });

  test('should logout to signin page', async () => {
    store.dispatch(revokeToken());

    // fetchMock.mockResponseOnce(JSON.stringify(userPayload));
    // store.dispatch(userApi.endpoints.getUser.initiate(void 0));
    renderWithRouter(<App />, { route: '/' });

    await waitFor(() => {
      expect(screen.getByText('Sign in')).toBeInTheDocument();
    });
  });
});
