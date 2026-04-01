type routesType = {
    [key: string]: (...args: any[]) => string;
}

const routes: routesType = {
    home: () => "/",
    cities: () => "/cities",
    city: (slug: string) => `/city/${slug}`,
}

export default routes;