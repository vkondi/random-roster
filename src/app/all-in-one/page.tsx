'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { MemberList } from '@/components/MemberList';
import { 
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
} from '@mui/material';
import { 
  Shuffle as ShuffleIcon,
  Sort as SortIcon,
  Group as GroupIcon,
  Casino as CasinoIcon,
} from '@mui/icons-material';
import { TeamGroup, TeamMember } from '@/types';

type ActivityType = 'shuffle' | 'sort' | 'pairs' | 'random' | 'groups';

interface ActivityOption {
  value: ActivityType;
  label: string;
  icon: typeof ShuffleIcon;
  requiresNumberInput?: boolean;
  buttonText: string;
}

const activities: ActivityOption[] = [
  {
    value: 'shuffle',
    label: 'Team Shuffler',
    icon: ShuffleIcon,
    requiresNumberInput: true,
    buttonText: 'Shuffle Teams',
  },
  {
    value: 'sort',
    label: 'Team Sorting',
    icon: SortIcon,
    buttonText: 'Sort Members',
  },
  {
    value: 'pairs',
    label: 'Create Team Pairs',
    icon: GroupIcon,
    buttonText: 'Create Pairs',
  },
  {
    value: 'random',
    label: 'Select Random Members',
    icon: CasinoIcon,
    requiresNumberInput: true,
    buttonText: 'Select Members',
  },
];

