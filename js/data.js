// بيانات تجريبية للمعرض — يمكن استبدالها لاحقاً بـ API
// الصور حالياً من Unsplash للعرض فقط؛ في النسخة النهائية تُستبدل بصور سيارات المعرض الفعلية.
const CURRENCY = 'ر.س';
const IMG = (id, w = 900) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;

const CARS = [
  { id: 1, brand: 'مرسيدس', model: 'AMG GT', year: 2024, type: 'كوبيه', price: 598000, km: 8500, fuel: 'بنزين', gear: 'أوتوماتيك', hp: 523, engine: '4.0L V8 Biturbo', seats: 2, condition: 'مستعملة', color: 'رمادي', featured: true,
    photos: ['1618843479313-40f8afb4b4d8', '1605559424843-9e4c228bf1c2', '1617814076367-b759c7d7e738'],
    desc: 'كوبيه رياضية بمحرك V8 مزدوج التيربو، تجمع بين أداء السباقات وفخامة مرسيدس. صيانة كاملة في الوكالة.' },
  { id: 2, brand: 'بورش', model: '911 Carrera S', year: 2024, type: 'كوبيه', price: 615000, km: 5400, fuel: 'بنزين', gear: 'أوتوماتيك', hp: 443, engine: '3.0L Flat-6 Twin-Turbo', seats: 4, condition: 'مستعملة', color: 'أبيض', featured: true,
    photos: ['1614162692292-7ac56d7f7f1e'],
    desc: 'تجربة قيادة رياضية خالصة بتصميم خالد، تسارع من 0 إلى 100 كم/س في 3.5 ثانية.' },
  { id: 3, brand: 'رينج روفر', model: 'Range Rover Vogue', year: 2025, type: 'SUV', price: 685000, km: 0, fuel: 'هايبرد', gear: 'أوتوماتيك', hp: 395, engine: '3.0L I6 MHEV', seats: 5, condition: 'جديدة', color: 'أسود', featured: true,
    photos: ['1563720223185-11003d516935'],
    desc: 'فخامة بريطانية بقدرات طرق وعرة استثنائية، مقصورة هادئة وتقنية هايبرد خفيفة لتوفير الوقود.' },
  { id: 4, brand: 'تسلا', model: 'Model 3 Long Range', year: 2025, type: 'سيدان', price: 195000, km: 0, fuel: 'كهرباء', gear: 'أوتوماتيك', hp: 394, engine: 'Dual Motor AWD', seats: 5, condition: 'جديدة', color: 'أبيض', featured: true,
    photos: ['1560958089-b8a1929cea89', '1606016159991-dfe4f2746ad5'],
    desc: 'مدى يصل إلى 629 كم بشحنة واحدة، تحديثات برمجية لاسلكية وقيادة ذاتية مساعدة.' },
  { id: 5, brand: 'أودي', model: 'RS 7 Sportback', year: 2024, type: 'سيدان', price: 545000, km: 11000, fuel: 'بنزين', gear: 'أوتوماتيك', hp: 591, engine: '4.0L V8 TFSI', seats: 5, condition: 'مستعملة', color: 'رمادي', featured: true,
    photos: ['1616422285623-13ff0162193c', '1606152421802-db97b9c7a11b'],
    desc: 'سبورتباك عائلية بأداء سيارة خارقة ونظام quattro، بحالة الوكالة وضمان ساري.' },
  { id: 6, brand: 'بي إم دبليو', model: 'M4 Competition', year: 2024, type: 'كوبيه', price: 435000, km: 9800, fuel: 'بنزين', gear: 'أوتوماتيك', hp: 503, engine: '3.0L I6 Twin-Turbo', seats: 4, condition: 'مستعملة', color: 'أخضر', featured: true,
    photos: ['1580273916550-e323be2ae537'],
    desc: 'رياضية أيقونية من قسم M، توازن مثالي بين الحلبة والاستخدام اليومي.' },
  { id: 7, brand: 'بي إم دبليو', model: 'M5', year: 2023, type: 'سيدان', price: 389000, km: 26000, fuel: 'بنزين', gear: 'أوتوماتيك', hp: 617, engine: '4.4L V8 Twin-Turbo', seats: 5, condition: 'مستعملة', color: 'أبيض', featured: false,
    photos: ['1555215695-3004980ad54e'],
    desc: 'سيدان تنفيذية بقلب رياضي، دفع رباعي xDrive وتجهيزات كاملة. بدون حوادث.' },
  { id: 8, brand: 'تويوتا', model: 'RAV4 Hybrid', year: 2025, type: 'SUV', price: 142000, km: 0, fuel: 'هايبرد', gear: 'أوتوماتيك', hp: 219, engine: '2.5L Hybrid', seats: 5, condition: 'جديدة', color: 'رمادي', featured: false,
    photos: ['1617469767053-d3b523a0b982'],
    desc: 'SUV عائلية موثوقة واقتصادية في استهلاك الوقود، مع حزمة Toyota Safety Sense.' },
  { id: 9, brand: 'فورد', model: 'Mustang GT', year: 2024, type: 'كوبيه', price: 229000, km: 14000, fuel: 'بنزين', gear: 'أوتوماتيك', hp: 480, engine: '5.0L V8', seats: 4, condition: 'مستعملة', color: 'أسود', featured: false,
    photos: ['1494976388531-d1058494cdd8'],
    desc: 'العضلات الأمريكية الكلاسيكية بمحرك V8 وصوت لا يُنسى.' },
  { id: 10, brand: 'شيفروليه', model: 'Camaro SS', year: 2023, type: 'كوبيه', price: 189000, km: 22000, fuel: 'بنزين', gear: 'أوتوماتيك', hp: 455, engine: '6.2L V8', seats: 4, condition: 'مستعملة', color: 'أزرق', featured: false,
    photos: ['1552519507-da3b142c6e3d'],
    desc: 'أداء قوي بسعر منافس، حالة ممتازة وسجل صيانة موثّق.' },
  { id: 11, brand: 'لامبورغيني', model: 'Huracán EVO', year: 2023, type: 'كوبيه', price: 1150000, km: 7200, fuel: 'بنزين', gear: 'أوتوماتيك', hp: 631, engine: '5.2L V10', seats: 2, condition: 'مستعملة', color: 'برتقالي', featured: false,
    photos: ['1525609004556-c46c7d6cf023', '1612825173281-9a193378527e'],
    desc: 'محرك V10 تنفسي طبيعي وتصميم إيطالي جريء — قطعة نادرة لعشاق الأداء.' },
  { id: 12, brand: 'رولز رويس', model: 'Wraith', year: 2022, type: 'كوبيه', price: 1290000, km: 18000, fuel: 'بنزين', gear: 'أوتوماتيك', hp: 624, engine: '6.6L V12', seats: 4, condition: 'مستعملة', color: 'أبيض / أسود', featured: false,
    photos: ['1631295868223-63265b40d9e4'],
    desc: 'قمة الفخامة البريطانية بسقف النجوم ومحرك V12 صامت.' },
  { id: 13, brand: 'هيونداي', model: 'إلنترا', year: 2025, type: 'سيدان', price: 89000, km: 0, fuel: 'بنزين', gear: 'أوتوماتيك', hp: 147, engine: '2.0L I4', seats: 5, condition: 'جديدة', color: 'أسود', featured: false,
    photos: ['1619767886558-efdc259cde1a'],
    desc: 'اقتصادية وعملية بتصميم عصري وتجهيزات أمان متقدمة، خيار ممتاز للاستخدام اليومي.' },
  { id: 14, brand: 'فورد', model: 'Explorer Limited', year: 2024, type: 'SUV', price: 198000, km: 16000, fuel: 'بنزين', gear: 'أوتوماتيك', hp: 300, engine: '2.3L EcoBoost', seats: 7, condition: 'مستعملة', color: 'أبيض', featured: false,
    photos: ['1533473359331-0135ef1b58bf'],
    desc: 'SUV عائلية بسبعة مقاعد ومساحة واسعة، مثالية للرحلات.' },
  { id: 15, brand: 'بورش', model: 'Panamera 4', year: 2024, type: 'سيدان', price: 489000, km: 6000, fuel: 'بنزين', gear: 'أوتوماتيك', hp: 348, engine: '2.9L V6 Twin-Turbo', seats: 4, condition: 'مستعملة', color: 'أسود', featured: false,
    photos: ['1503376780353-7e6692767b70'],
    desc: 'فخامة السيدان مع جينات بورش الرياضية، مقصورة رقمية بالكامل.' }
];

