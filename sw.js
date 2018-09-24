/*
 *
 *  Bart Runner Web
 *  Copyright 2018 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */

'use strict';

const version = "0.1.1";
const cacheName = `bartrunner-${version}`;
self.addEventListener('install', e => {
  console.log('Installing ' + cacheName + '...');
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        `/`,
        `/index.html`,
        `/styles/main.css`,
        `/scripts/main.min.js`,
//        `/scripts/comlink.global.js`,
//        `/scripts/messagechanneladapter.global.js`,
//        `/scripts/pwacompat.min.js`,
//        `/sounds/airhorn.mp3`
      ])
          .then(() => self.skipWaiting());
    })
  );
});

self.addEventListener('activate', event => {
  console.log('Bartrunner PWA ready to handle things...');
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  console.log('Bartrunner PWA, fetch for: ' + event.request.url);
  event.respondWith(
    caches.open(cacheName)
      .then(cache => cache.match(event.request, {ignoreSearch: true}))
      .then(response => {
      return response || fetch(event.request);
    })
  );
});
