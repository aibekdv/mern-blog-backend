import { body } from "express-validator";

export const loginValidatiton = [
  body("email", "Укажите почты").isEmail(),
  body("password", "Минимум 6 символа").isLength({ min: 6 }),
];

export const registerValidatiton = [
  body("email", "Укажите почты").isEmail(),
  body("password", "Минимум 6 символа").isLength({ min: 6 }),
  body("fullName", "Минимум 3 символа").isLength({ min: 3 }),
  body("avatarUrl", "Некорректное ссылка").optional().isURL(),
];

export const postCreateValidation = [
  body("title", "Введите заголовок статьи").isLength({ min: 3 }).isString(),
  body("text", "Введите текст статьи").isLength({ min: 10 }).isString(),
  body("tags", "Неверный формат тегов (укажите массив)").optional().isString(),
  body("imgUrl", "Неверная ссылка на изображение").optional().isString(),
];
