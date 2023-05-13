"use strict";
import fetch from "node-fetch";

export default async function getData(productId, shopify) {
  let data = JSON.stringify({
    query: `{productVariants(first:1){edges{node{id product{id handle}selectedOptions{name}}}}}`,
  });

  let response = await fetch(`${shopify.URL}/graphql.json`, {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": shopify.access,
    },
  });

  console.log(response);
  const result = await response.json();

  let variant = result.data.productVariants.edges;
  let variantData = {
    productId: variant[0]?.node.product.id.split("Product/")[1],
    handle: variant[0]?.node.product.handle,
  };

  let options = [];
  for (let sku of variant) {
    for (let option of sku.node.selectedOptions) {
      options.push(option.name);
    }
  }

  let data2 = JSON.stringify({
    query: `query {
      productByHandle(handle: "h") {
        id
        vendor
      }
    }`,
  });

  let productByHandleresponse = await fetch(`${shopify.URL}/graphql.json`, {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": shopify.access,
    },
  });
  const productByHandleresult = await productByHandleresponse.json();
  let vendor = productByHandleresult.data.productByHandle.vendor;

  return [variantData, options, vendor];
}
