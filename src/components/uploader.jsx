import React, { useState } from "react";

export default function Uploader() {
   const [file, setFile] = useState(null);
   const [response, setResponse] = useState(null);
   const [loading, setLoading] = useState(false);
   const [expanded, setExpanded] = useState(null);
   const [search, setSearch] = useState("");
   const [minGPA, setMinGPA] = useState("");
   const [maxGPA, setMaxGPA] = useState("");

   const handleFileChange = (e) => {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      if (selectedFile) handleUpload();
   };

   const handleUpload = async () => {
      setLoading(true);
      try {
         setTimeout(async () => {
            const res = await fetch("/poni.json");
            if (!res.ok) throw new Error("poni.json not found");
            const data = await res.json();
            setResponse(data);
            setLoading(false);
         }, 1000);
      } catch (error) {
         console.error("Error loading JSON:", error);
         alert("Қате: poni.json табылмады немесе дұрыс емес формат.");
         setLoading(false);
      }
   };

   const toggleExpand = (index) => {
      setExpanded(expanded === index ? null : index);
   };

   // Filtering logic
   const filteredStudents =
      response?.students?.filter((s) => {
         const nameMatch = s.name
            .toLowerCase()
            .includes(search.toLowerCase());
         const gpa = parseFloat(s.gpa);
         const min = parseFloat(minGPA) || 0;
         const max = parseFloat(maxGPA) || 4.33;
         return nameMatch && gpa >= min && gpa <= max;
      }) || [];

   return (
      <div id="uploader">
         <div className="container">
            <div className="uploader-card">
               <div className="uploader-content">
                  <h1>Қош келдіңіз, Сүнетуллаұлы Жалғас</h1>
                  <p>
                     Аттестациялық немесе семестрлік бағаңызды есептеп AI бот
                     арқылы кеңестер алыңыз!
                  </p>

                  {/* Upload button */}
                  <label htmlFor="fileUpload" className="upload-btn">
                     ⚡ Файлды жүктеу
                  </label>
                  <input
                     id="fileUpload"
                     type="file"
                     accept=".csv,.xlsx"
                     onChange={handleFileChange}
                     style={{ display: "none" }}
                  />
               </div>
            </div>

            {/* Loading */}
            {loading && <p className="loading">AI талдау жүргізілуде...</p>}

            {/* Search + Filter */}
            {response && (
               <div className="filters">
                  <input
                     type="text"
                     placeholder="Іздеу (аты бойынша)..."
                     value={search}
                     onChange={(e) => setSearch(e.target.value)}
                     className="search-input"
                  />
                  <div className="gpa-filter">
                     <input
                        type="number"
                        placeholder="Мин. GPA"
                        value={minGPA}
                        onChange={(e) => setMinGPA(e.target.value)}
                        step="0.01"
                        min="0"
                        max="4.33"
                     />
                     <input
                        type="number"
                        placeholder="Макс. GPA"
                        value={maxGPA}
                        onChange={(e) => setMaxGPA(e.target.value)}
                        step="0.01"
                        min="0"
                        max="4.33"
                     />
                  </div>
               </div>
            )}

            {/* Response display */}
            {response && (
               <div className="students-list">
                  {filteredStudents.map((student, index) => (
                     <div key={index} className="student-card">
                        <div
                           className="student-header"
                           onClick={() => toggleExpand(index)}
                        >
                           <h2>{student.name}</h2>
                           <span>GPA: {student.gpa}</span>
                           <button className="dropdown-toggle">
                              {expanded === index ? "▲" : "▼"}
                           </button>
                        </div>

                        <div
                           className={`student-content ${
                              expanded === index ? "open" : ""
                           }`}
                        >
                           <div className="grades-summary-card">
                              <h3>Бағалар және жүйе статистикасы</h3>
                              <div className="grades-container">
                                 {student.AIStatisticsWithNumbers.map(
                                    (g, i) => (
                                       <div className="grade-item" key={i}>
                                          <div className="grade-header">
                                             <span className="subject-name">
                                                {g.subject}
                                             </span>
                                          </div>
                                          <div className="grade-progress">
                                             <div
                                                className="grade-fill"
                                                style={{ "--score": g.score }}
                                                data-score={g.score}
                                             >
                                                <span className="grade-percentage">
                                                   {g.score.toFixed(2)}%
                                                </span>
                                             </div>
                                          </div>
                                       </div>
                                    )
                                 )}
                              </div>

                              <div className="system-summary">
                                 <h4>Жүйе статистикасы</h4>
                                 <ul>
                                    <li>
                                       <strong>Орташа балл:</strong>{" "}
                                       {student.system_summary.average_score.toFixed(
                                          2
                                       )}
                                    </li>
                                    <li>
                                       <strong>Жалпы кредит:</strong>{" "}
                                       {
                                          student.system_summary.total_credits
                                       }
                                    </li>
                                    <li>
                                       <strong>Жоғары пәндер:</strong>{" "}
                                       {student.system_summary.top_subjects
                                          .map((s) => s.subject)
                                          .join(", ")}
                                    </li>
                                    <li>
                                       <strong>Төмен пәндер:</strong>{" "}
                                       {student.system_summary.low_subjects
                                          .map((s) => s.subject)
                                          .join(", ")}
                                    </li>
                                 </ul>
                              </div>
                           </div>

                           <h3>AI Кеңестері</h3>
                           <div className="ai-advice-grid">
                              {student.ai_advices.map((a, i) => (
                                 <div className="ai-card" key={i}>
                                    <img
                                       src="/advise-icon.png"
                                       alt="icon"
                                       className="ai-icon"
                                    />
                                    <div className="ai-content">
                                       <h4 className="ai-title">
                                          Кеңес №{i + 1}
                                       </h4>
                                       <p className="ai-text">{a}</p>
                                    </div>
                                 </div>
                              ))}
                           </div>
                        </div>
                     </div>
                  ))}

                  {filteredStudents.length === 0 && (
                     <p>Студент табылмады 😔</p>
                  )}
               </div>
            )}
         </div>
      </div>
   );
}
