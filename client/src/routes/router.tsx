import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { observer } from 'mobx-react'
import LandingPage from '@/pages/Landing/Landing'
import Login from '@/pages/Login/Login'
import Register from '@/pages/Register/Register'
import Home from '@/pages/Home/Home'
import { PageUrl } from '@/data/pages.constants'
import PrivateUserRoutes from './privateRoutes/UserRoutes'
import SavedDiagram from '@/pages/SavedDiagram/SavedDiagram'
import Documentation from '@/pages/Documentation/Documentation'

const router = observer(() => {
    return (
        <Router>
            <Routes>
                <Route element={<PrivateUserRoutes />}>
                    <Route path={PageUrl.HOME} element={<Home />} />
                    <Route
                        path={PageUrl.SAVED_DIAGRAM}
                        element={<SavedDiagram />}
                    />
                </Route>
                <Route path={PageUrl.ROOT} element={<LandingPage />} />
                <Route path={PageUrl.LOGIN} element={<Login />} />
                <Route path={PageUrl.REGISTER} element={<Register />} />
                <Route path={PageUrl.DOCUMENTATION} element={<Documentation />} />
            </Routes>
        </Router>
    )
})

export default router
