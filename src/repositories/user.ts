import { db } from "../prisma/db";

export function createUserRepository() {
    return {
        async findByEmail(email: string) {
            return db.orm.public.User.first({ email });
        },

        async create(email: string, password: string, name?: string) {
            return db.orm.public.User.create({
                email,
                password,
                ...(name ? { name } : {}),
            });
        },
    };
}