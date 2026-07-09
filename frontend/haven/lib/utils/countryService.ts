export interface CountryData {
    id: string;
    name: string;
    emoji: string;
    phonecode: string;
    currency: string;
    timezone: string;
}

export const fetchCountries = async (): Promise<CountryData[]> => {
    try {
        const countriesModule = await import("@/assets/data/Countries_Min.json");
        const countries = countriesModule.default || countriesModule;
        
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(countries as CountryData[]);
            }, 1500);
        });
    } catch (error) {
        console.error("Failed to fetch countries:", error);
        return [];
    }
};