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

const params = {
  per_page: 40
};

describe.only('Stage 12 - Query parameters: Users', () => {
  let users;
  before(async () => {
    users = await keyPath.get(`${urlBase}`, params);
  });

  
  it('Github users', async () => {
    expect(users.status).to.be.eql(StatusCodes.OK);
    expect(users.data).to.have.length(40);
  });
});
