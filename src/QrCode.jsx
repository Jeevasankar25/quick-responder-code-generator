import { useState } from "react"

export const QrCode = () => {
  const [img,setImg]=useState("")
  const [load,setLoad]=useState(false)
  const [data,setData]=useState("")
  const [size,setSize]=useState("")


  async function generate() {
    setLoad(true);
    try{
      const url=`http://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(data)}`
      setImg(url)
    }catch (error) {
      console.log("Error generating QR code:", error);
    }finally{
      setLoad(false);
    }
  }
  function downloadImage() {
    fetch(img).then(response => response.blob()).then(blob => {
      const link =document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = 'qr-code.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    ).catch((error) => {
      console.error("Error downloading image:", error);
    })
  }
  return (
    <div className="app-container">
      <h1>QR CODE GENERATOR</h1>
      {load && <p>please wait...</p>}
      {img && <img src={img} alt="" className="qr-code-image" />}
    <div>
      <br></br><br />
      <label htmlFor="dataInput" className="input-label" >Data for Qr-code:</label>
      <input type="text" id="dataInput" placeholder="Enter your data" onChange={(e)=>setData(e.target.value)}/>

      <label htmlFor="sizeInput" className="input-label">Image_size(e.g., 100):</label>
      <input type="text" id="sizeInput" placeholder="Enter image size" onChange={(e)=>setSize(e.target.value)}/>
      <button className="g-button" disabled={load} onClick={generate}>Generate Qr_code</button>
      <button className="d-button" onClick={downloadImage}>Download Qr_code</button>
    </div>
    </div>
  )
}
