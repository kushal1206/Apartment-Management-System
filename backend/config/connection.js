let instance = null;

class Config {
  constructor() {
    if (instance) return instance;

    this.env = process.env.NODE_ENV || "development";
    this.port = process.env.PORT || 5001;
    this.jwtSecret = process.env.JWT_SECRET || "change_me_secret";
    this.flags = {
      enableBulkUndo: true,
      enableNewDashboard: true,
    };

    instance = this;
  }

  static getInstance() {
    return new Config();
  }

  get(key) {
    if (this[key] !== undefined) return this[key];
    if (this.flags[key] !== undefined) return this.flags[key];
    return process.env[key];
  }
}

export default Config;
