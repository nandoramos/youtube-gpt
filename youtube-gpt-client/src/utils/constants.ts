export const YOUTUBE_REGEX =
  /^(https?\:\/\/)?((www\.)?youtube\.com|youtu\.be)\/.+$/;
export const youtubeUrlRegex =
  /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=)|youtu\.be\/)([a-zA-Z0-9_-]+)/;

const NGROK_URL = 'http://37c2-2800-a4-260e-c400-61bc-950b-3c2d-2d1a.ngrok.io';
export const API_URL = `${NGROK_URL}/video-process`;
