import { Route } from 'react-router-dom';
import Main from '../pages/Main/Main';

const MainRoute = <Route path={'/main'} element={<Main />} exact />;

export default MainRoute;
