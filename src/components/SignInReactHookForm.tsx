import type { InputHTMLAttributes } from 'react';
import { useForm, type FieldValues } from 'react-hook-form';

const SignInReactHookForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
		getValues,
	} = useForm();

	// Submit function
	const onSubmit = async (data: FieldValues) => {
		await new Promise((resolve) => setTimeout(resolve, 1000));
		console.log(data);

		reset();
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
			<FormField
				{...register('email', { required: 'Email is required' })}
				label="Email Address"
				type="email"
				placeholder="Enter your email.."
				name="email"
				id="email"
			/>
			{errors.email && <ErrorMessage error={`${errors.email.message}`} />}
			<FormField
				{...register('password', {
					required: 'Password is required',
					minLength: {
						value: 10,
						message: 'Password must be atleast 10 characters',
					},
					maxLength: {
						value: 30,
						message: 'Password must be less than 30 characters',
					},
				})}
				label="Password"
				type="password"
				placeholder="Enter your password.."
				name="password"
				id="password"
			/>
			{errors.password && <ErrorMessage error={`${errors.password.message}`} />}
			<FormField
				{...register('repeatPassword', {
					required: 'Password is required',
					minLength: {
						value: 10,
						message: 'Password must be atleast 10 characters',
					},
					maxLength: {
						value: 30,
						message: 'Password must be less than 30 characters',
					},
					validate: (value) =>
						value === getValues('password') || 'Password must match!',
				})}
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

export default SignInReactHookForm;

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
