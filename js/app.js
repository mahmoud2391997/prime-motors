/* ================= Prime Motors — App ================= */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const app = $('#app');
const fmt = n => n.toLocaleString('en-US');
const money = n => `${fmt(n)} <small>${CURRENCY}</small>`;

/* ---------- Icons ---------- */
const ICONS = {
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>',
  heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-4.4-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.6-9.5 9-9.5 9Z"/></svg>',
  cal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
  road: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 21 9 3M19 21 15 3M12 6v2M12 11v2M12 16v2"/></svg>',
  fuel: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16M3 21h12M4 10h10M14 8l3 3v6a2 2 0 0 0 4 0V9l-3-3"/></svg>',
  gear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="5" cy="6" r="2"/><circle cx="12" cy="6" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="5" cy="18" r="2"/><circle cx="12" cy="18" r="2"/><path d="M5 8v8M12 8v8M19 8v4H5"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z"/><path d="m9 12 2 2 4-4"/></svg>',
  card: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M6 15h4"/></svg>',
  swap: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 4 3 8l4 4M3 8h14M17 20l4-4-4-4M21 16H7"/></svg>',
  wrench: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a4 4 0 0 0 5 5L21 13l-8 8-3-3 8-8-1.3-1.3a4 4 0 0 0-5-5L14 6Z"/><path d="M3 21l6-6"/></svg>',
  truck: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>',
  doc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-6-6Z"/><path d="M14 3v6h6M8 13h8M8 17h5"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  filter: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 5h18l-7 8v6l-4 2v-8L3 5Z"/></svg>'
};

/* ---------- Car photo ---------- */
const photo = (id, alt, w = 900) => `<img src="${IMG(id, w)}" alt="${alt}" loading="lazy" decoding="async">`;

/* ---------- Favorites (per-browser convenience) ---------- */
const favs = new Set((() => { try { return JSON.parse(localStorage.getItem('pm_favs') || '[]'); } catch { return []; } })());
function toggleFav(id) {
  favs.has(id) ? favs.delete(id) : favs.add(id);
  try { localStorage.setItem('pm_favs', JSON.stringify([...favs])); } catch {}
  return favs.has(id);
}

/* ---------- Components ---------- */
function carCard(c) {
  return `<article class="car-card">
    <a href="#/car/${c.id}" class="car-media" aria-label="${c.brand} ${c.model}">
      <span class="badge ${c.condition === 'مستعملة' ? 'used' : ''}">${c.condition}</span>
      ${photo(c.photos[0], `${c.brand} ${c.model}`, 700)}
    </a>
    <button class="fav ${favs.has(c.id) ? 'on' : ''}" data-fav="${c.id}" aria-label="إضافة للمفضلة">${ICONS.heart}</button>
    <div class="car-body">
      <div class="car-title"><small>${c.brand} · ${c.type}</small><h3>${c.model}</h3></div>
      <div class="specs">
        <span>${ICONS.cal}${c.year}</span>
        <span>${ICONS.road}${c.km ? fmt(c.km) + ' كم' : 'زيرو'}</span>
        <span>${ICONS.fuel}${c.fuel}</span>
        <span>${ICONS.gear}${c.gear}</span>
      </div>
      <div class="car-foot">
        <div class="price">${money(c.price)}</div>
        <a href="#/car/${c.id}" class="link-arrow">التفاصيل ${ICONS.arrow}</a>
      </div>
    </div>
  </article>`;
}
const featureCard = f => `<div class="feature"><div class="ic">${ICONS[f.icon]}</div><h3>${f.title}</h3><p>${f.text}</p></div>`;
const uniq = key => [...new Set(CARS.map(c => c[key]))];
const MAX_PRICE = Math.ceil(Math.max(...CARS.map(c => c.price)) / 50000) * 50000;
const options = (arr, all) => `<option value="">${all}</option>` + arr.map(v => `<option>${v}</option>`).join('');

