const chai = require('chai');

const { expect } = chai;
const { StatusCodes } = require('http-status-codes');
const fetch = require('isomorphic-fetch');
chai.use(require('chai-subset'));

const urlBase = 'https://api.github.com/gists';

describe('Stage 14 - DELETE with Isomorphic', () => {
  describe('Gist creation', () => {
    let gist;
    let postResponse;
    let getBody;
    const gistBody = {
      description: 'Example of a gist',
      public: false,
      files: {
        'README.md': {
          content: 'Text of example'
        }
      }
    };
    const postRequest = {
      method: 'POST',
      headers: { Authorization: `token ${process.env.ACCESS_TOKEN}` },
      body: JSON.stringify(gistBody)
    };

    before(async () => {
      await fetch(`${urlBase}`, postRequest)
        .then(async (response) => {
          postResponse = response.status;
          gist = await response.json();
        });
    });

    it('Gist created', async () => {
      expect(postResponse).to.equal(StatusCodes.CREATED);
      expect(gist).to.containSubset(gistBody);
    });

    describe('Gist check', () => {
      let getStatus;
      let getResponse;

      getBody = {
        method: 'GET',
        headers: { Authorization: `token ${process.env.ACCESS_TOKEN}` }
      };

      before(async () => {
        await fetch(gist.url, getBody).then(async (response) => {
          getStatus = response.status;
          getResponse = await response.json();
        });
      });

      it('Gist exists', async () => {
        expect(getStatus).to.be.equal(StatusCodes.OK);
        expect(getResponse).to.containSubset(gistBody);
      });
    });

    describe('Gist deletion', () => {
      let deleteResponse;

      const deleteBody = {
        method: 'DELETE',
        headers: { Authorization: `token ${process.env.ACCESS_TOKEN}` }
      };

      before(async () => {
        await fetch(gist.url, deleteBody).then((response) => {
          deleteResponse = response.status;
        });
      });

      it('Gist deleted', async () => {
        expect(deleteResponse).to.be.equal(StatusCodes.NO_CONTENT);
      });
    });

    describe('Gist recheck', () => {
      it('Gist does not exist anymore', async () => {
        try {
          await fetch(gist.url, getBody);
        } catch (err) {
          expect(err.response.status).to.be.equal(StatusCodes.NOT_FOUND);
        }
      });
    });
  });
});
