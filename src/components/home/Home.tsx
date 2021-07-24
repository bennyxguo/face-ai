import { useState } from 'react';
import { useHistory } from 'react-router';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectUser, setEntries } from '../../store/userSlice';
import Container from '../container/Container';
import FaceRecognition from '../faceRecognition/FaceRecognition';
import ImageForm from '../imageForm/ImageForm';
import { notify } from '../notification/notificationSlice';
import Rank from '../rank/Rank';
import { faceRecognition, updateEntry } from './HomeAPI';

const Home = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  if (user.name === '') history.push('/signin');

  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const boxInitialState = {
    topRow: 0,
    rightCol: 0,
    bottomRow: 0,
    leftCol: 0
  };
  const [box, setBox] = useState(boxInitialState);

  const calculateFaceLocation = (data: any) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    if (image && image instanceof HTMLElement) {
      const width = Number(image.offsetWidth);
      const height = Number(image.offsetHeight);

      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - clarifaiFace.right_col * width,
        bottomRow: height - clarifaiFace.bottom_row * height
      };
    }
    return boxInitialState;
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(event.target.value);
  };

  const onSubmit = async () => {
    if (imageUrl === '' || loading === true) return;
    setLoading(true);

    const faceData = await faceRecognition(imageUrl);
    if (faceData) {
      setBox(calculateFaceLocation(faceData));
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
          <FaceRecognition imageUrl={imageUrl} box={box} />
        </section>
        <section>
          <ImageForm
            onInputChange={onInputChange}
            onSubmit={onSubmit}
            loading={loading}
          />
        </section>
      </article>
    </Container>
  );
};

export default Home;
