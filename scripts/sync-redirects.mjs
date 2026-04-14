import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const FIREBASE_CONFIG = resolve('firebase.json');
const REDIRECTS_FILE = resolve('redirects.json');

try {
  // 1. Read the clean base config
  const firebaseConfig = JSON.parse(readFileSync(FIREBASE_CONFIG, 'utf8'));
  const customRedirects = JSON.parse(readFileSync(REDIRECTS_FILE, 'utf8'));

  // 2. Identify the "Base" redirects (we always keep the first one if it's the root redirect)
  // Or better, we just filter out any custom redirects that might have been accidentally left behind
  const baseRedirects = firebaseConfig.hosting.redirects.filter(r => r.source === '/');

  // 3. Merge base with custom
  firebaseConfig.hosting.redirects = [...baseRedirects, ...customRedirects];

  // 4. Save back to firebase.json
  writeFileSync(FIREBASE_CONFIG, JSON.stringify(firebaseConfig, null, 2) + '\n');
  console.log('✅ Successfully synced redirects to firebase.json');
} catch (error) {
  console.error('❌ Error syncing redirects:', error.message);
  process.exit(1);
}
