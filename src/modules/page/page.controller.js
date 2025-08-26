import PageService from "./page.service.js";
import { createResponse } from "../../common/utils.js";

export default class PageController {
  constructor() {
    this.pageService = new PageService();
  }

  getPageByLocale = async (request, reply) => {
    const { key, locale } = request.params;
    const pageData = await this.pageService.getPageByKeyAndLocale(key, locale);
    reply.send(createResponse(true, pageData));
  };

  getAllPagesForLocale = async (request, reply) => {
    const { locale } = request.params;
    const pagesData = await this.pageService.getAllPagesForLocale(locale);
    reply.send(createResponse(true, pagesData));
  };
}