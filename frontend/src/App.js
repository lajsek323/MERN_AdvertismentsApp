import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Dashboard from './app/pages/Dashboard';
import Login from './app/pages/Login';
import Register from  './app/pages/Register'
import Header from './components/Header'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import AdDetails from './components/AdDetails';
import EditForm from './components/EditForm';


function App() {
  return (
    <>
    <Router>
   <div className='container'>
     <Header />
     
     <Routes>
       <Route path='/' element={<Dashboard/>} />
       <Route path='/login' element={<Login/>} />
       <Route path='/register' element={<Register/>} /> 
       <Route
              
              path="/ads/:id"
              element={<AdDetails/>}
            />

<Route
              
              path="/editAd/:id"
              element={<EditForm/>}
            />
             
      </Routes>
    
    </div>
    </Router>
    <ToastContainer />

    </>
  );
}

export default App;
