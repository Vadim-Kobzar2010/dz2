import type { Request, Response } from "express";

export function createRegisterHandler(
    service: {
        register(
            email: string,
            password: string,
            name?: string
        ): Promise<unknown>;
    }
) {
    return async (req: Request, res: Response) => {
        try {
            const { email, password, name } = req.body ?? {};

            if (
                typeof email !== "string" ||
                email.trim() === "" ||
                typeof password !== "string" ||
                password.length < 8 ||
                (name !== undefined && typeof name !== "string")
            ) {
                return res.status(400).json({
                    error: 400,
                });
            }

            const user = await service.register(
                email.trim().toLowerCase(),
                password,
                name
            );

            return res.status(201).json({ user });
        } catch (error) {
            if (
                error instanceof Error &&
                error.message === "EMAIL_EXISTS"
            ) {
                return res.status(409).json({
                    error: 409,
                });
            }

            console.error(error);

            return res.status(500).json({
                error: 500,
            });
        }
    };
}