/* ================= Pages ================= */
function Home() {
  return `
  <section class="hero" style="--hero-img:url('${IMG(PHOTOS.hero, 1920)}')">
    <div class="container">
      <div class="hero-grid">
        <div>
          <span class="eyebrow">★ أكثر من 500 سيارة متاحة الآن</span>
          <h1>قُد سيارة أحلامك<br>مع <em>Prime Motors</em></h1>
          <p class="lead">سيارات جديدة ومستعملة معتمدة من أفضل العلامات العالمية، بفحص شامل وتمويل مرن وضمان حقيقي.</p>
          <div class="hero-actions">
            <a href="#/cars" class="btn btn-gold">تصفح السيارات ${ICONS.arrow}</a>
            <a href="#/contact" class="btn btn-ghost">تحدث مع مستشار</a>
          </div>
          <div class="hero-stats">
            <div><b>+12</b><span>سنة خبرة</span></div>
            <div><b>+8,000</b><span>عميل سعيد</span></div>
            <div><b>25</b><span>علامة تجارية</span></div>
          </div>
        </div>
      </div>

      <form class="quick-search" id="quickSearch">
        <div class="field"><label>الماركة</label><select name="brand">${options(uniq('brand'), 'كل الماركات')}</select></div>
        <div class="field"><label>نوع الهيكل</label><select name="type">${options(uniq('type'), 'كل الأنواع')}</select></div>
        <div class="field"><label>الحالة</label><select name="condition">${options(uniq('condition'), 'الكل')}</select></div>
        <div class="field"><label>أقصى سعر</label><select name="max">
          <option value="">بدون حد</option><option value="150000">150,000</option><option value="300000">300,000</option><option value="500000">500,000</option>
        </select></div>
        <button class="btn btn-gold" type="submit">ابحث الآن</button>
      </form>
    </div>
  </section>

  <section>
    <div class="container">
      <div class="section-head">
        <div><span class="kicker">مختارات المعرض</span><h2>سيارات مميزة</h2></div>
        <a href="#/cars" class="btn btn-ghost">عرض الكل ${ICONS.arrow}</a>
      </div>
      <div class="grid-cars">${CARS.filter(c => c.featured).slice(0, 6).map(carCard).join('')}</div>
    </div>
  </section>

  <section class="alt">
    <div class="container">
      <div class="section-head">
        <div><span class="kicker">لماذا Prime Motors؟</span><h2>تجربة شراء مختلفة</h2></div>
        <p>نؤمن أن شراء السيارة يجب أن يكون تجربة ممتعة وواضحة، لذلك صممنا خدماتنا لتمنحك الثقة في كل خطوة.</p>
      </div>
      <div class="grid-3">${SERVICES.slice(0, 3).map(featureCard).join('')}</div>
    </div>
  </section>

  <section>
    <div class="container">
      <div class="section-head" style="justify-content:center;text-align:center">
        <div><span class="kicker">تسوّق حسب الماركة</span><h2>علامات نفخر بها</h2></div>
      </div>
      <div class="brands">${uniq('brand').map(b => `<a href="#/cars?brand=${encodeURIComponent(b)}">${b}</a>`).join('')}</div>
    </div>
  </section>

  <section class="alt">
    <div class="container">
      <div class="section-head"><div><span class="kicker">آراء العملاء</span><h2>ماذا يقول عملاؤنا</h2></div></div>
      <div class="grid-3">${TESTIMONIALS.map(t => `
        <div class="testimonial">
          <div class="stars">★★★★★</div><p>"${t.text}"</p>
          <div class="who"><div class="avatar">${t.name[0]}</div><div><b>${t.name}</b><small>${t.car}</small></div></div>
        </div>`).join('')}</div>
    </div>
  </section>

  <section>
    <div class="container">
      <div class="cta-band" style="--cta-img:url('${IMG(PHOTOS.cta, 1600)}')">
        <div><h2>لديك سيارة وتريد استبدالها؟</h2><p>احصل على تقييم مجاني لسيارتك خلال 30 دقيقة.</p></div>
        <a href="#/contact?subject=استبدال" class="btn btn-gold">اطلب تقييماً مجانياً</a>
      </div>
    </div>
  </section>`;
}

