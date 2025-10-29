import React, { useState } from "react";

export default function Uploader() {
   const [file, setFile] = useState(null);
   const [response, setResponse] = useState(null);
   const [loading, setLoading] = useState(false);

   const handleFileChange = (e) => {
      setFile(e.target.files[0]);
   };

   const handleUpload = () => {
      if (!file) return;
      setLoading(true);

      setTimeout(() => {
         const fakeResponse = {
            grades: [
               { subject: "Математика", score: 85, credits: 3, gpaPoint: 3.33 },
               { subject: "Физика", score: 70, credits: 4, gpaPoint: 2.33 },
               { subject: "Тарих", score: 12, credits: 2, gpaPoint: 1.33 },
               { subject: "Ағылшын тілі", score: 95, credits: 2, gpaPoint: 4 },
               { subject: "Биология", score: 49, credits: 3, gpaPoint: 0 },
               { subject: "Дене тәрбиесі", score: 100, credits: 1, gpaPoint: 4 },
            ],
            system_advices: {
               average: 75.67,
               weightedGPA: 2.26,
               lowest: { subject: "Биология", score: 49 },
               highest: { subject: "Дене тәрбиесі", score: 100 },
               belowThresholdSubjects: ["Биология (49)"],
               suggestions: [
                  "Жалпы GPA қанағаттанарлық, бірақ әлсіз пәндерге назар аудару қажет.",
                  "50 ұпайдан төмен пәндерге көбірек көңіл бөл.",
               ],
            },
            ai_advices: [
               "Математика мен Биология пәндерінде оқу дағдыларын жақсарт.",
               "Физика пәнінен қосымша академиялық көмек алуды қарастыр.",
               "Тарих сабағындағы қайталау сабақтарына қатыс.",
               "Ағылшын тілінде жазу машығын жетілдір.",
               "Оқу материалдарын үнемі жаңартып отыр.",
               "Өзіңе нақты және қолжетімді оқу мақсаттарын қой.",
               "Барлық оқу ресурстарын тиімді пайдалан.",
               "Уақытты басқаруды үйрен: оқу үшін көбірек уақыт бөл.",
               "Оқу ортасын ыңғайлы етіп ретте.",
               "Теңгерімді тамақтану мен жеткілікті ұйқыны сақта.",
            ],
         };

         setResponse(fakeResponse);
         setLoading(false);
      }, 1500);
   };

   return (
      <div id="uploader">
         <div className="container">
            <div className="uploader">
               <div className="text">
                  <h1>Қош келдіңіз</h1>
                  <p>
                     Аттестациялық немесе семестрлік бағаңызды есептеп AI бот
                     арқылы кеңестер алыңыз!
                  </p>
               </div>
               <input type="file" accept="." onChange={handleFileChange} />
               <button onClick={handleUpload}>Файлды жүктеу</button>
            </div>

            {loading && <p className="loading">Uploading and analyzing...</p>}

            {response && (
               <div>
                  {/* Grades Section */}
                  <div className="grades-container">
                     <h3>Бағалар</h3>
                     {response.grades.map((g, i) => (
                        <div className="grade-item" key={i}>
                           <div className="grade-header">
                              <span>{g.subject}</span>
                              <span>{g.score}%</span>
                           </div>
                           <div className="grade-progress">
                              <div
                                 className="grade-fill"
                                 style={{ "--score": g.score }}
                                 data-score={g.score}
                              ></div>
                           </div>
                        </div>
                     ))}
                     <ul>
  {Object.entries(response.system_advices)
    .filter(([key]) => key !== "suggestions") // exclude suggestions
    .map(([key, value], i) => (
      <li key={i}>
        <strong>{key}:</strong>{" "}
        {typeof value === "object" ? JSON.stringify(value) : value}
      </li>
    ))}
</ul>

                  </div>

                  {/* System Advices */}
                  <h3>Жүйе кеңестері</h3>
                  <div className="advice-list">
                     <div className="card">
                        <ul>
                           {response.system_advices.suggestions.map((s, i) => (
                              <li key={i}>{s}</li>
                           ))}
                        </ul>
                     </div>
                  </div>

                  {/* AI Advices */}
                  <h3>AI Кеңестері</h3>
                  <div className="advice-list">
                     {response.ai_advices.map((a, i) => (
                        <div className="card" key={i}>
                           <ul>
                              <li>{a}</li>
                           </ul>
                        </div>
                     ))}
                  </div>
               </div>
            )}
         </div>
      </div>
   );
}
