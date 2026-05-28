(function(){
	const STORAGE_KEY = 'appAuthSession';
	const SESSION_KEY = 'appAuthSessionBackup';
	const WINDOW_NAME_PREFIX = 'appAuthSession=';
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

	function parseSession(raw){
		if(!raw) return null;
		try{
			const session = JSON.parse(raw);
			if(!session || typeof session !== 'object') return null;
			if(!session.role || !ROLE_ROUTES[session.role]) return null;
			if(!session.username) return null;
			return session;
		}catch(error){
			return null;
		}
	}

	function readStorage(storage, key){
		try{
			return storage.getItem(key);
		}catch(error){
			return null;
		}
	}

	function writeStorage(storage, key, value){
		try{
			storage.setItem(key, value);
			return true;
		}catch(error){
			return false;
		}
	}

	function removeStorage(storage, key){
		try{
			storage.removeItem(key);
			return true;
		}catch(error){
			return false;
		}
	}

	function readWindowNameSession(){
		const name = String(window.name || '');
		if(!name.startsWith(WINDOW_NAME_PREFIX)) return null;
		return parseSession(name.slice(WINDOW_NAME_PREFIX.length));
	}

	function writeWindowNameSession(session){
		try{
			window.name = `${WINDOW_NAME_PREFIX}${JSON.stringify(session)}`;
		}catch(error){
			// Ignore window.name failures and fall back to storage.
		}
	}

	function clearWindowNameSession(){
		try{
			if(String(window.name || '').startsWith(WINDOW_NAME_PREFIX)){
				window.name = '';
			}
		}catch(error){
			// Ignore window.name failures.
		}
	}

	function getSession(){
		return parseSession(readStorage(localStorage, STORAGE_KEY))
			|| parseSession(readStorage(sessionStorage, SESSION_KEY))
			|| readWindowNameSession();
	}

	function setSession(session){
		const raw = JSON.stringify(session);
		writeStorage(localStorage, STORAGE_KEY, raw);
		writeStorage(sessionStorage, SESSION_KEY, raw);
		writeWindowNameSession(session);
	}

	function clearSession(){
		removeStorage(localStorage, STORAGE_KEY);
		removeStorage(sessionStorage, SESSION_KEY);
		clearWindowNameSession();
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
			loggedInAt: Date.now(),
			lastSeenAt: Date.now()
		};
		setSession(session);
		return { ok: true, session, redirect: getRouteForRole(user.role) };
	}

	function requireRole(role){
		const session = getSession();
		if(session && session.role === role){
			setSession({
				...session,
				lastSeenAt: Date.now()
			});
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
