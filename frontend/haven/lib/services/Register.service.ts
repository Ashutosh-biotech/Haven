import axios from "axios";
import {BackendRoutes} from "@/router/routes";
import {UserRegistrationFormData} from "@/components/interface/user-registration-form-data";
async function RegisterUser(jsonData: UserRegistrationFormData): Promise<boolean> {
    try {
        const res = await axios.post(BackendRoutes.register(), jsonData);

        return res.status === 200;
    } catch (error) {
        return false;
    }
}

export { RegisterUser };