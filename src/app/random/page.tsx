'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { ThemeToggle } from '@/components/ThemeToggle';
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
import { Casino as CasinoIcon, Person as PersonIcon } from '@mui/icons-material';
import { TeamGroup, TeamMember } from '@/types';

export default function RandomPage() {
  const [selectedGroupId, setSelectedGroupId] = useState<string>('');
  const [count, setCount] = useState<number>(1);
  const [selectedMembers, setSelectedMembers] = useState<TeamMember[]>([]);
  
  const groups = useStore<TeamGroup[]>((state) => state.groups);
  const selectRandomMembers = useStore((state) => state.selectRandomMembers);
  
  const selectedGroup = groups.find(group => group.id === selectedGroupId);

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
              <ThemeToggle />
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
                        <PersonIcon sx={{ fontSize: 20, color: 'primary.main' }} />
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