import { BrowserRouter as Router, Routes } from 'react-router-dom';
import MainRoute from './MainRoute';
import HomeRoute from './HomeRoute';

const router = () => {
  return (
    <Router>
      <Routes>
        {MainRoute}
        {HomeRoute}
      </Routes>
    </Router>
  );
};

export default router;
