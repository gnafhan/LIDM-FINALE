import instance from "../instance"

const fetchKelas = async () => {
    const response = await instance.get("/classes?populate=*")
    return response.data.data
}

export default fetchKelas