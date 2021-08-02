import { fireEvent, screen, waitFor } from '@testing-library/react';
import App from '../../App';
import { store } from '../../app/store';
import { renderWithRouter } from '../../utils/test-utils';
import { revokeToken, signToken } from '../user/userSlice';
import { server } from '../../mocks/server';

beforeAll(() => {
  store.dispatch(signToken('JWT_TOKEN'));
  server.listen();
});

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

afterAll(() => {
  store.dispatch(revokeToken());
  server.close();
});

describe('Home component testing', () => {
  test('should update image', () => {
    renderWithRouter(<App />);

    fireEvent.change(screen.getByRole('textbox', { name: '' }), {
      target: {
        value:
          'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2272&q=80'
      }
    });

    expect(screen.queryByRole('img', { name: 'inputimage' })).toBeInTheDocument();
  });

  test('should fail to calculate face', async () => {
    renderWithRouter(<App />);

    fireEvent.change(screen.getByRole('textbox', { name: '' }), {
      target: {
        value:
          'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2272&q=80'
      }
    });

    fireEvent.click(screen.getByRole('button', { name: 'Detect' }));

    await waitFor(() => {
      expect(screen.getByText('Face Recognition failed.')).toBeInTheDocument();
    });
  });

  test('should calculate face locations', async () => {
    renderWithRouter(<App />);

    await waitFor(() => {
      expect(screen.getByText('Test_User')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByRole('textbox', { name: '' }), {
      target: {
        value:
          'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2272&q=80'
      }
    });

    fireEvent.click(screen.getByRole('button', { name: 'Detect' }));

    await waitFor(() => {
      expect(screen.getByTestId('face-box')).toBeInTheDocument();
      expect(screen.getByText('Face Recognition successed!')).toBeInTheDocument();
    });
  });
});
