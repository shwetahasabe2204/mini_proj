import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RecoilRoot } from 'recoil';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout';
import PropertyDetails from './components/PropertyDetails';

function App() {
  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path='dashboard'element={
              <Layout>
                <Dashboard />
              </Layout>
            } />
            <Route
              path="/property/:id" 
                  element={
                            <Layout>
                              <PropertyDetails />
                            </Layout>
                          }
                  >
            </Route>   
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
    
  );
}


export default App