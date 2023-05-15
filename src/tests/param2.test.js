import { putDetails } from "../param.js";

jest.mock("@aws-sdk/client-ssm");

describe("putDetails", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  let event;
  let context;

  beforeEach(() => {
    event = {
      param: {
        id: "123",
      },
    };
    context = {
      functionarn:
        "arn:aws:lambda:us-east-1:123456789012:function:function-name",
    };
  });

  it("should return response on successful request", async () => {
    const responseMock = {};
    const SSMClientMock = require("@aws-sdk/client-ssm").SSMClient;
    SSMClientMock.mockImplementation(() => ({
      send: jest.fn().mockResolvedValue({}),
    }));
    const response = await putDetails({}, context);

    expect(response).toEqual(responseMock);
  });

  it("should return error message on request failure", async () => {
    const mockError = new Error("Something went wrong");
    const SSMClientMock = require("@aws-sdk/client-ssm").SSMClient;
    SSMClientMock.mockImplementation(() => ({
      send: jest.fn().mockRejectedValue(mockError),
    }));
    const result = await putDetails(event, context);
    expect(result).toEqual({
      statusCode: 200,
      body: "Error: " + mockError,
    });
  });
});
