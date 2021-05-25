const IS_PRODUCTION = false;

export const BASE_URL = IS_PRODUCTION
    ? "http://api.getquilt.app/api"
    : "http://localhost:3001/api";

export const END_TYPE = "End";
