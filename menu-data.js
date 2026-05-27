(function(){
	const MENU_VERSION = 20260522;
	const categories = ['all', 'coffee', 'nonCoffee', 'bakery', 'cake', 'recommended'];
	const defaultMenu = [
		{id:1,name:{th:'เอสเพรสโซ',en:'Espresso'},price:45,category:'coffee'},
		{id:2,name:{th:'อเมริกาโน',en:'Americano'},price:50,category:'coffee'},
		{id:3,name:{th:'ลาเต้',en:'Latte'},price:60,category:'coffee'},
		{id:4,name:{th:'คาปูชิโน',en:'Cappuccino'},price:65,category:'coffee',recommended:true},
		{id:5,name:{th:'มอคค่า',en:'Mocha'},price:70,category:'coffee'},
		{id:6,name:{th:'คาราเมลมัคคิอาโต',en:'Caramel Macchiato'},price:75,category:'coffee',recommended:true},
		{id:7,name:{th:'เอสเพรสโซโทนิก',en:'Espresso Tonic'},price:80,category:'coffee'},
		{id:8,name:{th:'เดอร์ตี้คอฟฟี่',en:'Dirty Coffee'},price:85,category:'coffee',recommended:true},
		{id:9,name:{th:'โคโคนัทลาเต้',en:'Coconut Latte'},price:85,category:'coffee'},
		{id:10,name:{th:'ฮันนี่ลาเต้',en:'Honey Latte'},price:75,category:'coffee'},
		{id:11,name:{th:'วานิลลาลาเต้',en:'Vanilla Latte'},price:75,category:'coffee'},
		{id:12,name:{th:'เฮเซลนัทลาเต้',en:'Hazelnut Latte'},price:75,category:'coffee'},
		{id:13,name:{th:'นมสด',en:'Fresh Milk'},price:45,category:'nonCoffee'},
		{id:14,name:{th:'นมสดคาราเมล',en:'Caramel Fresh Milk'},price:55,category:'nonCoffee'},
		{id:15,name:{th:'นมสดวานิลลา',en:'Vanilla Fresh Milk'},price:55,category:'nonCoffee'},
		{id:16,name:{th:'โกโก้',en:'Cocoa'},price:60,category:'nonCoffee'},
		{id:17,name:{th:'โกโก้เข้ม',en:'Dark Cocoa'},price:70,category:'nonCoffee',recommended:true},
		{id:18,name:{th:'ชาไทย',en:'Thai Tea'},price:55,category:'nonCoffee'},
		{id:19,name:{th:'ชาเขียวมัทฉะ',en:'Matcha Green Tea'},price:70,category:'nonCoffee',recommended:true},
		{id:20,name:{th:'ชานม',en:'Milk Tea'},price:55,category:'nonCoffee'},
		{id:21,name:{th:'ชามะนาว',en:'Lemon Tea'},price:60,category:'nonCoffee'},
		{id:22,name:{th:'น้ำผึ้งมะนาว',en:'Honey Lemon'},price:60,category:'nonCoffee'},
		{id:23,name:{th:'โซดามะนาว',en:'Lemon Soda'},price:55,category:'nonCoffee'},
		{id:24,name:{th:'โซดาสตรอว์เบอร์รี',en:'Strawberry Soda'},price:60,category:'nonCoffee'},
		{id:25,name:{th:'ครัวซองต์',en:'Croissant'},price:55,category:'bakery',recommended:true},
		{id:26,name:{th:'ครัวซองต์ช็อกโกแลต',en:'Chocolate Croissant'},price:65,category:'bakery'},
		{id:27,name:{th:'ครัวซองต์อัลมอนด์',en:'Almond Croissant'},price:75,category:'bakery',recommended:true},
		{id:28,name:{th:'โดนัท',en:'Donut'},price:40,category:'bakery'},
		{id:29,name:{th:'คุกกี้ช็อกโกแลตชิป',en:'Chocolate Chip Cookie'},price:45,category:'bakery'},
		{id:30,name:{th:'บราวนี่',en:'Brownie'},price:55,category:'bakery'},
		{id:31,name:{th:'ขนมปังเนยน้ำตาล',en:'Butter Sugar Bread'},price:45,category:'bakery'},
		{id:32,name:{th:'โทสต์',en:'Toast'},price:50,category:'bakery'},
		{id:33,name:{th:'แซนด์วิช',en:'Sandwich'},price:75,category:'bakery'},
		{id:34,name:{th:'เบเกิล',en:'Bagel'},price:60,category:'bakery'},
		{id:35,name:{th:'ชีสเค้ก',en:'Cheesecake'},price:95,category:'cake'},
		{id:36,name:{th:'บลูเบอร์รี่ชีสเค้ก',en:'Blueberry Cheesecake'},price:110,category:'cake',recommended:true},
		{id:37,name:{th:'ช็อกโกแลตเค้ก',en:'Chocolate Cake'},price:95,category:'cake'},
		{id:38,name:{th:'เรดเวลเวทเค้ก',en:'Red Velvet Cake'},price:105,category:'cake'},
		{id:39,name:{th:'เค้กวนิลา',en:'Vanilla Cake'},price:90,category:'cake'},
		{id:40,name:{th:'เค้กมะพร้าว',en:'Coconut Cake'},price:95,category:'cake'},
		{id:41,name:{th:'ทีรามิสุ',en:'Tiramisu'},price:110,category:'cake',recommended:true},
		{id:42,name:{th:'มัทฉะเค้ก',en:'Matcha Cake'},price:100,category:'cake'},
		{id:43,name:{th:'เค้กสตรอว์เบอร์รี',en:'Strawberry Cake'},price:105,category:'cake'}
	];

	const defaultIds = new Set(defaultMenu.map(item => item.id));

	function cloneMenu(items){
		return JSON.parse(JSON.stringify(items));
	}

	function normalizeName(rawName){
		if(typeof rawName === 'object' && rawName !== null){
			return {
				th: rawName.th || rawName.en || '',
				en: rawName.en || rawName.th || ''
			};
		}

		const fallback = String(rawName || '');
		return { th: fallback, en: fallback };
	}

	function normalizeMenu(items){
		return items.map(item => ({
			...item,
			name: normalizeName(item.name),
			category: item.category || 'coffee'
		}));
	}

	function getItemName(item, lang){
		const name = normalizeName(item?.name);
		return name[lang] || name.en || name.th || '';
	}

	function getSecondaryName(item, lang){
		const name = normalizeName(item?.name);
		const primary = getItemName(item, lang);
		const secondary = lang === 'th' ? name.en : name.th;
		return secondary && secondary !== primary ? secondary : '';
	}

	function getSearchText(item){
		const name = normalizeName(item?.name);
		return `${name.th} ${name.en}`.trim().toLowerCase();
	}

	function getSoldNameSet(items){
		return new Set(
			items
				.filter(item => item.sold)
				.flatMap(item => [normalizeName(item.name).th, normalizeName(item.name).en])
				.filter(Boolean)
				.map(name => name.toLowerCase())
		);
	}

	function mergeMenuWithDefaults(items){
		const normalized = normalizeMenu(items);
		const existingById = new Map(normalized.map(item => [item.id, item]));
		const mergedDefaults = defaultMenu.map(defaultItem => {
			const existing = existingById.get(defaultItem.id);
			if(!existing){
				return { ...defaultItem };
			}

			const existingName = normalizeName(existing.name);
			return {
				...defaultItem,
				...existing,
				name: {
					th: existingName.th || defaultItem.name.th,
					en: existingName.en || defaultItem.name.en
				},
				category: existing.category || defaultItem.category
			};
		});
		const customItems = normalized.filter(item => !defaultIds.has(item.id));
		return mergedDefaults.concat(customItems);
	}

	function ensureMenuStorage(){
		const raw = localStorage.getItem('menu');
		if(!raw){
			const seededMenu = cloneMenu(defaultMenu);
			localStorage.setItem('menu', JSON.stringify(seededMenu));
			localStorage.setItem('menuVersion', String(MENU_VERSION));
			return seededMenu;
		}

		try{
			const parsed = normalizeMenu(JSON.parse(raw));
			const storedVersion = Number(localStorage.getItem('menuVersion') || 0);
			const customItems = parsed.filter(item => !defaultIds.has(item.id));
			let nextMenu;

			if(storedVersion < MENU_VERSION){
				const soldNames = getSoldNameSet(parsed);
				nextMenu = cloneMenu(defaultMenu)
					.map(item => soldNames.has(item.name.th.toLowerCase()) || soldNames.has(item.name.en.toLowerCase()) ? { ...item, sold: true } : item)
					.concat(customItems);
			}else{
				nextMenu = mergeMenuWithDefaults(parsed);
			}

			localStorage.setItem('menu', JSON.stringify(nextMenu));
			localStorage.setItem('menuVersion', String(MENU_VERSION));
			return nextMenu;
		}catch(error){
			const seededMenu = cloneMenu(defaultMenu);
			localStorage.setItem('menu', JSON.stringify(seededMenu));
			localStorage.setItem('menuVersion', String(MENU_VERSION));
			return seededMenu;
		}
	}

	function loadMenu(){
		const raw = localStorage.getItem('menu');
		if(!raw){
			return cloneMenu(defaultMenu);
		}

		try{
			return normalizeMenu(JSON.parse(raw));
		}catch(error){
			return cloneMenu(defaultMenu);
		}
	}

	function saveMenu(menu){
		const normalized = normalizeMenu(menu);
		localStorage.setItem('menu', JSON.stringify(normalized));
		localStorage.setItem('menuVersion', String(MENU_VERSION));
		window.dispatchEvent(new Event('menu:changed'));
	}

	window.MenuData = {
		MENU_VERSION,
		categories,
		defaultMenu,
		normalizeMenu,
		ensureMenuStorage,
		loadMenu,
		saveMenu,
		getItemName,
		getSecondaryName,
		getSearchText
	};
})();
