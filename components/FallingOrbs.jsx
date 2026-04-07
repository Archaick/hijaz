'use client';
import { useEffect, useState } from 'react';
import { Box } from '@mantine/core';

const arabicLetters = ['أ', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ك', 'ل', 'م', 'ن', 'هـ', 'و', 'ي'];

export default function FallingOrbs() {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    // Generate fewer elements (around 28) for an elegant, less overwhelming look.
    const generatedElements = Array.from({ length: 28 }).map((_, i) => {
      const isLetter = Math.random() > 0.65; // ~35% chance to be an Arabic letter
      return {
        id: i,
        isLetter,
        char: isLetter ? arabicLetters[Math.floor(Math.random() * arabicLetters.length)] : null,
        left: Math.random() * 100, // random horizontal start point (%)
        delay: Math.random() * 15, // random start delay to stagger them
        duration: 15 + Math.random() * 20, // gently float down (15 - 35 seconds)
        size: isLetter ? (1.5 + Math.random() * 2) : (2 + Math.random() * 4), // rem for letters, px for orbs
        blur: Math.random() > 0.4 ? (Math.random() * 3) : 0, // varying blur for depth
        color: Math.random() > 0.7
          ? 'rgba(46,139,87, 0.4)' // teal
          : (Math.random() > 0.3 ? 'rgba(249,195,64, 0.5)' : 'rgba(255,255,255,0.2)'), // gold or soft white
      };
    });
    setElements(generatedElements);
  }, []);

  if (elements.length === 0) return null;

  return (
    <Box
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 0,
      }}
    >
      <style>{`
        @keyframes floatDown {
          0% {
            transform: translateY(-50px) translateX(0) rotate(-10deg);
            opacity: 0;
          }
          20% {
            opacity: 0.8;
            transform: translateY(20vh) translateX(20px) rotate(5deg);
          }
          80% {
            opacity: 0.5;
            transform: translateY(80vh) translateX(-15px) rotate(-15deg);
          }
          100% {
            transform: translateY(110vh) translateX(0) rotate(10deg);
            opacity: 0;
          }
        }
      `}</style>

      {elements.map(el => (
        el.isLetter ? (
          <Box
            key={el.id}
            style={{
              position: 'absolute',
              left: `${el.left}%`,
              top: -50,
              fontSize: `${el.size}rem`,
              fontFamily: 'var(--font-arabic)',
              color: el.color,
              animation: `floatDown ${el.duration}s ease-in-out ${el.delay}s infinite`,
              opacity: 0,
              filter: el.blur ? `blur(${el.blur}px)` : 'none',
              userSelect: 'none',
              textShadow: `0 0 16px ${el.color}`,
            }}
          >
            {el.char}
          </Box>
        ) : (
          <Box
            key={el.id}
            style={{
              position: 'absolute',
              left: `${el.left}%`,
              top: -20,
              width: el.size,
              height: el.size,
              borderRadius: '50%',
              background: el.color,
              boxShadow: `0 0 ${el.size * 3}px ${el.color}`,
              animation: `floatDown ${el.duration}s ease-in-out ${el.delay}s infinite`,
              opacity: 0,
              filter: el.blur ? `blur(${el.blur}px)` : 'none'
            }}
          />
        )
      ))}
    </Box>
  );
}
