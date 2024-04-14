import { create } from "zustand";

const bidStore = create((set) => ({
	bids: [],
    createBid: (bid) => set((state) => ({ bids: [bid, ...state.bids] })),
}));

export default bidStore;