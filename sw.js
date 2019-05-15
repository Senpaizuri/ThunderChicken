const CORE_CACHE_VERSION = 1
const CORE_CACHE_NAME = "thunder-core-v" + CORE_CACHE_VERSION
const CORE_ASSETS = ["./","./src/opt/index.css","./src/opt/app.js"]


self.addEventListener("install",(e)=>{
    console.log("SW installed")
    e.waitUntil(
        caches.open(CORE_CACHE_NAME)
            .then(cache => cache.addAll(CORE_ASSETS))
            .then(()=>self.skipWaiting())
    )
})

self.addEventListener("activate",(e)=>{
    console.log("SW Activated")
    e.waitUntil(
        caches.keys().then(cacheNames =>{
            return Promise.all(cacheNames.map(name=>{
                if(name.includes("core-cache") && name !== CORE_CACHE_NAME){
                    console.log("SW detected old cache - Removing cache for:", name)
                    return caches.delete(name)
                }
            }))
        })
    )
})

self.addEventListener("fetch",(e)=>{
    const req = e.request
    e.respondWith(
        caches.match(req)
            .then(cachedRes =>{
                if(cachedRes){
                    console.log("SW serving from cache:",cachedRes)
                    return  cachedRes
                }
                return fetch(req)
                    .then((fetchRes) => fetchRes)
                    .catch((err)=>{
                        const isHTMLPage = req.method == "GET" && req.header.get("accept").includes("text/html")
                        if(isHTMLPage){
                            return caches.match("/")
                        }
                    })   
            }
        )
    )
})

