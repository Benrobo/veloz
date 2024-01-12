import { PARENT_KITS } from "@/data/stack";
import axios from "axios";
import env from "../config/env";

const IN_TEST_MODE = process.env.NODE_ENV === "development";
const STORE_ID = "58246";

// create checkout session
export async function createCheckout(user_id: string, template_id: string) {
  const parentKit = PARENT_KITS.find((t) => t.id === template_id);

  if (!parentKit) {
    return {
      error: `Template ${template_id} not found.`,
      data: null,
    };
  }

  const custom_redirect_url = `${env.BASE_URL}/kits/parent/${parentKit.name}`;

  const payload = {
    data: {
      type: "checkouts",
      attributes: {
        product_options: {
          enabled_variants: [],
          redirect_url: custom_redirect_url,
        },
        checkout_options: {},
        checkout_data: {
          //   discount_code: "10PERCENTOFF",
          variant_quantities: [],
          custom: {
            user_id: user_id,
            template_id: template_id,
          },
        },
      },
      relationships: {
        store: {
          data: {
            type: "stores",
            id: STORE_ID,
          },
        },
        variant: {},
      },
    },
  };
  let response = { error: null, data: null };
  try {
    // get variants
    const variants = PARENT_KITS.find((t) => t.id === template_id);

    payload.data.relationships.variant = {
      data: {
        type: "variants",
        id: IN_TEST_MODE ? variants?.test_variant_id : variants?.variant_id,
      },
    };

    const url = `https://api.lemonsqueezy.com/v1/checkouts`;
    const res = await axios.post(url, payload, {
      headers: {
        Accept: "application/vnd.api+json",
        Authorization: `Bearer ${process.env.LEMONSQUEEZY_API_KEY}`,
      },
    });
    const resp = res.data;

    const checkoutUrl = resp?.data?.attributes?.url;
    response.data = { url: checkoutUrl } as any;

    console.log("checkout created", resp.data);
  } catch (e: any) {
    const msg = e.response?.data?.errors[0].detail ?? e.message;
    console.log(msg);
    response.error = `Error creating checkout.` as any;
  }
  return response;
}

export async function getProductVariants() {
  let response = { error: null, data: null } as any;
  try {
    const url = `https://api.lemonsqueezy.com/v1/variants`;
    const res = await axios.get(url, {
      headers: {
        Accept: "application/vnd.api+json",
        Authorization: `Bearer ${process.env.LEMONSQUEEZY_API_KEY}`,
      },
    });
    const resp = res.data;

    const variantData = resp?.data
      .filter(
        (v: any) =>
          v.attributes.is_subscription === false && v.attributes.name.length > 0
      )
      .map((v: any) => {
        return {
          type: v.type,
          id: v.id,
          price: v.attributes.price,
          name: v.attributes.name,
          prod_id: v.attributes.product_id,
        };
      });
    console.log(variantData);
    response.data = variantData as {
      type: string;
      id: string;
    }[];
    return response;
  } catch (e: any) {
    const msg = e.response?.data?.errors[0].detail ?? e.message;
    console.log(msg);
    response.error = `Error creating checkout.` as any;
    return response;
  }
}

export async function getProducts() {
  let response = { error: null, data: null } as any;
  try {
    const url = `https://api.lemonsqueezy.com/v1/products?filter[store_id]=${STORE_ID}`;
    const res = await axios.get(url, {
      headers: {
        Accept: "application/vnd.api+json",
        Authorization: `Bearer ${process.env.LEMONSQUEEZY_API_KEY}`,
      },
    });
    const resp = res.data;

    const data = resp?.data.map((p: any) => {
      return {
        prod_id: p?.id,
        name: p?.attributes?.name,
        price: p?.attributes?.price,
        price_formatted: p?.attributes?.price_formatted,
      };
    });

    response.data = data;
    return response;
  } catch (e: any) {
    const msg = e.response?.data?.errors[0].detail ?? e.message;
    console.log(msg);
    response.error = `Error creating checkout.` as any;
    return response;
  }
}
