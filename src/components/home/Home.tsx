import { useState } from 'react';
import { useHistory } from 'react-router';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectUser, setEntries } from '../../store/userSlice';
import { notify } from '../notification/notificationSlice';
import { faceRecognition, updateEntry } from './HomeAPI';
import Container from '../container/Container';
import FaceRecognition, { BoxType } from '../faceRecognition/FaceRecognition';
import ImageForm from '../imageForm/ImageForm';
import Rank from '../rank/Rank';

interface ClarifaiRegion {
  region_info: {
    bounding_box: {
      left_col: number;
      top_row: number;
      right_col: number;
      bottom_row: number;
    };
  };
}

const Home = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  if (user.name === '') history.push('/signin');

  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const boxInitialState: Array<BoxType> = [];

  const [boxes, setBoxes] = useState(boxInitialState);

  // Supports multiple face detection
  const calculateFaceLocations = (data: any) => {
    const image = document.getElementById('inputimage');

    if (image && image instanceof HTMLElement) {
      const width = Number(image.offsetWidth);
      const height = Number(image.offsetHeight);

      return data.outputs[0].data.regions.map((region: ClarifaiRegion) => {
        const { left_col, top_row, right_col, bottom_row } = region.region_info.bounding_box;

        return {
          leftCol: left_col * width,
          topRow: top_row * height,
          rightCol: width - right_col * width,
          bottomRow: height - bottom_row * height
        };
      });
    }
    return [];
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(event.target.value);
  };

  const onSubmit = async () => {
    if (imageUrl === '' || loading === true) return;
    setLoading(true);

    const faceData = await faceRecognition(imageUrl);
    if (faceData) {
      setBoxes(calculateFaceLocations(faceData));
      const entryCount = await updateEntry(user.id);
      dispatch(setEntries(Number(entryCount)));
      dispatch(
        notify({
          message: 'Face Recognition successed!',
          type: 'SUCCESS'
        })
      );
    } else {
      dispatch(
        notify({
          message: 'Face Recognition failed.',
          type: 'ERROR'
        })
      );
    }
    setLoading(false);
  };

  return (
    <Container>
      <h1 className="mt-8 mb-6 text-purple-500 text-4xl">
        Welcome back, <strong>{user.name}</strong>!
      </h1>
      <article className="grid grid-flow-row md:grid-flow-col md:grid-cols-2 gap-6">
        <section>
          <Rank entries={user.entries} />
          <FaceRecognition imageUrl={imageUrl} boxes={boxes} />
        </section>
        <section>
          <ImageForm onInputChange={onInputChange} onSubmit={onSubmit} loading={loading} />
        </section>
      </article>
    </Container>
  );
};

export default Home;
