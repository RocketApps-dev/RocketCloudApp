import axios from 'axios';

import variables from '../config/variables';

export const api = axios.create({
  baseURL:
    variables.AMBIENT === 'DEV'
      ? variables.API_URL.DEV
      : variables.API_URL.PROD,
});
