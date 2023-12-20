'use client';

  import { useState } from "react"
  import axios from "axios";


  export default function home() {
    const http = axios.create({baseURL:"http://localhost:5000"})

    const [student, setStudent] = useState({  
    credits: "low",
    courses: false,
    succeededAI:false,
  });

  const [response, setResponse] = useState("?")
  
console.log(student)
function handleChange(event) {
  const {name, value, checked, type} = event.target;
  setStudent(prev => ({...prev, [name]: type == "checkbox" ? checked : value}))
}


    const handleSubmit = async (e) => {
      e.preventDefault();
      const res = await http.post("/test", {
      credits_completed: student.credits,
      courses_have_requirements: student.courses,
      succeeded_AI:student.succeededAI
      });
    setResponse(res.data.value ? "سيتخرج" : "لن يتخرج")
    };
  
      return (
          <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                 {response}
              </h2>
            </div>
    
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="credits" className="block text-sm font-medium leading-6 text-gray-900">
                  الساعات المكتسبة
                  </label>

                  <select
                  id="credits"
                  name="credits"
                  value={student.credits}
                  onChange={(e) => handleChange(e)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm outline-none sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option value="low">منخفضة</option>
                  <option value="high">عالية</option>
                </select>
                </div>
    
                <div>
                  <div className="flex gap-x-5">
                    <label htmlFor="courses" className="block text-sm font-medium leading-6 text-gray-900">
                   لديك مواد لها متطلبات ؟
                    </label>
                    <input
                      id="courses"
                      name="courses"
                      type="checkbox"
                      value={student.courses}
                      onChange={(e) => handleChange(e)}
                      
                    />
                  </div>
                </div>


                <div>
                  <div className="flex gap-x-5">
                    <label htmlFor="succeededAI" className="block text-sm font-medium leading-6 text-gray-900">
                   نجحت بمقرر نظم ذكية ؟
                    </label>

                    <input
                      id="succeededAI"
                      name="succeededAI"
                      type="checkbox"
                      value={student.succeededAI}
                      onChange={(e) => handleChange(e)}
                      
                    />
                  </div>
                </div>
    
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    توقع تخرج الطالب هذا الفصل
                  </button>
                </div>
              </form>
    
            </div>
          </div>
      )
    }  
  