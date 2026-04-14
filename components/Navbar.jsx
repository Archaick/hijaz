'use client';
import { useEffect, useState } from 'react';
import {
  Group, Container, Text, Button, Burger,
  Drawer, Stack, Divider, Box, SegmentedControl,
  useComputedColorScheme,
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
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  // Use white elements at the top of the page in light mode (assuming dark hero) 
  // or always in dark mode.
  const useWhiteElements = computedColorScheme === 'dark' || !scrolled;

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const switchLocale = (newLocale) => {
    // Replace /currentLocale with /newLocale in path
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/') || `/${newLocale}`, { scroll: false });
    close();
  };

  const navLinks = [
    { label: t('programs'), href: '#programs' },
    { label: t('community'), href: '#community' },
    { label: t('about'), href: '#about' },
    { label: t('internals'), href: `/${locale}/internal` },
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
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          paddingTop: scrolled ? '0.5rem' : '1.25rem',
          paddingBottom: scrolled ? '0.5rem' : '1.25rem',
          boxShadow: scrolled ? '0 4px 30px rgba(0, 0, 0, 0.1)' : 'none',
          backgroundColor: scrolled 
            ? (computedColorScheme === 'dark' ? 'var(--mantine-color-body-95)' : '#ffffff') 
            : 'transparent',
          backdropFilter: scrolled && computedColorScheme === 'light' ? 'none' : 'blur(12px)',
          WebkitBackdropFilter: scrolled && computedColorScheme === 'light' ? 'none' : 'blur(12px)',
          borderBottom: scrolled ? '1px solid rgba(0, 0, 0, 0.05)' : 'none',
        }}
      >
        <Container size="xl">
          <Group justify="space-between" align="center">
            {/* Logo */}
            <Box
              component="a"
              href={`/${locale}`}
              aria-label="Markaz Al Hijaz Home"
              style={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                transition: 'transform 0.3s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <img 
                src="/logo.svg" 
                alt="Markaz Al Hijaz Logo" 
                style={{ 
                  height: scrolled ? '40px' : '52px', 
                  transition: 'all 0.4s ease',
                  objectFit: 'contain',
                  filter: useWhiteElements ? 'brightness(0) invert(1)' : 'none',
                }} 
              />
            </Box>

            {/* Desktop nav */}
            <Group gap="xl" visibleFrom="md">
              {navLinks.map((link) => (
                <Text
                  key={link.label}
                  component="a"
                  href={link.href}
                  style={{
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    color: useWhiteElements ? '#fff' : 'var(--mantine-color-text)',
                    textDecoration: 'none',
                    position: 'relative',
                    padding: '8px 0',
                    transition: 'all 0.3s ease',
                  }}
                  className="nav-link-hover"
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
                      padding: '0 8px',
                      background: locale === l.value 
                        ? 'var(--color-primary)' 
                        : 'transparent',
                      color: locale === l.value 
                        ? '#fff' 
                        : (useWhiteElements ? 'rgba(255,255,255,0.9)' : 'var(--mantine-color-text)'),
                    border: !scrolled && locale !== l.value ? '1px solid rgba(255,255,255,0.3)' : 'none',
                  }}
                    onClick={() => switchLocale(l.value)}
                  >
                    {l.label}
                  </Button>
                ))}
              </Group>

              <ColorSchemeToggle 
                style={{ 
                  color: useWhiteElements ? '#fff' : 'var(--mantine-color-text)',
                  opacity: useWhiteElements ? 0.9 : 1,
                  transition: 'all 0.3s ease'
                }} 
              />

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
                color={useWhiteElements ? '#fff' : 'var(--color-primary)'}
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
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <img 
              src="/logo.svg" 
              alt="Markaz Al Hijaz Logo" 
              style={{ 
                height: '36px', 
                objectFit: 'contain',
                filter: computedColorScheme === 'dark' ? 'brightness(0) invert(1)' : 'none',
              }} 
            />
          </Box>
        }
        position={locale === 'ar' ? 'right' : 'left'}
        size="xs"
        zIndex={3000}
        overlayProps={{ opacity: 0.4, blur: 4 }}
      >
        <Stack pt="xl" px="md">
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
