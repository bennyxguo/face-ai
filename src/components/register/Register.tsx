import React, { useState } from 'react';
import { fetchRegister } from './RegisterAPI';
import { useAppDispatch } from '../../app/hooks';
import { loadUser } from '../../store/userSlice';
import { useHistory } from 'react-router-dom';
import logo from '../../assets/svg/logo.svg';
import illustration from '../../assets/svg/illustration.svg';
import { notify } from '../notification/notificationSlice';

const Signin = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [name, setName] = useState('');

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignInEmail(event.target.value);
  };

  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignInPassword(event.target.value);
  };

  const onSubmitRegister = async () => {
    const user = await fetchRegister({
      name,
      email: signInEmail,
      password: signInPassword
    });
    if (user.id) {
      dispatch(loadUser(user));
      dispatch(
        notify({
          message: `${user.name}, thanks for registering!`,
          type: 'SUCCESS'
        })
      );
      history.push('/');
    }
  };

  return (
    <div className="lg:flex">
      <div className="min-h-screen bg-dark-secondary lg:w-1/2 xl:max-w-screen-sm rounded-tr-2xl rounded-br-2xl overflow-hidden">
        <div className="py-6 bg-dark-secondary flex justify-center lg:justify-start lg:px-12 lg:py-12">
          <div className="cursor-pointer flex items-center">
            <div className="text-3xl">
              <img src={logo} alt="logo" />
            </div>
            <div className="text-3xl text-purple-500 tracking-wide ml-2 font-semibold">
              Face AI
            </div>
          </div>
        </div>
        <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
          <h2
            className="text-center text-4xl text-purple-600 font-display font-semibold lg:text-left xl:text-5xl
                    xl:text-bold"
          >
            Register
          </h2>
          <div className="mt-12">
            <form>
              <div>
                <div className="text-sm font-bold text-gray-600 tracking-wide">
                  Name
                </div>
                <input
                  className="bg-transparent w-full text-lg py-2 border-b border-gray-700 focus:outline-none focus:border-purple-500"
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  onChange={onNameChange}
                />
              </div>
              <div className="mt-8">
                <div className="flex justify-between items-center">
                  <div className="text-sm font-bold text-gray-600 tracking-wide">
                    Email Address
                  </div>
                </div>
                <input
                  className="bg-dark-primary  w-full text-lg py-2 border-b border-gray-700 focus:outline-none focus:border-purple-500"
                  type="text"
                  placeholder="Enter your email address"
                  name="email"
                  onChange={onEmailChange}
                />
              </div>
              <div className="mt-8">
                <div className="flex justify-between items-center">
                  <div className="text-sm font-bold text-gray-600 tracking-wide">
                    Password
                  </div>
                </div>
                <input
                  className="bg-dark-primary w-full text-lg py-2 border-b border-gray-700 focus:outline-none focus:border-purple-500"
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  onChange={onPasswordChange}
                />
              </div>
              <div className="mt-10">
                <button
                  className="bg-purple-500 text-gray-100 p-4 w-full rounded-2xl tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-purple-600 shadow-lg"
                  onClick={onSubmitRegister}
                >
                  Register
                </button>
              </div>
            </form>
            <div className="mt-12 text-sm font-display font-semibold text-gray-600 text-center">
              Already have an account ?{' '}
              <button
                className="cursor-pointer text-purple-600 hover:text-purple-800"
                onClick={() => history.push('/signin')}
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex items-center justify-center bg-transparent flex-1 h-screen">
        <div className="max-w-xs transform duration-200 hover:scale-110 cursor-pointer">
          <img src={illustration} alt="illustration" />
        </div>
      </div>
    </div>
  );
};

export default Signin;
