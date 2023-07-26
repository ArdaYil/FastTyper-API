import UserShrinked from "./UserShrinked";

type TournamentUser = UserShrinked & { wpm: number };

interface Tournament {
  users: Array<TournamentUser>;
  startTime: Date;
  dueTime: Date;
  id: string;
}

export default Tournament;
