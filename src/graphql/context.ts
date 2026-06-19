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
      req.headers.get(
        "authorization"
      );

    console.log(
      "AUTH HEADER:",
      authHeader
    );

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

    console.log(
      "TOKEN:",
      token
    );

    const payload =
      verifyAccessToken(
        token
      );

    console.log(
      "PAYLOAD:",
      payload
    );

    const user =
      await AuthRepository.findById(
        payload.userId
      );

    console.log(
      "DB USER:",
      user
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
  } catch (error) {
    console.log(
      "CONTEXT ERROR:",
      error
    );

    return {
      user: null,
    };
  }
}