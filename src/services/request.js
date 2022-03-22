import axios from 'axios';
import {Config} from '../config';
// import {authHeader} from "../utils";

const headers = {'Content-Type': 'application/json'};

export const request = async (endpoint, options) => {

  const {method, lang, data, params, path} = options;

  const URL = `${Config.apiUrl}${endpoint}${path || ''}`;

  const requestHeaders = {
    // ...authHeader(),
    ...headers
  };

  if (lang) {
    requestHeaders['content-language'] = lang;
  }

  const REQUEST_CONFIG = {
    requestHeaders,
  };

  switch (method) {
    case 'POST':
      return axios.post(URL, { ...data }, {
        ...REQUEST_CONFIG
      })
        .then(res => res.data);
    case 'PUT':
      return axios.put(URL, { ...data }, {
        ...REQUEST_CONFIG
      })
        .then(res => res.data);
    case 'GET':
      return axios.get(URL, {
        ...REQUEST_CONFIG
      })
        .then(res => res.data);
    case 'DELETE':
      return axios.delete(URL, {
        ...REQUEST_CONFIG,
        data: data || undefined,
        params: params || undefined
      })
        .then(res => res.data);
    default: break;
  }
}
