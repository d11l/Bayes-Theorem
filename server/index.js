const express = require('express');
const fs = require('fs');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors())

// Load - JSON file
const dataset = JSON.parse(fs.readFileSync('data.json'));


function calcProbability(data, total, feature, value, graduate) {
const count = data.filter(student => student[feature] === value && student.graduate === graduate).length / total ;
return count ;
}


function main(student) {

  const totalStudents   = dataset.students.length;// 10
  const graduateProb    = dataset.students.filter(student => student.graduate).length;// 3
  const nonGraduateProb = dataset.students.filter(student => !student.graduate).length;// 7 
  

  let graduate = (graduateProb / totalStudents); // 3 / 10
  graduate *= calcProbability(dataset.students, graduateProb, "credits_completed", student.credits_completed, true);// 3/3
  graduate *= calcProbability(dataset.students, graduateProb, "courses_have_requirements", student.courses_have_requirements, true);// 1/3
  graduate *= calcProbability(dataset.students, graduateProb, "succeeded_AI", student.succeeded_AI, true);
  
  let notGraduate = (nonGraduateProb / totalStudents);// 7 / 10
  notGraduate *= calcProbability(dataset.students, nonGraduateProb, "credits_completed", student.credits_completed, false);
  notGraduate *= calcProbability(dataset.students, nonGraduateProb, "courses_have_requirements", student.courses_have_requirements, false);
  notGraduate *= calcProbability(dataset.students, nonGraduateProb, "succeeded_AI", student.succeeded_AI, false);

  console.log("Graduate = "+graduate)
  console.log("Not Graduate = "+notGraduate+"\n")


  return graduate >= notGraduate;
}



app.post('/test',(req, res) => {
const {credits_completed, courses_have_requirements, succeeded_AI} =req.body
console.log(req.body)
const willGraduate = main({
  credits_completed:credits_completed,
  courses_have_requirements:courses_have_requirements,
  succeeded_AI :succeeded_AI
});
 res.send({value: willGraduate})
})

const PORT = process.env.PORT || 5000 ;
app.listen(PORT, () => console.log('listening on port', PORT));