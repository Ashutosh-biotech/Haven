async function hotels(): Promise<any> {
    const res = await fetch("https://hotelapi.pythonanywhere.com/api/hotels/?limit=5");
    if (!res.ok) {
        throw new Error("Failed to fetch hotels");
    }
    return res.json();
}

export { hotels };