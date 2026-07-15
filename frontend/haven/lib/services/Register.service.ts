import axios from "axios";
import {BackendRoutes} from "@/router/routes";
import {UserRegistrationFormData} from "@/components/interface/user-registration-form-data";

async function RegisterUser(jsonData:UserRegistrationFormData): Promise<boolean> {
    await axios.post(BackendRoutes.register(), {
        headers: {},
        body: JSON.stringify(jsonData)
    });
    return true;
}

export {RegisterUser};