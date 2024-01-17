import { NextRequest } from "next/server";

export const GET = (req: NextRequest) => {
  return new Response("Hello from API");
};
