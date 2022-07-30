import React, { Dispatch, SetStateAction } from 'react';
import gql from 'graphql-tag';
import UserAvatar from './UserAvatar';
import PostsFeed from './PostsFeed';
import { useQuery } from '@apollo/client';
import { GetUserPostsResult, User } from '../../types';

interface UserProps {
	user: User | null;
	setSelectedUser: Dispatch<SetStateAction<User | null>>;
}

const GET_USER_POSTS = gql`
	query User($id: ID!) {
		user(id: $id) {
			posts {
				id
				title
			}
		}
	}
`;

const User = ({ user: selectedUser, setSelectedUser }: UserProps) => {
	const { loading, error, data } = useQuery<GetUserPostsResult>(
		GET_USER_POSTS,
		{
			variables: { id: selectedUser && selectedUser.id },
		}
	);

	if (loading) return <h1>Loading...</h1>;
	if (error) return <h1>Error ${error.message}</h1>;

	return (
		<>
			<div className="flex flex-wrap my-4">
				<button
					className="bg-gray-200 hover:bg-gray-400 text-gray-900 font-bold py-2 px-4 rounded"
					onClick={() => setSelectedUser(null)}
				>
					Back
				</button>
			</div>
			<div className="flex flex-wrap items-start mb-4">
				<div className="lg:w-1/4 w-full rounded text-center">
					{selectedUser && <UserAvatar {...selectedUser} />}
				</div>
				<div className="pox-4 flex-1 w-full">
					{data && selectedUser && (
						<PostsFeed posts={data.user.posts} user={selectedUser} />
					)}
				</div>
			</div>
		</>
	);
};

export default User;
