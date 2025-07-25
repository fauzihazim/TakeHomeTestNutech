import { body, validationResult } from 'express-validator';

const validateEmail = [
  body('email')
    .trim()
    .notEmpty().withMessage('Invalid input format')
    .isEmail().withMessage('Paramter email tidak sesuai format')
    .normalizeEmail()
]

const validatePassword = [
  body('password')
    .trim()
    .notEmpty().withMessage('Invalid input format')
    .isLength({ min: 8 }).withMessage('Invalid input format')
]

const validateFirstName = [
  body('first_name')
    .trim()
    .notEmpty().withMessage('Invalid input format')
]

const validateLastName = [
  body('last_name')
    .trim()
    .notEmpty().withMessage('Invalid input format')
]

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 102,
      message: errors.array()[0].msg,
      data: null
    });
  }
  next();
}

export const loginValidator = [
  ...validateEmail,
  ...validatePassword,
  handleValidationErrors
];

export const registerValidator = [
  ...validateEmail,
  ...validateFirstName,
  ...validateLastName,
  ...validatePassword,
  handleValidationErrors
];

