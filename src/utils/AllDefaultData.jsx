import { currentTime, docRef } from "../services";

const defaulAdminRole = docRef("/adminStatus/EDITOR");

export const BET = {
  addedOn: currentTime(),
  betName: "",
  beters: 0,
  betsCount: 0,
  endsOn: null,
  isSuffling: true,
  minBet: 200,
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

export const userBet = {
  addedOn: currentTime(),
  betAmount: 0,
  played: false,
  isChosen: false,
  lastUpdated: null,
  playerRef: null,
  status: "ONGOING",
  won: 0,
};

export const ADMINDEFAULT = {
  createdOn: currentTime(),
  email: "",
  fullName: "",
  phoneNumber: "",
  role: defaulAdminRole,
  staus: true,
  profile: "",
  city: "",
};

export const betStatus = {};
