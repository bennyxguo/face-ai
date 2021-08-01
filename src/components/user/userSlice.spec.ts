import { mockLocalStorage } from '../../utils/test-utils';
import { getStoredState } from './userSlice';

const { getItemMock } = mockLocalStorage();

describe('User slice', () => {
  test('should fetch stored token', () => {
    getItemMock.mockReturnValue('Bearer JWT_TOKEN');
    const userState = getStoredState();
    expect(userState).toMatchObject({ token: 'Bearer JWT_TOKEN' });
  });
});
