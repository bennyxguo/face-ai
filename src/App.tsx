import { Redirect, Route, Switch } from 'react-router-dom';
import appRoutes, { RouteConfig } from './routes';
import Particles from 'react-particles-js';
import Notification from './components/notification/Notification';
import { useAppSelector } from './app/hooks';
import { selectToken } from './components/user/userSlice';

// Sub-routes
const RouteWithSubRoutes = (route: RouteConfig) => {
  return (
    <Route
      path={route.path}
      render={(props) => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes || []} />
      )}
    />
  );
};

const ProtectedSubRoutes = (route: RouteConfig) => {
  const authToken = useAppSelector(selectToken);
  return (
    <Route
      path={route.path}
      render={(props) =>
        authToken ? (
          // pass the sub-routes down to keep nesting
          <route.component {...props} routes={route.routes || []} />
        ) : (
          <Redirect to={{ pathname: '/signin' }} />
        )
      }
    />
  );
};

function App() {
  const particlesOptions = {
    //customize this to your liking
    particles: {
      number: {
        value: 30,
        density: {
          enable: true,
          value_area: 800
        }
      }
    }
  };

  return (
    <>
      <Notification />
      <Particles className="particles" params={particlesOptions} />
      <Switch>
        {appRoutes.map((route, i) => {
          if (!route.isAuth) {
            return <RouteWithSubRoutes key={i} {...route} />;
          } else {
            return <ProtectedSubRoutes key={i} {...route} />;
          }
        })}
      </Switch>
    </>
  );
}

export default App;
