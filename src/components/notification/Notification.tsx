import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectNotification, hideNotification } from './notificationSlice';
import successSVG from '../../assets/svg/success.svg';
import errorSVG from '../../assets/svg/error.svg';
import infoSVG from '../../assets/svg/info.svg';
import { useEffect, useRef } from 'react';

const Notification = () => {
  const notification = useAppSelector(selectNotification);
  const dispatch = useAppDispatch();

  const preDisplayRef = useRef(false);
  const timer = useRef(0);
  useEffect(() => {
    if (preDisplayRef.current === true) {
      window.clearTimeout(timer.current);
      dispatch(hideNotification());
    }

    timer.current = window.setTimeout(() => {
      dispatch(hideNotification());
    }, 4500);

    preDisplayRef.current = notification.display;
  }, [notification.display, dispatch]);

  let wrapperClass = classNames('flex fixed transition-transform w-full', {
    '-translate-y-full': !notification.display,
    'translate-y-3': notification.display
  });

  let notificationClass = classNames('flex w-2/4 lg:w-1/3 mx-auto my-0 py-1 px-5 rounded-full', {
    'bg-purple-900': notification.type === 'SUCCESS' || notification.type === 'INFO',
    'bg-red-900': notification.type === 'ERROR'
  });

  const notificationIcon = (): string => {
    if (notification.type === 'SUCCESS') return successSVG;
    if (notification.type === 'ERROR') return errorSVG;
    return infoSVG;
  };

  return (
    <div className={wrapperClass} data-testid="notification">
      <div className={notificationClass}>
        <img src={notificationIcon()} alt="icon" />{' '}
        <span className="pl-2">{notification.message}</span>
      </div>
    </div>
  );
};

export default Notification;
