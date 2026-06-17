import { NextRequest } from "next/server";

import { verifyAccessToken } from "@/lib/jwt";
import { AuthRepository } from "@/modules/auth/auth.repository";

export interface GraphQLContext {
  user: {
    id: string;
    role: string;
  } | null;
}

export async function createContext(
  req: NextRequest
): Promise<GraphQLContext> {
  try {
    const authHeader =
      req.headers.get("authorization");

    if (!authHeader) {
      return {
        user: null,
      };
    }

    const token =
      authHeader.replace(
        "Bearer ",
        ""
      );

    const payload =
      verifyAccessToken(token);

    const user =
      await AuthRepository.findById(
        payload.userId
      );

    if (!user) {
      return {
        user: null,
      };
    }

    return {
      user: {
        id: user.id,
        role: user.role,
      },
    };
  } catch {
    return {
      user: null,
    };
  }
}