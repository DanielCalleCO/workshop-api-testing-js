const axios = require('axios');
const chai = require('chai');

const { expect } = chai;
const { StatusCodes } = require('http-status-codes');
chai.use(require('chai-subset'));

const urlBase = 'https://api.github.com/user';
const issueUrl = 'https://api.github.com/repos';
const keyPath = axios.create({
  path: urlBase,
  headers: { Authorization: `token ${process.env.ACCESS_TOKEN}` }
});

describe.only('Stage 10 - POST & PATCH', () => {
  let userLogged;
  before(async () => {
    userLogged = await keyPath.get(`${urlBase}`);
  });

  it('User logged', async () => {
    expect(userLogged.status).to.equal(StatusCodes.OK);
    expect(userLogged.data.public_repos).to.be.greaterThan(1);
  });

  describe('Repository', async () => {
    let userRepositories;
    let selectedRepo;
    const repository = 'workshop-api-testing-js';

    before(async () => {
      userRepositories = await keyPath.get(`${userLogged.data.repos_url}`);
      selectedRepo = await userRepositories.data.find((repo) => repo.name === 'workshop-api-testing-js');
    });

    it('Selected repository', async () => {
      expect(selectedRepo.name).to.equal(repository);
    //   console.log(selectedRepo);
    });

    describe('Creating issue', async () => {
      let issue;
      before(async () => {
        issue = await keyPath.post(
          `${issueUrl}/${selectedRepo.owner.login}/${selectedRepo.name}/issues`,
          {
            title: 'Test issue'
          }
        );
      });

      it('Issue created and checked', async () => {
        expect(issue.status).to.equal(StatusCodes.CREATED);
        expect(issue.data.title).to.be.equal('Test issue');
        expect(issue.data.body).to.be.equal(null);
      });

      let issueBodyUrl;
      before(async () => {
        issueBodyUrl = await keyPath.patch(`${issueUrl}/${selectedRepo.owner.login}/${selectedRepo.name}/issues/${issue.data.number}`, {
          body: 'Test body'
        });
      });

      it('Issue modified and rechecked', async () => {
        expect(issueBodyUrl.status).to.be.equal(StatusCodes.OK);
        expect(issueBodyUrl.data.title).to.be.equal(issue.data.title);
        expect(issueBodyUrl.data.body).to.be.not.equal(null);
      });
    });
  });
});
