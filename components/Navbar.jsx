'use client';
import { useEffect, useState } from 'react';
import {
  Group, Container, Text, Button, Burger,
  Drawer, Stack, Divider, Box, SegmentedControl,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import ColorSchemeToggle from './ColorSchemeToggle';

const LOCALES = [
  { value: 'id', label: 'ID' },
  { value: 'en', label: 'EN' },
  { value: 'ar', label: 'AR' },
];

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [opened, { toggle, close }] = useDisclosure(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const switchLocale = (newLocale) => {
    // Replace /currentLocale with /newLocale in path
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/') || `/${newLocale}`);
    close();
  };

  const navLinks = [
    { label: t('programs'), href: '#programs' },
    { label: t('community'), href: '#community' },
    { label: t('about'), href: '#about' },
  ];

  return (
    <>
      <Box
        component="nav"
        className="glass"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          transition: 'box-shadow 0.3s ease',
          boxShadow: scrolled ? '0 2px 40px rgba(0,7,23,0.12)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(117,119,125,0.1)' : 'none',
        }}
      >
        <Container size="xl" py="sm">
          <Group justify="space-between" align="center">
            {/* Logo */}
            <Text
              component="a"
              href={`/${locale}`}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                fontWeight: 700,
                color: 'var(--mantine-color-text)',
                textDecoration: 'none',
                letterSpacing: '-0.02em',
              }}
            >
              مركز الحجاز
            </Text>

            {/* Desktop nav */}
            <Group gap="xl" visibleFrom="md">
              {navLinks.map((link) => (
                <Text
                  key={link.label}
                  component="a"
                  href={link.href}
                  style={{
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    color: 'var(--mantine-color-text)',
                    textDecoration: 'none',
                    opacity: 0.8,
                    transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.8')}
                >
                  {link.label}
                </Text>
              ))}
            </Group>

            {/* Right side controls */}
            <Group gap="sm" align="center">
              {/* Language switcher — desktop */}
              <Group gap={4} visibleFrom="sm">
                {LOCALES.map((l) => (
                  <Button
                    key={l.value}
                    size="xs"
                    variant={locale === l.value ? 'filled' : 'subtle'}
                    color={locale === l.value ? 'dark' : 'gray'}
                    style={{
                      minWidth: 36,
                      fontWeight: 600,
                      fontSize: '0.7rem',
                      padding: '0 8px',
                      background: locale === l.value ? 'var(--color-primary)' : 'transparent',
                      color: locale === l.value ? '#fff' : 'var(--mantine-color-text)',
                    }}
                    onClick={() => switchLocale(l.value)}
                  >
                    {l.label}
                  </Button>
                ))}
              </Group>

              <ColorSchemeToggle />

              {/* Donate — desktop */}
              <Button
                className="btn-gold"
                size="sm"
                visibleFrom="sm"
              >
                {t('donate')}
              </Button>

              {/* Mobile burger */}
              <Burger
                opened={opened}
                onClick={toggle}
                size="sm"
                hiddenFrom="md"
                aria-label="Open menu"
              />
            </Group>
          </Group>
        </Container>
      </Box>

      {/* Mobile Drawer */}
      <Drawer
        opened={opened}
        onClose={close}
        title={
          <Text fw={700} style={{ fontFamily: 'var(--font-display)' }}>
            مركز الحجاز
          </Text>
        }
        position={locale === 'ar' ? 'right' : 'left'}
        size="xs"
        overlayProps={{ opacity: 0.4, blur: 4 }}
      >
        <Stack>
          {navLinks.map((link) => (
            <Text
              key={link.label}
              component="a"
              href={link.href}
              size="lg"
              fw={500}
              onClick={close}
              style={{ textDecoration: 'none', color: 'var(--mantine-color-text)' }}
            >
              {link.label}
            </Text>
          ))}

          <Divider my="sm" />

          {/* Language switcher — mobile */}
          <Text size="xs" fw={600} c="dimmed" tt="uppercase" ls="0.1em">
            Language
          </Text>
          <Group gap="xs">
            {LOCALES.map((l) => (
              <Button
                key={l.value}
                size="sm"
                variant={locale === l.value ? 'filled' : 'outline'}
                color="dark"
                onClick={() => switchLocale(l.value)}
                style={{
                  background: locale === l.value ? 'var(--color-primary)' : 'transparent',
                  color: locale === l.value ? '#fff' : undefined,
                }}
              >
                {l.label}
              </Button>
            ))}
          </Group>

          <Divider my="sm" />

          <Button className="btn-gold" fullWidth>
            {t('donate')}
          </Button>
        </Stack>
      </Drawer>
    </>
  );
}
