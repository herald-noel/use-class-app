import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeRoute from "./HomeRoute";
import LandingPageRoute from "./LandingPageRoute";
import PrivateUserRoutes from "./privateRoutes/PrivateUserRoutes";

const router = () => {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateUserRoutes />}>
          {HomeRoute}
        </Route>
        {LandingPageRoute}
      </Routes>
    </Router>
  );
};

export default router;
