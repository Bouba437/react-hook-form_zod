import { z, ZodType } from 'zod';
import { FormData } from '../types/types';

export const RegisterSchema: ZodType<FormData> = z.object({
    firstName: 
        z.string()
        .min(2, "Le prénom doit contenir au moins 2 caractères.")
        .max(30, "Le prénom doit contenir au maximum 30 caractères."),
    lastName: 
        z.string()
        .min(2, "Le nom doit contenir au moins 2 caractères.")
        .max(30, "Le nom doit contenir au maximum 30 caractères."),
    email: 
        z.string()
        .email("Email invalide."),
    age: 
        z.number()
        .min(18, "L'âge doit être supérieur ou égal à 18 ans.")
        .max(99, "L'âge doit être inférieur ou égal à 99."),
    password: 
        z.string()
        .min(4, "Le mot de passe doit contenir au moins 4 caractères.")
        .max(20, "Le mot de passe doit contenir au maximum 30 caractères."),
    confirmPassword: 
        z.string()
        .min(4, "La confirmation du mot de passe doit contenir au moins 4 caractères.")
        .max(20, "La confirmation du mot de passe doit contenir au maximum 30 caractères."),
}).refine(
    (data) => data.password === data.confirmPassword,
    {
        message: "Les mots de passe ne correspondent pas",
        path: ["confirmPassword"],
    }
);