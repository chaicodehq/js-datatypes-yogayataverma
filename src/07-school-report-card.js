export function generateReportCard(student) {
  if (!student || typeof student !== 'object') return null;
  if (typeof student.name !== 'string' || student.name === '') return null;
  if (!student.marks || typeof student.marks !== 'object') return null;
  const entries = Object.entries(student.marks);
  if (entries.length === 0) return null;
  for (const [, v] of entries) {
    if (typeof v !== 'number' || v < 0 || v > 100) return null;
  }
  const values = Object.values(student.marks);
  const totalMarks = values.reduce((s, v) => s + v, 0);
  const percentage = parseFloat((totalMarks / (entries.length * 100) * 100).toFixed(2));
  let grade;
  if (percentage >= 90) grade = "A+";
  else if (percentage >= 80) grade = "A";
  else if (percentage >= 70) grade = "B";
  else if (percentage >= 60) grade = "C";
  else if (percentage >= 40) grade = "D";
  else grade = "F";
  let highest = entries[0], lowest = entries[0];
  for (const e of entries) {
    if (e[1] > highest[1]) highest = e;
    if (e[1] < lowest[1]) lowest = e;
  }
  const passedSubjects = entries.filter(([, v]) => v >= 40).map(([k]) => k);
  const failedSubjects = entries.filter(([, v]) => v < 40).map(([k]) => k);
  return { name: student.name, totalMarks, percentage, grade, highestSubject: highest[0], lowestSubject: lowest[0], passedSubjects, failedSubjects, subjectCount: entries.length };
}
