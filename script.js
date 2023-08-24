document.addEventListener("DOMContentLoaded", function () {
    const courseForm = document.getElementById("course-form");
    const courseList = document.getElementById("courses");
    const cumulativeGPA = document.getElementById("cumulative-gpa");

    const courses = []; // Array to store courses

    courseForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const courseName = document.getElementById("course-name").value;
        const credits = parseFloat(document.getElementById("credits").value);
        const grade = document.getElementById("grade").value;

        // Perform GPA calculation here
        const gpa = calculateGPA(credits, grade);

        // Add course to the list
        courses.push({ courseName, credits, grade, gpa });

        // Display courses and calculate cumulative GPA
        displayCourses();
        calculateCumulativeGPA();
    });

    function calculateGPA(credits, grade) {
        const gradingScale = {
            'A+': 4.00,
            'A': 4.00,
            'A-': 3.67,
            'B+': 3.33,
            'B': 3.00,
            'B-': 2.67,
            'C+': 2.33,
            'C': 2.00,
            'C-': 1.67,
            'D+': 1.33,
            'D': 1.00,
            'F': 0.00
        };
    
        // Normalize the grade (remove spaces and convert to uppercase)
        const normalizedGrade = grade.trim().toUpperCase();
    
        // Get the grade points from the grading scale or default to 0
        const gradePoints = gradingScale[normalizedGrade] || 0;
    
        // Calculate GPA based on grading scale and credits
        return gradePoints * credits;
    }

    function displayCourses() {
        // Clear the course list
        courseList.innerHTML = "";

        // Display each course
        courses.forEach((course, index) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `${course.courseName} - Credits: ${course.credits}, Grade: ${course.grade}, GPA: ${course.gpa}`;
            // Create a remove button
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", () => removeCourse(index));

        // Add the remove button to the list item
        listItem.appendChild(removeButton);

            courseList.appendChild(listItem);
        });
    }
    function removeCourse(index) {
        // Remove the course from the courses array
        courses.splice(index, 1);
    
        // Update the displayed courses and cumulative GPA
        displayCourses();
        calculateCumulativeGPA();
    }
      

    function calculateCumulativeGPA() {
        if (courses.length === 0) {
            cumulativeGPA.textContent = "GPA: N/A";
            return;
        }

        // Calculate cumulative GPA
        const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
        const totalGradePoints = courses.reduce((sum, course) => sum + (course.gpa * course.credits), 0);
        const cumulative = totalGradePoints / totalCredits;

        cumulativeGPA.textContent = `GPA: ${cumulative.toFixed(2)}`;
    }
});
