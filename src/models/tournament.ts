import {
  Severity,
  getModelForClass,
  modelOptions,
  pre,
  prop,
} from "@typegoose/typegoose";
import UserShrinked from "../entities/UserShrinked";
import config from "config";

@pre<Tournament>("save", function (next) {
  if (this.startDate >= this.endDate)
    return next(new Error("Start date must be less than end date"));

  next();
})
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class Tournament {
  @prop({ required: true, min: 0, max: 10 ** 10, type: Number })
  startDate: number;

  @prop({
    required: true,
    min: 1,
    max: 10 ** 10,
    type: Number,
  })
  endDate: number;

  @prop({
    required: false,
    default: [],
    validate: {
      validator: (contestants: Array<UserShrinked>) =>
        contestants.length < config.get<number>("maxTournamentContestants"),
      message: `A tournament cannot have more than ${config.get<number>(
        "maxTournamentContestants"
      )} contestants`,
    },
  })
  contestants: Array<UserShrinked>;
}

const TournamentModel = getModelForClass(Tournament);

export default TournamentModel;
