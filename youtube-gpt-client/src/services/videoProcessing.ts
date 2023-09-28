const NGROCK = 'http://fd16-2800-a4-260e-c400-61bc-950b-3c2d-2d1a.ngrok.io/video-process';

export const getAllSummaries = async () => {
  const response = await fetch(NGROCK);
  const summaries = await response.json();

  if (!summaries) {
    // if error return
    return;
  }

  return summaries;
};

export const getSummaryByVideoId = async (videoId: string, lang?: string) => {
  const response = await fetch(`${NGROCK}/${videoId}?lang=${lang ? lang : 'en'}`);
  const summary = await response.json();

  if (!summary) {
    // if error return
    return;
  }

  return summary;
};
