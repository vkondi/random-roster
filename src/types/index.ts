export interface TeamMember {
  id: string;
  name: string;
  avatarSeed: string;
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