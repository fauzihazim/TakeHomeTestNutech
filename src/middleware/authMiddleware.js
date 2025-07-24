import { body, validationResult } from 'express-validator';

export const loginValidator = [
  body('email')
    .trim()
    .notEmpty()
    .isEmail()
    .normalizeEmail(),
  body('password')
    .trim()
    .notEmpty()
    .isLength({ min: 8 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 102,
        message: "Paramter email tidak sesuai format",
        data: null
      });
    }
    next();
  }
];

export const registerValidator = [
  body('email')
    .trim()
    .notEmpty()
    .isEmail()
    .normalizeEmail(),
    
  body('first_name')
    .trim()
    .notEmpty(),
    
  body('last_name')
    .trim()
    .notEmpty(),
    
  body('password')
    .trim()
    .notEmpty()
    .isLength({ min: 8 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 102,
        message: 'Paramter email tidak sesuai format',
        data: null
      });
    }
    next();
  }
];