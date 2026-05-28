const categories = window.MenuData.categories;

const translations = {
	th: {
		siteTitle: 'ร้านกาแฟ - เมนู',
		shopName: 'ร้านกาแฟ Minimal Brew',
		shopAddress: '123 ถนนสุขสันต์, เมืองตัวอย่าง',
		announcement: 'วันนี้ไม่มีค่าจัดส่งเมื่อซื้อครบ 150 บาท',
		searchPlaceholder: 'ค้นหาเมนู เช่น ลาเต้ หรือ Latte',
		tableMissing: 'ไม่พบหมายเลขโต๊ะ',
		tableEmpty: 'EMPTY',
		tableLabel: 'โต๊ะ',
		sessionLabel: 'Session',
		sessionLoading: 'กำลังสร้าง session...',
		sessionPending: 'รอสร้าง session',
		historyButton: 'ดูรายการสั่ง',
		historyTitle: 'ดูรายการสั่ง',
		cartButton: 'ตะกร้า',
		historyLoading: 'กำลังโหลดรายการสั่ง...',
		historyEmpty: 'ยังไม่มีรายการสั่งใน session นี้',
		orderStatusPending: 'Pending',
		orderStatusPreparing: 'Preparing',
		orderStatusServed: 'Served',
		callStaff: 'เรียกพนักงาน',
		callModalTitle: 'เลือกประเภทคำขอ',
		callModalSubtitle: 'แตะหนึ่งตัวเลือกเพื่อส่งคำขอไปยังบาริสต้า',
		callModalHint: 'เลือกคำขอที่ต้องการแล้วระบบจะส่งให้ทันที',
		callRequestTap: 'แตะเพื่อส่งคำขอ',
		callBill: 'เรียกเช็กบิล',
		callCutlery: 'ขอช้อนส้อม',
		callWater: 'เติมน้ำ',
		callIssue: 'แจ้งปัญหา',
		callSubmitted: 'ส่งคำขอเรียบร้อย',
		callFailed: 'ส่งคำขอไม่สำเร็จ',
		callBillTap: 'ดูใบเสร็จและยืนยัน',
		billPreviewTitle: 'ยืนยันการเช็กบิล',
		billPreviewSubtitle: 'ตรวจสอบรายการและยอดรวมก่อนส่งคำขอ',
		billPreviewEmpty: 'ยังไม่มีรายการสั่งในบิลนี้',
		billPreviewLoading: 'กำลังเตรียมใบเสร็จ...',
		billPreviewCancel: 'ยกเลิก',
		billPreviewConfirm: 'ยืนยันการเช็กบิล',
		closeModal: 'ปิด',
		orderLabel: 'ออเดอร์',
		cartTitle: 'ตะกร้าสินค้า',
		closeCart: 'ปิดตะกร้า',
		note: 'หมายเหตุ',
		notePlaceholder: 'เช่น ไม่ใส่น้ำตาล หรือ ขอร้อน',
		clearCart: 'ล้างตะกร้า',
		placeOrder: 'สั่งซื้อ',
		cartEmpty: 'ตะกร้าว่าง',
		totalLabel: 'รวมทั้งหมด',
		orderNoteLabel: 'หมายเหตุรวม',
		orderSuccess: 'สั่งซื้อสำเร็จ',
		priceLabel: 'ราคา',
		soldOut: 'หมด',
		noResults: 'ไม่พบเมนูที่ค้นหา',
		categoryLabels: {
			all: 'ทั้งหมด',
			coffee: 'กาแฟ',
			nonCoffee: 'ไม่ใช่กาแฟ',
			bakery: 'เบเกอรี่',
			cake: 'เค้ก',
			recommended: 'แนะนำ'
		}
	},
	en: {
		siteTitle: 'Coffee Shop - Menu',
		shopName: 'Minimal Brew Coffee Shop',
		shopAddress: '123 Happy Street, Sample City',
		announcement: 'Free delivery for orders over 150฿ today',
		searchPlaceholder: 'Search menu, e.g. Latte or Matcha Cake',
		tableMissing: 'Table number missing',
		tableEmpty: 'EMPTY',
		tableLabel: 'Table',
		sessionLabel: 'Session',
		sessionLoading: 'Creating session...',
		sessionPending: 'Session pending',
		historyButton: 'View orders',
		historyTitle: 'View orders',
		cartButton: 'Cart',
		historyLoading: 'Loading orders...',
		historyEmpty: 'No orders in this session yet',
		orderStatusPending: 'Pending',
		orderStatusPreparing: 'Preparing',
		orderStatusServed: 'Served',
		callStaff: 'Call staff',
		callModalTitle: 'Choose request type',
		callModalSubtitle: 'Tap one option to send a request to the barista',
		callModalHint: 'Pick the request you need and it will be sent right away',
		callRequestTap: 'Tap to send',
		callBill: 'Ask for the bill',
		callCutlery: 'Need cutlery',
		callWater: 'Refill water',
		callIssue: 'Report an issue',
		callSubmitted: 'Request sent',
		callFailed: 'Failed to send request',
		callBillTap: 'Review the receipt and confirm',
		billPreviewTitle: 'Confirm bill request',
		billPreviewSubtitle: 'Review the items and total before sending the request',
		billPreviewEmpty: 'There are no items in this bill yet',
		billPreviewLoading: 'Preparing receipt...',
		billPreviewCancel: 'Cancel',
		billPreviewConfirm: 'Confirm bill request',
		closeModal: 'Close',
		orderLabel: 'Order',
		cartTitle: 'Shopping Cart',
		closeCart: 'Close cart',
		note: 'Note',
		notePlaceholder: 'For example: less sugar or hot drink',
		clearCart: 'Clear cart',
		placeOrder: 'Place order',
		cartEmpty: 'Cart is empty',
		totalLabel: 'Total',
		orderNoteLabel: 'Notes',
		orderSuccess: 'Order placed successfully',
		priceLabel: 'Price',
		soldOut: 'Sold out',
		noResults: 'No menu items found',
		categoryLabels: {
			all: 'All',
			coffee: 'Coffee',
			nonCoffee: 'Non-Coffee',
			bakery: 'Bakery',
			cake: 'Cakes',
			recommended: 'Recommended'
		}
	}
};

