import { ObjectId } from "mongoose";

interface UserShrinked {
  username: string;
  profilePicture: Buffer;
  _id: ObjectId;
}

export default UserShrinked;
