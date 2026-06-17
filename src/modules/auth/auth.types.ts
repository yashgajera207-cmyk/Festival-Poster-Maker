import { Role } from "@prisma/client";

export interface RegisterInput {
businessName: string;
email: string;
mobile: string;
address: string;
logoUrl: string;
password: string;
}

export interface LoginInput {
email: string;
password: string;
}

export interface AuthPayload {
accessToken: string;
refreshToken: string;

user: {
id: string;
businessName: string;
email: string;
role: Role;
};
}
