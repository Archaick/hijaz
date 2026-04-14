'use client';

import { useState, useEffect } from 'react';
import { 
  Paper, TextInput, Button, Group, Table, ActionIcon, 
  Text, CopyButton, Tooltip, Stack 
} from '@mantine/core';
import { IconTrash, IconCopy, IconCheck, IconExternalLink } from '@tabler/icons-react';
import { db } from '../../lib/firebase';
import { 
  collection, addDoc, deleteDoc, doc, onSnapshot, serverTimestamp 
} from 'firebase/firestore';

export default function RedirectsManager() {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [redirects, setRedirects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'redirects'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // Sort client-side by creation time if needed, or just display as is
      setRedirects(data);
    });
    return () => unsub();
  }, []);

  const handleAddRedirect = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Clean up the source string (remove spaces, ensure leading slash)
      let cleanSource = source.trim().toLowerCase().replace(/\s+/g, '-');
      if (!cleanSource.startsWith('/')) {
        cleanSource = '/' + cleanSource;
      }

      await addDoc(collection(db, 'redirects'), {
        source: cleanSource,
        destination: destination.trim(),
        createdAt: serverTimestamp()
      });

      setSource('');
      setDestination('');
    } catch (error) {
      console.error("Error adding document: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this redirect?')) {
      try {
        await deleteDoc(doc(db, 'redirects', id));
      } catch (error) {
        console.error("Error deleting document: ", error);
      }
    }
  };

  const domain = typeof window !== 'undefined' ? window.location.origin : 'https://markazalhijaz.org';

  return (
    <Stack gap="xl">
      <Paper p="md" withBorder radius="md" bg="var(--mantine-color-body)">
        <Text fw={600} mb="md">Create New Redirect</Text>
        <form onSubmit={handleAddRedirect}>
          <Group align="flex-end">
            <TextInput
              label="Custom Path"
              placeholder="/qurbanalhijaz"
              description="e.g. /drive or /whatsapp"
              required
              value={source}
              onChange={(e) => setSource(e.currentTarget.value)}
              style={{ flex: 1 }}
            />
            <TextInput
              label="Destination URL"
              placeholder="https://docs.google.com/..."
              description="The target link"
              required
              type="url"
              value={destination}
              onChange={(e) => setDestination(e.currentTarget.value)}
              style={{ flex: 2 }}
            />
            <Button type="submit" loading={loading} className="btn-gold">
              Create Link
            </Button>
          </Group>
        </form>
      </Paper>

      <Paper p={0} withBorder radius="md" style={{ overflow: 'hidden' }}>
        <Table verticalSpacing="sm" striped highlightOnHover>
          <Table.Thead bg="var(--mantine-color-dark-filled)">
            <Table.Tr>
              <Table.Th>Generated Link</Table.Th>
              <Table.Th>Destination</Table.Th>
              <Table.Th style={{ width: 100 }}>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {redirects.length === 0 ? (
              <Table.Tr>
                <Table.Td colSpan={3} ta="center" py="xl">
                  <Text c="dimmed">No redirects found. Create one above.</Text>
                </Table.Td>
              </Table.Tr>
            ) : (
              redirects.map((route) => {
                const fullLink = `${domain}${route.source}`;
                return (
                  <Table.Tr key={route.id}>
                    <Table.Td>
                      <Group gap="xs">
                        <Text fw={500} size="sm">{route.source}</Text>
                        <CopyButton value={fullLink} timeout={2000}>
                          {({ copied, copy }) => (
                            <Tooltip label={copied ? 'Copied' : 'Copy Full Link'} withArrow position="right">
                              <ActionIcon color={copied ? 'teal' : 'gray'} variant="subtle" onClick={copy}>
                                {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
                              </ActionIcon>
                            </Tooltip>
                          )}
                        </CopyButton>
                      </Group>
                    </Table.Td>
                    <Table.Td>
                      <Group gap="xs" wrap="nowrap">
                        <Text size="sm" truncate style={{ maxWidth: 300 }}>
                          {route.destination}
                        </Text>
                        <ActionIcon 
                          component="a" 
                          href={route.destination} 
                          target="_blank" 
                          variant="subtle" 
                          color="blue"
                        >
                          <IconExternalLink size={16} />
                        </ActionIcon>
                      </Group>
                    </Table.Td>
                    <Table.Td>
                      <ActionIcon color="red" variant="subtle" onClick={() => handleDelete(route.id)}>
                        <IconTrash size={18} />
                      </ActionIcon>
                    </Table.Td>
                  </Table.Tr>
                );
              })
            )}
          </Table.Tbody>
        </Table>
      </Paper>
    </Stack>
  );
}
