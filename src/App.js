import React, { useState } from "react";
import "./App.css";

import Header from "./components/header";
import Uploader from "./components/uploader";

export default function PlatonusAI() {
   

   
   return (
      <div>
         <Header />
         <Uploader/>

         {/* <input type="file" onChange={handleFileChange} />
         <button onClick={handleUpload}>Upload</button> */}

         
      </div>
   );
}
