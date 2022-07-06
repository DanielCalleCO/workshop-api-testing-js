const axios = require('axios');
const chai = require('chai');

const { expect } = chai;
chai.use(require('chai-subset'));

const urlBase = 'https://api.github.com/user/following';
const user = 'aperdomob';
let request;
let follow;
let userFollowing;

const keyPath = axios.create({
  path: urlBase,
  headers: { Authorization: `token ${process.env.ACCESS_TOKEN}` }
});

describe('Stage 9 - PUT: Following', () => {
  it('2. Follow user', async () => {
    follow = await keyPath.put(`${urlBase}/${user}`);

    expect(follow.status).to.equal(204);
    expect(follow.data).to.be.eql('');
  });

  describe('3. Following check', () => {
    before(async () => {
      request = await keyPath.get(`${urlBase}`);
      userFollowing = await request.data.find((object) => object.login === 'aperdomob');
    });

    it('Is following the user', async () => {
      expect(request.status).to.equal(200);
      expect(userFollowing.login).to.equal('aperdomob');
    });
  });

  describe('4. idempotence', async () => {
    it('Follow again', async () => {
      follow = await keyPath.put(`${urlBase}/${user}`);
      expect(follow.status).to.equal(204);
      expect(follow.data).to.be.eql('');
    });
    it('Is still following', async () => {
      expect(request.status).to.equal(200);
      expect(userFollowing.login).to.equal(user);
    });
  });
});
