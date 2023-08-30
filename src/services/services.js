import axios from 'axios'
const baseUrl = 'https://resume.redberryinternship.ge/api'

const getDegrees = async () => {
  return (
    axios
      .get(`${baseUrl}/degrees`)
      .then(response => response.data)
  )
}

const uploadResume = async (resume) => {
  console.log(resume);
  return (
    axios
      .post('http://localhost:3002/getpdf', resume, {
        'Content-Type': 'application/json', 
        'Accept': 'application/json',
        responseType: "blob"
      })
      .then(response => {
        return response.data
      })
  )
}

export default { getDegrees, uploadResume }