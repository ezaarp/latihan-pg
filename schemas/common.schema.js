const Joi = require("joi");

// Schema untuk validasi ID parameter
const idParamSchema = Joi.object({
  id: Joi.number().integer().positive().required().messages({
    "number.base": "ID harus berupa angka",
    "number.integer": "ID harus berupa angka bulat",
    "number.positive": "ID harus berupa angka positif",
    "any.required": "ID wajib diisi",
  }),
});

// Schema untuk validasi query pagination
const paginationSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1).messages({
    "number.base": "Page harus berupa angka",
    "number.integer": "Page harus berupa angka bulat",
    "number.min": "Page minimal 1",
  }),
  limit: Joi.number().integer().min(1).max(100).default(10).messages({
    "number.base": "Limit harus berupa angka",
    "number.integer": "Limit harus berupa angka bulat",
    "number.min": "Limit minimal 1",
    "number.max": "Limit maksimal 100",
  }),
});

module.exports = {
  idParamSchema,
  paginationSchema,
}; 