const translations = {
	th: {
		title: 'เข้าสู่ระบบ',
		subtitle: 'สำหรับหน้าแอดมินและหน้าบาริสต้า',
		username: 'ชื่อผู้ใช้',
		password: 'รหัสผ่าน',
		login: 'เข้าสู่ระบบ',
		logout: 'ออกจากระบบ',
		roleHintAdmin: 'กรุณาเข้าสู่ระบบสำหรับหน้า Admin',
		roleHintBarista: 'กรุณาเข้าสู่ระบบสำหรับหน้า Barista',
		roleHintDefault: 'ใช้บัญชีที่ได้รับเพื่อเข้าใช้งานตามหน้าที่',
		currentSession: 'ตอนนี้กำลังเข้าสู่ระบบเป็น {role} ({username})',
		invalidCredentials: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง'
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
	message: document.getElementById('login-message'),
	sessionBox: document.getElementById('session-box'),
	sessionText: document.getElementById('session-text'),
	logoutButton: document.getElementById('logout-button')
};

function t(key){
	return translations.th?.[key] ?? key;
}

function setMessage(text){
	if(!el.message) return;
	el.message.hidden = !text;
	el.message.textContent = text || '';
}

function applyLanguage(){
	document.documentElement.lang = 'th';
	document.title = t('title');
	if(el.title) el.title.textContent = t('title');
	if(el.subtitle) el.subtitle.textContent = t('subtitle');
	if(el.usernameLabel) el.usernameLabel.textContent = t('username');
	if(el.passwordLabel) el.passwordLabel.textContent = t('password');
	if(el.loginButton) el.loginButton.textContent = t('login');
	if(el.logoutButton) el.logoutButton.textContent = t('logout');
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

function renderSessionState(){
	const session = window.AppAuth.getSession();
	if(!el.sessionBox || !el.sessionText) return;
	if(!session){
		el.sessionBox.hidden = true;
		return;
	}

	el.sessionBox.hidden = false;
	el.sessionText.textContent = t('currentSession')
		.replace('{role}', session.label || session.role)
		.replace('{username}', session.username);
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

if(el.logoutButton){
	el.logoutButton.addEventListener('click', () => {
		window.AppAuth.logout();
	});
}

applyLanguage();
renderRoleHint();
renderSessionState();
