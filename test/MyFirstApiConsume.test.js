const axios = require('axios');
const { expect } = require('chai');
const { StatusCodes } = require('http-status-codes');

describe('First Api Tests', () => {
  it('Consume GET Service', async () => {
    const response = await axios.get('https://httpbin.org/ip');

    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.data).to.have.property('origin');
  });

  it('Consume GET Service with query parameters', async () => {
    const query = {
      name: 'John',
      age: '31',
      city: 'New York'
    };

    const response = await axios.get('https://httpbin.org/get', { query });

    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.config.query).to.eql(query);
  });

  it('Consume HEAD Service', async () => {
    const response = await axios.head('https://httpbin.org/anything');

    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.headers).to.have.property('date');
  });

  it('Consume PATCH Service', async () => {
    const myData = {
      name: 'Daniel',
      lastname: 'Calle',
      github: true
    };

    const response = await axios.patch('https://httpbin.org/patch', myData);

    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.data.json).to.be.eql(myData);
  });

  it('Consume PUT Service', async () => {
    const movie = {
      name: 'Star Wars - Episode I',
      year: '1999',
      director: 'George Lucas'
    };

    const response = await axios.put('https://httpbin.org/anything', movie);
    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.data.json).to.be.eql(movie);
  });

  it('Consume DELETE Service', async () => {
    const user = {
      name: 'Abdul',
      age: 30
    };

    const response = await axios.delete(
      'https://httpbin.org/anything',
      user
    );

    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.config).contains(user);
  });
});
