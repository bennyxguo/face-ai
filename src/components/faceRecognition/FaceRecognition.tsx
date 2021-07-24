import Card from '../card/Card';
import styles from './FaceRecognition.module.css';
import infoSVG from '../../assets/svg/info.svg';

type BoxType = {
  topRow: string | number;
  rightCol: string | number;
  bottomRow: string | number;
  leftCol: string | number;
};

interface FaceRecognitionProps {
  imageUrl: string;
  box: BoxType;
}

const FaceRecognition = ({ imageUrl, box }: FaceRecognitionProps) => {
  return (
    <Card>
      <div className="w-full">
        <h2 className="flex justify-center text-purple-300">
          <img src={infoSVG} alt="info-icon" />
          <span>
            Fill in the <strong className="text-purple-500">image url</strong>,
            image will be displayed here.
          </span>
        </h2>
        <div className="flex justify-center relative">
          {imageUrl !== '' && (
            <img
              className="rounded-xl shadow-2xl mt-6"
              id="inputimage"
              alt="inputimage"
              src={imageUrl}
              width="500px"
              height="auto"
            />
          )}

          {box.topRow !== 0 && (
            <div
              className={styles['bounding-box']}
              style={{
                top: box.topRow,
                right: box.rightCol,
                bottom: box.bottomRow,
                left: box.leftCol
              }}
            ></div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default FaceRecognition;
