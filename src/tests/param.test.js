import { getDetails } from "../param.js";

jest.mock("@aws-sdk/client-ssm");

describe("getDetails", () => {
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

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return an array of values when successful", async () => {
    const SSMClientMock = require("@aws-sdk/client-ssm").SSMClient;
    SSMClientMock.mockImplementation(() => ({
      send: jest.fn().mockResolvedValue({
        Parameter: {
          Value: "value1,value2,value3",
        },
      }),
    }));
    const [result] = await getDetails(event, context);
    expect(result).toEqual(["value1", "value2", "value3"]);
  });

  it("should return an error message when an exception is thrown", async () => {
    const mockError = new Error("Something went wrong");
    const SSMClientMock = require("@aws-sdk/client-ssm").SSMClient;
    SSMClientMock.mockImplementation(() => ({
      send: jest.fn().mockRejectedValue(mockError),
    }));
    const result = await getDetails(event, context);
    expect(result).toEqual({
      statusCode: 200,
      body: "Error: " + mockError,
    });
  });
});
