import playDL from 'play-dl';
import ytpl from 'ytpl';
import yts from 'yt-search';

export interface PlayableItem {
  title: string;
  url: string;
}

export async function query(value: string) {
  try {
    if (value.includes('http://') || value.includes('https://')) {
      const result = await getInfoFromUrl(value);
      return { is_search: false, data: result };
    } else {
      const result = await search(value);
      return { is_search: true, data: result };
    }
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export async function getInfoFromUrl(url: string): Promise<PlayableItem[] | undefined> {
  try {
    if (url.includes('youtube.com')) {
      if (url.includes('list=')) {
        const playlist = await ytpl(url);
        const PlayableItems: PlayableItem[] = [];
        for (const video of playlist.items) {
          const PlayableItem: PlayableItem = {
            title: video.title,
            url: `https://www.youtube.com/watch?v=${video.id}`,
          };
          PlayableItems.push(PlayableItem);
        }
        return PlayableItems;
      } else if (url.includes('/watch')) {
        const videoInfo = await playDL.video_info(url);
        const PlayableItem: PlayableItem = {
          title: videoInfo.video_details.title as string,
          url: url,
        };
        return [PlayableItem];
      }
    }
    return undefined;
  } catch (error) {
    throw error;
  }
}

export async function search(query: string): Promise<PlayableItem[] | undefined> {
  try {
    const videoInfo = await yts(query);
    const PlayableItems: PlayableItem[] = [];
    // for 5 first result
    const result = videoInfo.videos.slice(0, 5).map((video) => {
      const PlayableItem: PlayableItem = {
        title: video.title,
        url: video.url,
      };
      PlayableItems.push(PlayableItem);
    });
    return PlayableItems;
  } catch (error) {
    throw error;
  }
}
