'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { TeamMember } from '@/types';
import { MemberList } from '@/components/MemberList';
import { 
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Shuffle as ShuffleIcon, Group as GroupIcon } from '@mui/icons-material';

export default function ShufflePage() {
  const [selectedGroup, setSelectedGroup] = useState<string>('');
  const [numberOfTeams, setNumberOfTeams] = useState<number>(2);
  const [shuffledTeams, setShuffledTeams] = useState<TeamMember[][]>([]);
  const [isShuffling, setIsShuffling] = useState(false);
  
  const groups = useStore((state) => state.groups);
  const shuffleTeam = useStore((state) => state.shuffleTeam);
  
  const selectedGroupData = groups.find((g) => g.id === selectedGroup);
  const maxTeams = selectedGroupData ? Math.floor(selectedGroupData.members.length / 2) : 0;

  // Generate array of possible team numbers
  const possibleTeamNumbers = selectedGroupData 
    ? Array.from({ length: maxTeams - 1 }, (_, i) => i + 2) 
    : [];
  
  const handleShuffle = async () => {
    if (!selectedGroupData) return;
    
    setIsShuffling(true);
    
    // Simulate shuffling animation
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    const result = shuffleTeam(selectedGroupData.members, numberOfTeams);
    setShuffledTeams(result);
    setIsShuffling(false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Paper elevation={0} sx={{ p: 4, borderRadius: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ flex: 1, minWidth: 200 }}>
              <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
                Team Shuffler
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Select a group and number of teams to create random teams
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>

      <Card sx={{ mb: 4 }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <FormControl fullWidth>
              <InputLabel id="group-select-label">Select Group</InputLabel>
              <Select
                labelId="group-select-label"
                id="group-select"
                value={selectedGroup}
                label="Select Group"
                onChange={(e) => {
                  setSelectedGroup(e.target.value);
                  setNumberOfTeams(2); // Reset to default when group changes
                }}
              >
                <MenuItem value="">
                  <em>Select a group</em>
                </MenuItem>
                {groups.map((group) => (
                  <MenuItem key={group.id} value={group.id}>
                    {group.name} ({group.members.length} members)
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {selectedGroupData && (
              <FormControl fullWidth>
                <InputLabel id="teams-select-label">Number of Teams</InputLabel>
                <Select
                  labelId="teams-select-label"
                  id="teams-select"
                  value={numberOfTeams}
                  label="Number of Teams"
                  onChange={(e) => setNumberOfTeams(Number(e.target.value))}
                >
                  {possibleTeamNumbers.map((num) => (
                    <MenuItem key={num} value={num}>
                      {num} Teams
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            <Button
              variant="contained"
              size="large"
              startIcon={<ShuffleIcon />}
              onClick={handleShuffle}
              disabled={!selectedGroupData || isShuffling}
            >
              {isShuffling ? 'Shuffling...' : 'Shuffle Teams'}
            </Button>
          </Box>
        </CardContent>
      </Card>

      <AnimatePresence>
        {shuffledTeams.length > 0 && !isShuffling && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {shuffledTeams.map((team, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
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
                      <Typography variant="h6">Team {index + 1}</Typography>
                    </Box>
                    <MemberList members={team} animate />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Box>
        )}
      </AnimatePresence>
    </Container>
  );
} 