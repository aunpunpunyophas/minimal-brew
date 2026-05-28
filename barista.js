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
		sessionLabel: 'Session',
		itemsLabel: 'รายการ',
		status: {
			pending: 'รอดำเนินการ',
			done: 'เสร็จแล้ว'
		},
		toggleStatus: 'เปลี่ยนสถานะ',
		deleteOrder: 'ลบออเดอร์',
		callResolve: 'เสร็จสิ้นการทำงาน',
		emptyOrders: 'ยังไม่มีออเดอร์',
		emptyOrdersDesc: 'เมื่อมีลูกค้าสั่งซื้อ คิวออเดอร์จะขึ้นที่หน้านี้ทันที',
		emptyCalls: 'ยังไม่มีการเรียกพนักงาน',
		emptyCallsDesc: 'เมื่อลูกค้าเรียกพนักงาน รายการจะแสดงที่หน้านี้',
		noteLabel: 'หมายเหตุ',
		totalLabel: 'รวม'
	}
};

const el = {
	baristaTitle: document.getElementById('barista-title'),
	baristaSubtitle: document.getElementById('barista-subtitle'),
	ordersTitle: document.getElementById('orders-title'),
	callsTitle: document.getElementById('calls-title'),
	ordersWrap: document.getElementById('orders'),
	callsWrap: document.getElementById('calls'),
	logoutButton: document.getElementById('logout-button')
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

const ORDER_STATUS_FLOW = ['pending', 'preparing', 'served'];
const ORDER_STATUS_LABELS = {
	pending: 'Pending',
	preparing: 'Preparing',
	served: 'Served'
};

function normalizeOrderStatus(status){
	if(status === 'done') return 'served';
	if(ORDER_STATUS_FLOW.includes(status)) return status;
	return 'pending';
}

function getOrderStatusLabel(status){
	return ORDER_STATUS_LABELS[normalizeOrderStatus(status)] || ORDER_STATUS_LABELS.pending;
}

function getOrderStatusClass(status){
	return normalizeOrderStatus(status);
}

function getNextOrderStatus(status){
	const current = normalizeOrderStatus(status);
	const index = ORDER_STATUS_FLOW.indexOf(current);
	return ORDER_STATUS_FLOW[(index + 1) % ORDER_STATUS_FLOW.length];
}

const BILL_TEXT = {
	title: 'Digital Bill',
	ordersLabel: 'รายการทั้งหมด',
	totalLabel: 'ราคารวม',
	orderUnit: 'ออเดอร์',
	confirm: 'ยืนยัน',
	confirmed: 'ยืนยันแล้ว',
	complete: 'Complete Payment',
	empty: 'ยังไม่มีรายการในบิลนี้'
};

const PAYMENT_TEXT = {
	failed: 'ปิดโต๊ะไม่สำเร็จ',
	done: 'ปิดโต๊ะเรียบร้อย'
};

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

function getSessionBill(sessionId){
	const orders = ordersCache
		.filter(order => order.sessionId === sessionId)
		.sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));

	const total = orders.reduce((sum, order) => sum + parseOrderTotal(order), 0);
	return { orders, total };
}

function renderBillOrderItems(order){
	const items = Array.isArray(order?.items) ? order.items : [];
	if(items.length === 0){
		return `<div class="bill-empty">${BILL_TEXT.empty}</div>`;
	}

	return items.map(item => {
		const lineTotal = (Number(item?.price) || 0) * (Number(item?.qty) || 0);
		return `
			<div class="bill-order-item">
				<span>${item?.name || '-'} x${item?.qty || 0}</span>
				<span>${formatMoney(lineTotal)}</span>
			</div>
		`;
	}).join('');
}

function renderBillPanel(call){
	const bill = getSessionBill(call?.sessionId);
	const sessionText = call?.sessionLabel || call?.sessionNo ? (call.sessionLabel || `${t('sessionLabel')} #${call.sessionNo}`) : '-';
	const orderCount = bill.orders.length;
	return `
		<div class="bill-panel ${call?.billConfirmed ? 'confirmed' : ''}">
			<div class="bill-panel-head">
				<div>
					<strong>${BILL_TEXT.title}</strong>
					<div class="bill-session">${sessionText}</div>
				</div>
				<div class="bill-chip">${orderCount} ${BILL_TEXT.orderUnit}</div>
			</div>
			<div class="bill-summary">
				<div class="bill-summary-row">
					<span>${BILL_TEXT.ordersLabel}</span>
					<strong>${orderCount}</strong>
				</div>
				<div class="bill-summary-row">
					<span>${BILL_TEXT.totalLabel}</span>
					<strong>${formatMoney(bill.total)}</strong>
				</div>
			</div>
			<div class="bill-orders">
				${bill.orders.length ? bill.orders.map(order => `
					<article class="bill-order">
						<div class="bill-order-head">
							<div>
								<strong>${t('orderLabel')} ${order.orderId || '-'}</strong>
								<div class="small">${formatTime(order.createdAt)}</div>
							</div>
							<span>${formatMoney(parseOrderTotal(order))}</span>
						</div>
						<div class="bill-order-items">
							${renderBillOrderItems(order)}
						</div>
					</article>
				`).join('') : `<div class="bill-empty">${BILL_TEXT.empty}</div>`}
			</div>
		</div>
	`;
}

