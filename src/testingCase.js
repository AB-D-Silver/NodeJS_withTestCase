"use strict";
//import { getData } from "./check.js";
import getData from "./check.js";

async function testingCase() {
  let productId = "gid://shopify/ProductVariant/438745";
  let shopify = {
    URL: "",
    access: "",
  };

  let result = await getData(productId, shopify);
  console.log(result);
}

testingCase();
