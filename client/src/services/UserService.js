import axios from "axios";

const url = process.env.NODE_ENV === "production" ? "api" : "http://localhost:8080/api";

class UserService {
    static createUser(newUser) {
        return new Promise((resolve, reject) => {
            (async (newUser) => {
                try {
                    const { data: req } = await axios.post(`${url}/signup`, { newUser });
                    resolve(req);
                } catch (e) {
                    reject(e.response.data);
                }
            })(newUser)
        })
    }


    static login(creds) {
        return new Promise((resolve, reject) => {
            (async (creds) => {
                try {
                    const { data } = await axios.post(`${url}/login`, { ...creds });
                    localStorage.setItem("bztoken", data.token);
                    console.log("newtoken")

                    resolve(data);
                } catch (e) {
                    reject(e.response.data);
                }
            })(creds)
        })
    }

    static logout() {
        return new Promise((resolve, reject) => {
            try {
                const token = localStorage.getItem("bztoken");
                (async () => {
                    await axios.get(`${url}/logout`, {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    })
                })()
                localStorage.removeItem("bztoken");
                sessionStorage.clear();
                resolve();
            } catch (error) {
                reject(error)
            }

        })
    }

    static verify() {
        const token = localStorage.getItem("bztoken");
        return new Promise((resolve, reject) => {
            (async (token) => {
                try {
                    let res = await axios.get(`${url}/verify`, {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    });
                    if (res.data.user) {
                        delete res.data.user.password;
                        delete res.data.user.tokens;
                        return resolve({ loggedIn: res.data.auth, userInfo: { ...res.data.user } })
                    } else {
                        return resolve({ loggedIn: res.data.auth })
                    }
                } catch (e) {
                    console.log(e)
                    return reject(false);
                }
            })(token)
        })
    }

}

export default UserService;