window.MenuData.ensureMenuStorage();

function loadMenu(){
	return window.MenuData.loadMenu();
}

let menuData = loadMenu();

const el = {
	categories: document.getElementById('categories'),
	menuList: document.getElementById('menu-list'),
	search: document.getElementById('search'),
	cartCount: document.getElementById('cart-count'),
	cartBtn: document.getElementById('cart-btn'),
	cartLabel: document.getElementById('cart-label'),
	cartOverlay: document.getElementById('cart-overlay'),
	cartSheet: document.getElementById('cart-sheet'),
	closeSheet: document.getElementById('close-sheet'),
	cartItemsWrap: document.getElementById('cart-items'),
	cartTotal: document.getElementById('cart-total'),
	clearCartBtn: document.getElementById('clear-cart'),
	placeOrderBtn: document.getElementById('place-order'),
	cartNote: document.getElementById('cart-note'),
	themeToggle: document.getElementById('theme-toggle'),
	langThBtn: document.getElementById('lang-th'),
	langEnBtn: document.getElementById('lang-en'),
	shopName: document.getElementById('shop-name'),
	shopAddress: document.getElementById('shop-address'),
	announcement: document.getElementById('announcement'),
	tableInfo: document.getElementById('table-info'),
	cartTitle: document.getElementById('cart-title'),
	cartNoteLabel: document.getElementById('cart-note-label'),
	orderHistoryBtn: document.getElementById('order-history-btn'),
	orderHistoryOverlay: document.getElementById('order-history-overlay'),
	orderHistorySheet: document.getElementById('order-history-sheet'),
	orderHistoryTitle: document.getElementById('order-history-title'),
	orderHistorySession: document.getElementById('order-history-session'),
	orderHistoryList: document.getElementById('order-history-list'),
	closeOrderHistory: document.getElementById('close-order-history'),
	callModalOverlay: document.getElementById('call-modal-overlay'),
	callModal: document.getElementById('call-modal'),
	callModalTitle: document.getElementById('call-modal-title'),
	callModalSubtitle: document.getElementById('call-modal-subtitle'),
	callModalHint: document.getElementById('call-modal-hint'),
	callRequestList: document.getElementById('call-request-list'),
	closeCallModal: document.getElementById('close-call-modal'),
	billPreviewOverlay: document.getElementById('bill-preview-overlay'),
	billPreviewModal: document.getElementById('bill-preview-modal'),
	billPreviewTitle: document.getElementById('bill-preview-title'),
	billPreviewSubtitle: document.getElementById('bill-preview-subtitle'),
	billPreviewMeta: document.getElementById('bill-preview-meta'),
	billPreviewList: document.getElementById('bill-preview-list'),
	billPreviewTotal: document.getElementById('bill-preview-total'),
	cancelBillPreview: document.getElementById('cancel-bill-preview'),
	closeBillPreview: document.getElementById('close-bill-preview'),
	confirmBillPreview: document.getElementById('confirm-bill-preview')
};

let state = {
	category: 'all',
	query: '',
	cart: 0,
	lines: [],
	lang: localStorage.getItem('lang') || 'th',
	theme: localStorage.getItem('theme') || 'light',
	table: null,
	session: null,
	sessionLoading: false,
	sessionPromise: null,
	sessionUnsubscribe: null,
	orderHistory: [],
	orderHistoryLoading: false,
	orderHistoryOpen: false,
	orderHistorySessionId: null,
	orderHistoryUnsubscribe: null,
	callModalOpen: false,
	callModalCloseTimer: null,
	billPreviewOpen: false,
	billPreviewCloseTimer: null,
	billPreviewLoading: false,
	billPreviewSubmitting: false,
	billPreviewSession: null,
	billPreviewOrders: [],
	billPreviewTotal: 0
};

const urlParams = new URLSearchParams(window.location.search);
state.table = normalizeTableId(urlParams.get('table'));

const SESSION_COLLECTION = 'tableSessions';
const SESSION_COUNTER_DOC = 'meta/sessionCounter';
const SESSION_TTL_MS = 8 * 60 * 60 * 1000;

function normalizeTableId(value){
	const table = String(value || '').trim();
	return table || null;
}

function getSessionDocId(table){
	return `table_${encodeURIComponent(String(table || '').trim())}`;
}

function getSessionCounterRef(){
	return db.doc(SESSION_COUNTER_DOC);
}

function getSessionRef(table){
	return db.collection(SESSION_COLLECTION).doc(getSessionDocId(table));
}

function isActiveSession(session){
	if(!session) return false;
	const updatedAt = Number(session.updatedAt || session.createdAt || 0);
	if(!updatedAt) return false;
	return session.active !== false && (Date.now() - updatedAt) < SESSION_TTL_MS;
}

function formatSessionLabel(sessionNo){
	return `${t('sessionLabel')} #${sessionNo}`;
}

function normalizeOrderStatus(status){
	if(status === 'done') return 'served';
	if(status === 'preparing' || status === 'served' || status === 'pending'){
		return status;
	}
	return 'pending';
}

