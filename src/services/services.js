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
      .post(`${baseUrl}/cvs`, resume, {
        'Content-Type': 'application/json', 
        'Accept': 'application/json'
      })
      .then(response => {
        console.log(response);
        console.log(response.data);
        return response.data
      })
  )
}

export default { getDegrees, uploadResume }