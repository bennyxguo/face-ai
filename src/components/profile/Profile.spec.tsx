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

describe('Profile component', () => {
  test('should open and close profile model', async () => {
    renderWithRouter(<App />);

    fireEvent.click(screen.getByRole('img', { name: 'avatar' }));
    expect(screen.queryByText('Member since:')).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(screen.queryByText('Member since:')).toBeNull();
  });

  test('should able to change input values', () => {
    const tree = renderWithRouter(<App />);

    fireEvent.click(screen.getByRole('img', { name: 'avatar' }));

    const inputName = tree.getByLabelText('input-name') as HTMLInputElement;
    const inputAge = tree.getByLabelText('input-age') as HTMLInputElement;
    const inputHobby = tree.getByLabelText('input-hobby') as HTMLInputElement;

    fireEvent.change(inputName, { target: { value: 'testingUser' } });
    expect(inputName.value).toBe('testingUser');
    fireEvent.change(inputAge, { target: { value: 100 } });
    expect(inputAge.value).toBe('100');
    fireEvent.change(inputHobby, { target: { value: 'programming' } });
    expect(inputHobby.value).toBe('programming');
  });

  test('should submit user data', async () => {
    const tree = renderWithRouter(<App />);
    const inputAge = tree.getByLabelText('input-age') as HTMLInputElement;

    fireEvent.change(inputAge, { target: { value: 100 } });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(inputAge.placeholder).toBe('100');
    });
  });
});