function getOrderStatusLabel(status){
	const normalized = normalizeOrderStatus(status);
	if(normalized === 'served') return t('orderStatusServed');
	if(normalized === 'preparing') return t('orderStatusPreparing');
	return t('orderStatusPending');
}

function getOrderStatusClass(status){
	return normalizeOrderStatus(status);
}

function getCallRequestOptions(){
	return [
		{ key: 'bill', label: t('callBill') },
		{ key: 'cutlery', label: t('callCutlery') },
		{ key: 'water', label: t('callWater') },
		{ key: 'issue', label: t('callIssue') }
	];
}

function sortOrdersDesc(orders){
	return [...orders].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
}

function formatMoney(value){
	const number = Number(value);
	const safeNumber = Number.isFinite(number) ? number : 0;
	return `฿${safeNumber.toLocaleString('th-TH')}`;
}

function parseOrderTotal(order){
	if(typeof order?.total === 'number' && Number.isFinite(order.total)){
		return order.total;
	}

	const totalText = String(order?.total || '').replace(/[^\d.-]/g, '');
	const parsed = Number(totalText);
	if(Number.isFinite(parsed) && parsed > 0){
		return parsed;
	}

	if(Array.isArray(order?.items)){
		return order.items.reduce((sum, item) => {
			const price = Number(item?.price) || 0;
			const qty = Number(item?.qty) || 0;
			return sum + (price * qty);
		}, 0);
	}

	return 0;
}

function stopTableSessionListener(){
	if(state.sessionUnsubscribe){
		state.sessionUnsubscribe();
		state.sessionUnsubscribe = null;
	}
}

function syncSessionFromSnapshot(session){
	if(isActiveSession(session)){
		const nextSession = {
			...session,
			sessionId: session.sessionId || getSessionDocId(state.table),
			sessionDocId: session.sessionDocId || getSessionDocId(state.table)
		};
		state.session = nextSession;
		state.sessionLoading = false;
		renderTableInfo();
		startOrderHistoryListener(nextSession);
		return nextSession;
	}

	state.session = null;
	state.sessionLoading = false;
	renderTableInfo();
	startOrderHistoryListener(null);
	return null;
}

function startTableSessionListener(){
	if(!state.table || state.sessionUnsubscribe || !window.db) return;

	const sessionRef = getSessionRef(state.table);
	state.sessionUnsubscribe = sessionRef.onSnapshot((doc) => {
		const session = doc.exists ? doc.data() : null;
		syncSessionFromSnapshot(session);
	}, (error) => {
		console.error('Failed to watch table session', error);
	});
}

async function resolveExistingSession(){
	if(!state.table) return null;
	if(state.session && isActiveSession(state.session)){
		return state.session;
	}

	const sessionSnap = await getSessionRef(state.table).get();
	const existingSession = sessionSnap.exists ? sessionSnap.data() : null;
	if(isActiveSession(existingSession)){
		return syncSessionFromSnapshot(existingSession);
	}
	return null;
}

function stopOrderHistoryListener(){
	if(state.orderHistoryUnsubscribe){
		state.orderHistoryUnsubscribe();
		state.orderHistoryUnsubscribe = null;
	}
	state.orderHistorySessionId = null;
}

function renderOrderHistory(){
	if(!el.orderHistoryList) return;

	if(el.orderHistorySession){
		el.orderHistorySession.textContent = state.session?.sessionNo
			? `${t('tableLabel')} ${state.table} · ${formatSessionLabel(state.session.sessionNo)}`
			: state.table
				? `${t('tableLabel')} ${state.table}`
				: '';
	}

	if(state.orderHistoryLoading){
		el.orderHistoryList.innerHTML = `<div class="history-empty">${t('historyLoading')}</div>`;
		return;
	}

	const orders = sortOrdersDesc(state.orderHistory);
	if(orders.length === 0){
		el.orderHistoryList.innerHTML = `<div class="history-empty">${t('historyEmpty')}</div>`;
		return;
	}

	el.orderHistoryList.innerHTML = orders.map(order => {
		const items = Array.isArray(order.items) ? order.items : [];
		const total = order.total || '฿0';
		return `
			<article class="history-order">
				<div class="history-order-head">
					<div>
						<strong>${t('orderLabel')} ${order.orderId || '-'}</strong>
						<div class="history-order-time">${new Date(order.createdAt || Date.now()).toLocaleString('th-TH')}</div>
					</div>
					<div class="history-status ${getOrderStatusClass(order.status)}">${getOrderStatusLabel(order.status)}</div>
				</div>
				<div class="history-order-items">
					${items.map(item => `<div class="history-item"><span>${item.name} x${item.qty}</span><span>฿${(item.price || 0) * (item.qty || 0)}</span></div>`).join('')}
				</div>
				<div class="history-order-footer">
					<span>${t('totalLabel')}</span>
					<strong>${total}</strong>
				</div>
			</article>
		`;
	}).join('');
}

function renderCallRequests(){
	if(!el.callRequestList) return;

	const options = getCallRequestOptions();
	el.callRequestList.innerHTML = options.map(option => `
		<button type="button" class="call-request-btn" data-type="${option.key}">
			<strong>${option.label}</strong>
			<span>${option.key === 'bill' ? t('callBillTap') : t('callRequestTap')}</span>
		</button>
	`).join('');

	el.callRequestList.querySelectorAll('.call-request-btn').forEach(button => {
		button.addEventListener('click', () => {
			if(button.dataset.type === 'bill'){
				openBillPreview();
				return;
			}
			submitCallRequest(button.dataset.type);
		});
	});
}

