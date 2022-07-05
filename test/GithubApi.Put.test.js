const axios = require('axios');
const { expect } = require('chai');

const urlBase = 'https://api.github.com/user/following/aperdomob';

const keyPath = axios.create({
  path: urlBase,
  headers: { Authorization: `token ${process.env.ACCESS_TOKEN}` }
});

describe('Stage 9 - PUT: Following', () => {
  let follow;
  before(async () => {
    follow = await keyPath.put(urlBase);
  });

  it('2. Follow user', async () => {
    expect(follow.status).to.equal(204);
    expect(follow.data).to.be.eql('');
  });

  it('3. Follow check', async () => {
    const check = await keyPath.get(urlBase);
    expect(check.status).to.be.eql(204);
  });

  it('4. idempotence', async () => {
    follow = await keyPath.put(urlBase);

    expect(follow.status).to.equal(204);
    expect(follow.data).to.be.eql('');
  });
});
