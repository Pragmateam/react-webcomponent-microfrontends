/**
 * Development use only!
 * Dead code elimination will remove this in production.
 */
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from '@/app/App';
import { getEnv } from '@/config/environment';

import './styles/App.css';
import './styles/Vendor.css';

const env = {
  assetsUrl: getEnv<string>('EFFI_ASSETS_BASE_URL'),
  authApiUrl: getEnv<string>('EFFI_IDENTITY_API_BASE_URL'),
  leadsApiUrl: getEnv<string>('EFFI_LEADS_API_BASE_URL'),
  brokerApiUrl: getEnv<string>('EFFI_BROKER_API_BASE_URL'),
  workflowsApiUrl: getEnv<string>('EFFI_WORKFLOWS_API_BASE_URL'),
};

const theme = {};

const router = {
  basename: '',
};
let accessToken = '';

async function doLogin() {
  const url = getEnv<string>('EFFI_LOCAL_LOGIN_URI');

  const fd = new FormData();
  fd.append('username', getEnv<string>('EFFI_LOCAL_LOGIN_USERNAME'));
  fd.append('password', getEnv<string>('EFFI_LOCAL_LOGIN_PASSWORD'));
  fd.append('scope', getEnv<string>('EFFI_LOCAL_LOGIN_SCOPE'));
  fd.append('grant_type', getEnv<string>('EFFI_LOCAL_LOGIN_GRANT_TYPE'));
  fd.append('client_id', getEnv<string>('EFFI_LOCAL_LOGIN_CLIENT_ID'));
  fd.append('client_secret', getEnv<string>('EFFI_LOCAL_LOGIN_CLIENT_SECRET'));

  return fetch(url, { method: 'POST', body: fd })
    .then((res) => res.json())
    .then((data) => {
      console.debug(data);
      accessToken = data.access_token;
    })
    .catch((err) => {
      console.error(err);
    });
}

(async function main() {
  await doLogin();

  ReactDOM.createRoot(
    document.getElementById('workflow-manager-app-root') as HTMLElement,
  ).render(React.createElement(App, { env, theme, router, accessToken }, null));
})();
