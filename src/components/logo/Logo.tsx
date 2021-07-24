import logo from '../../assets/svg/logo.svg';

const Logo = () => {
  return (
    <nav className="flex-grow">
      <div className="cursor-pointer flex items-center">
        <div className="text-3xl">
          <img src={logo} alt="logo" />
        </div>
        <div className="text-3xl text-purple-500 tracking-wide ml-2 font-semibold">
          Face AI
        </div>
      </div>
      <p>Detects faces with AI.</p>
    </nav>
  );
};

export default Logo;
