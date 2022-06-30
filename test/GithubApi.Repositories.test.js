const axios = require('axios');
const { expect } = require('chai');
const { StatusCodes } = require('http-status-codes');

const urlBase = 'https://api.github.com/users';
const urlRepos = 'https://api.github.com/repos';
const repo = 'jasmine-json-report';
const owner = 'aperdomob';

describe('Repositories testing', () => {
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

    expect(response.status).to.equal(StatusCodes.OK);
    expect(repository.name).to.equal('jasmine-json-report');
    expect(repository.private).to.equal(false);
    expect(repository.description).to.equal('A Simple Jasmine JSON Report');
  });

  it('Repo download', async () => {
    const zipFile = await axios.get(`${urlRepos}/${owner}/${repo}/zipball`);

    expect(zipFile.status).to.equal(StatusCodes.OK);
    expect(zipFile.headers['content-type']).to.equal('application/zip');
  });

  it('Readme verifying', async () => {
    const readmeFile = await axios.get(`${urlRepos}/${owner}/${repo}/readme`);

    const file = await axios.get(`https://raw.githubusercontent.com/${owner}/${repo}/master/README.md`);

    const verifyReadme = {
      name: 'README.md',
      path: 'README.md',
      sha: '360eee6c223cee31e2a59632a2bb9e710a52cdc0'
    };

    expect(readmeFile.status).to.equal(StatusCodes.OK);
    expect(file.status).to.equal(StatusCodes.OK);
    expect(file).to.containSubset(verifyReadme);

    // ?_______Funcionando (viejo)
    // ? const readme = 'README.md';

    // ? expect(response.data.name).to.equal(readme);
    // ? expect(response.data.path).to.equal(readme);
    // ? expect(response.data.sha).to.equal('360eee6c223cee31e2a59632a2bb9e710a52cdc0');
  });
});
