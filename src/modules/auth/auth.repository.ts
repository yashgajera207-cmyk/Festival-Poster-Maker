import {
  Prisma,
  User,
} from "@prisma/client";

import { prisma } from "@/lib/prisma";

export class AuthRepository {
  static async findByEmail(
    email: string
  ): Promise<User | null> {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  static async findById(
    id: string
  ): Promise<User | null> {
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  static async createUser(
    data: Prisma.UserCreateInput
  ): Promise<User> {
    return prisma.user.create({
      data,
    });
  }

  static async updateRefreshToken(
    userId: string,
    refreshToken: string | null
  ): Promise<User> {
    return prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshToken,
      },
    });
  }

  static async findByRefreshToken(
    refreshToken: string
  ): Promise<User | null> {
    return prisma.user.findFirst({
      where: {
        refreshToken,
      },
    });
  }
  static async updateUser(
  userId: string,
  data: {
    businessName: string;
    mobile: string;
    address: string;
    logoUrl: string;
  }
): Promise<User> {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      businessName:
        data.businessName,
      mobile:
        data.mobile,
      address:
        data.address,
      logoUrl:
        data.logoUrl,
    },
  });
}

  static async removeRefreshToken(
    userId: string
  ): Promise<User> {
    return prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshToken: null,
      },
    });
  }
}