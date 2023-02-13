import { useNavigate } from "react-router-dom"
import { Button } from "../styles/styles"

export const Welcome = () => {
  const navigate = useNavigate()
  return (
    <div>
      <Button onClick={()=>navigate('/1')}>
        GO
      </Button>
    </div>
  )
}