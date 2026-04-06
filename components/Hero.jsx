'use client';
import { Container, Title, Text, Button, Group, Box } from '@mantine/core';
import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <Box
      component="section"
      id="home"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(160deg, var(--color-primary) 0%, var(--color-primary-container) 60%, #1a3a5c 100%)',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '80px',
        paddingBottom: '12vh',
      }}
    >
      {/* Decorative radial glow — gold */}
      <Box
        style={{
          position: 'absolute',
          top: '20%',
          insetInlineEnd: '8%',
          width: 'clamp(280px, 40vw, 560px)',
          height: 'clamp(280px, 40vw, 560px)',
          background: 'radial-gradient(circle, rgba(249,195,64,0.12) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />
      {/* Decorative radial glow — teal */}
      <Box
        style={{
          position: 'absolute',
          bottom: '10%',
          insetInlineStart: '5%',
          width: 'clamp(200px, 30vw, 400px)',
          height: 'clamp(200px, 30vw, 400px)',
          background: 'radial-gradient(circle, rgba(46,139,87,0.10) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />

      {/* Arabic calligraphic watermark */}
      <Box
        style={{
          position: 'absolute',
          insetInlineEnd: '-2%',
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: 'clamp(180px, 25vw, 380px)',
          fontFamily: 'var(--font-arabic)',
          color: 'rgba(255,255,255,0.025)',
          userSelect: 'none',
          pointerEvents: 'none',
          lineHeight: 1,
        }}
        aria-hidden
      >
        الحجاز
      </Box>

      <Container size="xl" style={{ width: '100%', position: 'relative', zIndex: 1 }}>
        <Box style={{ maxWidth: 760 }}>
          {/* Eyebrow */}
          <Text
            className="eyebrow-text"
            mb="lg"
            style={{ color: 'var(--color-secondary)' }}
          >
            {t('eyebrow')}
          </Text>

          {/* Headline */}
          <Title
            className="display-headline"
            mb="xl"
            style={{ color: '#ffffff' }}
          >
            {t('headline')}
          </Title>

          {/* Subtext */}
          <Text
            size="md"
            mb={40}
            style={{
              color: 'rgba(255,255,255,0.72)',
              maxWidth: 540,
              lineHeight: 1.6,
              fontWeight: 400,
            }}
          >
            {t('subtext')}
          </Text>

          {/* CTA Buttons */}
          <Group gap="md" wrap="wrap">
            <Button
              className="btn-gold"
              size="lg"
              radius="md"
              component="a"
              href="#programs"
            >
              {t('cta_primary')}
            </Button>
            <Button
              className="btn-ghost"
              size="lg"
              radius="md"
              component="a"
              href="#about"
            >
              {t('cta_secondary')}
            </Button>
          </Group>
        </Box>

      </Container>

      {/* Scroll indicator - Positioned relative to the whole Hero section */}
      <Box
        style={{
          position: 'absolute',
          bottom: '2.5rem', 
          insetInlineStart: '50%',
          transform: 'translateX(calc(-50% * var(--mantine-direction-factor, 1)))',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
          opacity: 0.4,
          zIndex: 20,
        }}
      >
        <Box
          style={{
            width: 20,
            height: 32,
            border: '1.5px solid rgba(255,255,255,0.4)',
            borderRadius: 10,
            display: 'flex',
            justifyContent: 'center',
            paddingTop: 4,
          }}
        >
          <Box
            style={{
              width: 3,
              height: 6,
              background: '#fff',
              borderRadius: 2,
              animation: 'scrollBounce 1.8s ease-in-out infinite',
            }}
          />
        </Box>
        <style>{`
          @keyframes scrollBounce {
            0%, 100% { transform: translateY(0); opacity: 1; }
            50% { transform: translateY(6px); opacity: 0.4; }
          }
        `}</style>
      </Box>
    </Box>
  );
}
