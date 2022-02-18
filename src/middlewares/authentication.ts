import { getAccessToken, getVehicle } from '../api';
import { Request, Response, NextFunction } from 'express';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const refreshToken = req.headers.authorization?.replace('Bearer ', '');
  if (!refreshToken) {
    return res.status(400).send('missing refresh token');
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
      res.status(401).send('authentication failed');
    });
};

export { authMiddleware };
