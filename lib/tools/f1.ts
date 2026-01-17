export async function getF1NextRace() {
  const res = await fetch(
    "https://ergast.com/api/f1/current/next.json"
  );

  if (!res.ok) {
    throw new Error("F1 fetch failed");
  }

  const data = await res.json();
  const race = data.MRData.RaceTable.Races[0];

  return {
    raceName: race.raceName,
    circuit: race.Circuit.circuitName,
    date: race.date,
    location: `${race.Circuit.Location.locality}, ${race.Circuit.Location.country}`,
  };
}
