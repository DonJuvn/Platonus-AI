import React, { useState } from "react";export default function Uploader() {
   const [file, setFile] = useState(null);
   const [response, setResponse] = useState(null);
   const [loading, setLoading] = useState(false);
   const handleFileChange = (e) => {
      setFile(e.target.files[0]);
   };

   const handleUpload = () => {
      if (!file) return;
      setLoading(true);

      // Simulate API delay
      setTimeout(() => {
         const fakeResponse = {
            grades: [
               { subject: "Математика", score: 85, credits: 3, gpaPoint: 3.33 },
               { subject: "Физика", score: 70, credits: 4, gpaPoint: 2.33 },
               { subject: "Тарих", score: 55, credits: 2, gpaPoint: 1.33 },
               { subject: "Ағылшын тілі", score: 95, credits: 2, gpaPoint: 4 },
               { subject: "Биология", score: 49, credits: 3, gpaPoint: 0 },
               {
                  subject: "Дене тәрбиесі",
                  score: 100,
                  credits: 1,
                  gpaPoint: 4,
               },
            ],
            system_advices: {
               average: 75.66666666666667,
               weightedGPA: 2.2646666666666664,
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

            {loading && <p>Uploading and analyzing...</p>}

            {response && (
               <div>
                  <h3>Grades</h3>
                  <ul>
                     {response.grades.map((g, i) => (
                        <li key={i}>
                           {g.subject}: {g.score} ({g.gpaPoint} GPA)
                        </li>
                     ))}
                  </ul>

                  <h3>System Advices</h3>
                  <p>Орта: {response.system_advices.average}</p>
                  <p>GPA: {response.system_advices.weightedGPA}</p>
                  <p>
                     Ең төменгі: {response.system_advices.lowest.subject} (
                     {response.system_advices.lowest.score})
                  </p>
                  <p>
                     Ең жоғары: {response.system_advices.highest.subject} (
                     {response.system_advices.highest.score})
                  </p>
                  <p>
                     50-ден төмен:{" "}
                     {response.system_advices.belowThresholdSubjects.join(", ")}
                  </p>
                  <ul>
                     {response.system_advices.suggestions.map((s, i) => (
                        <li key={i}>{s}</li>
                     ))}
                  </ul>

                  <h3>AI Advices</h3>
                  <ul>
                     {response.ai_advices.map((a, i) => (
                        <li key={i}>{a}</li>
                     ))}
                  </ul>
               </div>
            )}
         </div>
      </div>
   );
}
