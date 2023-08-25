import React from 'react';
import { z, ZodType } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import './App.css';

type FormData = {
    firstName: string,
    lastName: string,
    email: string,
    age: number,
    password: string,
    confirmPassword: string,
}

function App() {

    const schema: ZodType<FormData> = z.object({
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

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({resolver: zodResolver(schema)});

    const submitData = (data: FormData) =>{
        console.log("ça fonctionne", data);
        
    }

    return (
        <div className='App'>
            <form onSubmit={handleSubmit(submitData)}>
                <label>Prénom</label>
                <input type="text" {...register("firstName")} />
                {errors.firstName && <span>{errors.firstName.message}</span>}

                <label>Nom</label>
                <input type="text" {...register("lastName")} />
                {errors.lastName && <span>{errors.lastName.message}</span>}

                <label>Email:</label>
                <input type="email" {...register("email")} />
                {errors.email && <span>{errors.email.message}</span>}

                <label>Age</label>
                <input type="number" {...register("age", { valueAsNumber: true })} />
                {errors.age && <span>{errors.age.message}</span>}

                <label>Mot de passe</label>
                <input type="password" {...register("password")} />
                {errors.password && <span>{errors.password.message}</span>}

                <label>Confirmation mot de passe</label>
                <input type="password" {...register("confirmPassword")} />
                {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}

                <input type="submit" value="Envoyer" />
            </form>
        </div>
    );
}

export default App;