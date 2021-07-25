import { useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUser, unloadUser } from '../../store/userSlice';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import { notify } from '../notification/notificationSlice';

const Container = (props: { children: JSX.Element | Array<JSX.Element> }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const history = useHistory();

  const onLogout = () => {
    dispatch(
      notify({
        message: `👋 Goodbye ${user.name}!`,
        type: 'INFO'
      })
    );
    dispatch(unloadUser());
    history.push('/signin');
  };

  return (
    <article className="flex flex-col w-full min-h-screen">
      <Header onLogout={onLogout} />
      <main className="container mx-auto px-6 lg:px-30 xl:px-48 py-10 flex-grow">
        {props.children}
      </main>
      <Footer />
    </article>
  );
};

export default Container;