function renderBillPreview(){
	if(!el.billPreviewList) return;

	if(el.billPreviewTitle) el.billPreviewTitle.textContent = t('billPreviewTitle');
	if(el.billPreviewSubtitle) el.billPreviewSubtitle.textContent = t('billPreviewSubtitle');
	if(el.closeBillPreview) el.closeBillPreview.setAttribute('aria-label', t('closeModal'));

	if(el.billPreviewMeta){
		const session = state.billPreviewSession;
		const tableText = session?.table || state.table || '-';
		const sessionText = session?.sessionNo ? `#${session.sessionNo}` : '-';
		el.billPreviewMeta.innerHTML = `
			<div class="bill-preview-meta-row">
				<span>${t('tableLabel')}</span>
				<strong>${tableText}</strong>
			</div>
			<div class="bill-preview-meta-row">
				<span>${t('sessionLabel')}</span>
				<strong>${sessionText}</strong>
			</div>
		`;
	}

	if(el.billPreviewTotal){
		el.billPreviewTotal.textContent = formatMoney(state.billPreviewTotal);
	}

	if(state.billPreviewLoading){
		el.billPreviewList.innerHTML = `<div class="bill-preview-empty">${t('billPreviewLoading')}</div>`;
	}else if(state.billPreviewOrders.length === 0){
		el.billPreviewList.innerHTML = `<div class="bill-preview-empty">${t('billPreviewEmpty')}</div>`;
	}else{
		el.billPreviewList.innerHTML = state.billPreviewOrders.map(order => {
			const items = Array.isArray(order.items) ? order.items : [];
			const orderTotal = parseOrderTotal(order);
			return `
				<article class="bill-preview-order">
					<div class="bill-preview-order-head">
						<div>
							<strong>${t('orderLabel')} ${order.orderId || '-'}</strong>
							<div class="bill-preview-order-time">${new Date(order.createdAt || Date.now()).toLocaleString('th-TH')}</div>
						</div>
						<span>${getOrderStatusLabel(order.status)}</span>
					</div>
					<div class="bill-preview-items">
						${items.map(item => {
							const lineTotal = (Number(item?.price) || 0) * (Number(item?.qty) || 0);
							return `
								<div class="bill-preview-item">
									<span>${item?.name || '-'} x${item?.qty || 0}</span>
									<span>${formatMoney(lineTotal)}</span>
								</div>
							`;
						}).join('')}
					</div>
					<div class="bill-preview-order-total">
						<span>${t('totalLabel')}</span>
						<strong>${formatMoney(orderTotal)}</strong>
					</div>
				</article>
			`;
		}).join('');
	}

	if(el.confirmBillPreview){
		const hasItems = state.billPreviewOrders.length > 0;
		el.confirmBillPreview.textContent = t('billPreviewConfirm');
		el.confirmBillPreview.disabled = state.billPreviewLoading || state.billPreviewSubmitting || !hasItems;
	}
	if(el.cancelBillPreview){
		el.cancelBillPreview.textContent = t('billPreviewCancel');
		el.cancelBillPreview.disabled = state.billPreviewSubmitting;
	}
}

function showBillPreview(){
	if(!el.billPreviewOverlay || !el.billPreviewModal) return;
	if(state.billPreviewCloseTimer){
		clearTimeout(state.billPreviewCloseTimer);
		state.billPreviewCloseTimer = null;
	}
	el.billPreviewOverlay.hidden = false;
	el.billPreviewOverlay.classList.add('show');
	el.billPreviewModal.hidden = false;
	el.billPreviewModal.classList.add('open');
	el.billPreviewModal.setAttribute('aria-hidden', 'false');
	state.billPreviewOpen = true;
}

function closeBillPreview(){
	if(!el.billPreviewOverlay || !el.billPreviewModal) return;
	el.billPreviewModal.classList.remove('open');
	el.billPreviewOverlay.classList.remove('show');
	el.billPreviewModal.setAttribute('aria-hidden', 'true');
	state.billPreviewOpen = false;
	if(state.billPreviewCloseTimer){
		clearTimeout(state.billPreviewCloseTimer);
	}
	state.billPreviewCloseTimer = setTimeout(() => {
		el.billPreviewOverlay.hidden = true;
		el.billPreviewModal.hidden = true;
		state.billPreviewCloseTimer = null;
	}, 320);
}

async function openBillPreview(){
	if(!state.table){
		alert(t('tableMissing'));
		return;
	}

	const session = await resolveExistingSession();
	if(!session){
		alert(t('historyEmpty'));
		return;
	}

	closeCallModal();
	closeOrderHistory();

	state.billPreviewSession = session;
	state.billPreviewLoading = true;
	state.billPreviewSubmitting = false;
	state.billPreviewOrders = [];
	state.billPreviewTotal = 0;
	renderBillPreview();
	showBillPreview();

	try{
		const snapshot = await db.collection('orders')
			.where('sessionId', '==', session.sessionId)
			.get();

		state.billPreviewOrders = snapshot.docs
			.map(doc => ({ docId: doc.id, ...doc.data() }))
			.sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
		state.billPreviewTotal = state.billPreviewOrders.reduce((sum, order) => sum + parseOrderTotal(order), 0);
	}catch(error){
		console.error('Failed to load bill preview', error);
		state.billPreviewOrders = [];
		state.billPreviewTotal = 0;
		alert(t('callFailed'));
	}finally{
		state.billPreviewLoading = false;
		renderBillPreview();
	}
}

async function confirmBillRequest(){
	if(state.billPreviewSubmitting){
		return;
	}

	const session = state.billPreviewSession;
	if(!session){
		alert(t('historyEmpty'));
		return;
	}

	state.billPreviewSubmitting = true;
	renderBillPreview();
	try{
		const success = await submitCallRequest('bill', session);
		if(success){
			closeBillPreview();
		}
	}catch(error){
		console.error('Failed to submit bill request', error);
		alert(t('callFailed'));
	}finally{
		state.billPreviewSubmitting = false;
		renderBillPreview();
	}
}

