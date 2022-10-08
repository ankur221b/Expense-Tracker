import './style.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import Home from './pages/Home';
import { ToastContainer } from 'react-toastify';

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route exact path="/" element={<LoginPage />} />
					<Route exact path="/signup" element={<SignupPage />} />
					<Route exact path="/home" element={<Home />} />
				</Routes>
			</BrowserRouter>
			<ToastContainer />
		</>
	);
}

export default App;
