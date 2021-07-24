import Home from '../components/home/Home';
import Signin from '../components/signin/Signin';
import Register from '../components/register/Register';

export type RouteConfig = {
  path: string;
  component: (props: any) => JSX.Element;
  exact?: boolean;
  routes?: Array<RouteConfig>;
};

const routes: Array<RouteConfig> = [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/signin',
    component: Signin
  },
  {
    path: '/register',
    component: Register
  }
];

export default routes;
