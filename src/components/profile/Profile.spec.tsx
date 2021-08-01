import { fireEvent, screen } from '@testing-library/react';
import App from '../../App';
import { store } from '../../app/store';
import { renderWithRouter } from '../../utils/test-utils';
import { signToken } from '../user/userSlice';

describe('Profile component', () => {
  test('should open and close profile model', async () => {
    store.dispatch(signToken('JWT_TOKEN'));
    renderWithRouter(<App />);
    fireEvent.click(screen.getByRole('img', { name: 'avatar' }));
    expect(screen.queryByText('Member since:')).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(screen.queryByText('Member since:')).toBeNull();
  });
});
