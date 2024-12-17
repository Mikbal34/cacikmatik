import { CityPositions } from './types';

export const cityPositions: CityPositions = {
  34: { x: 295, y: 125 }, // İstanbul
  6: { x: 250, y: 180 },  // Ankara
  35: { x: 180, y: 220 }, // İzmir
  16: { x: 220, y: 160 }, // Bursa
  1: { x: 420, y: 280 },  // Adana
};

export function getCityPosition(cityId: number): { x: number; y: number } {
  if (!cityPositions[cityId]) {
    const row = Math.floor((cityId - 1) / 10);
    const col = (cityId - 1) % 10;
    return {
      x: 50 + col * 90,
      y: 50 + row * 60
    };
  }
  
  return cityPositions[cityId];
}