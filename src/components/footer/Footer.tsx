const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="ontainer px-6 lg:px-30 xl:px-48 mx-auto py-6 mt-auto">
      <p className="text-gray-500">
        &copy; {year} | Powered by{' '}
        <a
          className="border-b-2 border-purple-500 text-purple-500 hover:opacity-60"
          href="https://reactjs.org/"
        >
          React
        </a>{' '}
        | Crafted with ♥︎ by{' '}
        <a
          className="border-b-2 border-purple-500 text-purple-500 hover:opacity-60"
          href="https://github.com/bennyxguo"
        >
          Benny Guo
        </a>{' '}
      </p>
    </footer>
  );
};

export default Footer;
