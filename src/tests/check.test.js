import fetch from "node-fetch";
import getData from "../check.js";

jest.mock("node-fetch");

describe("getData", () => {
  const productId = "123";
  const shopify = {
    URL: "https://example.com",
    access: "TOKEN",
  };

  const mockResponse = {
    data: {
      productVariants: {
        edges: [
          {
            node: {
              id: "123",
              product: {
                id: "Product/456",
                handle: "test-product",
              },
              selectedOptions: [
                {
                  name: "Size",
                  value: "Small",
                },
                {
                  name: "Color",
                  value: "Red",
                },
              ],
            },
          },
        ],
      },
    },
  };

  const mockProductByHandleResponse = {
    data: {
      productByHandle: {
        id: "Product/789",
        vendor: "Test Vendor",
      },
    },
  };

  beforeEach(() => {
    fetch.mockReset();
  });

  it("should return variant data, options, and vendor", async () => {
    fetch
      .mockResolvedValueOnce({
        json: () => mockResponse,
      })
      .mockResolvedValueOnce({
        json: () => mockProductByHandleResponse,
      });

    const result = await getData(productId, shopify);

    expect(result).toEqual([
      {
        productId: "456",
        handle: "test-product",
      },
      ["Size", "Color"],
      "Test Vendor",
    ]);
  });
});
