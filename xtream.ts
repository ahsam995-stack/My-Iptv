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

// الأقسام الرئيسية في التطبيق
export async function getCategories(s: Session, kind: Kind): Promise<Category[]> {
  if (kind === 'live') {
    return [
      { category_id: '100', category_name: '🔴 باقة القنوات البث المباشر الكبرى' }
    ];
  } else if (kind === 'movie') {
    return [
      { category_id: '200', category_name: '🎬 الأفلام التجريبية والعروض' }
    ];
  }
  return [];
}

// قائمة القنوات المفتوحة والحية مضاف إليها القنوات العربية المباشرة
const freeChannels = [
  { 
    id: 101, 
    name: 'الجزيرة الإخبارية', 
    url: 'https://live-hls-web-aje.getaj.net/AJE/index.m3u8',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Al_Jazeera_English_logo.svg/1200px-Al_Jazeera_English_logo.svg.png'
  },
  { 
    id: 102, 
    name: 'فرانس 24 عربي', 
    url: 'https://static.france24.com/live/F24_AR_HI_HLS/live_web.m3u8',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/France24.svg/1200px-France24.svg.png'
  },
  { 
    id: 103, 
    name: 'RT Arabic روسيا اليوم', 
    url: 'https://rt-arab.live.hls.adaptive.level3.net/rt-arab/index.m3u8',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/RT_Arabic_logo.svg/1200px-RT_Arabic_logo.svg.png'
  },
  { 
    id: 104, 
    name: 'قناة دبي القرآن الكريم', 
    url: 'https://dmi.live-s.cdn.bitgravity.com/cdn/live/quran/playlist.m3u8',
    image: 'https://via.placeholder.com/150'
  },
  { id: 1, name: 'قناة البث الحي - Big Buck Bunny (HLS)', url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', image: 'https://via.placeholder.com/150' },
  { id: 2, name: 'قناة الاختبار العالمية - JW Player Stream', url: 'https://server.jwplayer.com/demonstrations/playlists/hls/playlist.m3u8', image: 'https://via.placeholder.com/150' },
  { id: 3, name: 'بث مباشر تجريبي 3 (Apple Advanced Stream)', url: 'https://devstreaming-cdn.apple.com/videos/streaming/examples/bipbop_adv_example_hevc/master.m3u8', image: 'https://via.placeholder.com/150' },
  { id: 4, name: 'بث مباشر تجريبي 4 (Apple Basic Stream)', url: 'https://devstreaming-cdn.apple.com/videos/streaming/examples/bipbop_4x3/gear1/prog_index.m3u8', image: 'https://via.placeholder.com/150' },
  { id: 5, name: 'قناة منوعات واختبار شبكات 5', url: 'https://cph-p2ms-live.akamaized.net/hls/live/2000341/test/master.m3u8', image: 'https://via.placeholder.com/150' },
  { id: 6, name: 'قناة البث الفضائي الافتراضي 6', url: 'https://playertest.longtailvideo.com/adaptive/bipbop/gear4/prog_index.m3u8', image: 'https://via.placeholder.com/150' },
  { id: 7, name: 'قناة اختبار الميديا الحية 7', url: 'https://moiv.ovh/live/test/index.m3u8', image: 'https://via.placeholder.com/150' },
  { id: 8, name: 'قناة البث المباشر السريع 8', url: 'https://fccms.akamaized.net/hls/live/2003666/FCCN_Test_1/master.m3u8', image: 'https://via.placeholder.com/150' },
  { id: 9, name: 'قناة المتابعة والتحليل 9', url: 'https://amsserv-global-live.akamaized.net/hls/live/2021650/global/master.m3u8', image: 'https://via.placeholder.com/150' },
  { id: 10, name: 'قناة العرض المباشر المفتوحة 10', url: 'https://bbc-i.akamaihd.net/hls/live/624497/bbc_one_london/master.m3u8', image: 'https://via.placeholder.com/150' }
];

export async function getItems(s: Session, kind: Kind, categoryId: string): Promise<Item[]> {
  if (kind === 'live') {
    // إرجاع كافة القنوات من القائمة أعلاه تلقائياً
    return freeChannels.map(ch => ({
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

// نظام توجيه الروابط بناءً على معرف القناة (ID)
export const liveUrl = (s: Session, id: number) => {
  const channel = freeChannels.find(ch => ch.id === id);
  if (channel) {
    return channel.url;
  }
  // رابط افتراضي في حال لم يتم العثور على القناة
  return 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';
};

export const movieUrl = (s: Session, id: number, ext = 'mp4') => {
  return 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
};

export const episodeUrl = (s: Session, id: string, ext = 'mp4') => {
  return 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
};
