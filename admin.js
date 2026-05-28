const translations = {
	th: {
		title: 'Admin - Dashboard',
		logout: 'ออกจากระบบ',
		menuTitle: 'จัดการเมนู',
		available: 'พร้อมขาย',
		soldOut: 'แจ้งว่าหมด',
		announcementTitle: 'ประกาศ',
		announcement: 'วันนี้ไม่มีค่าจัดส่งเมื่อซื้อครบ 150 บาท',
		announcementPlaceholder: 'พิมพ์ข้อความประกาศ',
		saveAnnouncement: 'บันทึก',
		qrTitle: 'QR โต๊ะ',
		qrDesc: 'สแกนเพื่อเปิดเมนูพร้อมระบุเลขโต๊ะอัตโนมัติ',
		qrBaseUrlLabel: 'ลิงก์หน้าเมนู',
		qrBaseUrlPlaceholder: 'https://your-domain.com/index.html',
		saveBaseUrl: 'บันทึกลิงก์',
		qrHintAuto: 'กำลังใช้ลิงก์ของเว็บนี้อัตโนมัติ',
		qrHintSaved: 'กำลังใช้ลิงก์ที่ตั้งค่าเอง',
		qrHintMissing: 'ถ้าเปิดไฟล์จากเครื่อง ให้ใส่ลิงก์เว็บจริงก่อน เพื่อให้มือถือสแกนเข้าได้',
		qrEmpty: 'ยังไม่มีลิงก์สำหรับสร้าง QR',
		qrEmptyDesc: 'ใส่ลิงก์หน้าเมนูของร้าน แล้วระบบจะสร้าง QR ของโต๊ะ 1 และ 2 ให้ทันที',
		qrOpenLink: 'เปิดลิงก์โต๊ะ',
		baseUrlSaved: 'บันทึกลิงก์แล้ว',
		baseUrlCleared: 'ล้างลิงก์แล้ว',
		baseUrlInvalid: 'ลิงก์ไม่ถูกต้อง',
		saved: 'บันทึกแล้ว',
		categoryLabels: {
			coffee: 'กาแฟ',
			nonCoffee: 'ไม่ใช่กาแฟ',
			bakery: 'เบเกอรี่',
			cake: 'เค้ก',
			recommended: 'แนะนำ'
		}
	}
};

const TABLE_QR_NUMBERS = [1, 2];
const PUBLIC_MENU_URL_KEY = 'publicMenuUrl';

window.MenuData.ensureMenuStorage();

const el = {
	menuAdmin: document.getElementById('menu-list-admin'),
	adminTitle: document.getElementById('admin-title'),
	announcementTitle: document.getElementById('announcement-title'),
	announcement: document.getElementById('announcement'),
	announcementInput: document.getElementById('announcement-input'),
	menuTitle: document.getElementById('menu-title'),
	qrTitle: document.getElementById('qr-title'),
	qrDesc: document.getElementById('qr-desc'),
	qrBaseUrlLabel: document.getElementById('qr-base-url-label'),
	publicBaseUrlInput: document.getElementById('public-base-url'),
	saveBaseUrlBtn: document.getElementById('save-base-url'),
	qrBaseUrlHint: document.getElementById('qr-base-url-hint'),
	tableQrList: document.getElementById('table-qr-list'),
	tableDashboardTitle: document.getElementById('table-dashboard-title'),
	tableDashboardDesc: document.getElementById('table-dashboard-desc'),
	tableDashboardList: document.getElementById('table-dashboard-list'),
	callsTitle: document.getElementById('calls-title'),
	callsDesc: document.getElementById('calls-desc'),
	callsWrap: document.getElementById('customer-calls'),
	saveAnnouncementBtn: document.getElementById('save-announcement'),
	logoutButton: document.getElementById('logout-button')
};

let callsCache = [];
let ordersCache = [];
let sessionsCache = [];

