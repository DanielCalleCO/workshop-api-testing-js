const axios = require("axios");
const { expect } = require("chai");
const { StatusCodes } = require("http-status-codes");

describe("First Api Tests", () => {});

it("Consume GET Service", async () => {
    const response = await axios.get("https://httpbin.org/ip");

    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.data).to.have.property("origin");
});

it("Consume GET Service with query parameters", async () => {
    const query = {
        name: "John",
        age: "31",
        city: "New York",
    };

    const response = await axios.get("https://httpbin.org/get", { query });

    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.config.query).to.eql(query);
});
