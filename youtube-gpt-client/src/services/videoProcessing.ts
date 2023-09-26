import { SummaryData } from '@/types';
import { getIdFromYoutubeVideoUrl } from '@/utils';
import { YOUTUBE_REGEX, youtubeUrlRegex } from '@/utils/constans';

const NGROCK =
  'http://db9f-2800-a4-27dc-fc00-8539-c1ce-477a-8b27.ngrok.io/video-process';

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
  const summary = await getSummaryByVideoId(videoId);

  return summary;
};
