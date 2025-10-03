export class FlatAccessProxy {
  constructor(service) {
    this.service = service;
  }

  async list(_user) {
    return this.service.list();
  }

  async create(user, payload) {
    if (!user) throw Object.assign(new Error("Unauthorized"), { status: 401 });
    if (user.role !== "admin")
      throw Object.assign(new Error("Forbidden"), { status: 403 });
    return this.service.create(payload);
  }

  async update(user, id, patch) {
    if (!user) throw Object.assign(new Error("Unauthorized"), { status: 401 });
    if (user.role !== "admin")
      throw Object.assign(new Error("Forbidden"), { status: 403 });
    return this.service.update(id, patch);
  }

  async remove(user, id) {
    if (!user) throw Object.assign(new Error("Unauthorized"), { status: 401 });
    if (user.role !== "admin")
      throw Object.assign(new Error("Forbidden"), { status: 403 });
    return this.service.remove(id);
  }
}
