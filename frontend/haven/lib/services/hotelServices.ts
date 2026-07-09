export async function getHotels(endpoint?: string, params?: string) {
  const res = await fetch(`https://hotelapi.pythonanywhere.com/api/hotels/${endpoint}?${params}`, {
    next: { revalidate: 7200 },
  });
  if (!res.ok) throw new Error("Failed to fetch hotels");
  return res.json();
}