export async function getStockPrice(symbol: string) {
  const res = await fetch(
    `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`
  );

  if (!res.ok) {
    throw new Error("Stock fetch failed");
  }

  const data = await res.json();
  const quote = data["Global Quote"];

  return {
    symbol,
    price: quote["05. price"],
    change: quote["09. change"],
  };
}
