export interface TeamMember {
  id: string;
  name: string;
  avatarSeed: string;
  excluded?: boolean;
}

export interface TeamGroup {
  id: string;
  name: string;
  members: TeamMember[];
  createdAt: string;
}

export interface ShuffleResult {
  teams: TeamMember[][];
}

export interface SortResult {
  members: TeamMember[];
}

export interface PairResult {
  pairs: [TeamMember, TeamMember?][];
}

export interface RandomMemberResult {
  selectedMembers: TeamMember[];
} 