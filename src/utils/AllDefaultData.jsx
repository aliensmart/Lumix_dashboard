import { currentTime } from "../services";

export const bet = {
  addedOn: currentTime(),
  betName: "",
  beters: 0,
  betsCount: 0,
  endsOn: null,
  isSuffling: true,
  minBet: 500,
  played: false,
  startsOn: null,
  status: "ONGOING",
  totalBet: 0,
  winAmount: 0,
  winnersNumber: 0,
};

export const user = {
  addedOn: currentTime(),
  allDeposit: 0,
  availableAmount: 0,
  city: "",
  countryInfo: null,
  email: "",
  fullName: "",
  isBlocked: false,
  isEmailSignIn: false,
  lastUpdated: null,
  betsCount: 0,
  phoneNumber: "",
  totalGamed: 0,
  totalWon: 0,
  winCount: 0,
  userName: "",
};

export const userBet = {};

export const admin = {};

export const betStatus = {};
