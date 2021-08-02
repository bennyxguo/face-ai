import { fireEvent, screen } from '@testing-library/react';
import App from '../../App';
import { store } from '../../app/store';
import { renderWithRouter } from '../../utils/test-utils';
import { revokeToken, signToken } from '../user/userSlice';

beforeEach(() => {
  store.dispatch(signToken('JWT_TOKEN'));
});

afterEach(() => {
  store.dispatch(revokeToken());
});

describe('Container component', () => {
  test('should logout', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByTestId('logout-btn'));
    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });
});
