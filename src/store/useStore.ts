import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TeamMember, TeamGroup } from '@/types';

interface Store {
  groups: TeamGroup[];
  addGroup: (name: string) => void;
  removeGroup: (id: string) => void;
  addMemberToGroup: (groupId: string, name: string) => void;
  removeMemberFromGroup: (groupId: string, memberId: string) => void;
  shuffleTeam: (members: TeamMember[], numberOfTeams: number) => TeamMember[][];
  sortTeamMembers: (members: TeamMember[]) => TeamMember[];
}

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      groups: [],
      
      addGroup: (name: string) => {
        set((state) => ({
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
        set((state) => ({
          groups: state.groups.filter((group) => group.id !== id),
        }));
      },

      addMemberToGroup: (groupId: string, name: string) => {
        set((state) => ({
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
                    },
                  ],
                }
              : group
          ),
        }));
      },

      removeMemberFromGroup: (groupId: string, memberId: string) => {
        set((state) => ({
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

      shuffleTeam: (members: TeamMember[], numberOfTeams: number) => {
        const shuffled = [...members].sort(() => Math.random() - 0.5);
        const teams: TeamMember[][] = Array.from({ length: numberOfTeams }, () => []);
        
        shuffled.forEach((member, index) => {
          teams[index % numberOfTeams].push(member);
        });
        
        return teams;
      },

      sortTeamMembers: (members: TeamMember[]) => {
        return [...members].sort(() => Math.random() - 0.5);
      },
    }),
    {
      name: 'random-roster-storage',
    }
  )
); 