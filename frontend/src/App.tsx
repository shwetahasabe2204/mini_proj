import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RecoilRoot } from 'recoil';
import Login from './pages/Login';

function App() {
  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/login" element={<Login />}></Route>
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
    
  );
}


export default App