import { useAppDispatch } from '../../app/hooks';
import HeaderLogo from './HeaderLogo';
import { toggleDisplay } from '../profile/profileSlice';
import { useGetUserQuery } from '../../app/services/userApi';

interface HeaderProps {
  onLogout: () => void;
}

const Header = ({ onLogout }: HeaderProps) => {
  const dipatch = useAppDispatch();
  const { data: user } = useGetUserQuery();

  const onProfileClick = () => {
    dipatch(toggleDisplay());
  };

  return (
    <header className="container px-6 lg:px-30 xl:px-48 mx-auto flex items-center mt-10">
      <HeaderLogo />
      <ul className="flex flex-row gap-6">
        <li
          className="cursor-pointer border-b-2 border-gray-700 hover:border-purple-500"
          onClick={onLogout}
        >
          Logout
        </li>
        <li className="cursor-pointer border-b-2 border-gray-700 hover:border-purple-500">
          <a href="https://github.com/TriDiamond/face-ai">Github</a>
        </li>
      </ul>
      <img
        className="cursor-pointer hidden md:flex rounded-full bg-dark-secondary overflow-hidden w-10 ml-4 border-2 border-gray-700 hover:border-purple-500"
        src={user?.avatar}
        alt="avatar"
        onClick={onProfileClick}
      />
    </header>
  );
};

export default Header;
