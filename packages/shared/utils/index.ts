import { STACK_AVAILABILITY } from "../data/stack";
import { TechStackCategory } from "../types";

// check stack availability
export function isStackAvailable(stack: string, category: TechStackCategory) {
  const notAvailableStacks = STACK_AVAILABILITY.find(
    (s) => s.category === category
  )?.not_available as string[];

  if (category === "payment") {
    console.log({ notAvailableStacks });
  }

  if (notAvailableStacks?.includes(stack)) return false;

  return true;
}
