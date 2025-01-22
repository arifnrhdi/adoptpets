import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import SequelizeStore from "connect-session-sequelize";
import db from "./config/Database.js";
import AdoptRoute from "./routes/AdoptRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import UserRoute from "./routes/UserRoute.js";

dotenv.config();
const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
  db: db,
});

// (async () => {
//   await db.sync({force: true});
// })();

// store.sync();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: "auto",
    },
  })
);
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(fileUpload());
app.use(express.json());
app.use(express.static("public"));
app.use(AdoptRoute);
app.use(AuthRoute);
app.use(UserRoute);
 
app.listen(process.env.PORT, () => {
  console.log(`Server running at port ${process.env.PORT}`);
});   
 