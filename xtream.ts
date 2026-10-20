import { Category, Item, Kind, Session, SeriesInfo } from '../types';

export async function authenticate(s: Session) {
  return { status: 'Active', exp_date: '2027-01-01', max_connections: '5', username: s.username };
}

export async function getCategories(s: Session, kind: Kind): Promise<Category[]> {
  if (kind === 'live') {
    return [{ category_id: '1', category_name: 'بثوث تجريبية مباشرة (Live)' }];
  } else if (kind === 'movie') {
    return [{ category_id: '2', category_name: 'أفلام وفيديوهات تجريبية (VOD)' }];
  }
  return [];
}

export async function getItems(s: Session, kind: Kind, categoryId: string): Promise<Item[]> {
  if (kind === 'live') {
    return [
      {
        id: 101,
        name: 'قناة تجريبية 1 - بث مباشر (HLS)',
        image: 'https://via.placeholder.com/150',
      }
    ];
  } else if (kind === 'movie') {
    return [
      {
        id: 201,
        name: 'فيديو تجريبي 1 (Big Buck Bunny)',
        image: 'https://via.placeholder.com/150',
        ext: 'mp4',
      }
    ];
  }
  return [];
}

export const getSeriesInfo = async (s: Session, id: number): Promise<SeriesInfo> => ({} as any);

export const liveUrl = (s: Session, id: number) => 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';
export const movieUrl = (s: Session, id: number, ext = 'mp4') => 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
export const episodeUrl = (s: Session, id: string, ext = 'mp4') => 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
