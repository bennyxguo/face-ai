import Logo from '../logo/Logo';

interface HeaderProps {
  onLogout: () => void;
}

const Header = ({ onLogout }: HeaderProps) => {
  return (
    <header className="container px-6 md:px-48 mx-auto flex items-center mt-10">
      <Logo />
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
    </header>
  );
};

export default Header;
