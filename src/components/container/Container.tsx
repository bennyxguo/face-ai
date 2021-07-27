import { useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUserId, setLogout } from '../user/userSlice';
import { selectProfileDisplay, toggleDisplay } from '../profile/profileSlice';
import { notify } from '../notification/notificationSlice';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import Profile from '../profile/Profile';
import { useGetUserQuery } from '../../app/services/userApi';

const Container = (props: { children: JSX.Element | Array<JSX.Element> }) => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(selectUserId);
  const history = useHistory();
  const displayProfile = useAppSelector(selectProfileDisplay);
  const { data: user } = useGetUserQuery(userId);

  const onLogout = () => {
    dispatch(
      notify({
        message: `👋 Goodbye ${user?.name}!`,
        type: 'INFO'
      })
    );
    dispatch(setLogout());
    history.push('/signin');
  };

  const toggleProfileDisplay = () => {
    dispatch(toggleDisplay());
  };

  return (
    <article className="flex flex-col w-full min-h-screen">
      <Header onLogout={onLogout} />
      <main className="container mx-auto px-6 lg:px-30 xl:px-48 py-10 flex-grow">
        {props.children}
      </main>
      <Footer />
      {displayProfile && <Profile toggleDisplay={toggleProfileDisplay} />}
    </article>
  );
};

export default Container;
