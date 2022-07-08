import {Link, Router, Route, Routes} from 'react-router-dom'
import Login from '../auth/Login'
import Login from '../auth/Signup'

function NavBar() {
    return (
        <Route>
            <Routes>
                <Route exact path="login" element={<Login />} />
                <Route exact path="signup" element={<Signup />} />
            </Routes>
            <Link to="signup">Signup page</Link>
        </Route>
    )
}

export default NavBar