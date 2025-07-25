import { body, validationResult } from 'express-validator';

const validateTopUpAmount = [
    body('top_up_amount')
        .trim()
        .notEmpty().withMessage('Invalid input format')
        .isInt({ min: 0 }).withMessage('Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0')
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

export const topUpValidator = [
  ...validateTopUpAmount,
  handleValidationErrors
];