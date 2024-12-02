
const API_URL = process.env.REACT_APP_API_BASE_URL || '';
const BACKEND_URL = "http://localhost:5024";
const DEFAULT_IMAGE_PATH = '/images/profile_image_default.png'; // Default fallback image

const config = {
    API_URL,
    BACKEND_URL,
    DEFAULT_IMAGE_PATH
}

export default config;
