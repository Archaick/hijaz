'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Paper, TextInput, Button, Group, Table, ActionIcon, 
  Text, CopyButton, Tooltip, Stack, Loader, Box
} from '@mantine/core';
import { IconTrash, IconCopy, IconCheck, IconExternalLink } from '@tabler/icons-react';
import { useDebouncedValue } from '@mantine/hooks';
import { db } from '../../lib/firebase';
import { 
  collection, addDoc, deleteDoc, doc, serverTimestamp, query,
  orderBy, startAfter, limit, getDocs, startAt, endAt
} from 'firebase/firestore';

const PAGE_SIZE = 10;

const normalizePath = (value) => {
  let normalized = value.trim().toLowerCase();

  if (!normalized) {
    return '';
  }

  if (!normalized.startsWith('/')) {
    normalized = `/${normalized}`;
  }

  return normalized;
};

export default function RedirectsManager() {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [filter, setFilter] = useState('');
  const [redirects, setRedirects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingList, setLoadingList] = useState(true);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [page, setPage] = useState(1);
  const [reloadKey, setReloadKey] = useState(0);
  const cursorsRef = useRef({ 1: null });
  const [debouncedFilter] = useDebouncedValue(filter, 350);
  const normalizedFilter = useMemo(() => normalizePath(debouncedFilter), [debouncedFilter]);

  useEffect(() => {
    cursorsRef.current = { 1: null };
    setPage(1);
  }, [normalizedFilter]);

  useEffect(() => {
    let isMounted = true;

    const fetchRedirects = async () => {
      setLoadingList(true);

      try {
        if (page > 1 && !(page in cursorsRef.current)) {
          setPage(1);
          return;
        }

        const constraints = [];

        if (normalizedFilter) {
          constraints.push(orderBy('source'));
          constraints.push(startAt(normalizedFilter));
          constraints.push(endAt(`${normalizedFilter}\uf8ff`));
        } else {
          constraints.push(orderBy('createdAt', 'desc'));
        }

        const cursor = cursorsRef.current[page] ?? null;
        if (cursor) {
          constraints.push(startAfter(cursor));
        }

        constraints.push(limit(PAGE_SIZE + 1));

        const redirectsQuery = query(collection(db, 'redirects'), ...constraints);
        const snapshot = await getDocs(redirectsQuery);

        if (!isMounted) {
          return;
        }

        const docs = snapshot.docs;
        const hasMore = docs.length > PAGE_SIZE;
        const visibleDocs = hasMore ? docs.slice(0, PAGE_SIZE) : docs;
        const data = visibleDocs.map((item) => ({ id: item.id, ...item.data() }));

        setRedirects(data);
        setHasNextPage(hasMore);

        if (hasMore && visibleDocs.length > 0) {
          cursorsRef.current[page + 1] = visibleDocs[visibleDocs.length - 1];
        } else {
          delete cursorsRef.current[page + 1];
        }
      } catch (error) {
        console.error('Error fetching redirects: ', error);
        if (isMounted) {
          setRedirects([]);
          setHasNextPage(false);
        }
      } finally {
        if (isMounted) {
          setLoadingList(false);
        }
      }
    };

    fetchRedirects();

    return () => {
      isMounted = false;
    };
  }, [page, normalizedFilter, reloadKey]);

  const resetToFirstPage = () => {
    cursorsRef.current = { 1: null };
    setPage(1);
    setReloadKey((value) => value + 1);
  };

  const handleAddRedirect = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Clean up the source string (remove spaces, ensure leading slash)
      const cleanSource = normalizePath(source).replace(/\s+/g, '-');

      await addDoc(collection(db, 'redirects'), {
        source: cleanSource,
        destination: destination.trim(),
        createdAt: serverTimestamp()
      });

      setSource('');
      setDestination('');
      resetToFirstPage();
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
        resetToFirstPage();
      } catch (error) {
        console.error("Error deleting document: ", error);
      }
    }
  };

  const domain = typeof window !== 'undefined' ? window.location.origin : 'https://markazalhijaz.org';
  const hostname = domain.replace(/^https?:\/\//, '');
  const pageStartNumber = (page - 1) * PAGE_SIZE;

  return (
    <Stack gap="xl">
      <Paper p="md" withBorder radius="md" className="glass" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
        <Text fw={600} mb="md" c="white">Create New Redirect</Text>
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

      <Paper p={0} withBorder radius="md" className="glass" style={{ overflow: 'hidden', borderColor: 'rgba(255,255,255,0.1)' }}>
        <Box p="md" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <TextInput
            label="Filter by Path"
            placeholder="/qurban"
            description="Prefix match only (server-side)"
            value={filter}
            onChange={(e) => setFilter(e.currentTarget.value)}
            style={{ maxWidth: 340 }}
          />
        </Box>

        <Table verticalSpacing="sm" striped highlightOnHover style={{ color: 'white' }}>
          <Table.Thead bg="rgba(0,0,0,0.3)">
            <Table.Tr>
              <Table.Th style={{ width: 70 }}>No.</Table.Th>
              <Table.Th>Generated Link</Table.Th>
              <Table.Th>Destination</Table.Th>
              <Table.Th style={{ width: 100 }}>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {loadingList ? (
              <Table.Tr>
                <Table.Td colSpan={4} ta="center" py="xl">
                  <Loader size="sm" color="blue" />
                </Table.Td>
              </Table.Tr>
            ) : redirects.length === 0 ? (
              <Table.Tr>
                <Table.Td colSpan={4} ta="center" py="xl">
                  <Text c="dimmed">No redirects found for this filter.</Text>
                </Table.Td>
              </Table.Tr>
            ) : (
              redirects.map((route, index) => {
                const fullLink = `${domain}${route.source}`;
                return (
                  <Table.Tr key={route.id}>
                    <Table.Td>
                      <Text size="sm" c="rgba(255,255,255,0.7)">
                        {pageStartNumber + index + 1}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <Group gap="xs">
                        <Text fw={500} size="sm" c="white">{hostname}{route.source}</Text>
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
                        <Text size="sm" truncate style={{ maxWidth: 300 }} c="rgba(255,255,255,0.7)">
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

        <Group justify="space-between" p="md" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <Text size="sm" c="rgba(255,255,255,0.7)">
            {normalizedFilter ? `Filter: ${normalizedFilter}` : 'Showing latest redirects'}
          </Text>
          <Group gap="xs">
            <Button
              variant="subtle"
              color="gray"
              onClick={() => setPage((currentPage) => Math.max(1, currentPage - 1))}
              disabled={page === 1 || loadingList}
            >
              Previous
            </Button>
            <Text size="sm" c="white">Page {page}</Text>
            <Button
              variant="subtle"
              color="gray"
              onClick={() => setPage((currentPage) => currentPage + 1)}
              disabled={!hasNextPage || loadingList}
            >
              Next
            </Button>
          </Group>
        </Group>
      </Paper>
    </Stack>
  );
}