export default function AllInOnePage() {
  const [selectedGroupId, setSelectedGroupId] = useState<string>('');
  const [selectedActivity, setSelectedActivity] = useState<ActivityType | ''>('');
  const [numberInput, setNumberInput] = useState<number>(2);
  const [result, setResult] = useState<any>(null);
  
  const groups = useStore((state) => state.groups);
  const shuffleTeam = useStore((state) => state.shuffleTeam);
  const sortTeamMembers = useStore((state) => state.sortTeamMembers);
  const createPairs = useStore((state) => state.createPairs);
  const selectRandomMembers = useStore((state) => state.selectRandomMembers);
  
  const selectedGroup = groups.find(group => group.id === selectedGroupId);
  const selectedActivityOption = activities.find(a => a.value === selectedActivity);

  const handleAction = async () => {
    if (!selectedGroup || !selectedActivity) return;

    let actionResult;
    switch (selectedActivity) {
      case 'shuffle':
        actionResult = shuffleTeam(selectedGroup.members, numberInput);
        break;
      case 'sort':
        actionResult = sortTeamMembers(selectedGroup.members);
        break;
      case 'pairs':
        actionResult = createPairs(selectedGroup.members);
        break;
      case 'random':
        actionResult = selectRandomMembers(selectedGroup.members, numberInput);
        break;
    }
    setResult({ type: selectedActivity, data: actionResult });
  };

  const getMaxNumber = () => {
    if (!selectedGroup) return 2;
    if (selectedActivity === 'shuffle') {
      return Math.floor(selectedGroup.members.length / 2);
    }
    return selectedGroup.members.length;
  };

  // Generate array of possible team numbers for shuffle
  const possibleTeamNumbers = selectedGroup && selectedActivity === 'shuffle'
    ? Array.from({ length: Math.floor(selectedGroup.members.length / 2) - 1 }, (_, i) => i + 2)
    : [];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Paper elevation={0} sx={{ p: 4, borderRadius: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ flex: 1, minWidth: 200 }}>
              <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
                All-in-One
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Access all features in one place - shuffle, sort, pair, or select random members
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {/* Remove ThemeToggle */}
            </Box>
          </Box>
        </Paper>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2 
          }}>
            <FormControl fullWidth>
              <InputLabel id="group-select-label">Select Group</InputLabel>
              <Select
                labelId="group-select-label"
                value={selectedGroupId}
                label="Select Group"
                onChange={(e) => {
                  setSelectedGroupId(e.target.value);
                  setResult(null);
                }}
              >
                {groups.map((group) => (
                  <MenuItem key={group.id} value={group.id}>
                    {group.name} ({group.members.length} members)
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="activity-select-label">Select Activity</InputLabel>
              <Select
                labelId="activity-select-label"
                value={selectedActivity}
                label="Select Activity"
                onChange={(e) => {
                  setSelectedActivity(e.target.value as ActivityType);
                  setResult(null);
                  if (e.target.value === 'shuffle') {
                    setNumberInput(2);
                  } else if (e.target.value === 'random') {
                    setNumberInput(1);
                  }
                }}
              >
                {activities.map((activity) => (
                  <MenuItem key={activity.value} value={activity.value}>
                    {activity.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {selectedActivityOption?.requiresNumberInput && (
              selectedActivity === 'shuffle' ? (
                <FormControl fullWidth>
                  <InputLabel id="teams-select-label">Number of Teams</InputLabel>
                  <Select
                    labelId="teams-select-label"
                    value={numberInput}
                    label="Number of Teams"
                    onChange={(e) => setNumberInput(Number(e.target.value))}
                  >
                    {possibleTeamNumbers.map((num) => (
                      <MenuItem key={num} value={num}>
                        {num} Teams
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : (
                <TextField
                  type="number"
                  label="Number of Members"
                  value={numberInput}
                  onChange={(e) => setNumberInput(Math.max(1, Math.min(getMaxNumber(), parseInt(e.target.value) || 1)))}
                  fullWidth
                  inputProps={{ min: 1, max: getMaxNumber() }}
                />
              )
            )}

            <Button
              variant="contained"
              startIcon={selectedActivityOption ? <selectedActivityOption.icon /> : undefined}
              onClick={handleAction}
              disabled={!selectedGroupId || !selectedActivity}
              fullWidth
              sx={{ height: 56 }}
            >
              {selectedActivityOption?.buttonText || 'Select an Activity'}
            </Button>
          </Box>
        </Paper>

        <AnimatePresence mode="wait">
          {result && (
            <motion.div
              key={result.type}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {result.type === 'shuffle' && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {result.data.map((team: TeamMember[], index: number) => (
                    <Card key={index}>
                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                          <Box
                            sx={{
                              width: 40,
                              height: 40,
                              borderRadius: '50%',
                              bgcolor: 'primary.50',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <GroupIcon sx={{ fontSize: 20, color: 'primary.main' }} />
                          </Box>
                          <Typography variant="h6">Team {index + 1}</Typography>
                        </Box>
                        <MemberList members={team} animate />
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              )}

              {result.type === 'sort' && (
                <Card>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: '50%',
                          bgcolor: 'primary.50',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <GroupIcon sx={{ fontSize: 20, color: 'primary.main' }} />
                      </Box>
                      <Typography variant="h6">Sorted Team Members</Typography>
                    </Box>
                    <MemberList members={result.data} animate />
                  </CardContent>
                </Card>
              )}

              {result.type === 'pairs' && (
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 3 }}>
                  {result.data.map((pair: [TeamMember, TeamMember?], index: number) => (
                    <Card key={index}>
                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                          <Box
                            sx={{
                              width: 40,
                              height: 40,
                              borderRadius: '50%',
                              bgcolor: 'primary.50',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <GroupIcon sx={{ fontSize: 20, color: 'primary.main' }} />
                          </Box>
                          <Typography variant="h6">Pair {index + 1}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                          {pair.map((member, memberIndex) => (
                            member && (
                              <Paper
                                key={member.id}
                                variant="outlined"
                                sx={{
                                  p: 2,
                                  borderRadius: 2,
                                  bgcolor: 'background.paper',
                                }}
                              >
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                  <Typography variant="subtitle1">
                                    {member.name}
                                  </Typography>
                                </Box>
                              </Paper>
                            )
                          ))}
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              )}

              {result.type === 'random' && (
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 3 }}>
                  {result.data.map((member: TeamMember, index: number) => (
                    <Card key={member.id}>
                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Box
                            sx={{
                              width: 40,
                              height: 40,
                              borderRadius: '50%',
                              bgcolor: 'primary.50',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <CasinoIcon sx={{ fontSize: 20, color: 'primary.main' }} />
                          </Box>
                          <Box>
                            <Typography variant="h6" gutterBottom={false}>
                              {member.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Selected Member #{index + 1}
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </Container>
  );
} 