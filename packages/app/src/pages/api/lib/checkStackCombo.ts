import { TechStackCategory, VelozProjectOption } from "@veloz/shared";

//  Invalid Stack Combos 😥
// (frontend libraries/framework combined with a DB only, should be considered invalid if no backend is combined)
// (frontend libraries/framework combined with a Payment Provider [lemonsqueezy, paddle, stripe] only, should be considered invalid if no backend is combined)
// (frontend libraries/framework combined with a Mailing Provider [resend, postmark, elasticmail] only, should be considered invalid if no backend is combined)
// (vanillajs combined with a Auth Provider [clerk, jwt] only, should be considered invalid if no backend is combined)
// (Database only without backend, should be considered invalid)
// (Payment providers only without backend, should be considered invalid)
// (Mailing providers only without backend, should be considered invalid)
// (Auth providers only without backend, should be considered invalid)
// vanillajs | react | nextjs x mysql/mongodb/postgres ❌
// vanillajs | react | nextjs x stripe/lemonsqueezy/paddle ❌
// vanillajs | react | nextjs x resend/postmark/elasticmail ❌
// vanillajs x clerk/jwt ❌
// mysql | mongodb | postgres x (without) backend lang/frameworks/libraries ❌
// stripe | lemonsqueezy | paddle x (without) backend lang/frameworks/libraries ❌
// resend | postmark | elasticmail x (without) backend lang/frameworks/libraries ❌
// clerk | jwt x (without) backend lang/frameworks/libraries ❌
// design_system x without frontend lang/frameworks/libraries ❌

type StackProps = Record<
  TechStackCategory,
  { category: TechStackCategory; name: string; stack: string }
>;

export default function _checkRefinedStackCombo(
  type: VelozProjectOption,
  stacks: StackProps
) {
  if (type === "Refined") {
    const { frontend, backend, database, payment, authentication, mailing } =
      stacks;

    if (!(frontend || backend)) {
      console.log("frontend and backend invalid combo");
      return false;
    }

    if (
      frontend &&
      database &&
      ["vanillajs", "react"].includes(frontend.stack)
    ) {
      console.log("[vanillajs] or [react] and database invalid combo");
      return false;
    }

    if (frontend && authentication && !backend) {
      if (frontend.stack === "vanillajs") {
        console.log("frontend [vaillajs] and auth invalid combo");
        return false;
      }

      if (authentication.stack === "jsonwebtoken" && !backend) {
        console.log("jwt and no backend invalid combo");
        return false;
      }
    }

    if (database && !backend) {
      console.log("database only without backend invalid combo");
      return false;
    }

    if (payment && !backend) {
      console.log("payment only without backend invalid combo");
      return false;
    }

    if (mailing && frontend) {
      if (["vanillajs", "react"].includes(frontend.stack)) {
        console.log(
          "no support for vanilajs and react mailing only without backend invalid combo"
        );
        return false;
      }
    }

    return true;
  }
}
