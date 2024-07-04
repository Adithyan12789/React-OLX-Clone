import React, {useEffect, useContext} from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Create from './Pages/Create';
import View from './Pages/ViewPost';
import { AuthContext, FirebaseContext } from './store/Contexts';
import Post from './store/PostContext';

/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';

function App() {

  const {setUser} = useContext(AuthContext);
  const {firebase} = useContext(FirebaseContext);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    })
  })

  return (
    <div>
      <Post>
      <BrowserRouter>
          <Routes>

          <Route exact path='/' element={<Home />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/create' element={<Create />}></Route>
          <Route path='/viewpost' element={<View />}></Route>

          </Routes>
      </BrowserRouter>
      </Post>
    </div>
  );
}

export default App;
