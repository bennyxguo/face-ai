import Card from '../card/Card';
import infoSVG from '../../assets/svg/info.svg';
import React from 'react';
import loadingSVG from '../../assets/svg/loading.svg';
import classNames from 'classnames';

export type onInputChangeFunc = (
  event: React.ChangeEvent<HTMLInputElement>
) => void;

export type onSubmitFunc = () => void;

interface ImageFormProps {
  onInputChange: onInputChangeFunc;
  onSubmit: onSubmitFunc;
  loading: boolean;
}

const ImageForm = ({ onInputChange, onSubmit, loading }: ImageFormProps) => {
  const buttonClass = classNames(
    'bg-purple-500 text-gray-100 p-4 w-full rounded-2xl tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-purple-600 shadow-lg flex justify-center items-center',
    {
      'opacity-50': loading,
      'cursor-not-allowed': loading
    }
  );

  return (
    <Card>
      <div className="flex flex-col w-full">
        <h2 className="flex text-purple-300">
          <img src={infoSVG} alt="info-icon" />
          <span>
            <strong className="text-purple-500">Face AI</strong> will detect
            faces in your picture. Give it a try.
          </span>
        </h2>
        <div className="mt-6">
          <div className="text-sm font-bold text-gray-600 tracking-wide">
            Image URL
          </div>
          <input
            className="bg-transparent w-full text-lg py-2 border-b border-gray-700 focus:outline-none focus:border-purple-500"
            type="text"
            placeholder="Enter the image url"
            name="link"
            onChange={onInputChange}
          />
        </div>
        <div className="mt-10">
          <button className={buttonClass} onClick={onSubmit}>
            {loading === true && (
              <img
                className="animate-spin mr-2"
                src={loadingSVG}
                alt="loading"
                width="16"
              />
            )}

            {loading === true ? 'Detecting...' : 'Detect'}
          </button>
        </div>
      </div>
    </Card>
  );
};

export default ImageForm;
