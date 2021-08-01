import React, { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { signToken } from '../user/userSlice';
import { useHistory } from 'react-router-dom';
import logo from '../../assets/svg/logo.svg';
import illustration from '../../assets/svg/illustration.svg';
import { notify } from '../notification/notificationSlice';
import { usePrefetch, useSigninUserMutation } from '../../app/services/userApi';
import LoadingButton from '../common/LoadingButton';

const Signin = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [singinUser, { isLoading }] = useSigninUserMutation();
  const prefetchUser = usePrefetch('getUser');

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignInEmail(event.target.value);
  };

  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignInPassword(event.target.value);
  };

  const onSubmitSignIn = async () => {
    // Unwrap will get the result of the mutation immediately
    const authToken = await singinUser({
      email: signInEmail,
      password: signInPassword
    }).unwrap();

    // Prefetching User info
    dispatch(signToken(authToken.token));
    prefetchUser(void 0, { force: true });
    dispatch(
      notify({
        message: `Welcome back!`,
        type: 'SUCCESS'
      })
    );
    history.push('/');
  };

  return (
    <div className="lg:flex">
      <div className="h-screen bg-dark-secondary lg:w-1/2 xl:max-w-screen-sm rounded-tr-2xl rounded-br-2xl overflow-hidden">
        <div className="py-12 bg-dark-secondary flex justify-center lg:justify-start lg:px-12">
          <div className="cursor-pointer flex items-center">
            <div className="text-3xl">
              <img src={logo} alt="logo" />
            </div>
            <div className="text-3xl text-purple-500 tracking-wide ml-2 font-semibold">Face AI</div>
          </div>
        </div>
        <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
          <h2
            className="text-center text-4xl text-purple-600 font-display font-semibold lg:text-left xl:text-5xl
                    xl:text-bold"
          >
            Sign in
          </h2>
          <div className="mt-12">
            <div>
              <div className="text-sm font-bold text-gray-600 tracking-wide">Email Address</div>
              <input
                className="bg-transparent w-full text-lg py-2 border-b border-gray-700 focus:outline-none focus:border-purple-500"
                type="text"
                placeholder="Enter your email address"
                name="email"
                onChange={onEmailChange}
                data-testid="email"
              />
            </div>
            <div className="mt-8">
              <div className="flex justify-between items-center">
                <div className="text-sm font-bold text-gray-600 tracking-wide">Password</div>
              </div>
              <input
                className="bg-transparent  w-full text-lg py-2 border-b border-gray-700 focus:outline-none focus:border-purple-500"
                type="password"
                placeholder="Enter your password"
                name="password"
                onChange={onPasswordChange}
                data-testid="password"
              />
            </div>
            <div className="mt-10">
              <LoadingButton
                text="Log In"
                loadingText="Logging in..."
                loading={isLoading}
                onClick={onSubmitSignIn}
              />
            </div>
            <div className="mt-12 text-sm font-display font-semibold text-gray-600 text-center">
              Don't have an account ?{' '}
              <button
                className="cursor-pointer text-purple-600 hover:text-purple-800"
                onClick={() => history.push('/register')}
              >
                Sign up
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
