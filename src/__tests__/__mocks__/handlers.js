import { HttpResponse, http } from "msw";
import zones from "../__mocks__/responses/zones.json";

export const handlers = [
  http.get("https://api.cloudflare.com/client/v4/zones", () =>
    HttpResponse.json(zones),
  ),
];
