import Page from "./page.model.js";
import { NotFoundError } from "../../common/errors.js";

export default class PageService {
  async getPageByKeyAndLocale(key, locale) {
    const page = await Page.findOne({
      where: { key }
    });

    if (!page) {
      throw new NotFoundError(`Page with key '${key}' not found`);
    }

    // Extract the locale data from the JSONB data field
    const localeData = page.data[locale];

    if (!localeData) {
      throw new NotFoundError(`Page '${key}' not found for locale '${locale}'`);
    }

    return { [key]: localeData };
  }

  async getAllPagesForLocale(locale) {
    const pages = await Page.findAll();
    
    const result = {};
    
    pages.forEach(page => {
      const localeData = page.data[locale];
      if (localeData) {
        result[page.key] = localeData;
      }
    });

    if (Object.keys(result).length === 0) {
      throw new NotFoundError(`No pages found for locale '${locale}'`);
    }

    return result;
  }
}