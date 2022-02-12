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
      return getVehicle(req.token!)
        .then(async (vehicle) => {
          req.vehicle = vehicle;
          next();
        })
        .catch(() => {
          return res.status(500).send("couldn't get vehicle");
        });
    })
    .catch(() => {
      res.status(401).send("authentication failed");
    });
});

app.post("/sentry", async (req, res) => {
  const result = await enableSentryMode(req.vehicle!);
  return res.status(result ? 200 : 500).send({ success: result });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}...`);
});
