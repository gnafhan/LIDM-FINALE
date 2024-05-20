import instance from "../instance"

const fetchQuestions = async () => {
    const response = await instance.get("/questions?populate=*")
    return response.data.data
}

export default fetchQuestions