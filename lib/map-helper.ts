export function map<Key, T, K>(f: (_: T) => K, list: Map<Key, T>): Map<Key, K> {
  var result = new Map<Key, K>();
  for (const [key, value] of list) {
    result.set(key, f(value));
  }
  return result;
}
