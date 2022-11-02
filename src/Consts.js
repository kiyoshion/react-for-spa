const HOST = 'http://localhost:8000/'

export const CONSTS = {
  APP_NAME: 'Fav Study',
  BACKEND_HOST: HOST,
  BACKEND_HOST_STORAGE: HOST + 'storage/',
  IMAGE_BASE64: 'data:image/jpeg;base64,',
  TOKEN_URL: HOST + 'sanctum/csrf-cookie',
  POST_LOGOUT_URL: HOST + 'logout',
  POST_REGISTER_URL: HOST + 'register',
  GET_MATERIALS_URL: HOST + 'api/materials/',
  GET_CHAPTER_URL: HOST + 'api/chapters/',
  GET_HOME_URL: HOST + 'api/homes/',
  GET_TOPICS_URL: HOST + 'api/topics/',
  GET_TYPES_URL: HOST + 'api/types/',
  GET_USER_URL: HOST + 'api/user/',
  GET_USERS_URL: HOST + 'api/users/',
  GET_SCRAP_URL: HOST + 'api/scrap/',
  STORE_MEMO_URL: HOST + 'api/memos/',
  STORE_FLASH_URL: HOST + 'api/flashes/',
  STORE_STATUS_URL: HOST + 'api/statuses/',
  STORE_TOPIC_URL: HOST + 'api/topics/',
  UPDATE_USER_URL: HOST + 'api/users/',
}
