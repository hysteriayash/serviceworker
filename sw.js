var CACHE_NAME = 'pakardbd';
var urlsToCache = [
	'/serviceworker/',
	'/serviceworker/assets/css/animated.css',
	'/serviceworker/assets/css/bootstrap.min.css',
	'/serviceworker/assets/css/bootstrap-vue.css',
	'/serviceworker/assets/js/script.js',
	'/serviceworker/assets/js/vue.js',
	'/serviceworker/assets/js/jquery.min.js',
	'/serviceworker/assets/js/popper.min.js',
	'/serviceworker/assets/js/polyfill.min.js',
	'/serviceworker/assets/js/bootstrap.min.js',
	'/serviceworker/assets/js/bootstrap-vue.js',
	'/serviceworker/assets/js/sweetalert.min.js',
	'https://use.fontawesome.com/releases/v5.1.1/css/all.css',
	'/serviceworker/assets/img/ai.png'
];

// Install serviceWorker
self.addEventListener('install', function (event) {
	// Perform install steps
	event.waitUntil(
		caches.open(CACHE_NAME).then(function(cache){
			console.log('Opened cache');
			urlsToCache.forEach(function (url) {
				cache.add(url).catch(/*optional error handling/logging*/);
			});
		})
	);
});

// Fetch serviceWorker
self.addEventListener('fetch', function (event) {
	event.respondWith(
		caches.match(event.request).then(function (response) {
			// cache hit -- return response
			if (response) {
				return response;
			}

			return fetch(event.request);
		})
	);
});

// Activate serviceWorker
self.addEventListener('activete', function (event) {
	event.waitUntill(
		caches.keys().then(function (cacheNames) {
			return Promise.all(
				cacheNames.filter(function (cacheName) {
					return cacheName != CACHE_NAME;
				}).map(function (cacheName) {
					return caches.delete(cacheName);
				})
			);
		})
	);
});
