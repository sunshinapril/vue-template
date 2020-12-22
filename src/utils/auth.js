import CacheControl from '@/utils/cache/CacheControl'

export function getToken() {
  return CacheControl.get(CacheControl.caches.TIGER_LOCAL_TOKEN)
}

export function setToken(token) {
  return CacheControl.set(CacheControl.caches.TIGER_LOCAL_TOKEN, token)
}

export function removeToken() {
  return CacheControl.remove(CacheControl.caches.TIGER_LOCAL_TOKEN)
}
