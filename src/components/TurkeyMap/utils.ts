export function getCityColor(cityName: string, cityStats: Record<string, any>) {
  if (!cityStats[cityName]) return '#e5e7eb';
  const stats = cityStats[cityName];
  
  if (stats.activeCaciks > 0) return '#22c55e';
  if (stats.totalCaciks > 0) return '#86efac';
  return '#e5e7eb';
}