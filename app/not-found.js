'use client';

import { useEffect, useState } from 'react';
import { Container, Title, Text, Button, Center, Loader, Stack, MantineProvider } from '@mantine/core';
import { db } from '../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function NotFound() {
  const [loading, setLoading] = useState(true);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    async function checkRedirect() {
      // Clean the pathname to match our stored format
      let currentPath = window.location.pathname.toLowerCase();
      // Remove trailing slash if present
      if (currentPath.length > 1 && currentPath.endsWith('/')) {
        currentPath = currentPath.slice(0, -1);
      }

      try {
        const q = query(collection(db, 'redirects'), where('source', '==', currentPath));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          setIsRedirecting(true);
          const redirectDoc = querySnapshot.docs[0].data();
          window.location.href = redirectDoc.destination;
          return; // Don't stop loading, let the browser redirect
        }
      } catch (error) {
        console.error("Error checking for redirect:", error);
      }

      setLoading(false);
    }

    checkRedirect();
  }, []);

  if (loading || isRedirecting) {
    return (
      <html lang="en">
        <body>
          <MantineProvider defaultColorScheme="auto">
            <Center style={{ height: '100vh', backgroundColor: 'var(--mantine-color-body)' }}>
              <Stack align="center" gap="md">
                <Loader color="var(--color-primary)" size="lg" />
                {isRedirecting && <Text fw={500}>Redirecting...</Text>}
              </Stack>
            </Center>
          </MantineProvider>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body>
        <MantineProvider defaultColorScheme="auto">
          <Center style={{ height: '100vh', backgroundColor: 'var(--mantine-color-body)' }}>
            <Stack align="center" gap="md">
              <Title order={1} style={{ fontSize: '4rem', color: 'var(--color-primary)' }}>404</Title>
              <Title order={2}>Page Not Found</Title>
              <Text c="dimmed" ta="center" maw={400}>
                The page you are looking for doesn't exist or has been moved.
              </Text>
              <Button component="a" href="/" className="btn-gold" mt="md">
                Back to Home
              </Button>
            </Stack>
          </Center>
        </MantineProvider>
      </body>
    </html>
  );
}
