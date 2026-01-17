export async function getWeather(city: string) {
  const apiKey = process.env.OPENWEATHER_API_KEY

  if (!apiKey) {
    throw new Error("Missing WEATHER_API_KEY");
  }

  const res = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(
      city
    )}&aqi=no`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Weather API failed: ${res.status} ${text}`);
  }

  const data = await res.json();

  return {
    city: data.location.name,
    temperature: data.current.temp_c,
    condition: data.current.condition.text,
  };
}
