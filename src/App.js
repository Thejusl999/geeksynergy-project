import React,{useEffect,useState} from 'react';
import {Route,Switch,useHistory,Redirect} from 'react-router-dom';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';

function App() {
  const history=useHistory();
  const [loggedInStatus,setLoggedInStatus]=useState(false);
  useEffect(()=>{
    if(localStorage.getItem('LoginSuccess')==='true'){
      setLoggedInStatus(true);
      history.push('/home');
    }
  },[])

  return (
    <>
      <Switch>
        <Route path='/' exact>
          <AuthPage/>
        </Route>
        <Route path='/home'>
          {loggedInStatus?<HomePage/>:<Redirect to='/'/>}
        </Route>
        <Redirect to='/'/>
      </Switch>
    </>
  );
}

export default App;