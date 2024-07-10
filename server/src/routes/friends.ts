import express from "express";

import {
	getFriends,
	addFriend,
	getFriendRequests,
	acceptFriendRequest,
	rejectFriendRequest,
} from "../controllers/friends.controller";

const router = express.Router();
router.use(express.json());

router.post("/friends", addFriend);
router.get("/users/:userId/friends", getFriends);
router.get("/users/:userId/friend-requests", getFriendRequests);
router.put("/friends/accept", acceptFriendRequest);
router.put("/friends/reject", rejectFriendRequest);

export default router;
