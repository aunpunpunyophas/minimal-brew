const categories = window.MenuData.categories;

const translations = {
	th: {
		siteTitle: 'ร้านกาแฟ - เมนู',
		shopName: 'ร้านกาแฟ Minimal Brew',
		shopAddress: '123 ถนนสุขสันต์, เมืองตัวอย่าง',
		announcement: 'วันนี้ไม่มีค่าจัดส่งเมื่อซื้อครบ 150 บาท',
		searchPlaceholder: 'ค้นหาเมนู เช่น ลาเต้ หรือ Latte',
		tableMissing: 'ไม่พบหมายเลขโต๊ะ',
		tableLabel: 'โต๊ะ',
		callStaff: 'เรียกพนักงาน',
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
		tableLabel: 'Table',
		callStaff: 'Call staff',
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
	cartNoteLabel: document.getElementById('cart-note-label')
};

let state = {
	category: 'all',
	query: '',
	cart: 0,
	lines: [],
	lang: localStorage.getItem('lang') || 'th',
	theme: localStorage.getItem('theme') || 'light',
	table: null
};

const urlParams = new URLSearchParams(window.location.search);
state.table = urlParams.get('table');

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
		el.themeToggle.textContent = state.theme === 'dark' ? '☀️' : '🌙';
		el.themeToggle.setAttribute('aria-label', state.theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
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
	if(el.closeSheet) el.closeSheet.setAttribute('aria-label', t('closeCart'));
	if(el.cartNoteLabel) el.cartNoteLabel.textContent = t('note');
	if(el.cartNote) el.cartNote.placeholder = t('notePlaceholder');
	if(el.clearCartBtn) el.clearCartBtn.textContent = t('clearCart');
	if(el.placeOrderBtn) el.placeOrderBtn.textContent = t('placeOrder');
	if(el.langThBtn) el.langThBtn.textContent = 'TH';
	if(el.langEnBtn) el.langEnBtn.textContent = 'EN';
	if(callBtn) callBtn.textContent = t('callStaff');
	updateLanguageButtons();
}

function renderTableInfo(){
	if(!el.tableInfo) return;
	if(state.table){
		el.tableInfo.textContent = `${t('tableLabel')} ${state.table}`;
	}else{
		el.tableInfo.textContent = t('tableMissing');
	}
}

function createThumb(name){
	const thumbLabel = (name || '').split(' ')[0].slice(0, 12) || 'Menu';
	const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'><rect rx='20' width='200' height='200' fill='%23e9e3de'/><text x='50%' y='55%' dominant-baseline='middle' text-anchor='middle' font-size='22' fill='%236b4f3b' font-family='sans-serif'>${thumbLabel}</text></svg>`;
	return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
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
		return `
			<article class="card reveal-item ${item.sold ? 'sold' : ''}" data-id="${item.id}" style="position:relative">
				<div class="thumb"><img src="${createThumb(primaryName)}" alt="${primaryName}"></div>
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

async function saveCall(table){
  const now = Date.now();
  const call = {
    callId: 'c' + now.toString(36),
    table: table || null,
    createdAt: now,
    unread: true
  };
  await db.collection('calls').doc(call.callId).set(call);
}

const callBtn = document.getElementById('call-staff');
if(callBtn){
	callBtn.addEventListener('click', () => {
		if(!state.table){
			alert(t('tableMissing'));
			return;
		}
		saveCall(state.table);
		alert(`${t('callStaff')} - ${t('tableLabel')} ${state.table}`);
	});
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
		return `
			<div class="cart-item" data-line="${line.lineId}">
				<div class="thumb"><img src="${createThumb(line.name)}" alt="${line.name}"></div>
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
	el.cartItemsWrap.querySelectorAll('.inc').forEach(button => button.addEventListener('click', () => changeLineQty(button.dataset.line, 1)));
	el.cartItemsWrap.querySelectorAll('.dec').forEach(button => button.addEventListener('click', () => changeLineQty(button.dataset.line, -1)));
}

function openCart(){
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

el.cartBtn.addEventListener('click', () => {
	renderCartItems();
	openCart();
});
el.cartOverlay.addEventListener('click', closeCart);
el.closeSheet.addEventListener('click', closeCart);
el.clearCartBtn.addEventListener('click', () => {
	state.lines = [];
	updateCartState();
});

el.placeOrderBtn.addEventListener('click', () => {
	const total = el.cartTotal.textContent;
	const note = el.cartNote?.value || '';
	if(state.lines.length === 0){
		alert(t('cartEmpty'));
		return;
	}

	const lines = state.lines.map(line => `${line.name} x${line.qty} = ฿${line.price * line.qty}`).join('\n');
	const tableText = state.table ? `${t('tableLabel')} ${state.table}` : t('tableMissing');
	const payload = {
		table: state.table || null,
		total,
		note,
		items: state.lines.map(line => ({ id: line.id, name: line.name, qty: line.qty, price: line.price }))
	};
	console.log('Order payload:', payload);
	alert(`${t('orderSuccess')}\n\n${lines}\n\n${t('totalLabel')}: ${total}\n${tableText}\n${t('orderNoteLabel')}: ${note || '-'}`);
	saveOrder(payload);
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
    items: payload.items,
    note: payload.note,
    total: payload.total || el.cartTotal.textContent,
    status: 'pending',
    createdAt: now,
    unread: true
  };
  await db.collection('orders').doc(order.orderId).set(order);
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
renderTableInfo();

window.addEventListener('storage', (event) => {
	if(event.key === 'menu') renderMenu();
});
window.addEventListener('menu:changed', () => renderMenu());
document.addEventListener('keydown', event => {
	if(event.key === 'Escape') closeCart();
});
window.addEventListener('announcement:changed', () => {
	if(el.announcement) el.announcement.textContent = localStorage.getItem('announcement') || t('announcement');
});
