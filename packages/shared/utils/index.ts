import { STACK_AVAILABILITY } from "../data/stack";
import { TechStackCategory } from "../types";

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
