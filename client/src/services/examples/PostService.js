import axios from "axios";

const url = process.env.NODE_ENV === "production" ? "api/posts" : "http://localhost:8080/api/posts";

class PostService {
    static insertPost(text) {
        return axios.post(url, { text })
    }
    
    static getPosts() {
        return new Promise((resolve, reject) => {
            (async () => {
                try {
                    const res = await axios.get(url)
                    const data = await res.data;
                    if(!data.length) return resolve([{ text: "No posts have been created yet. Make yours above!", createdAt: new Date()}])
                    resolve(
                        data.map(post => ({
                            ...post,
                            createdAt: new Date(post.createdAt)
                        }))
                    );
                } catch (e) {
                    reject(e)
                }
            })(resolve);
        });
    }

    static updatePost(text, id) {
        return axios.put(`${url}/${id}`, { text })
    }

    static deletePost(id) {
        return axios.delete(`${url}/${id}`)
    }

}

export default PostService;