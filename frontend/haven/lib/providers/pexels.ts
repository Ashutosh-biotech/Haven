export async function fetchFromPexels(query: string) {
  const res = await fetch(
    `https://api.pexels.com/v1/search?query=${query}&per_page=1`,
    {
      headers: {
        Authorization: process.env.PEXELS_API_KEY!,
      },
      next: { revalidate: 3600 },
    }
  );

  const data = await res.json();

  if (data.photos?.length > 0) {
    return {
      url: data.photos[0].src.large,
      source: "pexels",
      photographer: data.photos[0].photographer,
    };
  }

  return null;
}