function Cars(params) {
  return `
  <div class="page-head"><div class="container">
    <div class="crumbs"><a href="#/">الرئيسية</a> / السيارات</div>
    <h1>معرض السيارات</h1><p>اختر من بين تشكيلة واسعة من السيارات الجديدة والمستعملة المعتمدة.</p>
  </div></div>
  <div class="container listing">
    <aside class="filters" id="filters">
      <h3>تصفية النتائج <button type="button" id="resetF">إعادة تعيين</button></h3>
      <div class="field"><label>بحث</label><input id="fSearch" placeholder="مثال: لاند كروزر" value="${params.q || ''}"></div>
      <div class="field"><label>الماركة</label><select id="fBrand">${options(uniq('brand'), 'كل الماركات')}</select></div>
      <div class="field"><label>نوع الهيكل</label><div class="chips" data-group="type">${uniq('type').map(t => `<button type="button" class="chip" data-v="${t}">${t}</button>`).join('')}</div></div>
      <div class="field"><label>الحالة</label><div class="chips" data-group="condition">${uniq('condition').map(t => `<button type="button" class="chip" data-v="${t}">${t}</button>`).join('')}</div></div>
      <div class="field"><label>نوع الوقود</label><div class="chips" data-group="fuel">${uniq('fuel').map(t => `<button type="button" class="chip" data-v="${t}">${t}</button>`).join('')}</div></div>
      <div class="field"><label>أقصى سعر: <b id="maxLbl"></b></label><input type="range" id="fMax" min="50000" max="${MAX_PRICE}" step="10000"></div>
    </aside>
    <div>
      <div class="toolbar">
        <button class="btn btn-ghost filter-toggle" id="filterToggle">${ICONS.filter} الفلاتر</button>
        <div class="count">عدد النتائج: <b id="count">0</b></div>
        <select id="sort" aria-label="ترتيب">
          <option value="new">الأحدث</option><option value="low">السعر: من الأقل</option>
          <option value="high">السعر: من الأعلى</option><option value="km">الأقل ممشى</option>
        </select>
      </div>
      <div class="grid-cars" id="results"></div>
    </div>
  </div>`;
}
function initCars(params) {
  const state = {
    brand: params.brand || '', max: +params.max || MAX_PRICE,
    type: new Set(params.type ? [params.type] : []),
    condition: new Set(params.condition ? [params.condition] : []),
    fuel: new Set(), q: params.q || '', sort: 'new'
  };
  $('#fBrand').value = state.brand; $('#fMax').value = state.max;
  $$('.chips').forEach(g => $$('.chip', g).forEach(ch => ch.classList.toggle('on', state[g.dataset.group].has(ch.dataset.v))));

  const render = () => {
    $('#maxLbl').textContent = fmt(state.max) + ' ' + CURRENCY;
    const q = state.q.trim().toLowerCase();
    let list = CARS.filter(c =>
      (!state.brand || c.brand === state.brand) && c.price <= state.max &&
      (!state.type.size || state.type.has(c.type)) &&
      (!state.condition.size || state.condition.has(c.condition)) &&
      (!state.fuel.size || state.fuel.has(c.fuel)) &&
      (!q || `${c.brand} ${c.model} ${c.type}`.toLowerCase().includes(q)));
    const sorters = { new: (a, b) => b.year - a.year, low: (a, b) => a.price - b.price, high: (a, b) => b.price - a.price, km: (a, b) => a.km - b.km };
    list.sort(sorters[state.sort]);
    $('#count').textContent = list.length;
    $('#results').innerHTML = list.length ? list.map(carCard).join('')
      : `<div class="empty" style="grid-column:1/-1">لا توجد سيارات مطابقة لبحثك.<br><button class="btn btn-ghost mt-2" id="clearEmpty">مسح الفلاتر</button></div>`;
  };
  const reset = () => {
    Object.assign(state, { brand: '', max: MAX_PRICE, q: '' });
    ['type', 'condition', 'fuel'].forEach(k => state[k].clear());
    $('#fBrand').value = ''; $('#fMax').value = MAX_PRICE; $('#fSearch').value = '';
    $$('.chip').forEach(c => c.classList.remove('on')); render();
  };
  $('#fBrand').onchange = e => { state.brand = e.target.value; render(); };
  $('#fMax').oninput = e => { state.max = +e.target.value; render(); };
  $('#fSearch').oninput = e => { state.q = e.target.value; render(); };
  $('#sort').onchange = e => { state.sort = e.target.value; render(); };
  $('#resetF').onclick = reset;
  $('#filterToggle').onclick = () => $('#filters').classList.toggle('open');
  $$('.chips').forEach(g => g.addEventListener('click', e => {
    const ch = e.target.closest('.chip'); if (!ch) return;
    const set = state[g.dataset.group];
    set.has(ch.dataset.v) ? set.delete(ch.dataset.v) : set.add(ch.dataset.v);
    ch.classList.toggle('on'); render();
  }));
  $('#results').addEventListener('click', e => { if (e.target.closest('#clearEmpty')) reset(); });
  render();
}

