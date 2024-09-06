import './App.css';
import Header from './header';
import ProductEntry from './productentry';
import { Route, Routes } from "react-router-dom";
import Layout from './layout';
import HomePage from './pages/homepage';
import LoginPage from './pages/loginpage';
import RegisterPage from './pages/registerpage';
import CreatePage from './pages/createpage';
import ProductPage from './pages/productpage';
import ReviewPage from './pages/addreview';
import {UserContextProvider} from './UserContext';

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path = "/" element = {<Layout/>}> 
          <Route index element = {<HomePage/>}/>
          <Route path = '/login' element = {<LoginPage/>}/>
          <Route path = '/register' element = {<RegisterPage/>}/>
          <Route path = '/create' element = {<CreatePage/>}/>
          <Route path = '/post/:id' element = {<ProductPage/>}></Route>
          <Route path = '/addreview/:id' element = {<ReviewPage/>}></Route>
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
