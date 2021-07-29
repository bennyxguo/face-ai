import Home from './components/home-page/Home';
import Signin from './components/user-page/Signin';
import Register from './components/user-page/Register';

export type RouteConfig = {
  path: string;
  component: (props: any) => JSX.Element;
  exact?: boolean;
  routes?: Array<RouteConfig>;
  isAuth?: boolean;
};

const routes: Array<RouteConfig> = [
  {
    path: '/signin',
    component: Signin
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/',
    exact: true,
    isAuth: true,
    component: Home
  }
];

export default routes;
