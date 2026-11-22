import "reflect-metadata";
import { RequestMethod, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import helmet from "helmet";
import { AppModule } from "./app.module.js";
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { rawBody: true });
  const config = app.get(ConfigService);
  const origins = (config.get<string>("WEB_ORIGIN") ?? "http://localhost:5173")
    .split(",")
    .map((x) => x.trim());
  app.setGlobalPrefix("api", {
    exclude: [
      { path: "admin", method: RequestMethod.GET },
      { path: "account.html", method: RequestMethod.GET },
      { path: "checkout.html", method: RequestMethod.GET },
      { path: "product.html", method: RequestMethod.GET },

      // Keep compatibility with the other frontend paths.
      { path: "account", method: RequestMethod.GET },
      { path: "checkout", method: RequestMethod.GET },
      { path: "product/:slug", method: RequestMethod.GET },
    ],
  });
  app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
  app.enableCors({ origin: origins, credentials: true });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen(Number(config.get<string>("PORT") ?? 3001), "0.0.0.0");
}
void bootstrap();
