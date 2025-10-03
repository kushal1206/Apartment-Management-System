const store = new Map(); // key -> { value, expiresAt }

const now = () => Date.now();
const get = (k) => {
  const e = store.get(k);
  if (!e) return null;
  if (now() > e.expiresAt) {
    store.delete(k);
    return null;
  }
  return e.value;
};
const set = (k, v, ttlSeconds = 10) => {
  const ttl = Math.max(1, Number(ttlSeconds)) * 1000;
  store.set(k, { value: v, expiresAt: now() + ttl });
};

export const invalidatePrefix = (prefix) => {
  for (const k of store.keys()) if (k.startsWith(prefix)) store.delete(k);
};

export function withCache(keyFn, ttlSeconds, handler) {
  return async (req, res, next) => {
    const key = keyFn(req);
    const hit = get(key);
    if (hit) return res.status(200).json(hit);

    const origJson = res.json.bind(res);
    res.json = (body) => {
      set(key, body, ttlSeconds);
      return origJson(body);
    };

    try {
      await handler(req, res, next);
    } catch (err) {
      res.json = origJson; // don't cache errors
      next(err);
    }
  };
}