function cancelBillRequest(){
	if(state.billPreviewSubmitting){
		return;
	}

	openCallModal();
}

function openCallModal(){
	if(!state.table){
		alert(t('tableMissing'));
		return;
	}

	closeCart();
	closeOrderHistory();
	closeBillPreview();
	renderCallRequests();

	if(!el.callModalOverlay || !el.callModal) return;
	if(state.callModalCloseTimer){
		clearTimeout(state.callModalCloseTimer);
		state.callModalCloseTimer = null;
	}
	el.callModalOverlay.hidden = false;
	el.callModalOverlay.classList.add('show');
	el.callModal.hidden = false;
	el.callModal.classList.add('open');
	el.callModal.setAttribute('aria-hidden', 'false');
	state.callModalOpen = true;

	setTimeout(() => {
		el.callRequestList?.querySelector('.call-request-btn')?.focus();
	}, 0);
}

function closeCallModal(){
	if(!el.callModalOverlay || !el.callModal) return;
	el.callModal.classList.remove('open');
	el.callModalOverlay.classList.remove('show');
	el.callModal.setAttribute('aria-hidden', 'true');
	state.callModalOpen = false;
	if(state.callModalCloseTimer){
		clearTimeout(state.callModalCloseTimer);
	}
	state.callModalCloseTimer = setTimeout(() => {
		el.callModalOverlay.hidden = true;
		el.callModal.hidden = true;
		state.callModalCloseTimer = null;
	}, 320);
}

async function submitCallRequest(requestType, sessionOverride = null){
	const request = getCallRequestOptions().find(option => option.key === requestType);
	if(!request){
		return false;
	}

	try{
		const session = sessionOverride || await ensureTableSession();
		if(!session){
			alert(t('historyEmpty'));
			return false;
		}
		await saveCall(state.table, session, request);
		closeCallModal();
		const sessionText = session?.sessionNo ? ` · ${formatSessionLabel(session.sessionNo)}` : '';
		alert(`${request.label} - ${t('tableLabel')} ${state.table}${sessionText}\n${t('callSubmitted')}`);
		return true;
	}catch(error){
		console.error('Failed to save call request', error);
		alert(t('callFailed'));
		return false;
	}
}

function startOrderHistoryListener(session){
	if(!session?.sessionId){
		state.orderHistory = [];
		state.orderHistoryLoading = false;
		renderOrderHistory();
		stopOrderHistoryListener();
		return;
	}

	if(state.orderHistorySessionId === session.sessionId && state.orderHistoryUnsubscribe){
		renderOrderHistory();
		return;
	}

	stopOrderHistoryListener();
	state.orderHistorySessionId = session.sessionId;
	state.orderHistoryLoading = true;
	state.orderHistory = [];
	renderOrderHistory();

	state.orderHistoryUnsubscribe = db.collection('orders')
		.where('sessionId', '==', session.sessionId)
		.onSnapshot((snapshot) => {
			state.orderHistoryLoading = false;
			state.orderHistory = snapshot.docs.map(doc => ({ docId: doc.id, ...doc.data() }));
			renderOrderHistory();
		}, (error) => {
			console.error('Failed to listen order history', error);
			state.orderHistoryLoading = false;
			renderOrderHistory();
		});
}

function setResolvedSession(session){
	state.session = session;
	state.sessionLoading = false;
	renderTableInfo();
	startOrderHistoryListener(session);
	return session;
}

function t(key){
	return translations[state.lang]?.[key] ?? key;
}

function tCat(key){
	return translations[state.lang]?.categoryLabels?.[key] ?? key;
}

function getItemName(item){
	return window.MenuData.getItemName(item, state.lang);
}

function getSecondaryName(item){
	return window.MenuData.getSecondaryName(item, state.lang);
}

function updateLanguageButtons(){
	if(el.langThBtn) el.langThBtn.classList.toggle('active', state.lang === 'th');
	if(el.langEnBtn) el.langEnBtn.classList.toggle('active', state.lang === 'en');
}

function setLanguage(lang){
	state.lang = lang;
	localStorage.setItem('lang', lang);
	updateLanguageButtons();
	applyLanguage();
	renderCategories();
	renderMenu();
	renderTableInfo();
}

function setTheme(theme){
	state.theme = theme;
	localStorage.setItem('theme', theme);
	applyTheme();
}

function applyTheme(){
	document.documentElement.setAttribute('data-theme', state.theme);
	if(el.themeToggle){
		el.themeToggle.hidden = true;
	}
}

