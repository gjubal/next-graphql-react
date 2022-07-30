import { ApolloError } from '@apollo/client';

export type Users = {
	users: User[];
};

export type User = {
	id: number;
	name: string;
	email: string;
	postsCount: number;
	posts?: Post[];
};

export type Post = {
	id: number;
	title: string;
	body: string;
};

export type CreateUserType = {
	createUser(input: CreateUserInput): User | ApolloError[];
};

type CreateUserInput = {
	name: string;
	email: string;
};

export interface GetUserPostsResult {
	user: User;
}

export interface GetUsersResult {
	users: User[];
}

export interface CreateUserResult {
	data: {
		createUser: {
			user: User;
		};
	};
}
