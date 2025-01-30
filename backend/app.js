require("dotenv").config();
const path = require("path");
require("express-async-errors");
const express = require("express");
const { app, server } = require("./socket/socket");

// utilities
const connectDB = require("./db/connect");

// routers
const authRouter = require("./routes/user");
const jobsRouter = require("./routes/jobs");
// const map = require("./routes/map");
const vendorRouter = require("./routes/vendor");
const productRouter = require("./routes/products");
const orderRouter = require("./routes/orders");
const userProductsRouter = require("./routes/user-products");
const reviewRouter = require("./routes/review");
const subscriptionRouter = require("./routes/subscription");

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
// app.use("/api/v1/map", map);
app.use("/api/v1/products", authMiddleware, productRouter);
app.use("/api/v1/orders", authMiddleware, orderRouter);
app.use("/api/v1/product-listings", authMiddleware, userProductsRouter);
app.use("/api/v1/review", reviewRouter);
app.use("/api/v1/subscription", authMiddleware, subscriptionRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    server.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
