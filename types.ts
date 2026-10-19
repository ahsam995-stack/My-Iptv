export type Session = { server: string; username: string; password: string };
export type Kind = 'live' | 'movie' | 'series';
export type Category = { category_id: string; category_name: string };
export type Item = { id: number; name: string; image?: string; rating?: string; ext?: string };
export type Episode = { id: string; title: string; episode_num: number; container_extension: string };
export type SeriesInfo = {
  info: { name: string; cover?: string; plot?: string };
  episodes: Record<string, Episode[]>;
};
