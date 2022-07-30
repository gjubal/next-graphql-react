import { gql, InMemoryCache, useQuery } from '@apollo/client';
import { Dispatch, SetStateAction } from 'react';
import { CreateUserResult, GetUsersResult, User } from '../../types';
import CreateUserFooter from './CreateUserFooter';
import UserAvatar from './UserAvatar';

interface UsersProps {
	setSelectedUser: Dispatch<SetStateAction<User | null>>;
}

export const GET_USERS = gql`
	{
		users {
			id
			name
			email
			postsCount
		}
	}
`;

const Users = ({ setSelectedUser }: UsersProps) => {
	const { loading, error, data } = useQuery<GetUsersResult>(GET_USERS);

	if (loading) return <h1>Loading...</h1>;
	if (error) return <h1>Error ${error.message}</h1>;

	function updateFeedWithUser(
		cache: InMemoryCache,
		{ data: { createUser } }: CreateUserResult
	) {
		const response = cache.readQuery<GetUsersResult>({ query: GET_USERS });

		if (response) {
			const { users } = response;
			cache.writeQuery({
				query: GET_USERS,
				data: { users: [...users, createUser.user] },
			});
		}
	}

	return (
		<div className="flex flex-wrap items-center pb-16">
			{data &&
				data.users.map(user => (
					<div
						key={user.id}
						className="lg:w-1/3 w-full p-4 text-center inline"
						onClick={() => setSelectedUser(user)}
					>
						<UserAvatar {...user} />
					</div>
				))}

			<CreateUserFooter />
		</div>
	);
};

export default Users;
