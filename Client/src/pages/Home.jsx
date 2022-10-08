import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Home = () => {
	const navigate = useNavigate();
	const user = useSelector((state) => state.user);

	useEffect(() => {
		if (!user.isLoggedIn) {
			navigate('/');
			return;
		}
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		logOutUser();
	};

	const logOutUser = () => {
		navigate('/');
	};

	return (
		<>
			<h1>{user.username} is logged in</h1>
			<button
				className="group relative w-auto flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10"
				onClick={handleSubmit}
			>
				LogOut
			</button>
		</>
	);
};
export default Home;
