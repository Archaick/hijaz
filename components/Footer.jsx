'use client';
import { Container, Grid, Box, Text, Anchor, Group, Divider, Stack } from '@mantine/core';
import { IconMail, IconPhone } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');

  const quickLinks = [
    { label: t('link_programs'), href: '#programs' },
    { label: t('link_community'), href: '#community' },
    { label: t('link_about'), href: '#about' },
    { label: t('link_donate'), href: '#donate' },
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
        <Grid gutter={{ base: 'xl', md: '6rem' }} mb={48} justify="center">
          {/* Brand column */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Box mb="xl">
              <img
                src="/ahu-logo.png"
                alt="Madinatul Hijaz Logo"
                style={{
                  height: '80px',
                  objectFit: 'contain',
                  marginBottom: '1.25rem'
                }}
              />

              <Text
                size="sm"
                style={{
                  color: 'rgba(255,255,255,0.7)',
                  lineHeight: 1.7,
                  fontWeight: 400,
                  maxWidth: 400,
                  marginBottom: '1.5rem'
                }}
              >
                {t('description')}
              </Text>

              <Box pt="md" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <Text
                  size="xs"
                  style={{
                    color: 'var(--color-secondary)',
                    lineHeight: 1.5,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: 4
                  }}
                >
                  {t('registered_under')}
                </Text>
                <Text
                  size="xs"
                  style={{
                    color: 'rgba(255,255,255,0.5)',
                    lineHeight: 1.6,
                    fontWeight: 400,
                  }}
                >
                  {t('registration_org')}<br />
                  {t('registration_ministry')}
                </Text>
              </Box>
            </Box>
          </Grid.Col>

          {/* Quick Links */}
          <Grid.Col span={{ base: 6, md: 2 }}>
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
            <Group gap="md" mb="xl" wrap="nowrap">
              <img 
                src="/logo.svg" 
                alt="Markaz Al-Hijaz" 
                style={{ 
                  height: '52px', 
                  objectFit: 'contain',
                  filter: 'brightness(0) invert(1)' 
                }} 
              />
              <Stack gap={0}>
                <Text 
                  fw={800} 
                  style={{ 
                    color: '#fff', 
                    fontSize: '1.1rem', 
                    letterSpacing: '0.02em',
                    lineHeight: 1.2
                  }}
                >
                  MARKAZ AL-HIJAZ
                </Text>
                <Text 
                  style={{ 
                    color: 'var(--color-secondary)', 
                    fontFamily: 'var(--font-arabic)', 
                    fontSize: '1rem',
                    lineHeight: 1.2,
                    marginTop: '2px'
                  }}
                >
                  لتعليم القرآن واللغة العربية
                </Text>
              </Stack>
            </Group>

            <Text
              size="xs"
              fw={600}
              tt="uppercase"
              ls="0.1em"
              mb="md"
              style={{ color: 'var(--color-secondary)' }}
            >
              {t('contact_us')}
            </Text>

            <Stack gap="xs">
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

              <Group gap="xs" align="center">
                <IconPhone size={16} style={{ color: 'rgba(255,255,255,0.4)', flexShrink: 0 }} />
                <Text size="sm" style={{ color: 'rgba(255,255,255,0.65)', fontWeight: 300 }}>
                  {t('phone')}
                </Text>
              </Group>
            </Stack>
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
