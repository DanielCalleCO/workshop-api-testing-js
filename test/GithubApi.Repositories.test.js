const axios = require('axios');
const chai = require('chai');
const md5 = require('md5');

const { expect } = chai;
const { StatusCodes } = require('http-status-codes');
chai.use(require('chai-subset'));

const urlBase = 'https://api.github.com/users';
const urlRepos = 'https://api.github.com/repos';
const urlDownload = 'https://raw.githubusercontent.com';
const repo = 'jasmine-json-report';
const owner = 'aperdomob';

describe('Stage 8 - GET: Repositories testing', () => {
  it('2. API consume', async () => {
    const response = await axios.get(`${urlBase}/${owner}`);

    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.data.name).to.equal('Alejandro Perdomo');
    expect(response.data.company).to.equal('Perficient Latam');
    expect(response.data.location).to.equal('Colombia');
  });

  it('3. Repositories List', async () => {
    const response = await axios.get(`${urlBase}/${owner}/repos`);
    const repository = response.data.find((object) => object.name === 'jasmine-json-report');
    const expectedResponse = {
      name: 'jasmine-json-report',
      private: false,
      description: 'A Simple Jasmine JSON Report'
    };

    expect(response.status).to.equal(StatusCodes.OK);
    expect(repository).to.containSubset(expectedResponse);
  });

  it('4. Repo download', async () => {
    const zipFile = await axios.get(`${urlRepos}/${owner}/${repo}/zipball/master`);

    expect(zipFile.status).to.equal(StatusCodes.OK);
    expect(zipFile.headers['content-type']).to.equal('application/zip');
  });

  it('5. Readme verifying', async () => {
    const readmeFile = await axios.get(`${urlRepos}/${owner}/${repo}/contents/README.md`);
    const verifyReadme = {
      name: 'README.md',
      path: 'README.md',
      sha: '360eee6c223cee31e2a59632a2bb9e710a52cdc0'
    };

    expect(readmeFile.status).to.equal(StatusCodes.OK);
    expect(readmeFile.data).to.containSubset(verifyReadme);
  });

  it('6. Readme downloading', async () => {
    const readmeDownload = await axios.get(`${urlDownload}/${owner}/${repo}/master/README.md`);
    const md5Readme = '3449c9e5e332f1dbb81505cd739fbf3f';

    expect(readmeDownload.status).to.equal(StatusCodes.OK);
    expect(readmeDownload.headers['content-type']).to.equal('text/plain; charset=utf-8');
    expect(md5(readmeDownload)).to.equal(md5Readme);
  });
});
