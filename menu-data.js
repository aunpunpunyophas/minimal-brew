(function(){
    // 💡 อัปเดตเวอร์ชันเพื่อล้าง LocalStorage เก่า เมนูที่สั่งลบจะได้หายไปจริง ๆ ครับ
    const MENU_VERSION = 20260528;
    const categories = ['all', 'coffee', 'nonCoffee', 'bakery', 'cake', 'recommended'];
    
    // 💡 ใส่ ID ของเมนูที่ต้องการคัดออกทั้งหมดลงใน Set นี้เพื่อกรองข้อมูลเก่าทิ้งให้สะอาด
    const RETIRED_DEFAULT_IDS = new Set([
        7, 9, 10, 11, 12, 14, 15, 17, 22, 24, 25, 26, 27, 29, 30, 31, 32, 34, 35, 37, 38, 39, 40, 41, 42, 43
    ]);

    const defaultMenu = [
        {id:1,name:{th:'เอสเปรสโซ',en:'Espresso'},price:45,category:'coffee'},
        {id:2,name:{th:'อเมริกาโน',en:'Americano'},price:50,category:'coffee'},
        {id:3,name:{th:'ลาเต้',en:'Latte'},price:60,category:'coffee'},
        {id:4,name:{th:'คาปูชิโน',en:'Cappuccino'},price:65,category:'coffee',recommended:true},
        {id:5,name:{th:'มอคค่า',en:'Mocha'},price:70,category:'coffee'},
        {id:6,name:{th:'คาราเมลมัคคิอาโต',en:'Caramel Macchiato'},price:75,category:'coffee',recommended:true},
        {id:8,name:{th:'เดอร์ตี้คอฟฟี่',en:'Dirty Coffee'},price:85,category:'coffee',recommended:true},
        {id:13,name:{th:'นมสด',en:'Fresh Milk'},price:45,category:'nonCoffee'},
        {id:16,name:{th:'โกโก้',en:'Cocoa'},price:60,category:'nonCoffee'},
        {id:18,name:{th:'ชาไทย',en:'Thai Tea'},price:55,category:'nonCoffee'},
        {id:19,name:{th:'ชาเขียวมัทฉะ',en:'Matcha Green Tea'},price:70,category:'nonCoffee',recommended:true},
        {id:20,name:{th:'ชานม',en:'Milk Tea'},price:55,category:'nonCoffee'},
        {id:21,name:{th:'ชามะนาว',en:'Lemon Tea'},price:60,category:'nonCoffee'}, 
        {id:23,name:{th:'โซดามะนาว',en:'Lemon Soda'},price:55,category:'nonCoffee'},   
        {id:28,name:{th:'โดนัท',en:'Donut'},price:40,category:'bakery'},    
        {id:33,name:{th:'แซนด์วิช',en:'Sandwich'},price:75,category:'bakery'},
        {id:36,name:{th:'บลูเบอร์รี่ชีสเค้ก',en:'Blueberry Cheesecake'},price:110,category:'cake',recommended:true}
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

    function filterRetiredDefaultItems(items){
        return items.filter(item => !RETIRED_DEFAULT_IDS.has(Number(item?.id)));
    }

    function normalizeMenu(items){
        return filterRetiredDefaultItems(
            items
                .filter(Boolean)
                .map(item => ({
                    ...item,
                    id: Number(item.id),
                    name: normalizeName(item.name),
                    category: item.category || 'coffee'
                }))
                .filter(item => Number.isFinite(item.id))
        );
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

    function getItemImage(item){
        const rawImage = typeof item?.image === 'string' ? item.image.trim() : '';
        if(rawImage){
            return rawImage;
        }

        const itemId = Number(item?.id);
        
        // รูปสิทธิพิเศษของ Fresh Milk
        if (itemId === 13) {
            return 'eiliv-aceron-_8bnn1GqX70-unsplash.jpg';
        }

        return defaultIds.has(itemId) ? `${itemId}.jpg` : '';
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
        const normalized = mergeMenuWithDefaults(menu);
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
        getItemImage,
        getSearchText
    };
})();