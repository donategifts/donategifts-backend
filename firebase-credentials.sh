#!/usr/bin/env node

(() => {
  const fs = require('fs');
  const path = require('path');

  try {
    const fileContent = {
      type: '${{ secrets.FIREBASE_TOKEN_TYPE }}',
      project_id: '${{ secrets.FIREBASE_PROJECT_ID }}',
      private_key_id: '${{ secrets.FIREBASE_PRIVATE_KEY_ID }}',
      private_key: '${{ secrets.FIREBASE_PRIVATE_KEY }}',
      client_email: '${{ secrets.FIREBASE_CLIENT_EMAIL }}',
      client_id: '${{ secrets.FIREBASE_CLIENT_ID }}',
      auth_uri: '${{ secrets.FIREBASE_AUTH_URI }}',
      token_uri: '${{ secrets.FIREBASE_TOKEN_URI }}',
      auth_provider_x509_cert_url:
        '${{ secrets.FIREBASE_AUTH_PROVIDER_X509_CERT_URL }}',
      client_x509_cert_url: '${{ secrets.FIREBASE_CLIENT_X509_CERT_URL }}',
    };

    fs.writeFileSync('donate-gifts.json', JSON.stringify(fileContent));
  } catch (e) {
    console.error(e);
    process.exit(0);
  }
})();
