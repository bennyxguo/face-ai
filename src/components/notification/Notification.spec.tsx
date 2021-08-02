import { screen } from '@testing-library/react';
import { store } from '../../app/store';
import { renderWithRouter } from '../../utils/test-utils';
import Notification from './Notification';
import { hideNotification, notify } from './notificationSlice';

describe('Notification Component', () => {
  test('should success notification', () => {
    store.dispatch(
      notify({
        message: 'Message on start',
        type: 'SUCCESS'
      })
    );
    renderWithRouter(<Notification />);

    expect(screen.getByText('Message on start')).toBeTruthy();
  });

  test('should fail notification', () => {
    store.dispatch(
      notify({
        message: 'Error message',
        type: 'ERROR'
      })
    );
    renderWithRouter(<Notification />);

    expect(screen.getByText('Error message')).toBeTruthy();
  });

  test('should info notification', () => {
    store.dispatch(
      notify({
        message: 'Info message',
        type: 'INFO'
      })
    );
    renderWithRouter(<Notification />);

    expect(screen.getByText('Info message')).toBeTruthy();
  });

  test('should hide notification', () => {
    store.dispatch(
      notify({
        message: 'Info message',
        type: 'INFO'
      })
    );
    renderWithRouter(<Notification />);
    store.dispatch(hideNotification());

    expect(screen.getByTestId('notification')).toHaveClass('-translate-y-full');
  });
});
