import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithRouter } from '../../utils/test-utils';
import App from '../../App';
import { server } from '../../mocks/server';

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

describe('Singin page', () => {
  test('should go to sign up page', async () => {
    renderWithRouter(<App />, { route: '/signin' });
    fireEvent.click(screen.getByRole('button', { name: /Sign up/i }));
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Register' })).toBeInTheDocument();
    });
  });

  test('should signin and go to homepage', async () => {
    renderWithRouter(<App />, { route: '/signin' });
    fireEvent.change(screen.getByTestId('email'), {
      target: { value: 'test@test.com' }
    });
    fireEvent.change(screen.getByTestId('password'), {
      target: { value: '123' }
    });
    fireEvent.click(screen.getByRole('button', { name: /Log In/i }));
    await waitFor(() => {
      expect(screen.getByText('Welcome back!')).toBeInTheDocument();
      expect(screen.getByText('Test_User')).toBeInTheDocument();
    });
  });
});
