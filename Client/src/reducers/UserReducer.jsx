const UserReducer = (
	state = {
		isLoggedIn: false,
		username: '',
		email: '',
	},
	action
) => {
	switch (action.type) {
		case 'LOGIN':
			return {
				isLoggedIn: true,
				username: action.username,
				email: action.email,
			};
		case 'LOGOUT':
			return {
				isLoggedIn: false,
				username: '',
				email: '',
			};
		default:
			return state;
	}
};

export default UserReducer;
