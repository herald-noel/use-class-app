import { Route } from 'react-router-dom';
import Home from '../pages/Home/Home';

const HomeRoute = <Route path={'/home'} element={<Home />} exact />;

export default HomeRoute;
