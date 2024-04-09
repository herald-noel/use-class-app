import { BrowserRouter as Router, Routes } from 'react-router-dom';
import MainRoute from './MainRoute';
import HomeRoute from './HomeRoute';
import LandingPageRoute from './LandingPageRoute';

const router = () => {
  return (
    <Router>
      <Routes>
        {MainRoute}
        {HomeRoute}
        {LandingPageRoute}
      </Routes>
    </Router>
  );
};

export default router;
