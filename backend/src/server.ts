import express, { Request, Response } from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
app.set("trust proxy", 1);
import { errorHandler } from "./middleware/errorHandler";

// import routes
import { userRoutes } from "./routes/userRoute";
import { productRoutes } from "./routes/productRoute";
import { categoryRoutes } from "./routes/categoryRoute";
import { orderRoutes } from "./routes/orderRoutes";
import { paymentRoutes } from "./routes/stripeRoute";
import { NotFound } from "./erros/notFound";

if (!process.env.DATABASE) {
  throw new Error("DATABASE is not defined");
}
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("DB connected"))
  .catch((err: any) => console.log(err));

//MIDDLEWARE
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(bodyParser.json({ limit: "5mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "5mb",
    extended: true,
  })
);
app.use(cookieParser());
app.use(cors());
// adding security headers
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "img-src": ["'self'", "https: data:"],
    },
  })
);

//route middleware
app.use("/api", userRoutes);
app.use("/api", productRoutes);
app.use("/api", categoryRoutes);
app.use("/api", orderRoutes);
app.use("/api", paymentRoutes);

app.all("*", async (req, res, next) => {
  next(new NotFound());
});

app.use(errorHandler);

__dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req: Request, res: Response) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req: Request, res: Response) => {
    res.send("API is running....");
  });
}

const port: number = parseInt(process.env.PORT as string) || 8000;

app.listen(port, (): void => {
  console.log(`Server running on port ${port}`);
});
