import classNames from 'classnames';
import loadingSVG from '../../assets/svg/loading.svg';

interface LoadingButtonProps {
  text: string;
  loadingText?: string;
  loading: boolean;
  onClick: () => void;
}

const LoadingButton = ({ text, loadingText, loading, onClick }: LoadingButtonProps) => {
  const ltext = loadingText ? loadingText : 'Loading...';

  const buttonClass = classNames(
    'bg-purple-500 text-gray-100 p-4 w-full rounded-2xl tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-purple-600 shadow-lg flex justify-center items-center',
    {
      'opacity-50': loading,
      'cursor-not-allowed': loading
    }
  );

  return (
    <button className={buttonClass} onClick={onClick} data-testid="submit">
      {loading === true && (
        <img className="animate-spin mr-2" src={loadingSVG} alt="loading" width="16" />
      )}

      {loading === true ? ltext : text}
    </button>
  );
};

export default LoadingButton;