function Details(id) {
  const c = CARS.find(x => x.id === +id);
  if (!c) return `<div class="container"><div class="empty mt-3" style="margin-block:80px">السيارة غير موجودة. <a href="#/cars" class="link-arrow">العودة للمعرض</a></div></div>`;
  const similar = CARS.filter(x => x.id !== c.id && (x.type === c.type || x.brand === c.brand)).slice(0, 3);
  const feats = ['كاميرا 360°', 'مثبت سرعة تكيفي', 'Apple CarPlay / Android Auto', 'فتحة سقف بانورامية', 'مقاعد جلد مدفأة ومبردة', 'تشغيل بدون مفتاح', 'نظام تحذير النقطة العمياء', 'إضاءة LED كاملة'];
  return `
  <div class="page-head"><div class="container">
    <div class="crumbs"><a href="#/">الرئيسية</a> / <a href="#/cars">السيارات</a> / ${c.brand} ${c.model}</div>
  </div></div>
  <div class="container">
    <div class="details">
      <div>
        <div class="gallery-main">
          <span class="badge ${c.condition === 'مستعملة' ? 'used' : ''}">${c.condition}</span>
          <img id="mainPhoto" src="${IMG(c.photos[0], 1400)}" alt="${c.brand} ${c.model}">
          ${c.photos.length > 1 ? `<span class="photo-count" id="photoCount">1 / ${c.photos.length}</span>` : ''}
        </div>
        ${c.photos.length > 1 ? `<div class="thumbs">${c.photos.map((p, i) => `<button class="thumb ${i ? '' : 'on'}" data-i="${i}" aria-label="صورة ${i + 1}">${photo(p, '', 300)}</button>`).join('')}</div>` : ''}

        <div class="panel mt-3">
          <h3>عن السيارة</h3><p class="muted">${c.desc}</p>
          <div class="spec-table">
            <div><small>سنة الصنع</small><b>${c.year}</b></div>
            <div><small>الممشى</small><b>${c.km ? fmt(c.km) + ' كم' : 'زيرو كم'}</b></div>
            <div><small>المحرك</small><b dir="ltr">${c.engine}</b></div>
            <div><small>القوة</small><b>${c.hp} حصان</b></div>
            <div><small>ناقل الحركة</small><b>${c.gear}</b></div>
            <div><small>الوقود</small><b>${c.fuel}</b></div>
            <div><small>اللون</small><b>${c.color}</b></div>
            <div><small>عدد المقاعد</small><b>${c.seats}</b></div>
            <div><small>نوع الهيكل</small><b>${c.type}</b></div>
            <div><small>الحالة</small><b>${c.condition}</b></div>
          </div>
        </div>
        <div class="panel"><h3>المواصفات والتجهيزات</h3><ul class="check-list">${feats.map(f => `<li>${f}</li>`).join('')}</ul></div>
      </div>

      <div>
        <div class="panel">
          <small class="muted">${c.brand} · ${c.type}</small>
          <h2>${c.model} ${c.year}</h2>
          <div class="big-price">${fmt(c.price)} ${CURRENCY}</div>
          <small class="muted">السعر شامل الضريبة · رقم الإعلان PM-${String(c.id).padStart(4, '0')}</small>
          <div class="hero-actions mt-3">
            <a href="#/contact?subject=${encodeURIComponent('حجز تجربة قيادة: ' + c.brand + ' ' + c.model)}" class="btn btn-gold btn-block">احجز تجربة قيادة</a>
            <a href="https://wa.me/966500000000?text=${encodeURIComponent('استفسار عن ' + c.brand + ' ' + c.model + ' ' + c.year)}" target="_blank" rel="noopener" class="btn btn-ghost btn-block">استفسر عبر واتساب</a>
          </div>
        </div>

        <div class="panel">
          <h3>حاسبة التقسيط</h3>
          <div class="field"><div class="calc-row"><span>الدفعة الأولى</span><b id="dpLbl"></b></div><input type="range" id="dp" min="0" max="50" step="5" value="20"></div>
          <div class="field mt-2"><div class="calc-row"><span>مدة التمويل</span><b id="yrLbl"></b></div><input type="range" id="yr" min="1" max="5" step="1" value="4"></div>
          <div class="monthly"><small class="muted">القسط الشهري التقريبي</small><b id="monthly"></b><small class="muted">بنسبة ربح 3.5% سنوياً (تقديرية)</small></div>
        </div>

        <div class="panel">
          <h3>اطلب عرض سعر</h3>
          <form class="lead-form" novalidate>
            <div class="field"><label>الاسم</label><input name="name" required><div class="err">الرجاء إدخال الاسم</div></div>
            <div class="field mt-2"><label>رقم الجوال</label><input name="phone" type="tel" dir="ltr" placeholder="05xxxxxxxx" required><div class="err">رقم جوال غير صحيح</div></div>
            <button class="btn btn-gold btn-block mt-2" type="submit">إرسال الطلب</button>
          </form>
        </div>
      </div>
    </div>

    ${similar.length ? `<section style="padding-top:24px">
      <div class="section-head"><div><span class="kicker">قد يعجبك أيضاً</span><h2>سيارات مشابهة</h2></div></div>
      <div class="grid-cars">${similar.map(carCard).join('')}</div>
    </section>` : ''}
  </div>`;
}
function initDetails(id) {
  const c = CARS.find(x => x.id === +id); if (!c) return;
  $$('.thumb').forEach(t => t.onclick = () => {
    $$('.thumb').forEach(x => x.classList.remove('on')); t.classList.add('on');
    $('#mainPhoto').src = IMG(c.photos[+t.dataset.i], 1400);
    $('#photoCount').textContent = `${+t.dataset.i + 1} / ${c.photos.length}`;
  });
  const calc = () => {
    const dp = +$('#dp').value, yr = +$('#yr').value;
    const down = c.price * dp / 100, financed = c.price - down;
    const monthly = financed * (1 + 0.035 * yr) / (yr * 12);
    $('#dpLbl').textContent = `${dp}% (${fmt(Math.round(down))} ${CURRENCY})`;
    $('#yrLbl').textContent = `${yr} ${yr === 1 ? 'سنة' : yr === 2 ? 'سنتان' : 'سنوات'}`;
    $('#monthly').textContent = `${fmt(Math.round(monthly))} ${CURRENCY}`;
  };
  $('#dp').oninput = calc; $('#yr').oninput = calc; calc();
}

