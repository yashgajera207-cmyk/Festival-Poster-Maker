import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "@/lib/jwt";

import {
  comparePassword,
  hashPassword,
} from "@/lib/password";

import { AuthRepository } from "./auth.repository";

import {
  LoginInput,
  RegisterInput,
  AuthPayload,
} from "./auth.types";

export class AuthService {
  static async register(
    input: RegisterInput
  ): Promise<AuthPayload> {
    const existingUser =
      await AuthRepository.findByEmail(
        input.email
      );


    if (existingUser) {
      throw new Error(
        "Email already exists"
      );
    }

    const hashedPassword =
      await hashPassword(
        input.password
      );

    const user =
      await AuthRepository.createUser({
        businessName:
          input.businessName,
        email:
          input.email,
        mobile:
          input.mobile,
        address:
          input.address,
        logoUrl:
          input.logoUrl,
        password:
          hashedPassword,
      });

    const accessToken =
      generateAccessToken(
        user.id,
        user.role
      );

    const refreshToken =
      generateRefreshToken(
        user.id
      );

    await AuthRepository.updateRefreshToken(
      user.id,
      refreshToken
    );

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        businessName:
          user.businessName,
        email:
          user.email,
        role:
          user.role,
      },
    };


  }

  static async login(
    input: LoginInput
  ): Promise<AuthPayload> {
    const user =
      await AuthRepository.findByEmail(
        input.email
      );




    if (!user) {
      throw new Error(
        "Invalid credentials"
      );
    }

    const isValid =
      await comparePassword(
        input.password,
        user.password
      );

    console.log(
      "PASSWORD MATCH:",
      isValid
    );

    if (!isValid) {
      throw new Error(
        "Invalid credentials"
      );
    }

    const accessToken =
      generateAccessToken(
        user.id,
        user.role
      );

    const refreshToken =
      generateRefreshToken(
        user.id
      );

    await AuthRepository.updateRefreshToken(
      user.id,
      refreshToken
    );

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        businessName:
          user.businessName,
        email:
          user.email,
        role:
          user.role,
      },
    };


  }

  static async refreshToken(
    token: string
  ): Promise<AuthPayload> {
    const payload =
      verifyRefreshToken(token);


    const user =
      await AuthRepository.findById(
        payload.userId
      );

    if (!user) {
      throw new Error(
        "User not found"
      );
    }

    if (
      user.refreshToken !== token
    ) {
      throw new Error(
        "Invalid refresh token"
      );
    }

    const newAccessToken =
      generateAccessToken(
        user.id,
        user.role
      );

    const newRefreshToken =
      generateRefreshToken(
        user.id
      );

    await AuthRepository.updateRefreshToken(
      user.id,
      newRefreshToken
    );

    return {
      accessToken:
        newAccessToken,
      refreshToken:
        newRefreshToken,
      user: {
        id: user.id,
        businessName:
          user.businessName,
        email:
          user.email,
        role:
          user.role,
      },
    };

  }

  static async logout(
  userId: string
): Promise<boolean> {
  await AuthRepository.removeRefreshToken(
    userId
  );

  return true;
}

static async updateProfile(
  userId: string,
  input: {
    businessName: string;
    mobile: string;
    address: string;
    logoUrl: string;
  }
) {
  return AuthRepository.updateUser(
    userId,
    {
      businessName:
        input.businessName,
      mobile:
        input.mobile,
      address:
        input.address,
      logoUrl:
        input.logoUrl,
    }
  );
}
}