import Path from 'path';
import fs from 'fs';
import {map} from '../lib/map-helper';

export default async function makeFixture(directory: string): Promise<Record<string, any>> {
  const fileNameList: string[] = await fs.promises.readdir(directory);

  const filePathMap: Map<string, string> = fileNameList.reduce((pm, fn) => {
    const fp = Path.join(directory, fn);
    pm.set(fn.replace('.json', ''), fp);
    return pm;
  }, new Map());

  const fxMap = map(fp =>
    fs.promises.readFile(fp, 'utf-8')
      .then(JSON.parse),
    filePathMap);

  // TODO: parallelize
  const result: Record<string, any> = {};
  for (const [key, value] of fxMap) {
    result[key] = await value;
  }
  return result;
}
