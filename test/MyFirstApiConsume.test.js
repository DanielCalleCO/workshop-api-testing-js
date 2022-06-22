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

it("Consume HEAD Service", async () => {
    const response = await axios.head("https://httpbin.org/anything");

    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.headers).to.have.property("date");
});

it("Consume PATCH Service", async () => {
    const response = await axios.patch("https://httpbin.org/anything");

    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.data).to.have.property("data");
});

it("Consume PUT Service", async () => {
    const response = await axios.put("https://httpbin.org/anything");

    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.data).to.have.property("url");
});

it("Consume DELETE Service", async () => {
    const response = await axios.delete("https://httpbin.org/anything");

    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.data).to.have.property("method");
});
