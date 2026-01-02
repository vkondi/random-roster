'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { MemberAvatar } from '@/components/MemberAvatar';
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
} from '@mui/material';
import { Shuffle as ShuffleIcon, Group as GroupIcon } from '@mui/icons-material';
import { type TeamGroup, type TeamMember } from '@/types';

export default function PairsPage() {
  const [selectedGroupId, setSelectedGroupId] = useState<string>('');
  const [pairs, setPairs] = useState<[TeamMember, TeamMember?][]>([]);
  
  const groups = useStore<TeamGroup[]>((state) => state.groups);
  const createPairs = useStore((state) => state.createPairs);
  
  const selectedGroup = groups.find(group => group.id === selectedGroupId);

  // Select first group by default
  useEffect(() => {
    if (groups.length > 0 && !selectedGroupId) {
      setSelectedGroupId(groups[0].id);
    }
  }, [groups, selectedGroupId]);

  const handleCreatePairs = () => {
    if (selectedGroup) {
      const newPairs = createPairs(selectedGroup.members);
      setPairs(newPairs);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Paper elevation={0} sx={{ p: 4, borderRadius: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ flex: 1, minWidth: 200 }}>
              <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
                Create Team Pairs
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Create random pairs for buddy systems, peer reviews, or pair programming.
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
                onChange={(e) => setSelectedGroupId(e.target.value)}
              >
                {groups.map((group) => (
                  <MenuItem key={group.id} value={group.id}>
                    {group.name} ({group.members.length} members)
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              startIcon={<ShuffleIcon />}
              onClick={handleCreatePairs}
              disabled={!selectedGroupId}
              fullWidth
              sx={{ height: 56 }}
            >
              Create Pairs
            </Button>
          </Box>
        </Paper>

        {pairs.length > 0 && selectedGroup && (
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 3 }}>
            {pairs.map((pair, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card>
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
                      <Typography variant="h6">
                        Pair {index + 1}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      {pair.map((member) => (
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
                              <Box sx={{ flexShrink: 0 }}>
                                <MemberAvatar seed={member.avatarSeed} size={32} />
                              </Box>
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
              </motion.div>
            ))}
          </Box>
        )}
      </Box>
    </Container>
  );
} 