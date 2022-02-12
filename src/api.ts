import axios from "axios";
import { TeslaAPI, VehicleAPI } from "teslats";

const getAccessToken = async (refreshToken: string): Promise<string> => {
  const response = await axios.post("https://auth.tesla.com/oauth2/v3/token", {
    grant_type: "refresh_token",
    client_id: "ownerapi",
    refresh_token: refreshToken,
    scope: "openid email offline_access",
  });

  return response.data["access_token"];
};

const getVehicle = async (token: string) => {
  const api = new TeslaAPI(token);
  const vehicles = await api.vehicles();
  const vehicle = vehicles[0];
  await vehicle.commands.wakeUp();
  return vehicle;
};

const enableSentryMode = async (vehicle: VehicleAPI) => {
  return vehicle.commands.sentry(true).catch(() => false);
};

export { getVehicle, enableSentryMode, getAccessToken };
