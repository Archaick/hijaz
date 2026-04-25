'use client';

import { useEffect, useState } from 'react';
import { Container, Title, Tabs, Loader, Center, Button, Group, Box } from '@mantine/core';
import { auth } from '../../../lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import RedirectsManager from '../../../components/internal/RedirectsManager';
import FallingOrbs from '../../../components/FallingOrbs';

export default function InternalDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const locale = useLocale();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      const isAllowedUser =
        currentUser?.email?.toLowerCase() === 'info@markazalhijaz.org';

      if (isAllowedUser) {
        setUser(currentUser);
      } else {
        setUser(null);
        if (currentUser) {
          signOut(auth).catch(() => {});
        }
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
    <Box style={{ 
      position: 'relative', 
      minHeight: '100vh', 
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #020b1e 0%, #0a1936 100%)',
      color: '#fff'
    }}>
      <FallingOrbs />
      
      <Container size="xl" pt={100} pb={80} style={{ position: 'relative', zIndex: 10 }}>
        <Group justify="space-between" mb="xl">
          <Title order={1} style={{ fontFamily: 'var(--font-display)', color: '#fff' }}>
            Al Hijaz Dashboard
          </Title>
          <Button variant="subtle" color="red" onClick={handleLogout}>
            Logout
          </Button>
        </Group>

        <Tabs defaultValue="redirects" variant="pills" radius="md">
          <Tabs.List mb="xl">
            <Tabs.Tab value="redirects" color="blue" style={{ color: '#fff' }}>Redirects Link</Tabs.Tab>
          <Tabs.Tab value="other" disabled style={{ color: 'rgba(255,255,255,0.4)' }}>Other Feature</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="redirects">
            <RedirectsManager />
          </Tabs.Panel>

          <Tabs.Panel value="other">
            {/* Scalable future features go here */}
          </Tabs.Panel>
        </Tabs>
      </Container>
    </Box>
  );
}
