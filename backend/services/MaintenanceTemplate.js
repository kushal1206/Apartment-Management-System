export class MaintenanceTemplate {
  constructor({
    title = "New maintenance",
    description = "",
    priority = "Low",
    status = "Pending",
  } = {}) {
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.status = status;
  }
  clone(overrides = {}) {
    const base =
      typeof structuredClone === "function"
        ? structuredClone(this)
        : JSON.parse(JSON.stringify(this));
    return { ...base, ...overrides };
  }
}

export const MaintenanceTemplates = {
  default: new MaintenanceTemplate(),
  urgent: new MaintenanceTemplate({
    title: "Urgent maintenance",
    priority: "High",
  }),
  plumbing: new MaintenanceTemplate({
    title: "Plumbing issue",
    priority: "Medium",
  }),
  electric: new MaintenanceTemplate({
    title: "Electrical issue",
    priority: "Medium",
  }),
};
