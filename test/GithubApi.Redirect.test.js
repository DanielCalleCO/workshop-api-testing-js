const axios = require('axios');
const chai = require('chai');

const { expect } = chai;
const { StatusCodes } = require('http-status-codes');
chai.use(require('chai-subset'));

const urlBase = 'https://github.com/aperdomob/redirect-test';
const urlRedirect = 'https://github.com/aperdomob/new-redirect-test';
const keyPath = axios.create({
  path: urlBase,
  headers: { Authorization: `token ${process.env.ACCESS_TOKEN}` }
});

describe('Stage 11 - HEAD & Redirect', () => {
  let headRequest;
  before(async () => {
    headRequest = await keyPath.head(`${urlBase}`);
  });

  it('Redirect URL exists', async () => {
    expect(headRequest.status).to.equal(StatusCodes.OK);
    expect(headRequest.request.res.responseUrl).to.equal(urlRedirect);
  });

  describe('Url redirect check', () => {
    let urlGet;
    before(async () => {
      urlGet = await keyPath.get('https://github.com/aperdomob/redirect-test');
    });

    it('The URL is redirecting', async () => {
      expect(urlGet.request.res.responseUrl).to.equal(`${urlRedirect}`);
    });
  });
});