const SESSION_TTL_MS = 8 * 60 * 60 * 1000;
const TABLE_DASHBOARD_TEXT = {
	title: 'Dashboard โต๊ะ',
	desc: 'แสดงสถานะโต๊ะสดแบบเรียลไทม์',
	emptyStatus: 'EMPTY',
	activeStatus: 'ACTIVE',
	billStatus: 'BILL REQUESTED',
	helpStatus: 'NEED HELP',
	emptyTitle: 'ยังไม่มีข้อมูลโต๊ะ',
	emptyDesc: 'ระบบจะแสดงสถานะเมื่อมี session, order หรือคำขอจากลูกค้า',
	orderLabel: 'ออเดอร์ใหม่',
	sessionLabel: 'Session',
};

const CALL_REQUEST_LABELS = {
	bill: 'เรียกเช็กบิล',
	cutlery: 'ขอช้อนส้อม',
	water: 'เติมน้ำ',
	issue: 'แจ้งปัญหา'
};

function getCallRequestLabel(call){
	return CALL_REQUEST_LABELS[call?.requestType] || call?.requestLabel || 'เรียกพนักงาน';
}

function formatTime(ts){
	return new Date(ts).toLocaleString('th-TH');
}

function normalizeTableId(value){
	return String(value || '').trim();
}

function normalizeOrderStatus(status){
	if(status === 'done') return 'served';
	if(status === 'pending' || status === 'preparing' || status === 'served'){
		return status;
	}
	return 'pending';
}

function isActiveSession(session){
	if(!session) return false;
	const updatedAt = Number(session.updatedAt || session.createdAt || 0);
	if(!updatedAt) return false;
	return session.active !== false && (Date.now() - updatedAt) < SESSION_TTL_MS;
}

function getKnownTables(){
	const tables = [];
	const seen = new Set();
	const addTable = (value) => {
		const table = normalizeTableId(value);
		if(!table || seen.has(table)) return;
		seen.add(table);
		tables.push(table);
	};

	TABLE_QR_NUMBERS.forEach(addTable);
	sessionsCache.forEach(item => addTable(item.table));
	ordersCache.forEach(item => addTable(item.table));
	callsCache.forEach(item => addTable(item.table));
	return tables;
}

function getTableDashboardInfo(table){
	const tableId = normalizeTableId(table);
	const session = [...sessionsCache].find(item => normalizeTableId(item.table) === tableId && isActiveSession(item));
	const tableOrders = ordersCache.filter(item => normalizeTableId(item.table) === tableId);
	const tableCalls = callsCache.filter(item => normalizeTableId(item.table) === tableId);
	const openOrders = tableOrders.filter(item => normalizeOrderStatus(item.status) !== 'served');
	const issueCall = tableCalls.find(item => item.requestType === 'issue');
	const billCall = tableCalls.find(item => item.requestType === 'bill');
	const latestOrder = openOrders
		.slice()
		.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))[0] || null;

	let statusKey = 'empty';
	let statusLabel = TABLE_DASHBOARD_TEXT.emptyStatus;
	let statusClass = 'empty';
	let statusDetail = '';

	if(issueCall){
		statusKey = 'need-help';
		statusLabel = TABLE_DASHBOARD_TEXT.helpStatus;
		statusClass = 'need-help';
		statusDetail = issueCall.requestLabel || CALL_REQUEST_LABELS.issue;
	}else if(billCall){
		statusKey = 'bill-requested';
		statusLabel = TABLE_DASHBOARD_TEXT.billStatus;
		statusClass = 'bill-requested';
		statusDetail = billCall.requestLabel || CALL_REQUEST_LABELS.bill;
	}else if(session || openOrders.length || tableCalls.length){
		statusKey = 'active';
		statusLabel = TABLE_DASHBOARD_TEXT.activeStatus;
		statusClass = 'active';
		statusDetail = session?.sessionLabel || latestOrder?.orderId || '';
	}

	return {
		table: tableId,
		session,
		openOrders,
		tableCalls,
		latestOrder,
		statusKey,
		statusLabel,
		statusClass,
		statusDetail
	};
}

function t(key){
	return translations.th?.[key] ?? key;
}

function tCat(key){
	return translations.th?.categoryLabels?.[key] ?? key;
}

function getItemName(item){
	return window.MenuData.getItemName(item, 'th');
}

