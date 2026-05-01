import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock Image/Asset imports to prevent resolution errors in tests
vi.mock('@/assets/bot.png', () => ({ default: 'mock-img' }));
vi.mock('@/assets/bot-bg.png', () => ({ default: 'mock-img' }));
vi.mock('@/assets/hero.png', () => ({ default: 'mock-img' }));
vi.mock('@/assets/logo.png', () => ({ default: 'mock-img' }));
vi.mock('@/assets/faqs_full.json', () => ({ 
  default: {
    tabs: [
      { title: 'General', faqs: [{ question: 'What is EPIC?', answer: 'EPIC is a card.' }] }
    ] 
  }
}));
