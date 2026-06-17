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
  },
};