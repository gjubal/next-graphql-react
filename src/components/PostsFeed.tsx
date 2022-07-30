import { Post, User } from '../../types';

interface FeedProps {
	posts?: Post[];
	user: User;
}

const PostsFeed = ({ posts, user }: FeedProps) => {
	return (
		<div className="lg:pl-10">
			<h1 className="font-bold mb-4">Posts from {user.name}</h1>
			{posts &&
				posts.map(post => (
					<div key={post.id}>
						<div className="p-6 shadow mb-4">
							<h3 className="text-2xl font-bold text-gray-800">{post.title}</h3>
						</div>
					</div>
				))}
		</div>
	);
};

export default PostsFeed;
