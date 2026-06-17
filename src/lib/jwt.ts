import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: string;
  role: string;
}

export function generateAccessToken(
  userId: string,
  role: string
): string {
  return jwt.sign(
    {
      userId,
      role,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "15m",
    }
  );
}

export function generateRefreshToken(
  userId: string
): string {
  return jwt.sign(
    {
      userId,
    },
    process.env.JWT_REFRESH_SECRET!,
    {
      expiresIn: "7d",
    }
  );
}

export function verifyAccessToken(
  token: string
): JwtPayload {
  return jwt.verify(
    token,
    process.env.JWT_SECRET!
  ) as JwtPayload;
}

export function verifyRefreshToken(
  token: string
): { userId: string } {
  return jwt.verify(
    token,
    process.env.JWT_REFRESH_SECRET!
  ) as { userId: string };
}