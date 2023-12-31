import { getIdFromYoutubeVideoUrl } from '@/utils';

const NGROCK = 'http://localhost:3001/video-process';

export const getAllSummaries = async () => {
  const response = await fetch(NGROCK);
  const summaries = await response.json();

  if (!summaries) {
    // if error return
    return;
  }

  return summaries;
};

export const getSummaryByVideoId = async (videoId: string) => {
  const response = await fetch(`${NGROCK}/${videoId}`);
  const summary = await response.json();

  if (!summary) {
    // if error return
    return;
  }

  return summary;
};

export const getSummaryFromLink = async (youtubeUrl: string, lang?: string) => {
  const videoId = await getIdFromYoutubeVideoUrl(youtubeUrl);

  // HERE WE SHOULD CALL API WITH A GIVEN YOUTUBE URL
  const response = await fetch(
    `${NGROCK}/${videoId}?lang=${lang ? lang : 'en'}`,
  );
  const summary = await response.json();

  if (!summary) {
    // if error return
    return;
  }

  return summary;
};
