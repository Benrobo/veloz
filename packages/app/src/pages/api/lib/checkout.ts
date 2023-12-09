import { TEMPLATES_PRICING_MODEL } from "@/constant/template";
import { PARENT_TEMPLATES } from "@/data/stack";
import axios from "axios";
import env from "../config/env";

const IN_TEST_MODE = process.env.NODE_ENV === "development";

// create checkout session
export async function createCheckout(user_id: string, template_id: string) {
  const parentTemplate = PARENT_TEMPLATES.find((t) => t.id === template_id);

  if (!parentTemplate) {
    return {
      error: `Template ${template_id} not found.`,
      data: null,
    };
  }

  const custom_redirect_url = `${env.BASE_URL}/templates/parent/${parentTemplate.name}`;

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
        preview: true,
      },
      relationships: {
        store: {
          data: {
            type: "stores",
            id: "58246",
          },
        },
        variant: {},
      },
      test_mode: IN_TEST_MODE,
    },
  };
  let response = { error: null, data: null };
  try {
    // get variants
    const variants = await getProductVariants();
    if (variants.error) {
      return variants;
    }

    payload.data.relationships.variant = {
      data: variants?.data[0] as any,
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
  } catch (e: any) {
    const msg = e.response?.data?.errors[0].detail ?? e.message;
    console.log(msg);
    response.error = `Error creating checkout.` as any;
  }
  return response;
}

async function getProductVariants() {
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

    const variantData = resp?.data.map((v: any) => {
      return {
        type: v.type,
        id: v.id,
      };
    });
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