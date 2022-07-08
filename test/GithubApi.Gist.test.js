const axios = require('axios');
const chai = require('chai');

const { expect } = chai;
const { StatusCodes } = require('http-status-codes');
chai.use(require('chai-subset'));

const urlBase = 'https://api.github.com/gists';
const keyPath = axios.create({
  path: urlBase,
  headers: { Authorization: `token ${process.env.ACCESS_TOKEN}` }
});

describe('Stage 11 - DELETE', () => {
  const gistBody = {
    description: 'Example of a gist',
    public: false,
    files: {
      'README.md': {
        content: 'Text of example'
      }
    }
  };

  let gist;

  before(async () => {
    gist = await keyPath.post(`${urlBase}`, gistBody);
  });

  it('Gists created', async () => {
    expect(gist.status).to.equal(StatusCodes.CREATED);
    expect(gist.data).to.containSubset(gistBody);
  });

  describe('Gist check', () => {
    let gistCreated;
    before(async () => {
      gistCreated = await keyPath.get(gist.data.url);
    });

    it('Gist exists', async () => {
      expect(gistCreated.status).to.be.equal(StatusCodes.OK);
    });
  });

  describe('Gist deletion', async () => {
    let gistDelete;
    before(async () => {
      gistDelete = await keyPath.delete(gist.data.url);
    });

    it('Gist deleted', async () => {
      expect(gistDelete.status).to.be.equal(StatusCodes.NO_CONTENT);
    });
  });

  describe('Gist recheck', () => {
    it('Gist does not exist anymore', async () => {
      try {
        await keyPath.get(gist.data.url);
      } catch (err) {
        expect(err.response.status).to.be.equal(StatusCodes.NOT_FOUND);
      }
    });
  });
});
