export async function fetchFromPixabay(query: string) {
  const res = await fetch(
    `https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&q=${query}&image_type=photo&per_page=3`,
    { next: { revalidate: 3600 } }
  );

  const data = await res.json();

  if (data.hits?.length > 0) {
    return {
      url: data.hits[0].largeImageURL,
      source: "pixabay",
      photographer: data.hits[0].user,
    };
  }

  return null;
}