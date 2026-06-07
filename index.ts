import { Temporal } from "@js-temporal/polyfill"; 
import { Student, isStudent, parseStudent } from "./models/student.model";
import { AssessmentItem, calculateGrade } from "./models/assessment.model";
import { EnrollmentStatus, describeEnrollment } from "./models/enrollment.model";
import { Course, CourseStatus, describeCourse } from "./models/course.model";
import { ApiResponse, renderResponse } from "./models/api-response.model";

function processStudent(raw: unknown) {
  if (isStudent(raw)) {
    const gpaDisplay =
      raw.gpa?.toFixed(2) ??
      "Not yet graded";

      console.log(
      `Student ${raw.name} GPA: ${gpaDisplay}`
    );

    } else {
    console.error(
      "Invalid student data received"
    );
}
}

const student: Student = {
  id: "STU-001",
  name: "Hana",
  enrollmentDate: Temporal.Now.instant()
};

//student.id = "STU-999"; checking compiler
//console.log(student.gpa.toFixed(2)); // checking compiler
console.log(student.gpa?.toFixed(2) ?? "Not yet graded");


//Test 1
processStudent({
  id: "STU-001",
  name: "Hana",
  gpa: 3.7,
  //enrollmentDate: Temporal.Now.instant() //  later for enrollment
});


//Test 2
processStudent(42);

console.log(parseStudent({ id: "STU-001", name: "Hana" }));
//parseStudent({ id: 42, name: "Test" });


const quiz: AssessmentItem = {
  id: "QUIZ-001",
  kind: "quiz",
  title: "SQL Basics",
  correctAnswers: 8,
  totalQuestions: 10
};

console.log(`Quiz grade: ${calculateGrade(quiz)}%`); // 80

const lab: AssessmentItem = {
  id: "LAB-001",
  kind: "lab",
  title: "REST API Project",
  functionalityScore: 85,
  codeQualityScore: 90
};

console.log(`Lab grade: ${calculateGrade(lab)}%`); // 87

const pending: EnrollmentStatus = {
    status: "PENDING",
    requestedAt: Temporal.Now.instant(),
    studentId: "STU-001",
    courseId: "CRS-101",
};

console.log(describeEnrollment(pending));

const webDev: CourseStatus = {
  status: "ACTIVE",
enrolledCount: 28,
startDate: Temporal.PlainDate.from("2026-09-01"),
};

console.log(describeCourse(webDev));


const studentRes: ApiResponse<Student> = {
status: "success",
data: {
id: "STU-001",
name: "Dawit Bekele",
enrollmentDate: Temporal.Now.instant(),
gpa: 3.4,
},
fetchedAt: Temporal.Now.instant(),
};
console.log(
renderResponse(studentRes, (s) => `${s.name} GPA: ${s.gpa ?? "N/A"}`),
);


const courseListRes: ApiResponse<Course[]> = {
status: "success",
data: [
{
id: "CRS-101",
title: "Web Development Fundamentals",
capacity: 30,
startDate: Temporal.PlainDate.from("2026-09-01"),
},
],
fetchedAt: Temporal.Now.instant(),
};

console.log(
renderResponse(courseListRes, (courses) =>
courses.map((c) => c.title).join(", "),
),
);

// 1. Record the exact moment an enrollment is approved (UTC)
const approvedAt = Temporal.Now.instant();
console.log(`Approved at (UTC): ${approvedAt}`);

// 2. Display in local timezone

const addisTime = approvedAt.toZonedDateTimeISO("Africa/Addis_Ababa");
const londonTime = approvedAt.toZonedDateTimeISO("Europe/London");
console.log(`Addis: ${addisTime.toPlainTime()}`);
console.log(`London: ${londonTime.toPlainTime()}`);

// 3. Course start date (date only, no time)
const courseStart = Temporal.PlainDate.from("2026-09-01");
const today = Temporal.Now.plainDateISO();
const daysUntilStart = today.until(courseStart).total({ unit: "days" });
console.log(`${Math.floor(daysUntilStart)} days until course starts`);


// 4. Assignment deadline duration
const deadline = Temporal.PlainDate.from("2026-12-15");
const remaining = today.until(deadline);
console.log(
`${remaining.total({ unit: "days" })} days until assignment is due`,
);






