import Home from './components/home-page/Home';
import Signin from './components/user-page/Signin';
import Register from './components/user-page/Register';

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