function About() {
  const steps = [
    { icon: 'cal', title: 'اختر سيارتك', text: 'تصفح المعرض أونلاين أو زرنا واطلب تجربة قيادة.' },
    { icon: 'card', title: 'حدد طريقة الدفع', text: 'نقداً أو تمويلاً بنكياً مع أفضل العروض المتاحة.' },
    { icon: 'truck', title: 'استلم سيارتك', text: 'ننهي الأوراق ونسلمك السيارة في المعرض أو منزلك.' }
  ];
  return `
  <div class="page-head"><div class="container">
    <div class="crumbs"><a href="#/">الرئيسية</a> / من نحن</div>
    <h1>من نحن</h1><p>قصة شغف بالسيارات بدأت عام 2014.</p>
  </div></div>
  <section>
    <div class="container about-grid">
      <div>
        <span class="kicker">Prime Motors</span>
        <h2 style="font-size:clamp(26px,3.4vw,38px);line-height:1.35;margin-bottom:14px">نصنع الثقة قبل أن نبيع السيارة</h2>
        <p class="muted">انطلقت Prime Motors برؤية واضحة: أن نقدّم تجربة شراء سيارات شفافة وراقية. اليوم نمتلك واحداً من أكبر المعارض في المنطقة بمساحة تتجاوز 6,000 م²، وفريقاً من المستشارين والفنيين المعتمدين.</p>
        <p class="muted mt-2">كل سيارة في معرضنا تخضع لفحص فني شامل وتأتي بتقرير مفصل وسجل صيانة واضح، لأننا نؤمن أن رضاك هو أفضل إعلان لنا.</p>
        <div class="hero-actions mt-3"><a href="#/cars" class="btn btn-gold">تصفح المعرض</a><a href="#/contact" class="btn btn-ghost">زورونا</a></div>
      </div>
      <div class="about-visual">${photo(PHOTOS.about, 'صالة عرض Prime Motors', 1200)}</div>
    </div>
  </section>
  <section style="padding-top:0">
    <div class="container numbers">
      <div><b>+12</b><span>سنة خبرة</span></div>
      <div><b>+8K</b><span>عميل</span></div>
      <div><b>+500</b><span>سيارة متاحة</span></div>
      <div><b>98%</b><span>رضا العملاء</span></div>
    </div>
  </section>
  <section class="alt" id="services">
    <div class="container">
      <div class="section-head"><div><span class="kicker">خدماتنا</span><h2>كل ما تحتاجه في مكان واحد</h2></div></div>
      <div class="grid-3">${SERVICES.map(featureCard).join('')}</div>
    </div>
  </section>
  <section>
    <div class="container">
      <div class="section-head"><div><span class="kicker">كيف نعمل</span><h2>3 خطوات لسيارتك الجديدة</h2></div></div>
      <div class="grid-3 steps">${steps.map(featureCard).join('')}</div>
    </div>
  </section>`;
}

