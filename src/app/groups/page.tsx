'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { MemberList } from '@/components/MemberList';
import { 
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  IconButton,
  Paper,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, Group as GroupIcon } from '@mui/icons-material';

export default function GroupsPage() {
  const [newGroupName, setNewGroupName] = useState('');
  const [newMemberName, setNewMemberName] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string>('');
  
  const groups = useStore((state) => state.groups);
  const addGroup = useStore((state) => state.addGroup);
  const removeGroup = useStore((state) => state.removeGroup);
  const addMemberToGroup = useStore((state) => state.addMemberToGroup);
  const removeMemberFromGroup = useStore((state) => state.removeMemberFromGroup);

  const handleAddGroup = (e: React.FormEvent) => {
    e.preventDefault();
    if (newGroupName.trim()) {
      addGroup(newGroupName.trim());
      setNewGroupName('');
    }
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedGroup && newMemberName.trim()) {
      addMemberToGroup(selectedGroup, newMemberName.trim());
      setNewMemberName('');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Paper elevation={0} sx={{ p: 4, borderRadius: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ flex: 1, minWidth: 200 }}>
              <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
                Team Groups
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Create and manage your team groups. Add members and organize them efficiently.
              </Typography>
            </Box>
            <Box component="form" onSubmit={handleAddGroup} sx={{ display: 'flex', gap: 2, minWidth: 300 }}>
              <TextField
                size="small"
                fullWidth
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                placeholder="Enter group name"
                sx={{ flex: 1 }}
              />
              <Button
                type="submit"
                variant="contained"
                startIcon={<AddIcon />}
                disabled={!newGroupName.trim()}
              >
                Add Group
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {groups.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Paper 
              elevation={0} 
              sx={{ 
                p: 6, 
                textAlign: 'center',
                borderRadius: 2,
                bgcolor: 'background.paper' 
              }}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  bgcolor: 'primary.50',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 2,
                }}
              >
                <GroupIcon sx={{ fontSize: 24, color: 'primary.main' }} />
              </Box>
              <Typography variant="h6" gutterBottom>
                No groups yet
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Get started by creating your first group above
              </Typography>
            </Paper>
          </motion.div>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {groups.map((group, index) => (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
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
                          <GroupIcon sx={{ fontSize: 20, color: 'primary.main' }} />
                        </Box>
                        <Box>
                          <Typography variant="h6" gutterBottom={false}>
                            {group.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {group.members.length} {group.members.length === 1 ? 'member' : 'members'}
                          </Typography>
                        </Box>
                      </Box>
                      <IconButton
                        onClick={() => removeGroup(group.id)}
                        size="small"
                        color="default"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>

                    <Box component="form" onSubmit={handleAddMember} sx={{ mb: 3, display: 'flex', gap: 2 }}>
                      <TextField
                        size="small"
                        fullWidth
                        value={newMemberName}
                        onChange={(e) => {
                          setSelectedGroup(group.id);
                          setNewMemberName(e.target.value);
                        }}
                        placeholder="Enter member name"
                      />
                      <Button
                        type="submit"
                        variant="contained"
                        disabled={selectedGroup !== group.id || !newMemberName.trim()}
                      >
                        Add Member
                      </Button>
                    </Box>

                    {group.members.length === 0 ? (
                      <Paper 
                        variant="outlined" 
                        sx={{ 
                          p: 3, 
                          textAlign: 'center',
                          borderRadius: 2,
                          bgcolor: 'grey.50' 
                        }}
                      >
                        <GroupIcon sx={{ fontSize: 24, color: 'text.disabled', mb: 1 }} />
                        <Typography variant="body2" color="text.secondary">
                          No members yet
                        </Typography>
                      </Paper>
                    ) : (
                      <MemberList
                        members={group.members}
                        onRemove={(memberId) => removeMemberFromGroup(group.id, memberId)}
                      />
                    )}
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