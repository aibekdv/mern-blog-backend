import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";

import {
  registerValidatiton,
  loginValidatiton,
  postCreateValidation,
} from "./validations/index.js";

import { checkAuth, handleValidationErrors } from "./utils/index.js";
import { UserController, PostController } from "./controllers/index.js";

mongoose
  .connect(
    "mongodb+srv://aibekdv:nmkl2018@cluster0.aslmk.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB connected..."))
  .catch((e) => console.log("DB conntection failed: ", e));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(cors());

// @get tags
app.get('/posts/tags', PostController.getLastTags);

// @login
app.post(
  "/auth/login",
  loginValidatiton,
  handleValidationErrors,
  UserController.login
);

// @registration
app.post(
  "/auth/register",
  registerValidatiton,
  handleValidationErrors,
  UserController.register
);

// @get me
app.get("/auth/me", checkAuth, UserController.getMe);

// @upload image
app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

// @posts CRUD
app.post(
  "/posts",
  checkAuth,
  handleValidationErrors,
  postCreateValidation,
  PostController.create
);
app.delete("/posts/:id", checkAuth, PostController.remove);
app.patch(
  "/posts/:id",
  checkAuth,
  handleValidationErrors,
  PostController.update
);

app.get("/posts/:id", PostController.getOne);
app.get("/posts", PostController.getAll);

app.listen(process.env.PORT || 4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server OK");
});
