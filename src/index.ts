import express from "express";
import { enableSentryMode, getAccessToken, getVehicle } from "./api";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use((req, res, next) => {
  const refreshToken = req.headers.authorization?.replace("Bearer ", "");
  if (!refreshToken) {
    return res.status(400).send("missing refresh token");
  }

  return getAccessToken(refreshToken)
    .then((accessToken) => {
      req.token = accessToken;
      next();
    })
    .catch((err) => {
      res.status(401).send("authentication failed");
    });
});

app.post("/", (req, res) => {
  return getVehicle(req.token!)
    .then(async (vehicle) => {
      const result = await enableSentryMode(vehicle);
      return res.status(result ? 200 : 500).send({ success: result });
    })
    .catch((err) => {
      return res.status(500).send("couldn't get vehicle");
    });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}...`);
});
