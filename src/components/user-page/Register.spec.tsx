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
  test('should go to signin page', async () => {
    renderWithRouter(<App />, { route: '/register' });
    fireEvent.click(screen.getByRole('button', { name: /Sign in/i }));
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Sign in' })).toBeInTheDocument();
    });
  });

  test('should signin and go to homepage', async () => {
    renderWithRouter(<App />, { route: '/register' });
    fireEvent.change(screen.getByTestId('name'), {
      target: { value: 'Test2' }
    });
    fireEvent.change(screen.getByTestId('email'), {
      target: { value: 'test@test.com' }
    });
    fireEvent.change(screen.getByTestId('password'), {
      target: { value: '123' }
    });
    fireEvent.click(screen.getByRole('button', { name: /Register/i }));
    await waitFor(() => {
      expect(screen.getByText('Thanks for registering!')).toBeInTheDocument();
      expect(screen.getByText('Test_User')).toBeInTheDocument();
    });
  });
});
