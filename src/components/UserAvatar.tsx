import { User } from '../../types';
import Gravatar from 'react-gravatar';
import { NextPage } from 'next';

const UserAvatar = ({ email, name, postsCount }: User) => {
	return (
		<>
			<Gravatar
				email={email}
				size={200}
				className="rounded-full text-center inline"
			/>
			<div className="px-6 py-4">
				<h1 className="font-bold mb-2 text-xl">{name}</h1>
				<p className="text-gray-500 text-sm">{email} - </p>
				<p className="text-gray-500 text-base">{postsCount}</p>
			</div>
		</>
	);
};

export default UserAvatar;
