import { useState } from 'react';
import { useHistory } from 'react-router';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectUserId, selectLogin } from '../user/userSlice';
import { notify } from '../notification/notificationSlice';
import Container from '../container/Container';
import FaceRecognition, { BoxType } from '../faceRecognition/FaceRecognition';
import ImageForm from '../imageForm/ImageForm';
import Rank from '../common/Rank';
import { useFaceRecognitionMutation, useUpdateEntryMutation } from '../../app/services/imageApi';
import { useGetUserQuery } from '../../app/services/userApi';

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
  const userId = useAppSelector(selectUserId);
  const isLogin = useAppSelector(selectLogin);
  const { data: user } = useGetUserQuery(userId);
  if (!isLogin) history.push('/signin');

  const [imageUrl, setImageUrl] = useState('');

  const boxInitialState: Array<BoxType> = [];
  const [boxes, setBoxes] = useState(boxInitialState);

  const [faceRecognition, { isLoading }] = useFaceRecognitionMutation();
  const [updateEntry] = useUpdateEntryMutation();

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
    if (imageUrl === '' || isLoading === true) return;

    const faceData = await faceRecognition({ imageUrl }).unwrap();
    if (user && faceData) {
      setBoxes(calculateFaceLocations(faceData));
      await updateEntry({ id: user.id, current: user.entries }).unwrap();
      dispatch(
        notify({
          message: 'Face Recognition successed!',
          type: 'SUCCESS'
        })
      );
      // dispatch(userEndpoints.getUser.initiate(user.id, { subscribe: false, forceRefetch: true }));
    } else {
      dispatch(
        notify({
          message: 'Face Recognition failed.',
          type: 'ERROR'
        })
      );
    }
  };

  return (
    <Container>
      <h1 className="mt-8 mb-6 text-purple-500 text-4xl">
        Welcome back, <strong>{user?.name}</strong>!
      </h1>
      <article className="grid grid-flow-row md:grid-flow-col md:grid-cols-2 gap-6">
        <section>
          <Rank entries={user ? user.entries : 0} />
          <FaceRecognition imageUrl={imageUrl} boxes={boxes} />
        </section>
        <section>
          <ImageForm onInputChange={onInputChange} onSubmit={onSubmit} loading={isLoading} />
        </section>
      </article>
    </Container>
  );
};

export default Home;
