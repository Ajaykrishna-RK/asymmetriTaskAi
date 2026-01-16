export async function getWeather(city: string) {
  // fake data for learning (no API key yet)
  return {
    city,
    temperature: 32,
    condition: "Sunny",
  };
}