function applyLanguage(){
	document.documentElement.lang = state.lang;
	document.title = t('siteTitle');
	if(el.shopName) el.shopName.textContent = t('shopName');
	if(el.shopAddress) el.shopAddress.textContent = t('shopAddress');
	if(el.announcement) el.announcement.textContent = localStorage.getItem('announcement') || t('announcement');
	if(el.search) el.search.placeholder = t('searchPlaceholder');
	if(el.cartTitle) el.cartTitle.textContent = t('cartTitle');
	if(el.cartLabel) el.cartLabel.textContent = t('cartButton');
	if(el.closeSheet) el.closeSheet.setAttribute('aria-label', t('closeCart'));
	if(el.cartNoteLabel) el.cartNoteLabel.textContent = t('note');
	if(el.cartNote) el.cartNote.placeholder = t('notePlaceholder');
	if(el.clearCartBtn) el.clearCartBtn.textContent = t('clearCart');
	if(el.placeOrderBtn) el.placeOrderBtn.textContent = t('placeOrder');
	if(el.orderHistoryBtn) el.orderHistoryBtn.textContent = t('historyButton');
	if(el.orderHistoryTitle) el.orderHistoryTitle.textContent = t('historyTitle');
	if(el.callModalTitle) el.callModalTitle.textContent = t('callModalTitle');
	if(el.callModalSubtitle) el.callModalSubtitle.textContent = t('callModalSubtitle');
	if(el.callModalHint) el.callModalHint.textContent = t('callModalHint');
	if(el.billPreviewTitle) el.billPreviewTitle.textContent = t('billPreviewTitle');
	if(el.billPreviewSubtitle) el.billPreviewSubtitle.textContent = t('billPreviewSubtitle');
	if(el.langThBtn) el.langThBtn.textContent = 'TH';
	if(el.langEnBtn) el.langEnBtn.textContent = 'EN';
	if(callBtn) callBtn.textContent = t('callStaff');
	if(el.closeCallModal) el.closeCallModal.setAttribute('aria-label', t('closeModal'));
	if(el.callRequestList) renderCallRequests();
	if(state.billPreviewOpen) renderBillPreview();
	updateLanguageButtons();
}

function renderTableInfo(){
	if(!el.tableInfo) return;
	if(state.table){
		if(state.sessionLoading){
			el.tableInfo.textContent = `${t('tableLabel')} ${state.table} · ${t('sessionLoading')}`;
			return;
		}
		if(state.session?.sessionNo){
			el.tableInfo.textContent = `${t('tableLabel')} ${state.table} · ${formatSessionLabel(state.session.sessionNo)}`;
			return;
		}
		el.tableInfo.textContent = `${t('tableLabel')} ${state.table} · ${t('tableEmpty')}`;
	}else{
		el.tableInfo.textContent = t('tableMissing');
	}
}

async function ensureTableSession(){
	if(!state.table) return null;
	if(state.session && isActiveSession(state.session)){
		return setResolvedSession(state.session);
	}
	if(state.sessionPromise){
		return state.sessionPromise;
	}

	state.sessionLoading = true;
	renderTableInfo();

	const sessionRef = getSessionRef(state.table);
	const counterRef = getSessionCounterRef();
	const now = Date.now();

	state.sessionPromise = db.runTransaction(async (transaction) => {
		const [sessionSnap, counterSnap] = await Promise.all([
			transaction.get(sessionRef),
			transaction.get(counterRef)
		]);

		const existingSession = sessionSnap.exists ? sessionSnap.data() : null;
		if(isActiveSession(existingSession)){
			transaction.update(sessionRef, { updatedAt: now });
			return {
				...existingSession,
				sessionDocId: sessionRef.id,
				sessionId: sessionRef.id,
				updatedAt: now
			};
		}

		const nextSessionNo = Number(counterSnap.exists ? counterSnap.data().nextSessionNo : 0) + 1;
		transaction.set(counterRef, { nextSessionNo }, { merge: true });

		const session = {
			sessionId: sessionRef.id,
			sessionDocId: sessionRef.id,
			table: state.table,
			sessionNo: nextSessionNo,
			sessionLabel: formatSessionLabel(nextSessionNo),
			active: true,
			createdAt: now,
			updatedAt: now
		};

		transaction.set(sessionRef, session);
		return session;
	}).then((session) => {
		return setResolvedSession(session);
	}).catch((error) => {
		console.error('Failed to create table session', error);
		state.session = null;
		state.sessionLoading = false;
		renderTableInfo();
		startOrderHistoryListener(null);
		return null;
	}).finally(() => {
		state.sessionPromise = null;
	});

	return state.sessionPromise;
}

function bootstrapTableSession(){
	if(!state.table) return Promise.resolve(null);
	return ensureTableSession();
}

function createThumb(name){
	const thumbLabel = (name || '').split(' ')[0].slice(0, 12) || 'Menu';
	const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'><rect rx='20' width='200' height='200' fill='%23e9e3de'/><text x='50%' y='55%' dominant-baseline='middle' text-anchor='middle' font-size='22' fill='%236b4f3b' font-family='sans-serif'>${thumbLabel}</text></svg>`;
	return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

function getItemImageSrc(item, fallbackName){
	const fallback = createThumb(fallbackName);
	return window.MenuData.getItemImage(item) || fallback;
}

function attachImageFallbacks(root){
	if(!root) return;
	root.querySelectorAll('img[data-fallback]').forEach((image) => {
		image.onerror = () => {
			image.onerror = null;
			image.src = image.dataset.fallback || createThumb(image.alt || 'Menu');
		};
	});
}

function renderCategories(){
	el.categories.innerHTML = '';
	categories.forEach(cat => {
		const btn = document.createElement('button');
		btn.textContent = tCat(cat);
		btn.className = cat === state.category ? 'active' : '';
		btn.addEventListener('click', () => {
			state.category = cat;
			renderCategories();
			renderMenu();
		});
		el.categories.appendChild(btn);
	});
}

const revealObserver = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
		if(entry.isIntersecting){
			entry.target.classList.add('reveal-visible');
			revealObserver.unobserve(entry.target);
		}
	});
}, { threshold: 0.15, rootMargin: '0px 0px -14% 0px' });

function observeRevealCards(){
	el.menuList.querySelectorAll('.card.reveal-item').forEach(card => revealObserver.observe(card));
}

