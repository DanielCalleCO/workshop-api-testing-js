const axios = require('axios');
const { expect } = require('chai');
const { StatusCodes } = require('http-status-codes');

const urlBase = 'https://api.github.com/users/aperdomob';

describe('Repositories testing', () => {
  it('GET method', async () => {
    const response = await axios.get(`${urlBase}`);

    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.data.name).to.equal('Alejandro Perdomo');
    expect(response.data.company).to.equal('Perficient Latam');
    expect(response.data.location).to.equal('Colombia');
  });

  it('Repositories List', async () => {
    const response = await axios.get(`${urlBase}/repos`);
    const finder = response.data.find((repo) => repo.name === 'jasmine-json-report');

    expect(response.status).to.equal(StatusCodes.OK);
    expect(finder.name).to.equal('jasmine-json-report');
    expect(finder.private).to.equal(false);
    expect(finder.description).to.equal('A Simple Jasmine JSON Report');
  });
});
