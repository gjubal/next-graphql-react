import { useState } from 'react';
import { User as UserType } from '../../types';
import User from './User';
import Users from './Users';

const SelectedUserView = () => {
	const [selectedUser, setSelectedUser] = useState<UserType | null>(null);

	return (
		<div className="container mx-auto px-4">
			{selectedUser ? (
				<User user={selectedUser} setSelectedUser={setSelectedUser} />
			) : (
				<Users setSelectedUser={setSelectedUser} />
			)}
		</div>
	);
};

export default SelectedUserView;
