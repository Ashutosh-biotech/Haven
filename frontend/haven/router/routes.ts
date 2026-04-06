type routesType = {
    [key: string]: (...args: any[]) => string;
}

const Routes: routesType = {
    home: () => "/",
    cities: () => "/cities",
    city: (slug: string) => `/city/${slug}`,
    hotels: () => "/hotels",
    hotel: (slug: string) => `/hotel/${slug}`,
    login: () => "/login",
    register: () => "/register",
}

export default Routes;