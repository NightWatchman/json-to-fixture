import makeFixture from '../src/index';
import Path from 'path';

describe('#makeFixture', () => {
  // describe('folder is empty', () => {
  //   it('throws exception', () => {
  //     const path = Path.join(__dirname, 'fixtures', 'empty');
  //     expect(() => {
  //       makeFixture(path);
  //     }).toThrowError(new Error(`no fixtures found in directory '${path}'`));
  //   });
  // });

  // describe('folder does not exist', () => {
  //   it('throws exception', () => {
  //     const path = Path.join(__dirname, 'fixtures', 'does-not-exist');
  //     expect(() => {
  //       makeFixture(path);
  //     }).toThrowError(new Error(`directory '${path}' not found`));
  //   });
  // });

  // describe('invalid json', () => {
  //   it('throws exception', () => {
  //     it('throws exception', () => {
  //       const path = Path.join(__dirname, 'fixtures', 'does-not-exist');
  //       expect(() => {
  //         makeFixture(path);
  //       }).toThrowError(new Error(`'${path}' contains invalid JSON files`));
  //     });
  //   });
  // });

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
