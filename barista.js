let ordersCache = [];
let callsCache = [];

const translations = {
	th: {
		title: 'Barista - Queue',
		subtitle: 'ดูคิวออเดอร์และการเรียกพนักงานแบบเรียลไทม์',
		logout: 'ออกจากระบบ',
		ordersTitle: 'คิวออเดอร์',
		callsTitle: 'เรียกพนักงาน',
		orderLabel: 'ออเดอร์',
		tableLabel: 'โต๊ะ',
		itemsLabel: 'รายการ',
		status: {
			pending: 'รอดำเนินการ',
			done: 'เสร็จแล้ว'
		},
		toggleStatus: 'เปลี่ยนสถานะ',
		deleteOrder: 'ลบออเดอร์',
		callResolve: 'รับทราบแล้ว',
		emptyOrders: 'ยังไม่มีออเดอร์',
		emptyOrdersDesc: 'เมื่อมีลูกค้าสั่งซื้อ คิวออเดอร์จะขึ้นที่หน้านี้ทันที',
		emptyCalls: 'ยังไม่มีการเรียกพนักงาน',
		emptyCallsDesc: 'เมื่อมีลูกค้าเรียกพนักงาน รายการจะแสดงที่หน้านี้',
		noteLabel: 'หมายเหตุ',
		totalLabel: 'รวม'
	}
};

const el = {
	baristaTitle: document.getElementById('barista-title'),
	baristaSubtitle: document.getElementById('barista-subtitle'),
	logoutButton: document.getElementById('logout-button'),
	ordersTitle: document.getElementById('orders-title'),
	callsTitle: document.getElementById('calls-title'),
	ordersWrap: document.getElementById('orders'),
	callsWrap: document.getElementById('calls')
};

function t(key){
	return translations.th?.[key] ?? key;
}

function applyLanguage(){
	document.documentElement.lang = 'th';
	document.title = t('title');
	if(el.baristaTitle) el.baristaTitle.textContent = t('title');
	if(el.baristaSubtitle) el.baristaSubtitle.textContent = t('subtitle');
	if(el.logoutButton) el.logoutButton.textContent = t('logout');
	if(el.ordersTitle) el.ordersTitle.textContent = t('ordersTitle');
	if(el.callsTitle) el.callsTitle.textContent = t('callsTitle');
}

function formatTime(ts){
	return new Date(ts).toLocaleString('th-TH');
}

function playBeep(){
	try{
		const ctx = new (window.AudioContext || window.webkitAudioContext)();
		const oscillator = ctx.createOscillator();
		const gain = ctx.createGain();
		oscillator.type = 'sine';
		oscillator.frequency.value = 880;
		gain.gain.value = 0.0015;
		oscillator.connect(gain);
		gain.connect(ctx.destination);
		oscillator.start();
		gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.5);
		setTimeout(() => {
			oscillator.stop();
			ctx.close();
		}, 600);
	}catch(error){
		console.warn('audio failed', error);
	}
}

function sortOrders(orders){
	return [...orders].sort((a, b) => {
		const statusRankA = a.status === 'pending' ? 0 : 1;
		const statusRankB = b.status === 'pending' ? 0 : 1;
		if(statusRankA !== statusRankB){
			return statusRankA - statusRankB;
		}
		return a.createdAt - b.createdAt;
	});
}

