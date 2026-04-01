export async function fetchFromUnsplash(query: string) {
  const res = await fetch(
    `https://api.unsplash.com/photos/random?query=${query}&client_id=${process.env.UNSPLASH_ACCESS_KEY}`,
    { next: { revalidate: 3600 } }
  );

  const data = await res.json();

  if (data?.urls?.regular) {
    return {
      url: data.urls.regular,
      source: "unsplash",
      photographer: data.user?.name,
    };
  }

  return null;
}