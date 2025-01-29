require("dotenv").config();
const path = require("path");
require("express-async-errors");
const express = require("express");
const app = express();

// utilities
const connectDB = require("./db/connect");

// routers
const authRouter = require("./routes/user");
const jobsRouter = require("./routes/jobs");
const vendorRouter = require("./routes/vendor");
const productRouter = require("./routes/products");
const orderRouter = require("./routes/orders");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const { authMiddleware } = require("./middleware/authentication");

// extra packages
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const fileUpload = require("express-fileupload");
// const rateLimiter = require("express-rate-limit");

// middleware
// app.set("trust-proxy", 1);
// app.use(
//   rateLimiter({
//     windowMs: 15 * 60 * 1000,
//     max: 100,
//   })
// );
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));

app.use(helmet());
app.use(cors());
app.use(xss());

app.use(express.static("./public"));

// routes
app.get("/", (req, res) => {
  res.json({ msg: "Hello, user!" });
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/vendor", vendorRouter);
app.use("/api/v1/jobs", authMiddleware, jobsRouter);
app.use("/api/v1/products", authMiddleware, productRouter);
app.use("/api/v1/orders", authMiddleware, orderRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
