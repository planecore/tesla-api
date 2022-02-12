declare namespace Express {
  interface Request {
    token?: string;
    vehicle?: import("ts-tesla").VehicleAPI;
  }
}
