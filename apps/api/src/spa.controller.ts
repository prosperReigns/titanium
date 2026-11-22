import { Controller, Get, Res } from "@nestjs/common";
import type { Response } from "express";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));

@Controller()
export class SpaController {
  @Get([
    "/admin",
    "/account",
    "/account.html",
    "/checkout",
    "/checkout.html",
    "/product",
    "/product/:slug",
    "/product.html",
  ])
  serveFrontend(@Res() res: Response) {
    return res.sendFile(
      resolve(here, "../../web/dist/index.html"),
    );
  }
}