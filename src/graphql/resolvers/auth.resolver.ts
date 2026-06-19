import { prisma } from "@/lib/prisma";

import { AuthService } from "@/modules/auth/auth.service";
import { AuthRepository } from "@/modules/auth/auth.repository";

export const authResolver = {
  Query: {
    me: async (
      _: unknown,
      __: unknown,
      context: any
    ) => {
      if (!context.user) {
        return null;
      }

      return AuthRepository.findById(
        context.user.id
      );
    },

    users: async () => {
      return prisma.user.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });
    },
  },

  Mutation: {
    register: async (
      _: unknown,
      { input }: any
    ) => {
      return AuthService.register(
        input
      );
    },

    login: async (
      _: unknown,
      { input }: any
    ) => {
      return AuthService.login(
        input
      );
    },

    refreshToken: async (
      _: unknown,
      { token }: any
    ) => {
      return AuthService.refreshToken(
        token
      );
    },

    logout: async (
      _: unknown,
      __: unknown,
      context: any
    ) => {
      if (!context.user) {
        throw new Error(
          "Unauthorized"
        );
      }

      return AuthService.logout(
        context.user.id
      );
    },

    deleteUser: async (
      _: unknown,
      { id }: { id: string }
    ) => {
      await prisma.user.delete({
        where: {
          id,
        },
      });

      return true;
    },
  },
};