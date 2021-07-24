import { Provider } from 'react-redux';
import { store } from '../../app/store';
import { Route, Switch } from 'react-router-dom';
import appRoutes, { RouteConfig } from '../../routes';
import Particles from 'react-particles-js';
import Notification from '../notification/Notification';

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
    <Provider store={store}>
      <Notification />
      <Particles className="particles" params={particlesOptions} />
      <Switch>
        {appRoutes.map((route, i) => {
          return <RouteWithSubRoutes key={i} {...route} />;
        })}
      </Switch>
    </Provider>
  );
}

export default App;
