import { useRef } from "react"

export default function DatasetUpload({ onFileUpload }) {

 const fileRef = useRef()

 const handleUpload = (e) => {
  const file = e.target.files[0]
  if(file){
   onFileUpload(file)
  }
 }

 return(

  <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-xl">

   <h2 className="text-cyan-400 text-lg mb-4">
    Upload Dataset
   </h2>

   <input
    type="file"
    accept=".csv"
    ref={fileRef}
    onChange={handleUpload}
    className="text-white"
   />

  </div>
 )
}