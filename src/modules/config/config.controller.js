import ConfigService from "./config.service.js";
import { createResponse } from "../../common/utils.js";

export default class ConfigController {
  constructor() {
    this.configService = new ConfigService();
  }

  getActiveConfig = async (request, reply) => {
    const config = await this.configService.getActiveConfig();
    reply.send(createResponse(true, config));
  };
}