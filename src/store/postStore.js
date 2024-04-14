import { create } from "zustand";
import useNotificationStore from "./notificationStore";

const usePostStore = create((set) => ({
	posts: [],
	createPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
	deletePost: (id) => set((state) => ({ posts: state.posts.filter((post) => post.id !== id) })),
	setPosts: (posts) => set({ posts }),
	addComment: (postId, comment) =>
		set((state) => ({
			posts: state.posts.map((post) => {
				if (post.id === postId) {
					return {
						...post,
						comments: [...post.comments, comment],
					};
				}
				return post;
			}),
		})),
	addBid: (postId, bid) => set((state) => {
		const addNotification = useNotificationStore.getState().addNotification;
	
		return {
			posts: state.posts.map((post) => {
			if (post.id === postId) {
				const previousTopBid = post.bids && post.bids.length > 0 ? post.bids[0] : null;
				const updatedBids = post.bids ? [...post.bids, bid] : [bid];
				updatedBids.sort((a, b) => b.bid - a.bid);
	
				if (previousTopBid && updatedBids[0].id !== previousTopBid.id) {
					const outbidUser = previousTopBid.createdBy;
					addNotification({
						id: new Date().getTime(), 
						type: 'outbid',
						message: `You have been outbid on post ${postId}`,
						userId: outbidUser
					});
				}
	
				return { ...post, bids: updatedBids };
			}
			return post;
			}),
		};
	}),

	// addBid: (postId, bid) =>
	// 	set((state) => ({
	// 		const addNotification = useNotificationStore.getState().addNotification;

	// 		posts: state.posts.map((post) => {
	// 			if (post.id === postId) {
	// 				const previousTopBid = post.bids && post.bids.length > 0 ? post.bids[0] : null;
	// 				const updatedBids = post.bids ? [...post.bids, bid] : [bid];
	// 				updatedBids.sort((a, b) => b.bid - a.bid);

	// 				if (previousTopBid && updatedBids[0].id !== previousTopBid.id) {
	// 					const outbidUser = previousTopBid.createdBy;
	// 					//notifyUser(outbidUser, `You have been outbid on post ${postId}`);
	// 				}

	// 				return {
	// 					...post,
	// 					bids: updatedBids,
	// 				};
	// 			}
	// 			return post;
	// 		}),
	// 	})),
}));

export default usePostStore;