function t(key){
	return translations.th?.[key] ?? key;
}

function applyLanguage(){
	document.documentElement.lang = 'th';
	document.title = t('title');
	if(el.baristaTitle) el.baristaTitle.textContent = t('title');
	if(el.baristaSubtitle) el.baristaSubtitle.textContent = t('subtitle');
	if(el.ordersTitle) el.ordersTitle.textContent = t('ordersTitle');
	if(el.callsTitle) el.callsTitle.textContent = t('callsTitle');
	if(el.logoutButton) el.logoutButton.textContent = t('logout');
}

function formatTime(ts){
	return new Date(ts).toLocaleString('th-TH');
}

function createThumb(name){
	const thumbLabel = (name || '').split(' ')[0].slice(0, 12) || 'Menu';
	const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'><rect rx='20' width='120' height='120' fill='%2325201d'/><text x='50%' y='54%' dominant-baseline='middle' text-anchor='middle' font-size='18' fill='%23d4b59d' font-family='sans-serif'>${thumbLabel}</text></svg>`;
	return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

function getOrderItemImage(item){
	const itemId = Number(item?.id);
	if(Number.isFinite(itemId) && itemId > 0){
		return `${itemId}.jpg`;
	}
	return createThumb(item?.name || 'Menu');
}

function attachOrderImageFallbacks(root){
	if(!root) return;
	root.querySelectorAll('img[data-fallback]').forEach((image) => {
		image.onerror = () => {
			image.onerror = null;
			image.src = image.dataset.fallback || createThumb(image.alt || 'Menu');
		};
	});
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
		const unreadRank = Number(Boolean(b.unread)) - Number(Boolean(a.unread));
		if(unreadRank !== 0){
			return unreadRank;
		}
		return (b.createdAt || 0) - (a.createdAt || 0);
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
		const currentStatus = normalizeOrderStatus(order.status);
		const statusClass = getOrderStatusClass(currentStatus);
		div.className = 'order' + (order.unread ? ' new' : '');
		div.innerHTML = `
			<div class="order-head">
				<div class="order-info">
					<strong>${t('orderLabel')} ${order.orderId}</strong>
					<div class="subtext">${formatTime(order.createdAt)}</div>
				</div>
				<div class="order-state">
					${order.unread ? '<div class="badge live">NEW</div>' : ''}
					<div class="badge ${statusClass}">${getOrderStatusLabel(currentStatus)}</div>
				</div>
			</div>
			<div class="order-meta">
				<span>${t('tableLabel')} ${order.table || '-'}</span>
				${order.sessionLabel || order.sessionNo ? `<span>${order.sessionLabel || `${t('sessionLabel')} #${order.sessionNo}`}</span>` : ''}
				<span>${order.items.length} ${t('itemsLabel')}</span>
			</div>
			<div class="order-items">
				${order.items.map(item => {
					const fallbackImage = createThumb(item.name);
					const imageSrc = getOrderItemImage(item);
					return `
						<div class="order-item">
							<div class="order-item-main">
								<div class="order-item-thumb">
									<img src="${imageSrc}" alt="${item.name}" data-fallback="${fallbackImage}" loading="lazy">
								</div>
								<div class="order-item-copy">
									<span class="order-item-name">${item.name}</span>
									<span class="order-item-price">฿${item.price}</span>
								</div>
							</div>
							<span class="order-item-qty">x${item.qty}</span>
						</div>
					`;
				}).join('')}
				<div class="order-note"><strong>${t('noteLabel')}</strong><span>${order.note || '-'}</span></div>
				<div class="order-total"><strong>${t('totalLabel')}</strong><span>${order.total}</span></div>
			</div>
			<div class="order-actions">
				<select class="status-select" data-id="${order.docId}" aria-label="${t('toggleStatus')}">
					<option value="pending" ${currentStatus === 'pending' ? 'selected' : ''}>Pending</option>
					<option value="preparing" ${currentStatus === 'preparing' ? 'selected' : ''}>Preparing</option>
					<option value="served" ${currentStatus === 'served' ? 'selected' : ''}>Served</option>
				</select>
				<button class="delete" data-id="${order.docId}">${t('deleteOrder')}</button>
			</div>
		`;
		el.ordersWrap.appendChild(div);
		div.querySelector('.status-select').addEventListener('change', async (event) => {
			const nextStatus = event.target.value;
			event.target.disabled = true;
			try{
				await updateOrderStatus(order.docId, nextStatus);
			}catch(error){
				console.error('Failed to update order status', error);
				event.target.value = currentStatus;
				alert('อัปเดตสถานะไม่สำเร็จ');
			}finally{
				event.target.disabled = false;
			}
		});
		div.querySelector('.delete').addEventListener('click', () => deleteOrder(order.docId));
	});
	attachOrderImageFallbacks(el.ordersWrap);
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
		const isBillRequest = call.requestType === 'bill';
		const actionButton = isBillRequest
			? (call.billConfirmed
				? `<button class="bill-complete" data-id="${call.docId}">${BILL_TEXT.complete}</button>`
				: `<button class="bill-confirm ${call.billConfirmed ? 'confirmed' : ''}" data-id="${call.docId}" ${call.billConfirmed ? 'disabled' : ''}>${BILL_TEXT.confirm}</button><button class="bill-cancel" data-id="${call.docId}">ยกเลิก</button>`)
			: `<button class="resolve" data-id="${call.docId}">${t('callResolve')}</button>`;
		div.innerHTML = `
			<div class="meta">
				<div>${t('tableLabel')} ${call.table || '-'}</div>
				<div class="small">${formatTime(call.createdAt)}</div>
			</div>
			<div class="call-type ${isBillRequest && call.billConfirmed ? 'confirmed' : ''}">${getCallRequestLabel(call)}${isBillRequest && call.billConfirmed ? ` - ${BILL_TEXT.confirmed}` : ''}</div>
			${isBillRequest ? renderBillPanel(call) : ''}
			${call.sessionLabel || call.sessionNo ? `<div class="call-session">${call.sessionLabel || `${t('sessionLabel')} #${call.sessionNo}`}</div>` : ''}
			<div class="order-actions">
				${actionButton}
			</div>
		`;
		el.callsWrap.appendChild(div);
		const confirmButton = div.querySelector('.bill-confirm');
		if(confirmButton){
			confirmButton.addEventListener('click', () => confirmBill(call.docId));
		}
		const cancelButton = div.querySelector('.bill-cancel');
		if(cancelButton){
			cancelButton.addEventListener('click', async () => {
				if(!window.confirm('ยกเลิกคำขอเช็กบิลใช่ไหม?')){
					return;
				}
				await resolveCall(call.docId);
			});
		}
		const completeButton = div.querySelector('.bill-complete');
		if(completeButton){
			completeButton.addEventListener('click', async () => {
				if(!window.confirm('Complete Payment?')){
					return;
				}
				completeButton.disabled = true;
				try{
					await completePayment(call.docId);
					alert(PAYMENT_TEXT.done);
				}catch(error){
					console.error('Failed to complete payment', error);
					alert(PAYMENT_TEXT.failed);
				}finally{
					completeButton.disabled = false;
				}
			});
		}
		const resolveButton = div.querySelector('.resolve');
		if(resolveButton){
			resolveButton.addEventListener('click', () => resolveCall(call.docId));
		}
	});
}

