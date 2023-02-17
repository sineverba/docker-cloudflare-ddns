import { rest } from "msw";
import { items as dnsRecords } from "./responses/dnsRecords";
import { items as zones } from "./responses/zones";

export const handlers = [
  rest.post(
    "https://api.cloudflare.com/client/v4/zones/abcde123456/dns_records",
    (req, res, ctx) => {
      return res(
        ctx.json({ content: "1.2.3.4", type: "A", name: "subdomains" })
      );
    }
  ),
  rest.put(
    "https://api.cloudflare.com/client/v4/zones/abcde123456/dns_records/9876qwerty",
    (req, res, ctx) => {
      return res(
        ctx.json({ content: "1.2.3.4", type: "A", name: "subdomains" })
      );
    }
  ),
  rest.get(
    "https://api.cloudflare.com/client/v4/zones/abcde123456/dns_records",
    (req, res, ctx) => {
      return res(
        ctx.json(dnsRecords)
      );
    }
  ),
  rest.get(
    "https://api.cloudflare.com/client/v4/zones",
    (req, res, ctx) => {
      return res(
        ctx.json(zones)
      );
    }
  ),
];
