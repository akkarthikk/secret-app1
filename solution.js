import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
var userIsAuthorised = false;

app.use(bodyParser.urlencoded({ extended: true }));

function passwordCheck(req, res, next) {
  const password = req.body["password"];
  if (password === "1") {
    userIsAuthorised = true;
    console.log(`${req.body["password"]} success`);
  }
  next();
}
app.use(passwordCheck);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public.html");
});

app.post("/check", (req, res) => {
  if (userIsAuthorised) {
    res.sendFile(__dirname + "/secret.html");
  } else {
 console.log(`${req.body["password"]}`);
    
    res.sendFile(__dirname + "/public.html");

  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
