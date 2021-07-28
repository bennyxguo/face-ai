import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
  useGetUserQuery,
  useLazyGetUserQuery,
  useStoreUserMutation
} from '../../app/services/userApi';
import { selectUserId } from '../user/userSlice';
import usePortal from '../../hooks/usePortal';
import './Profile.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { notify } from '../notification/notificationSlice';
import LoadingButton from '../common/LoadingButton';

type CallbackFunc = () => void;
type InputMap = {
  [key: string]: any;
};

const Profile = ({ toggleDisplay }: { toggleDisplay: CallbackFunc }) => {
  const userId = useAppSelector(selectUserId);
  const { data: user } = useGetUserQuery(userId);
  const dispatch = useAppDispatch();
  const target = usePortal('profile-root');
  const [formInput, setFormInput] = useState<InputMap>({
    name: '',
    age: '',
    hobby: ''
  });
  const [storeUser, { isLoading }] = useStoreUserMutation();
  const [getUser] = useLazyGetUserQuery();

  const onChangeInput = (input: string, event: React.ChangeEvent<HTMLInputElement>) => {
    if (event) {
      setFormInput({
        ...formInput,
        [input]: event.target.value
      });
    }
  };

  const onSubmit = async () => {
    if (!user?.id) return;
    let data: InputMap = {};
    for (let key in formInput) {
      if (formInput[key] !== '') {
        data[key] = formInput[key];
      }
    }
    await storeUser({
      id: user.id,
      ...data
    });

    dispatch(
      notify({
        type: 'SUCCESS',
        message: 'Your information is updated.'
      })
    );

    getUser(user.id);
  };

  const ProfileElem = (
    <div className="profile-container">
      <div className="flex items-center pb-4">
        <img
          className="w-14 h-14 rounded-full border-2 border-purple-500 mr-4 shadow-xl"
          src={user?.avatar}
          alt="avatar"
        />
        <div className="">
          <h1 className="text-purple-500 text-4xl">
            {formInput.name !== '' ? formInput.name : user?.name}
          </h1>
          <h2 className="text-gray-400 text-xl">{user?.email}</h2>
        </div>
      </div>
      <ul className="pb-3 mb-3 border-b border-gray-700">
        <li>
          Member since:{' '}
          <span className="text-purple-500">
            {user ? new Date(user.createdAt).toDateString() : '--'}
          </span>
        </li>
        <li>
          Submitted entries: <span className="text-purple-500">{user?.entries}</span>
        </li>
      </ul>
      <div className="mb-4">
        <div className="text-sm font-bold text-gray-600 tracking-wide">Name</div>
        <input
          className="bg-transparent w-full text-lg py-2 border-b border-gray-700 focus:outline-none focus:border-purple-500"
          type="text"
          placeholder={user?.name}
          name="name"
          onChange={(e) => onChangeInput('name', e)}
        />
      </div>
      <div className="mb-4">
        <div className="text-sm font-bold text-gray-600 tracking-wide">Age</div>
        <input
          className="bg-transparent w-full text-lg py-2 border-b border-gray-700 focus:outline-none focus:border-purple-500"
          type="text"
          placeholder={user?.age || 'Enter your age'}
          name="age"
          onChange={(e) => onChangeInput('age', e)}
        />
      </div>
      <div className="mb-6">
        <div className="text-sm font-bold text-gray-600 tracking-wide">Hobby</div>
        <input
          className="bg-transparent w-full text-lg py-2 border-b border-gray-700 focus:outline-none focus:border-purple-500"
          type="text"
          placeholder={user?.hobby || 'Enter your hobby'}
          name="hobby"
          onChange={(e) => onChangeInput('hobby', e)}
        />
      </div>
      <div className="flex justify-evenly">
        <div className="mr-4 w-full">
          <LoadingButton
            text="Save"
            loadingText="Saving..."
            loading={isLoading}
            onClick={onSubmit}
          />
        </div>
        <button
          className="bg-gray-500 text-gray-100 p-2 w-1/3 rounded-2xl tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-gray-600 shadow-lg"
          onClick={toggleDisplay}
        >
          Close
        </button>
      </div>
    </div>
  );

  return ReactDOM.createPortal(ProfileElem, target);
};

export default Profile;
