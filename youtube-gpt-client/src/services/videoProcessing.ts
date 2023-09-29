import { API_URL } from '@/utils/constants';

export const getAllSummaries = async () => {
  const response = await fetch(API_URL);
  const summaries = await response.json();

  if (!summaries) {
    // if error return
    return;
  }

  return summaries;
};

export const getSummaryByVideoId = async (videoId: string, lang?: string) => {
  const response = await fetch(
    `${API_URL}/${videoId}?lang=${lang ? lang : 'en'}`,
  );
  const summary = await response.json();

  if (!summary) {
    // if error return
    return;
  }

  return summary;
};
