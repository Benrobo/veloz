import { REFINED_STACKS, STACK_AVAILABILITY } from "../data/stack";
import { TechStackCategory, TechStackPricingPlan } from "../types";

// check stack availability
export function isStackAvailable(stack: string, category: TechStackCategory) {
  const notAvailableStacks = STACK_AVAILABILITY.find(
    (s) => s.category === category
  )?.not_available as string[];

  if (notAvailableStacks?.includes(stack)) return false;

  return true;
}

type StackProps = Record<
  TechStackCategory,
  { category: TechStackCategory; name: string; stack: string }
>;

export function _checkRefinedStackAvailability(stacks: StackProps) {
  // check if stack is available
  for (const [category, stack] of Object.entries(stacks)) {
    if (!isStackAvailable(stack.stack, category as TechStackCategory)) {
      console.log(`[${category} : ${stack.stack}] stack not available`);
      return false;
    }
  }
  return true;
}

// check if user is eligible or not for a specific stack plan
export function _isUserEligibleForStack(
  stacks: StackProps,
  userPlan: TechStackPricingPlan
) {
  let resp = {
    eligible: false,
    message: "",
  };
  for (const [category, stack] of Object.entries(stacks)) {
    const _stack = REFINED_STACKS.find(
      (s) => s.category === category
    )?.stacks.find((s) => s.key === stack.stack);

    if (_stack?.key === stack.stack && _stack.pricing_plan !== userPlan) {
      console.log(`[${stack.stack} : ${_stack.pricing_plan}] Not Eligible`);
      resp.message = `You are not eligible for ${stack.stack} stack`;
      return resp;
    }
  }
  resp.eligible = true;
  return resp;
}
