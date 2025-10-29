import React from "react";
export default function Header() {
   return (
      <div id="header">
         <div className="container">
            <div className="header">
               <a href="/">
                  <img src="/logo.svg" alt="" />
               </a>
               <div className="tabs">
                  <a href="#">Статистика</a>
                  <a href="#">Ұсыныс</a>
                  <a href="#">AI кеңес</a>
               </div>
               <button>Файлды жүктеу</button>
            </div>
         </div>
      </div>
   );
}
