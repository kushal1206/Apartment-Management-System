// Tiny, dependency-free validator for simple schemas
export function validateBody(schema, { stripUnknown = false } = {}) {
  return (req, res, next) => {
    const src = req.body ?? {};
    const out = {};
    for (const [key, rule] of Object.entries(schema)) {
      let v = src[key];

      if (rule.required && (v === undefined || v === null || v === ""))
        return res.status(400).json({ message: `${key} is required` });

      if (v !== undefined) {
        if (rule.type && typeof v !== rule.type)
          return res
            .status(400)
            .json({ message: `${key} must be ${rule.type}` });

        if (rule.enum && !rule.enum.includes(v))
          return res
            .status(400)
            .json({
              message: `${key} must be one of: ${rule.enum.join(", ")}`,
            });

        if (rule.minLength && String(v).trim().length < rule.minLength)
          return res
            .status(400)
            .json({
              message: `${key} must be at least ${rule.minLength} chars`,
            });

        if (rule.trim) v = String(v).trim();

        out[key] = v;
      }
    }

    if (!stripUnknown) {
      // pass through unknowns
      for (const k of Object.keys(src)) if (!(k in out)) out[k] = src[k];
    }

    req.body = out;
    next();
  };
}
