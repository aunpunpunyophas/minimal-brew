(function(){
	const STORAGE_KEY = 'appAuthSession';
	const ROLE_ROUTES = {
		admin: 'admin.html',
		barista: 'barista.html'
	};
	const USERS = {
		admin123: {
			password: 'admin123',
			role: 'admin',
			label: 'Admin'
		},
		barista123: {
			password: 'barista123',
			role: 'barista',
			label: 'Barista'
		}
	};

	function getSession(){
		try{
			const raw = localStorage.getItem(STORAGE_KEY);
			return raw ? JSON.parse(raw) : null;
		}catch(error){
			return null;
		}
	}

	function setSession(session){
		localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
	}

	function clearSession(){
		localStorage.removeItem(STORAGE_KEY);
	}

	function getRouteForRole(role){
		return ROLE_ROUTES[role] || 'login.html';
	}

	function getRequestedRole(){
		return new URLSearchParams(window.location.search).get('role');
	}

	function login(username, password){
		const normalizedUsername = String(username || '').trim();
		const user = USERS[normalizedUsername];
		if(!user || user.password !== password){
			return { ok: false, error: 'invalid-credentials' };
		}

		const session = {
			username: normalizedUsername,
			role: user.role,
			label: user.label,
			loggedInAt: Date.now()
		};
		setSession(session);
		return { ok: true, session, redirect: getRouteForRole(user.role) };
	}

	function requireRole(role){
		const session = getSession();
		if(session && session.role === role){
			return session;
		}

		const query = new URLSearchParams();
		if(role) query.set('role', role);
		const suffix = query.toString() ? `?${query.toString()}` : '';
		window.location.replace(`login.html${suffix}`);
		return null;
	}

	function logout(){
		clearSession();
		window.location.replace('login.html');
	}

	window.AppAuth = {
		login,
		logout,
		getSession,
		getRouteForRole,
		getRequestedRole,
		requireRole
	};
})();
