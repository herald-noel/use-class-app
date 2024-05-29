import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainRoute from "./MainRoute";
import HomeRoute from "./HomeRoute";
import LandingPageRoute from "./LandingPageRoute";
import PrivateUserRoutes from "./privateRoutes/PrivateUserRoutes";

const router = () => {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateUserRoutes />}>
          {MainRoute}
          {HomeRoute}
        </Route>
        {LandingPageRoute}
        {ChatRoute}
      </Routes>
    </Router>
  );
};

export default router;
