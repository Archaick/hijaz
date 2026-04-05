'use client';

import { Container, SimpleGrid, Text, Box, Paper, ThemeIcon, useMantineColorScheme } from '@mantine/core';
import { IconBuildingMosque, IconSchool, IconBook } from '@tabler/icons-react';
import CountUp from 'react-countup';
import { useTranslations } from 'next-intl';

export default function Stats() {
  const t = useTranslations('stats');
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  // Unified colors based on theme
  const numberColor = isDark ? 'var(--color-secondary)' : '#d49b00'; 
  const iconColor = isDark ? 'white' : 'var(--color-primary)';
  const iconBg = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 7, 23, 0.05)';

  const statsData = [
    { value: 12, label: t('masjids'), icon: IconBuildingMosque, suffix: '+' },
    { value: 1250, label: t('students'), icon: IconSchool, suffix: '+' },
    { value: 48, label: t('courses'), icon: IconBook, suffix: '+' },
  ];

  return (
    <Box 
      component="section" 
      style={{ 
        position: 'relative',
        zIndex: 10,
        marginTop: '-80px', // Elevation overlap with Hero
      }}
    >
      <Container size="lg">
        <SimpleGrid cols={{ base: 1, sm: 3 }} spacing={30}>
          {statsData.map((stat, index) => (
            <Paper
              key={index}
              p="xl"
              radius="lg"
              style={{
                textAlign: 'center',
                backgroundColor: 'var(--mantine-color-body)',
                backdropFilter: 'blur(16px)',
                border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.05)',
                boxShadow: isDark 
                  ? '0 20px 40px rgba(0, 0, 0, 0.3)' 
                  : '0 20px 40px rgba(0, 7, 23, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '15px'
              }}
            >
              <ThemeIcon 
                size={60} 
                radius="xl" 
                variant="light" 
                style={{ 
                  backgroundColor: iconBg,
                  color: iconColor 
                }}
              >
                <stat.icon size={32} stroke={1.5} />
              </ThemeIcon>

              <div>
                <Text 
                  className="noto-serif"
                  style={{ 
                    fontSize: '2.8rem', 
                    fontWeight: 700, 
                    color: numberColor, 
                    lineHeight: 1.2,
                  }}
                >
                  <CountUp 
                    end={stat.value} 
                    duration={2.5} 
                    enableScrollSpy 
                    scrollSpyOnce
                  />
                  {stat.suffix}
                </Text>
                
                <Text
                  size="xs"
                  c="dimmed"
                  fw={700}
                  tt="uppercase"
                  lts="0.1em"
                  className="inter"
                  mt={4}
                >
                  {stat.label}
                </Text>
              </div>
            </Paper>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