function renderMenu(){
	menuData = loadMenu();
	const q = state.query.trim().toLowerCase();
	const items = menuData.filter(item => {
		if(state.category !== 'all'){
			if(state.category === 'recommended' && !item.recommended) return false;
			if(state.category !== 'recommended' && item.category !== state.category) return false;
		}

		if(q && !window.MenuData.getSearchText(item).includes(q)) return false;
		return true;
	});

	el.menuList.innerHTML = items.length ? items.map(item => {
		const primaryName = getItemName(item);
		const secondaryName = getSecondaryName(item);
		const detail = [secondaryName, tCat(item.category)].filter(Boolean).join(' • ');
		const fallbackImage = createThumb(primaryName);
		const imageSrc = getItemImageSrc(item, primaryName);
		return `
			<article class="card reveal-item ${item.sold ? 'sold' : ''}" data-id="${item.id}" style="position:relative">
				<div class="thumb"><img src="${imageSrc}" alt="${primaryName}" data-fallback="${fallbackImage}" loading="lazy"></div>
				<div class="meta">
					<h3 class="title">${primaryName}</h3>
					<p class="desc">${detail}</p>
				</div>
				<div class="right">
					${item.sold ? `<div class="sold-badge">${t('soldOut')}</div>` : ''}
					<div class="price">฿${item.price}</div>
					<button class="add-btn ${item.sold ? 'hidden' : ''}" data-id="${item.id}" type="button">＋</button>
				</div>
			</article>
		`;
	}).join('') : `<p style="color:var(--muted);text-align:center;padding:28px">${t('noResults')}</p>`;

	el.menuList.querySelectorAll('.add-btn').forEach(button => {
		button.addEventListener('click', () => addToCart(Number(button.dataset.id)));
	});
	attachImageFallbacks(el.menuList);
	if(items.length) observeRevealCards();
}

el.search.addEventListener('input', (event) => {
	state.query = event.target.value;
	renderMenu();
});

function genLineId(){
	return Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 6);
}

function addToCart(id, qty = 1){
	const item = menuData.find(menuItem => menuItem.id === id);
	if(!item) return;

	const existing = state.lines.find(line => line.id === id);
	if(existing){
		existing.qty += qty;
	}else{
		state.lines.push({ lineId: genLineId(), id: item.id, name: getItemName(item), price: item.price, qty });
	}
	updateCartState();
}

async function saveCall(table, session, request){
  const now = Date.now();
  const call = {
    callId: 'c' + now.toString(36),
    table: table || null,
    sessionId: session?.sessionId || null,
    sessionDocId: session?.sessionDocId || null,
    sessionNo: session?.sessionNo || null,
    sessionLabel: session?.sessionLabel || null,
    requestType: request?.key || null,
    requestLabel: request?.label || null,
    createdAt: now,
    unread: true
  };
  await db.collection('calls').doc(call.callId).set(call);
}

const callBtn = document.getElementById('call-staff');
if(callBtn){
	callBtn.addEventListener('click', openCallModal);
}

function changeLineQty(lineId, delta){
	const idx = state.lines.findIndex(line => line.lineId === lineId);
	if(idx === -1) return;
	state.lines[idx].qty += delta;
	if(state.lines[idx].qty <= 0) state.lines.splice(idx, 1);
	updateCartState();
}

function updateCartState(){
	state.cart = state.lines.reduce((sum, line) => sum + line.qty, 0);
	el.cartCount.textContent = state.cart;
	renderCartItems();
}

function renderCartItems(){
	if(state.lines.length === 0){
		el.cartItemsWrap.innerHTML = `<p style="color:var(--muted);padding:18px;text-align:center">${t('cartEmpty')}</p>`;
		el.cartTotal.textContent = '฿0';
		return;
	}

	el.cartItemsWrap.innerHTML = state.lines.map(line => {
		const lineTotal = line.price * line.qty;
		const fallbackImage = createThumb(line.name);
		const imageSrc = getItemImageSrc(line, line.name);
		return `
			<div class="cart-item" data-line="${line.lineId}">
				<div class="thumb"><img src="${imageSrc}" alt="${line.name}" data-fallback="${fallbackImage}" loading="lazy"></div>
				<div class="meta">
					<p class="name">${line.name}</p>
					<p class="sub">${t('priceLabel')} ฿${line.price}</p>
				</div>
				<div class="controls">
					<div class="qty-controls">
						<button class="dec" data-line="${line.lineId}" type="button">−</button>
						<div class="qty">${line.qty}</div>
						<button class="inc" data-line="${line.lineId}" type="button">＋</button>
					</div>
					<div class="item-total">฿${lineTotal}</div>
				</div>
			</div>
		`;
	}).join('');

	const total = state.lines.reduce((sum, line) => sum + line.price * line.qty, 0);
	el.cartTotal.textContent = `฿${total}`;
	attachImageFallbacks(el.cartItemsWrap);
	el.cartItemsWrap.querySelectorAll('.inc').forEach(button => button.addEventListener('click', () => changeLineQty(button.dataset.line, 1)));
	el.cartItemsWrap.querySelectorAll('.dec').forEach(button => button.addEventListener('click', () => changeLineQty(button.dataset.line, -1)));
}

function openCart(){
	closeCallModal();
	closeOrderHistory();
	closeBillPreview();
	el.cartOverlay.hidden = false;
	el.cartSheet.classList.add('open');
	el.cartOverlay.classList.add('show');
	el.cartSheet.setAttribute('aria-hidden', 'false');
	document.getElementById('cart').style.opacity = '0';
	document.getElementById('cart').style.pointerEvents = 'none';
}

function closeCart(){
	el.cartSheet.classList.remove('open');
	el.cartOverlay.classList.remove('show');
	el.cartSheet.setAttribute('aria-hidden', 'true');
	setTimeout(() => {
		el.cartOverlay.hidden = true;
	}, 320);
	document.getElementById('cart').style.opacity = '1';
	document.getElementById('cart').style.pointerEvents = 'auto';
}

