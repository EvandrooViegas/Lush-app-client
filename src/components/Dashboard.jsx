import {Outlet} from 'react-router-dom'

import NavBar from './NavBar'
function Dashboard() {
  
 
  return ( 
      <>
        <NavBar />

        <Outlet />
      </>
      
  );
}

export default Dashboard;
