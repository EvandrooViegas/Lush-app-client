import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Dashboard from './components/Dashboard'
import Home from './components/Home'
import NavBar from './components/NavBar'
import Todo from './components/pages/Todo'
import Calendar from './components/pages/Calendar'
import Keep from './components/pages/Keep'
import Main from './components/pages/Main'

import './styles/App.css'
function App() {
  

  return (
    <Router>

        <Routes>
          <Route path='/' exact element={<Home />}/>
          <Route path='/signup' exact element={<Signup />}/>
          <Route path='/login' exact element={<Login />}/>

          <Route path='/:id/dashboard' exact element={<Dashboard />}>
            <Route path='calendar' exact element={<Calendar />} />
            <Route path='todo' exact element={<Todo />} />
            <Route path='main' exact element={<Main />} />
            <Route path='keep' exact element={<Keep />} />
          </Route>
     
         
   
        </Routes>

    
    </Router>

  );
}

export default App;
