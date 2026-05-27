const translations = {
	en: {
		title: 'Login Form',
		subtitle: 'Admin and Barista access',
		username: 'Username',
		password: 'Password',
		usernamePlaceholder: 'username',
		passwordPlaceholder: 'password',
		login: 'SIGN IN',
		roleHintAdmin: 'Login for Admin access',
		roleHintBarista: 'Login for Barista access',
		roleHintDefault: 'Use your assigned account to continue',
		invalidCredentials: 'Incorrect username or password'
	}
};

const el = {
	title: document.getElementById('login-title'),
	subtitle: document.getElementById('login-subtitle'),
	roleHint: document.getElementById('role-hint'),
	form: document.getElementById('login-form'),
	usernameLabel: document.getElementById('username-label'),
	passwordLabel: document.getElementById('password-label'),
	username: document.getElementById('username'),
	password: document.getElementById('password'),
	loginButton: document.getElementById('login-button'),
	message: document.getElementById('login-message')
};

function t(key){
	return translations.en?.[key] ?? key;
}

function setMessage(text){
	if(!el.message) return;
	el.message.hidden = !text;
	el.message.textContent = text || '';
}

function applyLanguage(){
	document.documentElement.lang = 'en';
	document.title = t('title');
	if(el.title) el.title.textContent = t('title');
	if(el.subtitle) el.subtitle.textContent = t('subtitle');
	if(el.usernameLabel) el.usernameLabel.textContent = t('username');
	if(el.passwordLabel) el.passwordLabel.textContent = t('password');
	if(el.username) el.username.placeholder = t('usernamePlaceholder');
	if(el.password) el.password.placeholder = t('passwordPlaceholder');
	if(el.loginButton) el.loginButton.textContent = t('login');
}

function renderRoleHint(){
	if(!el.roleHint) return;
	const requestedRole = window.AppAuth.getRequestedRole();
	if(requestedRole === 'admin'){
		el.roleHint.textContent = t('roleHintAdmin');
		return;
	}
	if(requestedRole === 'barista'){
		el.roleHint.textContent = t('roleHintBarista');
		return;
	}
	el.roleHint.textContent = t('roleHintDefault');
}

function redirectIfAuthenticated(){
	const session = window.AppAuth.getSession();
	if(!session){
		return false;
	}

	const requestedRole = window.AppAuth.getRequestedRole();
	if(requestedRole && requestedRole !== session.role){
		return false;
	}

	window.location.replace(window.AppAuth.getRouteForRole(session.role));
	return true;
}

if(el.form){
	el.form.addEventListener('submit', (event) => {
		event.preventDefault();
		setMessage('');

		const result = window.AppAuth.login(el.username?.value, el.password?.value || '');
		if(!result.ok){
			setMessage(t('invalidCredentials'));
			if(el.password) el.password.value = '';
			return;
		}

		window.location.replace(result.redirect);
	});
}
if(!redirectIfAuthenticated()){
	applyLanguage();
	renderRoleHint();
}
