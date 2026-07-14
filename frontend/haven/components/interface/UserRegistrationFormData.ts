import {CountryData} from "@/lib/services/country-service";

export interface UserRegistrationFormData {
    firstName: string,
    lastName: string,
    email: string,
    phone: number,
    password: string,
    repeatPassword: string,
    address1: string,
    address2: string,
    city: string,
    state: string,
    country: CountryData | null,
    postcode: number,
    isDefaultAddress: boolean,
    agreeTerms: boolean
}