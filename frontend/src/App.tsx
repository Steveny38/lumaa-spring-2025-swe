
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginView from './views/LoginView'
import RegisterView from './views/RegisterView'
import HomeView from './views/Home'
import TaskView from './views/TaskView';
import AuthProvider from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute';
import NavBar from './components/NavBar';
function App() {
  return (
    <Router>
    <AuthProvider>
      
      <NavBar></NavBar>
      <Routes>

        <Route element={<LoginView/>} path='/login' ></Route>
        <Route element={<RegisterView/>} path='/register' ></Route>

        <Route element={<ProtectedRoute />} >
          <Route element={<HomeView/>} path='/'></Route>
          <Route element={<TaskView/>} path='/task' ></Route>
        
        </Route>
        
        

      </Routes>
    </AuthProvider>
    </Router>
  );
}

export default App;
