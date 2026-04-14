'use client';

import { useEffect, useState } from 'react';
import { Container, Title, Tabs, Loader, Center, Button, Group } from '@mantine/core';
import { auth } from '../../../lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import RedirectsManager from '../../../components/internal/RedirectsManager';

export default function InternalDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const locale = useLocale();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push(`/${locale}/login`);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router, locale]);

  if (loading || !user) {
    return (
      <Center style={{ height: '100vh' }}>
        <Loader color="var(--color-primary)" />
      </Center>
    );
  }

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <Container size="xl" pt={100} pb={80} style={{ minHeight: '100vh' }}>
      <Group justify="space-between" mb="xl">
        <Title order={1} style={{ fontFamily: 'var(--font-display)' }}>
          Al Hijaz Dashboard
        </Title>
        <Button variant="subtle" color="red" onClick={handleLogout}>
          Logout
        </Button>
      </Group>

      <Tabs defaultValue="redirects" variant="pills" radius="md">
        <Tabs.List mb="xl">
          <Tabs.Tab value="redirects">Redirects Link</Tabs.Tab>
          <Tabs.Tab value="other" disabled>Other Feature</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="redirects">
          <RedirectsManager />
        </Tabs.Panel>

        <Tabs.Panel value="other">
          {/* Scalable future features go here */}
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
}
