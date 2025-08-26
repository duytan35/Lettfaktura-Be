import Config from "./config.model.js";
import { NotFoundError } from "../../common/errors.js";

export default class ConfigService {
  async getActiveConfig() {
    const config = await Config.findOne({
      where: { isActive: true },
      order: [["createdAt", "DESC"]],
    });

    if (!config) {
      throw new NotFoundError("No active configuration found");
    }

    return config;
  }
}
