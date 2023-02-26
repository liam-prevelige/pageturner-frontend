import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import './index.css';
import {GoogleOAuthProvider} from '@react-oauth/google';
import HttpsRedirect from 'react-https-redirect';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <HttpsRedirect>
      <GoogleOAuthProvider clientId="556168228068-60hp84a7hnkqoh1i8vs2m2vakff2a7ae.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </HttpsRedirect>);
