var CACHE_NAME = 'tinku-v1';
var urlsToCache = [
	'./',
	'./index.html',
	'./restaurant.html',
	'./css/styles.css',
	'./data/restaurants.json',
	'./js/dbhelper.js',
	'./js/main.js',
	'./js/restaurant_info.js',
	'./js/sw_register.js',
	'./img/1.jpg',
	'./img/2.jpg',
	'./img/3.jpg',
	'./img/4.jpg',
	'./img/5.jpg',
	'./img/6.jpg',
	'./img/7.jpg',
	'./img/8.jpg',
	'./img/9.jpg',
	'./img/10.jpg'
	];
self.addEventListener('install', function(event) {
    // Perform install steps
    event.waitUntil(caches.open(CACHE_NAME).then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
    }));
});
self.addEventListener('fetch', function(event) {
    
    event.respondWith(caches.match(event.request).then(function(response) {
        // Cache hit - return response
        if (response) {
            return response;
        }
        var fetchRequest = event.request.clone();
        return fetch(fetchRequest).then(function(response) {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
                return response;
            }
            var responseToCache = response.clone();
            caches.open(CACHE_NAME).then(function(cache) {
                cache.put(event.request, responseToCache);
            });
            return response;
        });
    }));
});
self.addEventListener('activate', function(event) {
    var cacheWhitelist = ['tinku-v2'];
    event.waitUntil(caches.keys().then(function(cacheNames) {
        return Promise.all(cacheNames.map(function(cacheName) {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
                return caches.delete(cacheName);
            }
        }));
    }));
});