async function updateOrderStatus(orderDocId, nextStatus){
	await db.collection('orders').doc(orderDocId).update({
		status: normalizeOrderStatus(nextStatus),
		statusUpdatedAt: Date.now()
	});
}

async function deleteOrder(orderDocId){
	await db.collection('orders').doc(orderDocId).delete();
}

async function resolveCall(callDocId){
	await db.collection('calls').doc(callDocId).delete();
}

async function confirmBill(callDocId){
	await db.collection('calls').doc(callDocId).update({
		billConfirmed: true,
		billConfirmedAt: Date.now()
	});
}

async function completePayment(callDocId){
	const callRef = db.collection('calls').doc(callDocId);
	const callSnap = await callRef.get();
	if(!callSnap.exists) return;

	const call = callSnap.data() || {};
	const sessionId = call.sessionId || null;
	if(!sessionId){
		await callRef.delete();
		return;
	}

	const [ordersSnap, callsSnap] = await Promise.all([
		db.collection('orders').where('sessionId', '==', sessionId).get(),
		db.collection('calls').where('sessionId', '==', sessionId).get()
	]);

	const batch = db.batch();
	const now = Date.now();
	const orderIds = new Set();
	ordersSnap.forEach(doc => orderIds.add(doc.id));
	orderIds.forEach(orderId => batch.delete(db.collection('orders').doc(orderId)));

	const callIds = new Set([callDocId]);
	callsSnap.forEach(doc => callIds.add(doc.id));
	callIds.forEach(callId => batch.delete(db.collection('calls').doc(callId)));

	const sessionDocId = call.sessionDocId || call.sessionId || null;
	if(sessionDocId){
		batch.set(db.collection('tableSessions').doc(sessionDocId), {
			active: false,
			closedAt: now,
			updatedAt: now,
			table: call.table || null,
			sessionId: sessionDocId,
			sessionDocId
		}, { merge: true });
	}

	await batch.commit();
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
