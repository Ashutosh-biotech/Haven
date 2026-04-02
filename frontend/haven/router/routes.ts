type routesType = {
    [key: string]: (...args: any[]) => string;
}

const Routes: routesType = {
    home: () => "/",
    cities: () => "/cities",
    city: (slug: string) => `/city/${slug}`,
    hotels: () => "/hotels",
    hotel: (slug: string) => `/hotel/${slug}`,
}

export default Routes;