import { getIdFromYoutubeVideoUrl } from '@/utils';

const NGROCK =
  'http://6090-2800-a4-2714-3500-542d-5589-6ba7-78f4.ngrok.io/video-process';

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
