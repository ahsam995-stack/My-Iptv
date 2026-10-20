import { Category, Item, Kind, Session, SeriesInfo } from '../types';

export async function authenticate(s: Session) {
  return {
    status: 'Active',
    username: s.username || 'VIP User',
    exp_date: '2028-12-31',
    max_connections: '5',
    active_cons: '1'
  };
}

// 1. أقسام قنوات النايلسات المخصصة
export async function getCategories(s: Session, kind: Kind): Promise<Category[]> {
  if (kind === 'live') {
    return [
      { category_id: 'cat_news', category_name: '📰 قنوات الأخبار والأنباء' },
      { category_id: 'cat_islamic', category_name: '🕌 القنوات الإسلامية والقرآن' },
      { category_id: 'cat_general', category_name: '📺 القنوات العامة والدراما' },
      { category_id: 'cat_kids', category_name: '👶 قنوات الأطفال والكرتون' }
    ];
  } else if (kind === 'movie') {
    return [
      { category_id: '200', category_name: '🎬 مكتبة الأفلام والمسرحيات' }
    ];
  }
  return [];
}

// 2. قاعدة بيانات قنوات نايلسات المفتوحة (Nilesat Channels Database)
const nilesatChannels = [
  // --- الأخبار (News) ---
  {
    id: 101,
    category_id: 'cat_news',
    name: 'الجزيرة الإخبارية',
    url: 'https://live-hls-web-aje.getaj.net/AJE/index.m3u8',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Al_Jazeera_English_logo.svg/1200px-Al_Jazeera_English_logo.svg.png'
  },
  {
    id: 102,
    category_id: 'cat_news',
    name: 'العربية - Al Arabiya',
    url: 'https://live.alarabiya.net/alarabiya/live/playlist.m3u8',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Al_Arabiya_Logo.svg/1200px-Al_Arabiya_Logo.svg.png'
  },
  {
    id: 103,
    category_id: 'cat_news',
    name: 'فرانس 24 عربي',
    url: 'https://static.france24.com/live/F24_AR_HI_HLS/live_web.m3u8',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/France24.svg/1200px-France24.svg.png'
  },
  {
    id: 104,
    category_id: 'cat_news',
    name: 'RT Arabic روسيا اليوم',
    url: 'https://rt-arab.live.hls.adaptive.level3.net/rt-arab/index.m3u8',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/RT_Arabic_logo.svg/1200px-RT_Arabic_logo.svg.png'
  },
  {
    id: 105,
    category_id: 'cat_news',
    name: 'BBC News عربي',
    url: 'https://bbclive.akamaized.net/hls/live/2012018/bbc_arabic/index.m3u8',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/BBC_News_Arabic.svg/1200px-BBC_News_Arabic.svg.png'
  },

  // --- القنوات الإسلامية (Islamic) ---
  {
    id: 201,
    category_id: 'cat_islamic',
    name: 'قناة القرآن الكريم (Makkah)',
    url: 'https://saudi.live-s.cdn.bitgravity.com/cdn/live/saudi_quran/playlist.m3u8',
    image: 'https://via.placeholder.com/150/008000/FFFFFF?text=Quran+TV'
  },
  {
    id: 202,
    category_id: 'cat_islamic',
    name: 'قناة السنة النبوية (Madinah)',
    url: 'https://saudi.live-s.cdn.bitgravity.com/cdn/live/saudi_sunnah/playlist.m3u8',
    image: 'https://via.placeholder.com/150/008000/FFFFFF?text=Sunnah+TV'
  },
  {
    id: 203,
    category_id: 'cat_islamic',
    name: 'قناة دبي القرآن الكريم',
    url: 'https://dmi.live-s.cdn.bitgravity.com/cdn/live/quran/playlist.m3u8',
    image: 'https://via.placeholder.com/150/004080/FFFFFF?text=Dubai+Quran'
  },

  // --- القنوات العامة والمنوعات (General & Entertainment) ---
  {
    id: 301,
    category_id: 'cat_general',
    name: 'العراقية الإخبارية (Al Iraqiya)',
    url: 'https://live.imn.iq/hls/iraqiya/index.m3u8',
    image: 'https://via.placeholder.com/150/800000/FFFFFF?text=Al+Iraqiya'
  },
  {
    id: 302,
    category_id: 'cat_general',
    name: 'تلفزيون دبي (Dubai TV)',
    url: 'https://dmi.live-s.cdn.bitgravity.com/cdn/live/dubai/playlist.m3u8',
    image: 'https://via.placeholder.com/150/000080/FFFFFF?text=Dubai+TV'
  },
  {
    id: 303,
    category_id: 'cat_general',
    name: 'تلفزيون قطر (Qatar TV)',
    url: 'https://qtv.live-s.cdn.bitgravity.com/cdn/live/qtv/playlist.m3u8',
    image: 'https://via.placeholder.com/150/800020/FFFFFF?text=Qatar+TV'
  },

  // --- قنوات الأطفال (Kids) ---
  {
    id: 401,
    category_id: 'cat_kids',
    name: 'قناة ماجد للأطفال (Majid Kids)',
    url: 'https://adm.live-s.cdn.bitgravity.com/cdn/live/majid/playlist.m3u8',
    image: 'https://via.placeholder.com/150/FF8C00/FFFFFF?text=Majid+Kids'
  },
  {
    id: 402,
    category_id: 'cat_kids',
    name: 'سبيستون (Spacetoon Live)',
    url: 'https://st.live-s.cdn.bitgravity.com/cdn/live/spacetoon/playlist.m3u8',
    image: 'https://via.placeholder.com/150/4682B4/FFFFFF?text=Spacetoon'
  }
];

// 3. دالة جلب العناصر مفلترة حسب القسم المحدد
export async function getItems(s: Session, kind: Kind, categoryId: string): Promise<Item[]> {
  if (kind === 'live') {
    // إذا تم تحديد قسم معني يرجع القنوات الخاصة به فقط، أما إذا لم يحدد يرجع الكل
    const filtered = categoryId 
      ? nilesatChannels.filter(ch => ch.category_id === categoryId)
      : nilesatChannels;

    return filtered.map(ch => ({
      id: ch.id,
      name: ch.name,
      image: ch.image
    }));
  } else if (kind === 'movie') {
    return [
      { id: 501, name: 'فيديو تجريبي عالي الدقة (MP4)', image: 'https://via.placeholder.com/150', ext: 'mp4' }
    ];
  }
  return [];
}

export const getSeriesInfo = async (s: Session, id: number): Promise<SeriesInfo> => ({} as any);

// 4. دالة مطابقة وتوجيه رابط البث الخاص بالقناة المحددة
export const liveUrl = (s: Session, id: any) => {
  // مطابقة الـ ID برقم أو بنص مرن (==) لتفادي الخلل
  const channel = nilesatChannels.find(ch => ch.id == id);
  
  if (channel && channel.url) {
    return channel.url;
  }
  
  // في حال وجود أي خطأ بالمعرف، يرجع رابط قناة الجزيرة كافتراضي بدلاً من الفيديو الموحد القديم
  return nilesatChannels[0].url;
};

export const movieUrl = (s: Session, id: number, ext = 'mp4') => {
  return 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
};

export const episodeUrl = (s: Session, id: string, ext = 'mp4') => {
  return 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
};
