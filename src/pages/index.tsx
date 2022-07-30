import { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { NextPage } from 'next';
import Head from 'next/head';
import { User as UserType, Users as UsersType } from '../../types';
import User from '../components/User';
import Users from '../components/Users';

const GET_USERS = gql`
	{
		users {
			id
			name
			email
			postsCount
		}
	}
`;

const Home: NextPage = () => {
	const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
	const { loading, error, data } = useQuery<UsersType>(GET_USERS);

	if (error) return <h1>Error! {error.message} </h1>;
	if (loading) return <h1>Loading...</h1>;

	return (
		<>
			<Head>
				<title>Rails-Graphql-Next Blog</title>
				<meta name="description" content="Blog" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div className="container mx-auto px-4">
				{selectedUser ? (
					<User user={selectedUser} setSelectedUser={setSelectedUser} />
				) : (
					<Users setSelectedUser={setSelectedUser} />
				)}
			</div>
		</>
	);
};

export default Home;
