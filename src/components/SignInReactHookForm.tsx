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
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
			<FormField
				{...(register('email'), { required: 'Email is required' })}
				label="Email Address"
				type="email"
				placeholder="Enter your email.."
				name="email"
				id="email"
			/>
			<FormField
				{...(register('password'),
				{
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
			<FormField
				{...(register('password'),
				{
					required: 'Password is required',
				})}
				label="Repeat Password"
				type="password"
				placeholder="Repeat your password.."
				name="repeatPassword"
				id="repeatPassword"
			/>

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
	type: string;
	placeholder: string;
	name?: string;
	id: string;
};

const FormField = ({ label, type, placeholder, name, id }: FormFieldProps) => {
	return (
		<div className="flex flex-col gap-1 w-full">
			<label className="text-xs text-neutral-500" htmlFor={id}>
				{label}
			</label>
			<input
				type={type}
				placeholder={placeholder}
				name={name}
				id={id}
				className="bg-neutral-100 text-neutral-700 px-4 py-2 rounded w-full"
			/>
		</div>
	);
};
