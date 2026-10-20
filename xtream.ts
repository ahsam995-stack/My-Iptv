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

// 1. الأقسام المخصصة (قنوات بث مباشر، أفلام، مسلسلات)
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
      { category_id: 'cat_m_action', category_name: '🎬 أفلام حركة ومغامرة (Action)' },
      { category_id: 'cat_m_sci', category_name: '🚀 أفلام خيال علمي (Sci-Fi)' },
      { category_id: 'cat_m_anim', category_name: '🎨 أفلام أنيميشن ورسوم متحركة' }
    ];
  } else if (kind === 'series') {
    return [
      { category_id: 'cat_s_docu', category_name: '📺 مسلسلات وثائقية وقصيرة' }
    ];
  }
  return [];
}

// 2. قاعدة بيانات قنوات نايلسات الكاملة (Nilesat Channels Database)
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

// 3. قاعدة بيانات الأفلام المجانية (Free Movies Database)
const freeMovies = [
  {
    id: 501,
    category_id: 'cat_m_anim',
    name: 'Big Buck Bunny (أرنب بيك باك)',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Big_buck_bunny_poster_big.jpg/800px-Big_buck_bunny_poster_big.jpg',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    ext: 'mp4'
  },
  {
    id: 502,
    category_id: 'cat_m_action',
    name: 'Sintel (مغامرة سينتل والتنين)',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Sintel_poster.jpg/800px-Sintel_poster.jpg',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    ext: 'mp4'
  },
  {
    id: 503,
    category_id: 'cat_m_sci',
    name: 'Tears of Steel (دموع الصلب - خيال علمي)',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Tears_of_Steel_poster.jpg/800px-Tears_of_Steel_poster.jpg',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    ext: 'mp4'
  },
  {
    id: 504,
    category_id: 'cat_m_action',
    name: 'Bullrun Adventure',
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=500',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    ext: 'mp4'
  }
];

// 4. قاعدة بيانات المسلسلات المجانية (Free Series Database)
const freeSeries = [
  {
    id: 801,
    category_id: 'cat_s_docu',
    name: 'مسلسل رحلة الكوكب (Planet Voyage)',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=500',
    episodes: [
      { id: 'ep_1', name: 'الحلقة 1: البداية', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
      { id: 'ep_2', name: 'الحلقة 2: الأعماق', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' },
      { id: 'ep_3', name: 'الحلقة 3: الفضاء', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4' }
    ]
  }
];

// 5. دالة جلب العناصر (قنوات، أفلام، مسلسلات) مفلترة
export async function getItems(s: Session, kind: Kind, categoryId: string): Promise<Item[]> {
  if (kind === 'live') {
    const list = categoryId ? nilesatChannels.filter(ch => ch.category_id === categoryId) : nilesatChannels;
    return list.map(ch => ({ id: ch.id, name: ch.name, image: ch.image }));
  } else if (kind === 'movie') {
    const list = categoryId ? freeMovies.filter(m => m.category_id === categoryId) : freeMovies;
    return list.map(m => ({ id: m.id, name: m.name, image: m.image, ext: m.ext }));
  } else if (kind === 'series') {
    const list = categoryId ? freeSeries.filter(s => s.category_id === categoryId) : freeSeries;
    return list.map(sr => ({ id: sr.id, name: sr.name, image: sr.image }));
  }
  return [];
}

// 6. تفاصيل المسلسل والحلقات
export const getSeriesInfo = async (s: Session, id: number): Promise<SeriesInfo> => {
  const series = freeSeries.find(sr => sr.id == id);
  if (series) {
    return {
      episodes: {
        '1': series.episodes.map(ep => ({
          id: ep.id,
          title: ep.name,
          container_extension: 'mp4'
        }))
      }
    } as any;
  }
  return {} as any;
};

// 7. توجيه روابط التشغيل الحية
export const liveUrl = (s: Session, id: any) => {
  const channel = nilesatChannels.find(ch => ch.id == id);
  return channel ? channel.url : nilesatChannels[0].url;
};

// 8. توجيه روابط الأفلام
export const movieUrl = (s: Session, id: any, ext = 'mp4') => {
  const movie = freeMovies.find(m => m.id == id);
  return movie ? movie.url : freeMovies[0].url;
};

// 9. توجيه روابط الحلقات
export const episodeUrl = (s: Session, episodeId: string, ext = 'mp4') => {
  for (const srs of freeSeries) {
    const ep = srs.episodes.find(e => e.id === episodeId);
    if (ep) return ep.url;
  }
  return 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';
};
