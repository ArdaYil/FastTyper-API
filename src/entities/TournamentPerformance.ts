import { ObjectId } from "mongoose";

interface TournamentPerformance {
  _id: ObjectId;
  performance: number;
  endDate: number;
}

export default TournamentPerformance;