function getSecondaryName(item){
	return window.MenuData.getSecondaryName(item, 'th');
}

function applyLanguage(){
	document.documentElement.lang = 'th';
	document.title = t('title');
	if(el.adminTitle) el.adminTitle.textContent = t('title');
	if(el.announcementTitle) el.announcementTitle.textContent = t('announcementTitle');
	if(el.menuTitle) el.menuTitle.textContent = t('menuTitle');
	if(el.qrTitle) el.qrTitle.textContent = t('qrTitle');
	if(el.qrDesc) el.qrDesc.textContent = t('qrDesc');
	if(el.tableDashboardTitle) el.tableDashboardTitle.textContent = TABLE_DASHBOARD_TEXT.title;
	if(el.tableDashboardDesc) el.tableDashboardDesc.textContent = TABLE_DASHBOARD_TEXT.desc;
	if(el.callsTitle) el.callsTitle.textContent = 'คำขอลูกค้า';
	if(el.callsDesc) el.callsDesc.textContent = 'คำขอจากลูกค้าจะแสดงแบบเรียลไทม์';
	if(el.qrBaseUrlLabel) el.qrBaseUrlLabel.textContent = t('qrBaseUrlLabel');
	if(el.announcementInput) el.announcementInput.placeholder = t('announcementPlaceholder');
	if(el.saveAnnouncementBtn) el.saveAnnouncementBtn.textContent = t('saveAnnouncement');
	if(el.publicBaseUrlInput) el.publicBaseUrlInput.placeholder = t('qrBaseUrlPlaceholder');
	if(el.saveBaseUrlBtn) el.saveBaseUrlBtn.textContent = t('saveBaseUrl');
	if(el.logoutButton) el.logoutButton.textContent = t('logout');
}

function loadMenu(){
	return window.MenuData.loadMenu();
}

function saveMenu(list){
	window.MenuData.saveMenu(list);
}

function renderMenuAdmin(){
	const menu = loadMenu();
	if(!el.menuAdmin) return;

	el.menuAdmin.innerHTML = '';
	menu.forEach(item => {
		const div = document.createElement('div');
		const secondaryName = getSecondaryName(item);
		const detailParts = [`฿${item.price}`, tCat(item.category)];
		if(secondaryName) detailParts.unshift(secondaryName);
		div.className = 'menu-admin-item';
		div.innerHTML = `
			<div class="label">
				<strong>${getItemName(item)}</strong>
				<div class="small">${detailParts.join(' • ')}</div>
			</div>
			<div>
				<button class="toggle-sold" data-id="${item.id}">${item.sold ? t('available') : t('soldOut')}</button>
			</div>
		`;
		el.menuAdmin.appendChild(div);
		div.querySelector('.toggle-sold').addEventListener('click', () => toggleSold(item.id));
	});
}

function toggleSold(id){
	const menu = loadMenu();
	const index = menu.findIndex(item => item.id === id);
	if(index === -1) return;

	menu[index].sold = !menu[index].sold;
	saveMenu(menu);
	renderMenuAdmin();
}

function loadAnnouncement(){
	return localStorage.getItem('announcement') || t('announcement');
}

function renderAnnouncementAdmin(){
	const announcement = loadAnnouncement();
	if(el.announcementInput) el.announcementInput.value = announcement;
	if(el.announcement) el.announcement.textContent = announcement;
}

function getStoredPublicMenuUrl(){
	return (localStorage.getItem(PUBLIC_MENU_URL_KEY) || '').trim();
}

function getAutomaticMenuUrl(){
	if(window.location.protocol !== 'http:' && window.location.protocol !== 'https:'){
		return '';
	}
	return new URL('index.html', window.location.href).href;
}

function normalizeMenuUrl(value){
	const url = new URL(value, window.location.href);
	if(url.protocol !== 'http:' && url.protocol !== 'https:'){
		throw new Error('invalid-url-protocol');
	}
	if(url.pathname.endsWith('/')){
		url.pathname = `${url.pathname}index.html`;
	}else if(!/\.html?$/i.test(url.pathname)){
		url.pathname = `${url.pathname}/index.html`;
	}
	url.search = '';
	url.hash = '';
	return url.href;
}

