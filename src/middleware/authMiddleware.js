import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

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

export const authenticateAccessToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split('Bearer ')[1];
  if (!token) {
    return res.status(401).json({
      status: 108,
      message: "Token tidak tidak valid atau kadaluwarsa",
      data: null
    });
  };
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({
        status: 108,
        message: "Token tidak tidak valid atau kadaluwarsa",
        data: null
      });
    }
    res.locals.userId = user.sub;
    res.locals.email = user.email;
    next();
  });
};