function renderOrders(){
	if(!el.ordersWrap) return;

	const orders = sortOrders(ordersCache);
	el.ordersWrap.innerHTML = '';
	if(orders.length === 0){
		el.ordersWrap.innerHTML = `<div class="empty-state"><h3>${t('emptyOrders')}</h3><p>${t('emptyOrdersDesc')}</p></div>`;
		return;
	}

	orders.forEach(order => {
		const div = document.createElement('div');
		const statusClass = order.status === 'done' ? 'done' : 'pending';
		div.className = 'order' + (order.unread ? ' new' : '');
		div.innerHTML = `
			<div class="order-head">
				<div class="order-info">
					<strong>${t('orderLabel')} ${order.orderId}</strong>
					<div class="subtext">${formatTime(order.createdAt)}</div>
				</div>
				<div class="badge ${statusClass}">${t('status')[order.status]}</div>
			</div>
			<div class="order-meta">
				<span>${t('tableLabel')} ${order.table || '-'}</span>
				<span>${order.items.length} ${t('itemsLabel')}</span>
			</div>
			<div class="order-items">
				${order.items.map(item => `<div class="order-item"><span>${item.name}</span><span>x${item.qty}</span></div>`).join('')}
				<div class="order-note"><strong>${t('noteLabel')}</strong><span>${order.note || '-'}</span></div>
				<div class="order-total"><strong>${t('totalLabel')}</strong><span>${order.total}</span></div>
			</div>
			<div class="order-actions">
				<button class="toggle" data-id="${order.docId}">${t('toggleStatus')}</button>
				<button class="delete" data-id="${order.docId}">${t('deleteOrder')}</button>
			</div>
		`;
		el.ordersWrap.appendChild(div);
		div.querySelector('.toggle').addEventListener('click', () => toggleStatus(order.docId, order.status));
		div.querySelector('.delete').addEventListener('click', () => deleteOrder(order.docId));
	});
}

function renderCalls(){
	if(!el.callsWrap) return;

	const calls = [...callsCache].sort((a, b) => b.createdAt - a.createdAt);
	el.callsWrap.innerHTML = '';
	if(calls.length === 0){
		el.callsWrap.innerHTML = `<div class="empty-state"><h3>${t('emptyCalls')}</h3><p>${t('emptyCallsDesc')}</p></div>`;
		return;
	}

	calls.forEach(call => {
		const div = document.createElement('div');
		div.className = 'call' + (call.unread ? ' new' : '');
		div.innerHTML = `
			<div class="meta">
				<div>${t('tableLabel')} ${call.table || '-'}</div>
				<div class="small">${formatTime(call.createdAt)}</div>
			</div>
			<div class="order-actions">
				<button class="resolve" data-id="${call.docId}">${t('callResolve')}</button>
			</div>
		`;
		el.callsWrap.appendChild(div);
		div.querySelector('.resolve').addEventListener('click', () => resolveCall(call.docId));
	});
}

async function toggleStatus(orderDocId, currentStatus){
	await db.collection('orders').doc(orderDocId).update({
		status: currentStatus === 'done' ? 'pending' : 'done'
	});
}

async function deleteOrder(orderDocId){
	await db.collection('orders').doc(orderDocId).delete();
}

async function resolveCall(callDocId){
	await db.collection('calls').doc(callDocId).delete();
}

async function markDocsRead(collectionName, docIds){
	if(docIds.length === 0) return;
	const batch = db.batch();
	docIds.forEach(docId => {
		batch.update(db.collection(collectionName).doc(docId), { unread: false });
	});
	await batch.commit();
}

function setupListeners(){
	db.collection('orders').onSnapshot(async (snapshot) => {
		ordersCache = snapshot.docs.map(doc => ({ docId: doc.id, ...doc.data() }));
		renderOrders();

		const unreadIds = snapshot.docs
			.filter(doc => doc.data().unread)
			.map(doc => doc.id);

		if(unreadIds.length > 0){
			playBeep();
			await markDocsRead('orders', unreadIds);
		}
	});

	db.collection('calls').onSnapshot(async (snapshot) => {
		callsCache = snapshot.docs.map(doc => ({ docId: doc.id, ...doc.data() }));
		renderCalls();

		const unreadIds = snapshot.docs
			.filter(doc => doc.data().unread)
			.map(doc => doc.id);

		if(unreadIds.length > 0){
			playBeep();
			await markDocsRead('calls', unreadIds);
		}
	});
}

if(el.logoutButton){
	el.logoutButton.addEventListener('click', () => {
		window.AppAuth.logout();
	});
}

applyLanguage();
renderOrders();
renderCalls();
setupListeners();
