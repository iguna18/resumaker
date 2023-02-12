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
      .post(`${baseUrl}/cvs`, resume)
      .then(response => response.data)
  )
}

export default { getDegrees, uploadResume }