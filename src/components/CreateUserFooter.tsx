import { gql, MutationFunction, useMutation } from '@apollo/client';
import { FormEvent, useCallback, useState } from 'react';
import { CreateUserResult } from '../../types';
import { GET_USERS } from './Users';

const CREATE_USER = gql`
	mutation CreateUser($name: String!, $email: String!) {
		createUser(input: { name: $name, email: $email }) {
			user {
				id
				name
				email
				postsCount
			}
			errors
		}
	}
`;

const CreateUserFooter = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [createUserMutation, { data, loading, error }] =
		useMutation<CreateUserResult>(CREATE_USER, {
			refetchQueries: [{ query: GET_USERS }, 'GetUsers'],
		});

	const handleSubmit = useCallback(
		(e: FormEvent<HTMLFormElement>, createUser: MutationFunction) => {
			e.preventDefault();
			createUser({ variables: { name, email } });
			setName('');
			setEmail('');
		},
		[email, name]
	);

	return (
		<>
			<div className="lg:fixed bottom-0 left-0 w-full bg-white border-t border-gray-300">
				<form
					className="lg:px-8 pt-2 pb-2"
					onSubmit={e => handleSubmit(e, createUserMutation)}
				>
					<div className="lg:flex flex-wrap flex-between items-center justify-center lg:p-0 p-6">
						<h4 className="font-bold lg:pr-4">Create new user</h4>
						<div className="lg:pr-4">
							<input
								className="border rounded w-full py-2 px-3"
								type="text"
								value={name}
								placeholder="Name"
								onChange={e => setName(e.target.value)}
							/>
						</div>
						<div className="lg:pr-4">
							<input
								className="border rounded w-full py-2 px-3"
								type="text"
								value={email}
								placeholder="Email"
								onChange={e => setEmail(e.target.value)}
							/>
						</div>
						<button
							className="bg-blue-500 text-white px-4 py-2 rounded"
							type="submit"
						>
							Create User
						</button>
					</div>
				</form>
			</div>
		</>
	);
};

export default CreateUserFooter;
