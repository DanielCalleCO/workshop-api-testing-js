const axios = require('axios');
const chai = require('chai');
const md5 = require('md5');

const { expect } = chai;
const { StatusCodes } = require('http-status-codes');
chai.use(require('chai-subset'));

const urlBase = 'https://api.github.com/users';
const owner = 'aperdomob';

describe('Stage 8 - GET: Repositories testing', () => {
  let userResponse;
  before(async () => {
    userResponse = await axios.get(`${urlBase}/${owner}`);
  });

  it('2. API consume', async () => {
    expect(userResponse.status).to.equal(StatusCodes.OK);
    expect(userResponse.data.name).to.equal('Alejandro Perdomo');
    expect(userResponse.data.company).to.equal('Perficient Latam');
    expect(userResponse.data.location).to.equal('Colombia');
  });

  describe('Using hypermedia', () => {
    let repositoriesResponse;
    let repository;
    before(async () => {
      repositoriesResponse = await axios.get(`${userResponse.data.repos_url}`);
      repository = repositoriesResponse.data.find(
        (repo) => repo.name === 'jasmine-json-report'
      );
    });

    it('3. Repositories List', async () => {
      const expectedResponse = {
        name: 'jasmine-json-report',
        private: false,
        description: 'A Simple Jasmine JSON Report'
      };

      expect(repositoriesResponse.status).to.equal(StatusCodes.OK);
      expect(repository).to.containSubset(expectedResponse);
    });

    it('4. Repo download', async () => {
      const zipFile = await axios.get(`${repository.url}/zipball/${repository.default_branch}`);

      expect(zipFile.status).to.equal(StatusCodes.OK);
      expect(zipFile.headers['content-type']).to.equal('application/zip');
    });

    let readmeFile;
    before(async () => {
      readmeFile = await axios.get(`${repository.url}/readme`);
    });
    it('5. Readme verifying', async () => {
      const verifyReadme = {
        name: 'README.md',
        path: 'README.md',
        sha: '360eee6c223cee31e2a59632a2bb9e710a52cdc0'
      };

      expect(readmeFile.status).to.equal(StatusCodes.OK);
      expect(readmeFile.data).to.containSubset(verifyReadme);
    });
    // });

    it('6. Readme downloading', async () => {
      const readmeDownload = await axios.get(`${readmeFile.data.download_url}`);
      const md5Readme = '3449c9e5e332f1dbb81505cd739fbf3f';

      expect(readmeDownload.status).to.equal(StatusCodes.OK);
      expect(readmeDownload.headers['content-type']).to.equal('text/plain; charset=utf-8');
      expect(md5(readmeDownload)).to.equal(md5Readme);
    });
  });
});
