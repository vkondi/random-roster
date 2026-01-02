export type TeamMember = {
  id: string;
  name: string;
  avatarSeed: string;
  excluded?: boolean;
}

export type TeamGroup = {
  id: string;
  name: string;
  members: TeamMember[];
  createdAt: string;
}

export type ShuffleResult = {
  teams: TeamMember[][];
}

export type SortResult = {
  members: TeamMember[];
}

export type PairResult = {
  pairs: [TeamMember, TeamMember?][];
}

export type RandomMemberResult = {
  selectedMembers: TeamMember[];
} 