function openOrderHistory(session = state.session){
	closeCart();
	closeCallModal();
	closeBillPreview();
	if(!el.orderHistoryOverlay || !el.orderHistorySheet) return;
	el.orderHistoryOverlay.hidden = false;
	el.orderHistorySheet.classList.add('open');
	el.orderHistoryOverlay.classList.add('show');
	el.orderHistorySheet.setAttribute('aria-hidden', 'false');
	state.orderHistoryOpen = true;
	if(session?.sessionId){
		startOrderHistoryListener(session);
	}else{
		stopOrderHistoryListener();
		state.orderHistory = [];
		state.orderHistoryLoading = false;
		renderOrderHistory();
	}
}

function closeOrderHistory(){
	if(!el.orderHistoryOverlay || !el.orderHistorySheet) return;
	el.orderHistorySheet.classList.remove('open');
	el.orderHistoryOverlay.classList.remove('show');
	el.orderHistorySheet.setAttribute('aria-hidden', 'true');
	state.orderHistoryOpen = false;
	setTimeout(() => {
		el.orderHistoryOverlay.hidden = true;
	}, 320);
}

el.cartBtn.addEventListener('click', () => {
	renderCartItems();
	openCart();
});
el.cartOverlay.addEventListener('click', closeCart);
el.closeSheet.addEventListener('click', closeCart);
if(el.orderHistoryBtn){
	el.orderHistoryBtn.addEventListener('click', async () => {
		const session = await resolveExistingSession();
		if(!state.table){
			alert(t('tableMissing'));
			return;
		}
		openOrderHistory(session);
	});
}
if(el.orderHistoryOverlay){
	el.orderHistoryOverlay.addEventListener('click', closeOrderHistory);
}
if(el.closeOrderHistory){
	el.closeOrderHistory.addEventListener('click', closeOrderHistory);
}
if(el.callModalOverlay){
	el.callModalOverlay.addEventListener('click', closeCallModal);
}
if(el.closeCallModal){
	el.closeCallModal.addEventListener('click', closeCallModal);
}
if(el.billPreviewOverlay){
	el.billPreviewOverlay.addEventListener('click', closeBillPreview);
}
if(el.cancelBillPreview){
	el.cancelBillPreview.addEventListener('click', cancelBillRequest);
}
if(el.closeBillPreview){
	el.closeBillPreview.addEventListener('click', closeBillPreview);
}
if(el.confirmBillPreview){
	el.confirmBillPreview.addEventListener('click', confirmBillRequest);
}
el.clearCartBtn.addEventListener('click', () => {
	state.lines = [];
	updateCartState();
});

el.placeOrderBtn.addEventListener('click', async () => {
	const total = el.cartTotal.textContent;
	const note = el.cartNote?.value || '';
	if(state.lines.length === 0){
		alert(t('cartEmpty'));
		return;
	}

	const session = state.table ? await ensureTableSession() : null;
	const lines = state.lines.map(line => `${line.name} x${line.qty} = ฿${line.price * line.qty}`).join('\n');
	const tableText = state.table ? `${t('tableLabel')} ${state.table}` : t('tableMissing');
	const payload = {
		table: state.table || null,
		sessionId: session?.sessionId || null,
		sessionDocId: session?.sessionDocId || null,
		sessionNo: session?.sessionNo || null,
		sessionLabel: session?.sessionLabel || null,
		total,
		note,
		items: state.lines.map(line => ({ id: line.id, name: line.name, qty: line.qty, price: line.price }))
	};
	console.log('Order payload:', payload);
	const sessionText = session?.sessionNo ? `\n${formatSessionLabel(session.sessionNo)}` : '';
	await saveOrder(payload);
	alert(`${t('orderSuccess')}\n\n${lines}\n\n${t('totalLabel')}: ${total}\n${tableText}${sessionText}\n${t('orderNoteLabel')}: ${note || '-'}`);
	state.lines = [];
	if(el.cartNote) el.cartNote.value = '';
	updateCartState();
	closeCart();
});

async function saveOrder(payload){
  const now = Date.now();
  const order = {
    orderId: 'o' + now.toString(36),
    table: payload.table,
    sessionId: payload.sessionId || null,
    sessionDocId: payload.sessionDocId || null,
    sessionNo: payload.sessionNo || null,
    sessionLabel: payload.sessionLabel || null,
    items: payload.items,
    note: payload.note,
    total: payload.total || el.cartTotal.textContent,
    status: 'pending',
    createdAt: now,
    unread: true
  };
  await db.collection('orders').doc(order.orderId).set(order);
  return order;
}

function toggleTheme(){
	setTheme(state.theme === 'dark' ? 'light' : 'dark');
}

if(el.langThBtn) el.langThBtn.addEventListener('click', () => setLanguage('th'));
if(el.langEnBtn) el.langEnBtn.addEventListener('click', () => setLanguage('en'));
if(el.themeToggle) el.themeToggle.addEventListener('click', toggleTheme);

applyTheme();
applyLanguage();
renderCategories();
renderMenu();
if(state.table){
	startTableSessionListener();
	bootstrapTableSession();
}else{
	renderTableInfo();
}

window.addEventListener('storage', (event) => {
	if(event.key === 'menu') renderMenu();
});
window.addEventListener('menu:changed', () => renderMenu());
document.addEventListener('keydown', event => {
	if(event.key === 'Escape'){
		if(state.billPreviewOpen){
			closeBillPreview();
			return;
		}
		if(state.callModalOpen){
			closeCallModal();
			return;
		}
		if(state.orderHistoryOpen){
			closeOrderHistory();
			return;
		}
		closeCart();
	}
});
window.addEventListener('announcement:changed', () => {
	if(el.announcement) el.announcement.textContent = localStorage.getItem('announcement') || t('announcement');
});
