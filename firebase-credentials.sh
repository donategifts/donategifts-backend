#!/bin/bash

TYPE="${{ secrets.FIREBASE_TOKEN_TYPE }}"
PROJECT_ID="${{ secrets.FIREBASE_PROJECT_ID }}"
PRIVATE_KEY_ID="${{ secrets.FIREBASE_PRIVATE_KEY_ID }}"
PRIVATE_KEY="${{ secrets.FIREBASE_PRIVATE_KEY }}"
CLIENT_EMAIL="${{ secrets.FIREBASE_CLIENT_EMAIL }}"
CLIENT_ID="${{ secrets.FIREBASE_CLIENT_ID }}"
AUTH_URI="${{ secrets.FIREBASE_AUTH_URI }}"
TOKEN_URI="${{ secrets.FIREBASE_TOKEN_URI }}"
AUTH_PROVIDER_X509_CERT_URL="${{ secrets.FIREBASE_AUTH_PROVIDER_X509_CERT_URL }}"
CLIENT_X509_CERT_URL="${{ secrets.FIREBASE_CLIENT_X509_CERT_URL }"

echo '{
  "type": "'"$TYPE"'",
  "project_id": "'"$PROJECT_ID"'",
  "private_key_id": "'"$PRIVATE_KEY_ID"'",
  "private_key": "'"$PRIVATE_KEY"'",
  "client_email": "'"$CLIENT_EMAIL"'",
  "client_id": "'"$CLIENT_ID"'",
  "auth_uri": "'"$AUTH_URI"'",
  "token_uri": "'"$TOKEN_URI"'",
  "auth_provider_x509_cert_url": "'"$AUTH_PROVIDER_X509_CERT_URL"'",
  "client_x509_cert_url": "'"$CLIENT_X509_CERT_URL"'"
}' > donate-gifts.json
