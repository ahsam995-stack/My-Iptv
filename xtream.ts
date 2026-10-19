import { Category, Item, Kind, Session, SeriesInfo } from '../types';
import { fetchJson } from './http';

const enc = encodeURIComponent;

function call<T = any>(s: Session, action?: string, extra: Record<string, string | number> = {}) {
  let url = `${s.server}/player_api.php?username=${enc(s.username)}&password=${enc(s.password)}`;
  if (action) url += `&action=${action}`;
  for (const [k, v] of Object.entries(extra)) url += `&${k}=${enc(String(v))}`;
  return fetchJson<T>(url);
}

export async function authenticate(s: Session) {
  const d = await call(s);
  if (!d?.user_info || Number(d.user_info.auth) !== 1) throw new Error('الحساب غير مفعّل أو منتهي');
  return d.user_info as { status: string; exp_date: string | null; max_connections: string; username: string };
}

const CAT_ACTION: Record<Kind, string> = {
  live: 'get_live_categories',
  movie: 'get_vod_categories',
  series: 'get_series_categories',
};
const ITEM_ACTION: Record<Kind, string> = {
  live: 'get_live_streams',
  movie: 'get_vod_streams',
  series: 'get_series',
};

export const getCategories = (s: Session, kind: Kind) => call<Category[]>(s, CAT_ACTION[kind]);

export async function getItems(s: Session, kind: Kind, categoryId: string): Promise<Item[]> {
  const rows = await call<any[]>(s, ITEM_ACTION[kind], { category_id: categoryId });
  if (!Array.isArray(rows)) return [];
  return rows.map((r) => ({
    id: Number(kind === 'series' ? r.series_id : r.stream_id),
    name: r.name ?? '',
    image: (kind === 'series' ? r.cover : r.stream_icon) || undefined,
    rating: r.rating ? String(r.rating) : undefined,
    ext: r.container_extension,
  }));
}

export const getSeriesInfo = (s: Session, id: number) => call<SeriesInfo>(s, 'get_series_info', { series_id: id });

// ---- روابط التشغيل ----
export const liveUrl = (s: Session, id: number) => `${s.server}/live/${enc(s.username)}/${enc(s.password)}/${id}.m3u8`;
export const movieUrl = (s: Session, id: number, ext = 'mp4') => `${s.server}/movie/${enc(s.username)}/${enc(s.password)}/${id}.${ext}`;
export const episodeUrl = (s: Session, id: string, ext = 'mp4') => `${s.server}/series/${enc(s.username)}/${enc(s.password)}/${id}.${ext}`;
