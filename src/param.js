"use strict";
import {
  SSMClient,
  GetParameterCommand,
  PutParameterCommand,
} from "@aws-sdk/client-ssm";

export async function getDetails(event, context) {
  const arnlist = context.functionarn.split(":");
  const laregion = arnlist[3];
  const client = new SSMClient({ region: laregion });
  const input = {
    Name: `/STRING_VALUE/${event.param.id}`, // required
    WithDecryption: false,
  };
  const command = new GetParameterCommand(input);
  let response;
  try {
    response = await client.send(command);
  } catch (ex) {
    return {
      statusCode: 200,
      body: "Error: " + ex,
    };
  }
  let store = response.Parameter.Value.split(",");
  return [store];
}

export async function putDetails(event, context) {
  const arnlist = context.functionarn.split(":");
  const laregion = arnlist[3];
  const client = new SSMClient({ region: laregion });
  const input = {
    // PutParameterRequest
    Name: "STRING_VALUE", // required
    Value: "STRING_VALUE", // required
  };
  const command = new PutParameterCommand(input);
  let response;
  try {
    response = await client.send(command);
  } catch (ex) {
    return {
      statusCode: 200,
      body: "Error: " + ex,
    };
  }

  return response;
}
