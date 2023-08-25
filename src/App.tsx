import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import './App.css';
import { RegisterSchema } from './validation/zodSchema';
import { FormData } from './types/types';

function App() {

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({resolver: zodResolver(RegisterSchema)});

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
                <input type="number" {...register("age", { required: "Age requis", valueAsNumber: true })} />
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