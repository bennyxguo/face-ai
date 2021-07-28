import Card from '../common/Card';
import infoSVG from '../../assets/svg/info.svg';
import React from 'react';
import LoadingButton from '../common/LoadingButton';

export type onInputChangeFunc = (event: React.ChangeEvent<HTMLInputElement>) => void;

export type onSubmitFunc = () => void;

interface ImageFormProps {
  onInputChange: onInputChangeFunc;
  onSubmit: onSubmitFunc;
  loading: boolean;
}

const ImageForm = ({ onInputChange, onSubmit, loading }: ImageFormProps) => {
  return (
    <Card>
      <div className="flex flex-col w-full">
        <h2 className="flex text-purple-300">
          <img src={infoSVG} alt="info-icon" />
          <span>
            <strong className="text-purple-500">Face AI</strong> will detect faces in your picture.
            Give it a try.
          </span>
        </h2>
        <div className="mt-6">
          <div className="text-sm font-bold text-gray-600 tracking-wide">Image URL</div>
          <input
            className="bg-transparent w-full text-lg py-2 border-b border-gray-700 focus:outline-none focus:border-purple-500"
            type="text"
            placeholder="Enter the image url"
            name="link"
            onChange={onInputChange}
          />
        </div>
        <div className="mt-10">
          <LoadingButton
            text="Detect"
            loadingText="Detecting..."
            onClick={onSubmit}
            loading={loading}
          />
        </div>
      </div>
    </Card>
  );
};

export default ImageForm;
