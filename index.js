const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const cors = require("cors");
const authRouter = require("./routes/auth-Router");
const hotelsRouter = require("./routes/hotels-Router");
const roomsRouter = require("./routes/rooms-Router");
const usersRouter = require("./routes/users-Router");
const feedsbacksRouter = require("./routes/feedback-Router");
const contactsRouter = require("./routes/contact-router");
const eventsRouter = require("./routes/event-Router");
const groupsDRouter = require("./routes/groupD-Router");
const mangersRouter = require("./routes/manger-Router");
const messagesRouter = require("./routes/message-Router");
const bookingsRouter = require("./routes/bookings-Router");
const paymentsRouter = require("./routes/payments-Router");
const searchsRouter = require("./routes/search-Router");
const path = require("path");
const app = express();
app.use(cors());
// app.use(cors());
app.use(express.json());

// ? database connection
mongoose
  .connect(process.env.MOGO_URL)
  .then(() => {
    console.log("connection is successful");
  })
  .catch((e) => {
    console.log(e);
  });

//  todo auth routes

app.use("/api/auth", authRouter);
app.use("/api/user", usersRouter);
app.use("/api/hotels", hotelsRouter);
app.use("/api/rooms", roomsRouter);
app.use("/api/bookings", bookingsRouter);
app.use("/api/events", eventsRouter);
app.use("/api/mangers", mangersRouter);
app.use("/api/groupsd", groupsDRouter);
app.use("/api/contacts", contactsRouter);
app.use("/api/messages", messagesRouter);
app.use("/api/feedbacks", feedsbacksRouter);
app.use("/api/search", searchsRouter);

// todo payments routes

app.use("/payments", paymentsRouter);
app.get("/test", (req, res) => {
  res.send("<h1>Server is running</>");
});

// !  listening the port

// static  files

// app.use(express.static(path.join(__dirname, "./client/dist")));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "./client/dist/index.html"));
// });

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("server is running");
});
