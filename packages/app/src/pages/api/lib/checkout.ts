import axios from "axios";

// create checkout session

export async function createCheckout(user_id: string, template_id: string) {
  const url = `https://api.lemonsqueezy.com/v1/checkouts`;

  const payload = {
    data: {
      type: "checkouts",
      attributes: {
        custom_price: 50000,
        product_options: {
          enabled_variants: [1],
        },
        checkout_options: {},
        checkout_data: {
          //   discount_code: "10PERCENTOFF",
          custom: {
            user_id: user_id,
            template_id: template_id,
          },
        },
        preview: true,
      },
      relationships: {},
    },
  };
  let response = { error: null, data: null };
  try {
    const res = await axios.post(url, payload, {
      headers: {
        Accept: "application/vnd.api+json",
        Authorization: `Bearer ${process.env.LEMONSQUEEZY_API_KEY}}`,
      },
    });
    const resp = res.data;

    const checkoutUrl = `https://veloz.lemonsqueezy.com/checkout/buy/`;
  } catch (e: any) {
    const msg = e.response?.data?.errors[0].detail ?? e.message;
    console.log(msg);
    response.error = `Error creating checkout.` as any;
  }
  return response;
}
