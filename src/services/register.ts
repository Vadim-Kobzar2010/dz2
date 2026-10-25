import bcrypt from "bcrypt";
import { createUserRepository } from "../repositories/user.js";

export function createRegisterService(
    repository: ReturnType<typeof createUserRepository>
) {
    return {
        async register(email: string, password: string, name?: string) {
            const existingUser = await repository.findByEmail(email);

            if (existingUser) {
                throw new Error("EMAIL_EXISTS");
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await repository.create(
                email,
                hashedPassword,
                name
            );

            return {
                id: user.id,
                email: user.email,
                name: user.name,
                createdAt: user.createdAt,
            };
        },
    };
}