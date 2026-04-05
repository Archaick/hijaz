'use client';
import { Container, Grid, Box, Text, Anchor, Group, Divider } from '@mantine/core';
import { IconMapPin, IconMail } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');

  const quickLinks = [
    { label: t('link_programs'),  href: '#programs' },
    { label: t('link_community'), href: '#community' },
    { label: t('link_about'),     href: '#about' },
    { label: t('link_donate'),    href: '#donate' },
  ];

  return (
    <Box
      component="footer"
      style={{
        background: 'light-dark(var(--color-primary-container), #020b18)',
        color: 'rgba(255,255,255,0.85)',
        paddingTop: '64px',
        paddingBottom: '32px',
      }}
    >
      <Container size="xl">
        <Grid gutter={{ base: 'xl', md: '4rem' }} mb={48}>
          {/* Brand column */}
          <Grid.Col span={{ base: 12, md: 5 }}>
            <Text
              mb="md"
              style={{
                fontFamily: 'var(--font-arabic)',
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#fff',
              }}
            >
              مركز الحجاز
            </Text>
            <Text
              size="sm"
              style={{
                color: 'rgba(255,255,255,0.55)',
                lineHeight: 1.75,
                maxWidth: 320,
                fontWeight: 300,
              }}
            >
              {t('tagline')}
            </Text>

            {/* Gold accent bar */}
            <Box
              mt="lg"
              style={{
                width: 48,
                height: 3,
                background: 'var(--color-secondary)',
                borderRadius: 2,
              }}
            />
          </Grid.Col>

          {/* Quick Links */}
          <Grid.Col span={{ base: 6, md: 3 }}>
            <Text
              size="xs"
              fw={600}
              tt="uppercase"
              ls="0.1em"
              mb="lg"
              style={{ color: 'var(--color-secondary)' }}
            >
              {t('quick_links')}
            </Text>
            <Box component="ul" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {quickLinks.map((link) => (
                <Box component="li" key={link.label} mb="sm">
                  <Anchor
                    href={link.href}
                    size="sm"
                    style={{
                      color: 'rgba(255,255,255,0.65)',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                      fontWeight: 400,
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
                  >
                    {link.label}
                  </Anchor>
                </Box>
              ))}
            </Box>
          </Grid.Col>

          {/* Contact */}
          <Grid.Col span={{ base: 6, md: 4 }}>
            <Text
              size="xs"
              fw={600}
              tt="uppercase"
              ls="0.1em"
              mb="lg"
              style={{ color: 'var(--color-secondary)' }}
            >
              {t('contact')}
            </Text>

            <Group gap="xs" mb="sm" align="flex-start">
              <IconMapPin size={16} style={{ color: 'rgba(255,255,255,0.4)', flexShrink: 0, marginTop: 2 }} />
              <Text size="sm" style={{ color: 'rgba(255,255,255,0.65)', fontWeight: 300 }}>
                {t('address')}
              </Text>
            </Group>

            <Group gap="xs" align="center">
              <IconMail size={16} style={{ color: 'rgba(255,255,255,0.4)', flexShrink: 0 }} />
              <Anchor
                href={`mailto:${t('email')}`}
                size="sm"
                style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'none', fontWeight: 300 }}
              >
                {t('email')}
              </Anchor>
            </Group>
          </Grid.Col>
        </Grid>

        <Divider color="rgba(255,255,255,0.08)" mb="lg" />

        <Text
          size="xs"
          ta="center"
          style={{ color: 'rgba(255,255,255,0.35)', fontWeight: 300 }}
        >
          {t('copyright')}
        </Text>
      </Container>
    </Box>
  );
}