function getPublicMenuUrl(){
	return getStoredPublicMenuUrl() || getAutomaticMenuUrl();
}

function buildTableMenuUrl(tableNumber){
	const baseUrl = getPublicMenuUrl();
	if(!baseUrl) return '';
	const url = new URL(baseUrl);
	url.searchParams.set('table', String(tableNumber));
	return url.href;
}

function renderTableQrCodes(){
	if(!el.tableQrList) return;

	const savedUrl = getStoredPublicMenuUrl();
	const publicMenuUrl = getPublicMenuUrl();

	if(el.publicBaseUrlInput && document.activeElement !== el.publicBaseUrlInput){
		el.publicBaseUrlInput.value = savedUrl || publicMenuUrl;
	}

	if(el.qrBaseUrlHint){
		if(savedUrl){
			el.qrBaseUrlHint.textContent = `${t('qrHintSaved')}: ${savedUrl}`;
		}else if(publicMenuUrl){
			el.qrBaseUrlHint.textContent = `${t('qrHintAuto')}: ${publicMenuUrl}`;
		}else{
			el.qrBaseUrlHint.textContent = t('qrHintMissing');
		}
	}

	if(!publicMenuUrl){
		el.tableQrList.innerHTML = `
			<div class="table-qr-empty">
				<h3>${t('qrEmpty')}</h3>
				<p>${t('qrEmptyDesc')}</p>
			</div>
		`;
		return;
	}

	el.tableQrList.innerHTML = TABLE_QR_NUMBERS.map(tableNumber => {
		const tableUrl = buildTableMenuUrl(tableNumber);
		const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(tableUrl)}`;
		return `
			<article class="table-qr-card">
				<div class="table-qr-code">
					<img src="${qrImageUrl}" alt="โต๊ะ ${tableNumber}">
				</div>
				<div class="table-qr-meta">
					<h3>โต๊ะ ${tableNumber}</h3>
					<p>${tableUrl}</p>
					<a class="table-qr-link" href="${tableUrl}" target="_blank" rel="noreferrer">${t('qrOpenLink')}</a>
				</div>
			</article>
		`;
	}).join('');
}

function renderTableDashboard(){
	if(!el.tableDashboardList) return;

	const tables = getKnownTables();
	if(tables.length === 0){
		el.tableDashboardList.innerHTML = `
			<div class="table-dashboard-empty">
				<h3>${TABLE_DASHBOARD_TEXT.emptyTitle}</h3>
				<p>${TABLE_DASHBOARD_TEXT.emptyDesc}</p>
			</div>
		`;
		return;
	}

	el.tableDashboardList.innerHTML = tables.map(table => {
		const info = getTableDashboardInfo(table);
		const summary = info.statusKey === 'need-help' || info.statusKey === 'bill-requested'
			? info.statusDetail
			: info.latestOrder
				? (Array.isArray(info.latestOrder.items)
					? info.latestOrder.items.slice(0, 2).map(item => `${item.name} x${item.qty}`).join(' • ')
					: '')
				: info.session
					? `${TABLE_DASHBOARD_TEXT.sessionLabel} #${info.session.sessionNo || '-'}`
					: TABLE_DASHBOARD_TEXT.emptyDesc;

		return `
			<article class="table-dashboard-card ${info.statusClass}">
				<div class="table-dashboard-head">
					<div>
						<strong>Table ${table}</strong>
						${info.session ? `<div class="table-dashboard-session">${info.session.sessionLabel || `${TABLE_DASHBOARD_TEXT.sessionLabel} #${info.session.sessionNo}`}</div>` : ''}
					</div>
					<div class="table-dashboard-status ${info.statusClass}">${info.statusLabel}</div>
				</div>
				<div class="table-dashboard-summary">${summary || TABLE_DASHBOARD_TEXT.emptyDesc}</div>
				<div class="table-dashboard-meta">
					<span>${info.openOrders.length} ${TABLE_DASHBOARD_TEXT.orderLabel}</span>
					<span>${info.tableCalls.length} คำขอ</span>
				</div>
			</article>
		`;
	}).join('');
}

