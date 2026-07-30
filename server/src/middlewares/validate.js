/**
 * Returns an Express middleware that validates req.body against the given
 * Zod schema. On failure, responds 400 with a flat list of field errors.
 * On success, replaces req.body with the parsed (and coerced) data.
 */
export function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));
      return res.status(400).json({ success: false, message: "Validation failed", errors });
    }

    req.body = result.data;
    next();
  };
}

export default validate;
