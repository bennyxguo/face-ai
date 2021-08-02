import { fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithRouter } from '../../utils/test-utils';
import { useGetUserQuery, useSigninUserMutation } from '../services/userApi';
import { server } from '../../mocks/server';

beforeAll(() => {
  server.listen();
});

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

afterAll(() => {
  server.close();
});

describe('Api Error Handler', () => {
  const UnauthorizedComponent = () => {
    const { isError } = useGetUserQuery();

    return <div>{isError && 'Unauthorized'}</div>;
  };

  test('should result in 401', async () => {
    renderWithRouter(<UnauthorizedComponent />);

    await waitFor(() => {
      expect(screen.getByText('Unauthorized')).toBeTruthy();
    });
  });

  const ErrorComponent = () => {
    const [singinUser, { isError }] = useSigninUserMutation();
    const handleSignin = () => {
      singinUser({
        email: '123',
        password: '123'
      })
        .unwrap()
        .catch((res) => {})
        .catch((err) => {});
    };

    return (
      <div>
        <button onClick={handleSignin}>Login</button>
        {isError && 'Incorrect credentials.'}
      </div>
    );
  };

  test('should fail to login with 400', async () => {
    renderWithRouter(<ErrorComponent />);
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    await waitFor(() => {
      expect(screen.getByText('Incorrect credentials.')).toBeTruthy();
    });
  });
});
