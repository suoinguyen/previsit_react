import React from 'react';
import ReactDOM from 'react-dom/client';
import './site.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';

import posthog from 'posthog-js';
import { PostHogProvider} from 'posthog-js/react'
posthog.init(
  "phc_F9USu09D3pmEHlsCTWISBmPvPEuwrrNsmbPzLatffvR",
  {
    api_host: "https://us.posthog.com",
  }
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <PostHogProvider client={posthog}>
      <App />
  </PostHogProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
