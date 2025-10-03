export class SortStrategy {
  sort(items, order = "desc") {
    return items;
  }
  static ord(order) {
    return order?.toLowerCase() === "asc" ? "asc" : "desc";
  }
  static asDate(v) {
    const d = new Date(v);
    return isNaN(d) ? new Date(0) : d;
  }
}

export class SortByDate extends SortStrategy {
  sort(items, order = "desc") {
    const o = SortStrategy.ord(order);
    return [...items].sort((a, b) => {
      const da = SortStrategy.asDate(a.updatedAt || a.createdAt);
      const db = SortStrategy.asDate(b.updatedAt || b.createdAt);
      return o === "asc" ? da - db : db - da;
    });
  }
}

export class SortByPriority extends SortStrategy {
  sort(items, order = "desc") {
    const o = SortStrategy.ord(order);
    const w = { High: 3, Medium: 2, Low: 1 };
    return [...items].sort((a, b) => {
      const wa = w[a.priority] || 0,
        wb = w[b.priority] || 0;
      return o === "asc" ? wa - wb : wb - wa;
    });
  }
}

export class SortByStatus extends SortStrategy {
  sort(items, order = "desc") {
    const o = SortStrategy.ord(order);
    // Your statuses: Pending > In Progress > Completed
    const w = { Pending: 3, "In Progress": 2, Completed: 1 };
    return [...items].sort((a, b) => {
      const wa = w[a.status] || 0,
        wb = w[b.status] || 0;
      return o === "asc" ? wa - wb : wb - wa;
    });
  }
}

export class SortContext {
  constructor(strategy) {
    this.strategy = strategy;
  }
  setStrategy(s) {
    this.strategy = s;
  }
  execute(items, order) {
    return this.strategy.sort(items, order);
  }
}

export const createMaintenanceSchema = {
  title: { required: true, type: "string", trim: true, minLength: 3 },
  description: { type: "string", trim: true },
  priority: { type: "string", enum: ["Low", "Medium", "High"] },
  status: { type: "string", enum: ["Pending", "In Progress", "Completed"] },
};

export const updateMaintenanceSchema = {
  title: { type: "string", trim: true, minLength: 3 },
  description: { type: "string", trim: true },
  priority: { type: "string", enum: ["Low", "Medium", "High"] },
  status: { type: "string", enum: ["Pending", "In Progress", "Completed"] },
};
