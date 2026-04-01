type routesType = {
    [key: string]: (...args: any[]) => string;
}

const Routes: routesType = {
    home: () => "/",
    cities: () => "/cities",
    city: (slug: string) => `/city/${slug}`,
}

export default Routes;