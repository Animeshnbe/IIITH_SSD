import './App.css';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Feedback from './components/Feedback';
import Concerns from './components/Concerns';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<LoginForm />}/>
          <Route path="signup" element={<SignUpForm />}/>
          <Route path="login" element={<LoginForm />}/>
          <Route path="feedback" element={<Feedback />}/>
          <Route path="concerns" element={<Concerns />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
