import axios from "axios";
import {BackendRoutes} from "@/router/routes";
import {UserRegistrationFormData} from "@/components/interface/user-registration-form-data";

async function RegisterUser(jsonData:UserRegistrationFormData): Promise<boolean> {
    await axios.post(BackendRoutes.register(), {
        body: JSON.stringify(jsonData)
    }).then(res => {
        return res.status === 200;
    });
    return false;
}

export {RegisterUser};