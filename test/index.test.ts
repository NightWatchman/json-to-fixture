import makeFixture from '../src/index';
import Path from 'path';

describe('#makeFixture', () => {
  describe('folder is empty', () => {
    it('returns empty fixture', () => {
      const result = makeFixture(Path.join(__dirname, 'fixtures', 'empty'));
      return expect(result).resolves.toEqual({});
    });
  });

  describe('folder does not exist', () => {
    it('rejects with error no such entity', () => {
      const result = makeFixture(Path.join(__dirname, 'fixtures', 'does-not-exist'));
      return expect(result).rejects.toEqual(expect.objectContaining({
        code: "ENOENT"
      }));
    });
  });

  describe('invalid json', () => {
    it('throws exception', () => {
      const result = makeFixture(Path.join(__dirname, 'fixtures', 'invalid-json'));
      return expect(result).rejects.toBeInstanceOf(SyntaxError);
    });
  });

  describe('folder has subdirectories', () => {
    it('ignores subdirectories, and fixtures the json files from the given directory', async () => {
      const result = await makeFixture(Path.join(__dirname, 'fixtures', 'has-subdirectory'));
      return expect(result).toEqual({
        peopleList: expect.anything(),
        federationInfo: expect.anything()
      });
    });
  });

  describe('folder has non-json files', () => {
    it('skips non-json files and fixtures the json files only', async () => {
      const result = await makeFixture(Path.join(__dirname, 'fixtures', 'non-json-files'));
      return expect(result).toEqual({
        peopleList: expect.anything(),
        federationInfo: expect.anything()
      });
    });
  });

  describe('folder has a valid set of fixture json files', () => {
    it('makes fixtures out of the json files', async () => {
      const result = await makeFixture(Path.join(__dirname, 'fixtures', 'data'));
      expect (result).toEqual({
        federationInfo: {
          "name": "United Federation of Planets",
          "foundedYear": 2161,
          "technologies": [
            "Warp drive",
            "Transporter"
          ],
          "currency": "Federation Credit"
        },
        peopleList: [
          {
            "firstName": "Bruce",
            "lastName": "Dickinson"
          },
          {
            "firstName": "Nicko",
            "lastName": "McBrain"
          },
          {
            "firstName": "Steve",
            "lastName": "Harris"
          }
        ]
      });
    });
  });
});
