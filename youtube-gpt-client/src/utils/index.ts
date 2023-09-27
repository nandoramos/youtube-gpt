import { youtubeUrlRegex } from './constants';

export const getIdFromYoutubeVideoUrl = async (youtubeUrl: string) => {
  const match = youtubeUrl.match(youtubeUrlRegex);
  const videoId = match ? match[1] : ''
  return videoId;
};
