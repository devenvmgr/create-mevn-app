

import axios from "axios";

class AppointmentService {
    static create(_id) {
        return new Promise((resolve, reject) => {
            (async (_id) => {
                const token = localStorage.getItem("bztoken");
                try {
                    await axios.post(
                        "api/new-appointment",
                        { _id },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    resolve();
                } catch (e) {
                    reject();
                }

            })(_id)
        })
    }

}

export default AppointmentService;