function Contact(params) {
  const subjects = ['استفسار عام', 'حجز تجربة قيادة', 'تمويل وتقسيط', 'استبدال', 'خدمة ما بعد البيع'];
  const sub = params.subject || '';
  const inList = subjects.some(s => sub.startsWith(s));
  return `
  <div class="page-head"><div class="container">
    <div class="crumbs"><a href="#/">الرئيسية</a> / تواصل معنا</div>
    <h1>تواصل معنا</h1><p>فريقنا جاهز للرد على استفساراتك خلال ساعات العمل.</p>
  </div></div>
  <div class="container contact-grid">
    <div>
      <div class="panel">
        <div class="info-item"><div class="ic">${ICONS.pin}</div><div><b>العنوان</b><small>طريق الملك فهد، حي العليا، الرياض</small></div></div>
        <div class="info-item"><div class="ic">${ICONS.phone}</div><div><b>الهاتف</b><small dir="ltr" style="text-align:right">+966 50 000 0000</small></div></div>
        <div class="info-item"><div class="ic">${ICONS.mail}</div><div><b>البريد الإلكتروني</b><small>info@primemotors.example</small></div></div>
        <div class="info-item"><div class="ic">${ICONS.clock}</div><div><b>أوقات العمل</b><small>السبت – الخميس: 9 ص – 11 م · الجمعة: 4 م – 11 م</small></div></div>
      </div>
      <div class="map" aria-label="خريطة الموقع">
        <div class="road" style="inset:40% 0 auto 0;height:14px"></div>
        <div class="road" style="inset:0 auto 0 55%;width:14px"></div>
        <div class="road" style="inset:70% 0 auto 0;height:8px"></div>
        <div class="pin">${ICONS.pin}</div>
      </div>
    </div>
    <div class="panel">
      <h3>أرسل لنا رسالة</h3>
      <form class="lead-form form-grid" novalidate>
        <div class="field"><label>الاسم الكامل *</label><input name="name" required><div class="err">الرجاء إدخال الاسم</div></div>
        <div class="field"><label>رقم الجوال *</label><input name="phone" type="tel" dir="ltr" placeholder="05xxxxxxxx" required><div class="err">رقم جوال غير صحيح</div></div>
        <div class="field"><label>البريد الإلكتروني</label><input name="email" type="email" dir="ltr"><div class="err">بريد إلكتروني غير صحيح</div></div>
        <div class="field"><label>الموضوع</label><select name="subject">
          ${!inList && sub ? `<option selected>${sub}</option>` : ''}
          ${subjects.map(s => `<option ${sub.startsWith(s) ? 'selected' : ''}>${s}</option>`).join('')}
        </select></div>
        ${inList && sub !== subjects.find(s => sub.startsWith(s)) ? `<div class="field full"><label>السيارة</label><input name="car" value="${sub.split(': ')[1] || ''}"></div>` : ''}
        <div class="field full"><label>رسالتك *</label><textarea name="message" required></textarea><div class="err">الرجاء كتابة رسالتك</div></div>
        <div class="full"><button class="btn btn-gold" type="submit">إرسال الرسالة</button></div>
      </form>
    </div>
  </div>`;
}

