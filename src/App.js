import logo from './logo.svg';
import './App.css';
import { Login } from './components/Login';
import { UserProvider } from './context/UserContext';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Home } from './components/Home';
import { AddItem } from './components/AddItem';
import { ViewItem } from './components/ViewItem';
import { Navbar } from './components/Navbar';


function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
        <Route path="/home" element={<><Navbar/><Home /></>} />
          <Route path="/" element={<Login />} />
          <Route path="/additem" element={<AddItem />} />
          <Route path="/viewitem/:id/:recipename" element={<><Navbar/><ViewItem /></>} />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
