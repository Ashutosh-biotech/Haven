type routesType = {
    [key: string]: (...args: string[]) => string;
}

const Routes: routesType = {
    home: () :string => "/",
    cities: () :string => "/cities",
    city: (slug: string) :string => `/city/${slug}`,
    hotels: () :string => "/hotels",
    hotel: (slug: string) :string => `/hotel/${slug}`,
    login: () :string => "/login",
    register: () :string => "/register",
}

const backendBaseRoute = "http://localhost:8080/api/v1";

const BackendRoutes: routesType = {

    register: () :string => backendBaseRoute+"/public/register"

}

export default Routes;
export {BackendRoutes};