/* ================= Shared behaviors ================= */
function toast(msg) {
  const t = $('#toast'); t.textContent = msg; t.classList.add('show');
  clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove('show'), 3200);
}
function validate(form) {
  let ok = true;
  $$('input, textarea', form).forEach(el => {
    const f = el.closest('.field'); if (!f) return;
    const v = el.value.trim();
    let bad = el.required && !v;
    if (!bad && el.name === 'phone') bad = !/^\+?\d[\d\s]{8,14}$/.test(v);
    if (!bad && el.type === 'email' && v) bad = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    f.classList.toggle('error', bad); if (bad) ok = false;
  });
  return ok;
}
document.addEventListener('submit', e => {
  const f = e.target;
  if (f.id === 'quickSearch') {
    e.preventDefault();
    const p = new URLSearchParams([...new FormData(f)].filter(([, v]) => v));
    location.hash = '#/cars' + (p.toString() ? '?' + p : '');
  } else if (f.classList.contains('lead-form')) {
    e.preventDefault();
    if (!validate(f)) return;
    // TODO: ربط الفورم بـ API أو خدمة بريد
    f.reset(); $$('.field', f).forEach(x => x.classList.remove('error'));
    toast('✓ تم استلام طلبك بنجاح، سيتواصل معك فريقنا قريباً.');
  }
});
document.addEventListener('input', e => { const f = e.target.closest('.field.error'); if (f) f.classList.remove('error'); });
document.addEventListener('click', e => {
  const b = e.target.closest('[data-fav]');
  if (b) { e.preventDefault(); const on = toggleFav(+b.dataset.fav); b.classList.toggle('on', on); toast(on ? '♥ أُضيفت إلى المفضلة' : 'أُزيلت من المفضلة'); }
});

/* ================= Router ================= */
function router() {
  const [path, qs] = (location.hash.slice(1) || '/').split('?');
  const params = Object.fromEntries(new URLSearchParams(qs || ''));
  const parts = path.split('/').filter(Boolean);
  const route = parts[0] || 'home';
  let title = 'الرئيسية';

  if (route === 'cars') { app.innerHTML = Cars(params); initCars(params); title = 'السيارات'; }
  else if (route === 'car') { app.innerHTML = Details(parts[1]); initDetails(parts[1]); const c = CARS.find(x => x.id === +parts[1]); title = c ? `${c.brand} ${c.model}` : 'غير موجودة'; }
  else if (route === 'about') { app.innerHTML = About(); title = 'من نحن'; }
  else if (route === 'contact') { app.innerHTML = Contact(params); title = 'تواصل معنا'; }
  else { app.innerHTML = Home(); }

  document.title = `${title} | Prime Motors`;
  const navKey = route === 'car' ? 'cars' : route;
  $$('.nav a').forEach(a => a.classList.toggle('active', a.dataset.route === navKey));
  $('#nav').classList.remove('open');
  window.scrollTo(0, 0);
}
$('#menuBtn').onclick = () => $('#nav').classList.toggle('open');
$('#year').textContent = new Date().getFullYear();
window.addEventListener('hashchange', router);
router();
