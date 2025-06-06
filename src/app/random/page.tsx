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
  TextField,
} from '@mui/material';
import { Casino as CasinoIcon } from '@mui/icons-material';
import { TeamGroup, TeamMember } from '@/types';

export default function RandomPage() {
  const [selectedGroupId, setSelectedGroupId] = useState<string>('');
  const [count, setCount] = useState<number>(1);
  const [selectedMembers, setSelectedMembers] = useState<TeamMember[]>([]);
  
  const groups = useStore<TeamGroup[]>((state) => state.groups);
  const selectRandomMembers = useStore((state) => state.selectRandomMembers);
  
  const selectedGroup = groups.find(group => group.id === selectedGroupId);

  // Select first group by default
  useEffect(() => {
    if (groups.length > 0 && !selectedGroupId) {
      setSelectedGroupId(groups[0].id);
    }
  }, [groups, selectedGroupId]);

  const handleSelectMembers = () => {
    if (selectedGroup) {
      const newSelection = selectRandomMembers(selectedGroup.members, count);
      setSelectedMembers(newSelection);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Paper elevation={0} sx={{ p: 4, borderRadius: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ flex: 1, minWidth: 200 }}>
              <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
                Select Random Members
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Randomly select team members for presentations, tasks, or any other purpose.
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
            <TextField
              type="number"
              label="Number of Members"
              value={count}
              onChange={(e) => setCount(Math.max(1, Math.min(selectedGroup?.members.length || 1, parseInt(e.target.value) || 1)))}
              fullWidth
              inputProps={{ min: 1, max: selectedGroup?.members.length || 1 }}
            />
            <Button
              variant="contained"
              startIcon={<CasinoIcon />}
              onClick={handleSelectMembers}
              disabled={!selectedGroupId}
              fullWidth
              sx={{ height: 56 }}
            >
              Select Members
            </Button>
          </Box>
        </Paper>

        {selectedMembers.length > 0 && selectedGroup && (
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 3 }}>
            {selectedMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box sx={{ flexShrink: 0 }}>
                        <MemberAvatar seed={member.avatarSeed} size={40} />
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
              </motion.div>
            ))}
          </Box>
        )}
      </Box>
    </Container>
  );
} 