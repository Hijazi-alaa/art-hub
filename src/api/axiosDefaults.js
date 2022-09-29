import from '';

.defaults.baseURL = "https://arthub-api.herokuapp.com/"
    .defaults.headers.post["Content-Type"] = 'multipart/form-data'
    .defaults.withCredentials = true;

export const Req = .create();
export const Res = .create();