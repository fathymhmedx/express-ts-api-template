import i18next from "i18next";
import Backend from "i18next-fs-backend";
import { handle, LanguageDetector } from "i18next-http-middleware";
import path from "path";

// initI18n(): responsible for initialization and configuration of the i18next library
export const initI18n = async () => {
  await i18next
    .use(Backend)
    .use(LanguageDetector)
    .init({
      fallbackLng: "en",
      preload: ["en", "ar"],
      backend: {
        loadPath: path.join(
          process.cwd(),
          "src/locales/{{lng}}/translation.json"
        ),
      },
      detection: {
        order: ["header", "querystring", "cookie"],
        caches: false,
      },
    });
};

// exports to app.ts
export { i18next, handle };
