import { zodResolver } from '@hookform/resolvers/zod';
import type { InputHTMLAttributes } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Creating schema in Zod
const signUpSchema = z
	.object({
		email: z.string().email(),
		password: z.string().min(10, 'Password must be 10 characters.'),
		repeatPassword: z.string().min(10, 'Password must be 10. characters.'),
	}) // in zod you can validate data using refine, you can execute like this
	.refine((data) => data.password === data.repeatPassword, {
		message: 'Password must be match',
		path: ['repeatPassword'],
	});

// Schema Type in Zod
type SingUpSchemaT = z.infer<typeof signUpSchema>;

const SignInReactHookFormZod = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<SingUpSchemaT>({ resolver: zodResolver(signUpSchema) });

	// Submit function
	const onSubmit = async (data: SingUpSchemaT) => {
		await new Promise((resolve) => setTimeout(resolve, 1000));
		console.log(data);

		reset();
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
			<FormField
				{...register('email')}
				label="Email Address"
				type="email"
				placeholder="Enter your email.."
				name="email"
				id="email"
			/>
			{errors.email && <ErrorMessage error={`${errors.email.message}`} />}
			<FormField
				{...register('password')}
				label="Password"
				type="password"
				placeholder="Enter your password.."
				name="password"
				id="password"
			/>
			{errors.password && <ErrorMessage error={`${errors.password.message}`} />}
			<FormField
				{...register('repeatPassword')}
				label="Repeat Password"
				type="password"
				placeholder="Repeat your password.."
				name="repeatPassword"
				id="repeatPassword"
			/>

			{errors.repeatPassword && (
				<ErrorMessage error={`${errors.repeatPassword.message}`} />
			)}

			<button
				type="submit"
				disabled={isSubmitting}
				className="bg-blue-500 px-4 py-2 rounded cursor-pointer"
			>
				Submit
			</button>
		</form>
	);
};

export default SignInReactHookFormZod;

type FormFieldProps = {
	label: string;
} & InputHTMLAttributes<HTMLInputElement>;

const FormField = ({ label, id, ...inputProps }: FormFieldProps) => {
	return (
		<div className="flex flex-col gap-1 w-full">
			<label className="text-xs text-neutral-500" htmlFor={id}>
				{label}
			</label>
			<input
				id={id}
				className="bg-neutral-100 text-neutral-700 px-4 py-2 rounded w-full"
				{...inputProps}
			/>
		</div>
	);
};

const ErrorMessage = ({ error }: { error: string }) => {
	return <p className="text-red-400 text-sm">{error}</p>;
};
