import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type TeamMember, type TeamGroup } from '@/types';

type StoreState = {
  groups: TeamGroup[];
}

type StoreActions = {
  addGroup: (name: string) => void;
  removeGroup: (id: string) => void;
  addMemberToGroup: (groupId: string, name: string) => void;
  removeMemberFromGroup: (groupId: string, memberId: string) => void;
  editMemberName: (groupId: string, memberId: string, newName: string) => void;
  toggleMemberExclusion: (groupId: string, memberId: string) => void;
  shuffleTeam: (members: TeamMember[], numberOfTeams: number) => TeamMember[][];
  sortTeamMembers: (members: TeamMember[]) => TeamMember[];
  createPairs: (members: TeamMember[]) => [TeamMember, TeamMember?][];
  selectRandomMembers: (members: TeamMember[], count: number) => TeamMember[];
}

type Store = StoreState & StoreActions;

export const useStore = create<Store>()(
  persist(
    (set) => ({
      groups: [],
      
      addGroup: (name: string) => {
        set((state: StoreState) => ({
          groups: [
            ...state.groups,
            {
              id: crypto.randomUUID(),
              name,
              members: [],
              createdAt: new Date().toISOString(),
            },
          ],
        }));
      },

      removeGroup: (id: string) => {
        set((state: StoreState) => ({
          groups: state.groups.filter((group) => group.id !== id),
        }));
      },

      addMemberToGroup: (groupId: string, name: string) => {
        set((state: StoreState) => ({
          groups: state.groups.map((group) =>
            group.id === groupId
              ? {
                  ...group,
                  members: [
                    ...group.members,
                    {
                      id: crypto.randomUUID(),
                      name,
                      avatarSeed: Math.random().toString(36).substring(7),
                      excluded: false,
                    },
                  ],
                }
              : group
          ),
        }));
      },

      removeMemberFromGroup: (groupId: string, memberId: string) => {
        set((state: StoreState) => ({
          groups: state.groups.map((group) =>
            group.id === groupId
              ? {
                  ...group,
                  members: group.members.filter((member) => member.id !== memberId),
                }
              : group
          ),
        }));
      },

      editMemberName: (groupId: string, memberId: string, newName: string) => {
        set((state: StoreState) => ({
          groups: state.groups.map((group) =>
            group.id === groupId
              ? {
                  ...group,
                  members: group.members.map((member) =>
                    member.id === memberId
                      ? { ...member, name: newName }
                      : member
                  ),
                }
              : group
          ),
        }));
      },

      toggleMemberExclusion: (groupId: string, memberId: string) => {
        set((state: StoreState) => ({
          groups: state.groups.map((group) =>
            group.id === groupId
              ? {
                  ...group,
                  members: group.members.map((member) =>
                    member.id === memberId
                      ? { ...member, excluded: !member.excluded }
                      : member
                  ),
                }
              : group
          ),
        }));
      },

      shuffleTeam: (members: TeamMember[], numberOfTeams: number) => {
        const includedMembers = members.filter(member => !member.excluded);
        const shuffled = [...includedMembers].sort(() => Math.random() - 0.5);
        const teams: TeamMember[][] = Array.from({ length: numberOfTeams }, () => []);
        
        shuffled.forEach((member, index) => {
          teams[index % numberOfTeams].push(member);
        });
        
        return teams;
      },

      sortTeamMembers: (members: TeamMember[]) => {
        const includedMembers = members.filter(member => !member.excluded);
        return [...includedMembers].sort(() => Math.random() - 0.5);
      },

      createPairs: (members: TeamMember[]) => {
        const includedMembers = members.filter(member => !member.excluded);
        const shuffled = [...includedMembers].sort(() => Math.random() - 0.5);
        const pairs: [TeamMember, TeamMember?][] = [];
        
        for (let i = 0; i < shuffled.length; i += 2) {
          pairs.push([
            shuffled[i],
            shuffled[i + 1] || undefined
          ]);
        }
        
        return pairs;
      },

      selectRandomMembers: (members: TeamMember[], count: number) => {
        const includedMembers = members.filter(member => !member.excluded);
        const shuffled = [...includedMembers].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, Math.min(count, shuffled.length));
      },
    }),
    {
      name: 'random-roster-storage',
    }
  )
); 