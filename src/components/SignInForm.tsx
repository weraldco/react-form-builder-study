import { useState, type ChangeEvent, type FormEvent } from 'react';

const SignInForm = () => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [repeatPassword, setRepeatPassword] = useState<string>('');
	const [error, setError] = useState<string[]>([]);

	// Submit function
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const errorList: string[] = [];
		// check if fields are not empty
		if (!email || !password || !repeatPassword) {
			if (!errorList.includes('All fields are required!')) {
				errorList.push('All fields are required!');
			}
		}

		// check if password is match
		if (password !== repeatPassword) {
			if (!errorList.includes('Password not match!')) {
				errorList.push('Password not match!');
			}
		}
		setError(errorList);
		//
	};

	console.log(error);
	return (
		<form onSubmit={handleSubmit} className="flex flex-col space-y-4">
			{error && error.length > 0 && (
				<div className="p-2 bg-red-200 text-red-400 text-sm rounded flex flex-col">
					{error.map((err) => (
						<span>{err}</span>
					))}
				</div>
			)}
			<FormField
				label="Email Address"
				type="email"
				placeholder="Enter your email.."
				name="email"
				id="email"
				setState={setEmail}
				value={email}
			/>
			<FormField
				label="Password"
				type="password"
				placeholder="Enter your password.."
				name="password"
				id="password"
				setState={setPassword}
				value={password}
			/>
			<FormField
				label="Repeat Password"
				type="password"
				placeholder="Repeat your password.."
				name="repeatPassword"
				id="repeatPassword"
				setState={setRepeatPassword}
				value={repeatPassword}
			/>

			<button
				type="submit"
				className="bg-blue-500 px-4 py-2 rounded cursor-pointer"
			>
				Submit
			</button>
		</form>
	);
};

export default SignInForm;

type FormFieldProps = {
	label: string;
	type: string;
	placeholder: string;
	name?: string;
	id: string;
	setState: (val: string) => void;
	value: string;
};

const FormField = ({
	label,
	type,
	placeholder,
	name,
	id,
	setState,
	value,
}: FormFieldProps) => {
	const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
		setState(e.target.value);
	};
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
				onChange={handleOnChange}
				value={value}
				className="bg-neutral-100 text-neutral-700 px-4 py-2 rounded w-full"
			/>
		</div>
	);
};
