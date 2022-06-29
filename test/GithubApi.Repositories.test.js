const axios = require('axios');
const { expect } = require('chai');
const { StatusCodes } = require('http-status-codes');

const urlBase = 'https://api.github.com/users';
const urlRepos = 'https://api.github.com/repos';
const repo = 'jasmine-json-report';
const owner = 'aperdomob';

describe('Repositories testing', () => {
  it('GET method', async () => {
    const response = await axios.get(`${urlBase}/${owner}`);

    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.data.name).to.equal('Alejandro Perdomo');
    expect(response.data.company).to.equal('Perficient Latam');
    expect(response.data.location).to.equal('Colombia');
  });

  it('Repositories List', async () => {
    const response = await axios.get(`${urlBase}/${owner}/repos`);
    const finder = response.data.find((object) => object.name === 'jasmine-json-report');

    expect(response.status).to.equal(StatusCodes.OK);
    expect(finder.name).to.equal('jasmine-json-report');
    expect(finder.private).to.equal(false);
    expect(finder.description).to.equal('A Simple Jasmine JSON Report');
  });

  it('Repo download', async () => {
    const zipFile = await axios.get(`${urlRepos}/${owner}/${repo}/zipball`);

    expect(zipFile.status).to.equal(StatusCodes.OK);
    expect(zipFile.headers['content-type']).to.equal('application/zip');
  });

  it('Readme verifying', async () => {
    const response = await axios.get(`${urlRepos}/${owner}/${repo}/readme`);
    const readme = 'README.md';

    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.data.name).to.equal(readme);
    expect(response.data.path).to.equal(readme);
    expect(response.data.sha).to.equal('360eee6c223cee31e2a59632a2bb9e710a52cdc0');
  });
});
