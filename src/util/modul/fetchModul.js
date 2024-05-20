import instance from "../instance"

const fetchModul = async () => {
    const response = await instance.get("/modules?populate=*")
    return response.data.data
}

export default fetchModul