const PHOTOS = {
  hero: '1503376780353-7e6692767b70',
  about: '1590362891991-f776e747a588',
  cta: '1568605117036-5fe5e7bab0b7'
};

const SERVICES = [
  { icon: 'shield', title: 'فحص شامل 150 نقطة', text: 'كل سيارة مستعملة تمر بفحص فني دقيق قبل عرضها.' },
  { icon: 'card', title: 'تمويل وتقسيط مرن', text: 'شراكات مع أكبر البنوك وجهات التمويل بدفعة أولى تبدأ من 0%.' },
  { icon: 'swap', title: 'استبدال سيارتك', text: 'قيّم سيارتك الحالية واستبدلها بسيارة أحدث في نفس اليوم.' },
  { icon: 'wrench', title: 'صيانة وضمان', text: 'ضمان يصل إلى سنتين ومركز صيانة معتمد بعد البيع.' },
  { icon: 'truck', title: 'توصيل للمنزل', text: 'نوصل سيارتك الجديدة إلى باب منزلك مع إتمام الأوراق.' },
  { icon: 'doc', title: 'إنهاء الإجراءات', text: 'نتولى نقل الملكية والتأمين والتسجيل نيابة عنك.' }
];

const TESTIMONIALS = [
  { name: 'عبدالله القحطاني', car: 'رينج روفر 2025', text: 'تعامل راقٍ وشفافية كاملة في الأسعار، استلمت سيارتي خلال 48 ساعة.' },
  { name: 'سارة المطيري', car: 'تسلا Model 3', text: 'خدمة التمويل كانت سهلة جداً والفريق ساعدني في اختيار الأنسب لميزانيتي.' },
  { name: 'محمد الشهري', car: 'بورش 911', text: 'السيارة كانت مطابقة تماماً للوصف وتقرير الفحص. أنصح بالتعامل معهم.' }
];
