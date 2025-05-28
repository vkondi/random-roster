'use client';

import { useState, useEffect } from 'react';
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
import { Sort as SortIcon, Group as GroupIcon } from '@mui/icons-material';

export default function SortPage() {
  const [selectedGroup, setSelectedGroup] = useState<string>('');
  const [sortedMembers, setSortedMembers] = useState<TeamMember[]>([]);
  const [isSorting, setIsSorting] = useState(false);
  
  const groups = useStore((state) => state.groups);
  const sortTeamMembers = useStore((state) => state.sortTeamMembers);
  
  const selectedGroupData = groups.find((g) => g.id === selectedGroup);

  // Select first group by default
  useEffect(() => {
    if (groups.length > 0 && !selectedGroup) {
      setSelectedGroup(groups[0].id);
    }
  }, [groups, selectedGroup]);
  
  const handleSort = async () => {
    if (!selectedGroupData) return;
    
    setIsSorting(true);
    
    // Simulate sorting animation
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    const result = sortTeamMembers(selectedGroupData.members);
    setSortedMembers(result);
    setIsSorting(false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Paper elevation={0} sx={{ p: 4, borderRadius: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ flex: 1, minWidth: 200 }}>
              <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
                Team Sorting
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Select a group to randomly sort team members
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
                onChange={(e) => setSelectedGroup(e.target.value)}
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
              size="large"
              startIcon={<SortIcon />}
              onClick={handleSort}
              disabled={!selectedGroupData || isSorting}
            >
              {isSorting ? 'Sorting...' : 'Sort Members'}
            </Button>
          </Box>
        </CardContent>
      </Card>

      <AnimatePresence>
        {sortedMembers.length > 0 && !isSorting && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
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
                  <Typography variant="h6">Sorted Team Members</Typography>
                </Box>
                <MemberList members={sortedMembers} animate />
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </Container>
  );
} 