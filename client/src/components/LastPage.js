import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { refresh } from "../reducers/slices"
import { HomeButton, PopUp, Strip, StyledLastPage } from "../styles/styles"
import axios from "axios"

export const LastPage = ({ children, degrees }) => {
  const [popup, setpopup] = useState(true)
  const [pdfGenerating, setPdfGenerating] = useState(false);
  // const state = useSelector(state => state.form)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(()=>{
    setpopup(true)
  },[])

  const generatePDF = async () => {
    setPdfGenerating(true);

    const htmlContent = document.getElementById("root").innerHTML;
    try {
      const response = await axios.post("http://localhost:3002/generate-pdf", 
      { htmlContent }, {responseType: "blob"});
      // Assuming the response contains the PDF blob or URL
      // You can handle the response based on your backend implementation
      console.log('gia', Object.keys(response.data));
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "generated.pdf";
      a.click();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setPdfGenerating(false);
    }
  };
  return (
    <StyledLastPage>
      <div style={{  position:'relative', display: 'inline', left :'50px'}}>
        <HomeButton onClick={() => {
            dispatch(refresh({}))
            navigate('/')
          }}>
          <span style={{position:'relative', left:'9px', top:'2px', fontWeight:450}}>{'<'}</span>
        </HomeButton>
      </div>
      <div className='cont'>
        <div className="popup" style={{visibility:popup?'visible':'hidden'}}>
          <div className='x' onClick={()=>setpopup(false)}>x</div>
          <span>რეზიუმე წარმატებით გაიგზავნა 🎉 </span>
        </div>
        <button onClick={generatePDF} disabled={pdfGenerating}>
          {pdfGenerating ? "Generating PDF..." : "Generate PDF"}
        </button>
        <div id='cvcontainerid' className='cvcontainer'>
          {children}
        </div>
      </div>
    </StyledLastPage>

  )

}