const axios = require('axios');
const chai = require('chai');
const { StatusCodes } = require('http-status-codes');

const { expect } = chai;
chai.use(require('chai-subset'));

const urlBase = 'https://api.github.com/users';
const keyPath = axios.create({
  path: urlBase,
  headers: {
    Authorization: `token ${process.env.ACCESS_TOKEN}`
  }
});

let params = {
  per_page: 10
};

describe('Stage 12 - Query parameters: Users', () => {
  let users;
  before(async () => {
    users = await keyPath.get(`${urlBase}`, { params });
  });

  it('Github users - 10 per page', async () => {
    expect(users.status).to.be.eql(StatusCodes.OK);
    expect(users.data).to.have.length(10);
  });

  describe('100 Users', () => {
    before(async () => {
      params = {
        per_page: 100
      };
      users = await keyPath.get(`${urlBase}`, { params });
    });
    it('Github users - 100 per page', async () => {
      expect(users.status).to.be.eql(StatusCodes.OK);
      expect(users.data).to.have.length(100);
    });
  });
});