function renderCustomerCalls(){
	if(!el.callsWrap) return;

	const calls = [...callsCache].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
	el.callsWrap.innerHTML = '';
	if(calls.length === 0){
		el.callsWrap.innerHTML = `
			<div class="empty-state">
				<h3>ยังไม่มีคำขอจากลูกค้า</h3>
				<p>เมื่อมีลูกค้ากดเรียกพนักงาน รายการจะปรากฏที่นี่</p>
			</div>
		`;
		return;
	}

	el.callsWrap.innerHTML = calls.map(call => {
		const isBillRequest = call.requestType === 'bill';
		return `
			<article class="call ${call.unread ? 'new' : ''}">
				<div class="meta">
					<div>โต๊ะ ${call.table || '-'}</div>
					<div class="small">${formatTime(call.createdAt)}</div>
				</div>
				<div class="call-type ${isBillRequest && call.billConfirmed ? 'confirmed' : ''}">
					${getCallRequestLabel(call)}${isBillRequest && call.billConfirmed ? ' · ยืนยันแล้ว' : ''}
				</div>
				${call.sessionLabel || call.sessionNo ? `<div class="call-session">${call.sessionLabel || `Session #${call.sessionNo}`}</div>` : ''}
			</article>
		`;
	}).join('');
}

function renderAll(){
	renderAnnouncementAdmin();
	renderTableQrCodes();
	renderTableDashboard();
	renderCustomerCalls();
	renderMenuAdmin();
}

if(el.saveAnnouncementBtn){
	el.saveAnnouncementBtn.addEventListener('click', () => {
		const value = el.announcementInput?.value.trim();
		if(!value) return;

		localStorage.setItem('announcement', value);
		if(el.announcement) el.announcement.textContent = value;
		window.dispatchEvent(new Event('announcement:changed'));
		alert(t('saved'));
	});
}

if(el.saveBaseUrlBtn){
	el.saveBaseUrlBtn.addEventListener('click', () => {
		const value = el.publicBaseUrlInput?.value.trim() || '';
		if(!value){
			localStorage.removeItem(PUBLIC_MENU_URL_KEY);
			renderTableQrCodes();
			alert(t('baseUrlCleared'));
			return;
		}

		try{
			const normalizedUrl = normalizeMenuUrl(value);
			localStorage.setItem(PUBLIC_MENU_URL_KEY, normalizedUrl);
			renderTableQrCodes();
			alert(t('baseUrlSaved'));
		}catch(error){
			alert(t('baseUrlInvalid'));
		}
	});
}

if(el.publicBaseUrlInput){
	el.publicBaseUrlInput.addEventListener('keydown', (event) => {
		if(event.key === 'Enter'){
			event.preventDefault();
			el.saveBaseUrlBtn?.click();
		}
	});
}

if(el.logoutButton){
	el.logoutButton.addEventListener('click', () => {
		window.AppAuth.logout();
	});
}

function setupRealtimeListeners(){
	if(!window.db){
		renderTableDashboard();
		renderCustomerCalls();
		return;
	}

	db.collection('calls').onSnapshot((snapshot) => {
		callsCache = snapshot.docs.map(doc => ({ docId: doc.id, ...doc.data() }));
		renderTableDashboard();
		renderCustomerCalls();
	});

	db.collection('orders').onSnapshot((snapshot) => {
		ordersCache = snapshot.docs.map(doc => ({ docId: doc.id, ...doc.data() }));
		renderTableDashboard();
	});

	db.collection('tableSessions').onSnapshot((snapshot) => {
		sessionsCache = snapshot.docs.map(doc => ({ docId: doc.id, ...doc.data() }));
		renderTableDashboard();
	});
}

window.addEventListener('storage', (event) => {
	if(event.key === 'announcement' || event.key === 'menu' || event.key === PUBLIC_MENU_URL_KEY){
		renderAll();
	}
});
window.addEventListener('menu:changed', renderMenuAdmin);
window.addEventListener('announcement:changed', renderAnnouncementAdmin);

applyLanguage();
renderAll();
setupRealtimeListeners();
