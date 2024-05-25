const aCourse = {
  code: "WDD131",
  name: "Dynamic Web Fundamentals",
  sections: [
    {
      sectionNum: 1,
      roomNum: "STC 353",
      enrolled: 26,
      days: "TTh",
      instructor: "Bro T",
    },
    {
      sectionNum: 2,
      roomNum: "STC 347",
      enrolled: 28,
      days: "TTh",
      instructor: "Sis A",
    },
  ],
  enrollStudent: function (sectionNumber) {
    const sectionIdx = this.sections.findIndex(
      (sec) => sec.sectionNum == sectionNumber
    );
    if (sectionIdx >= 0) {
      this.sections[sectionIdx].enrolled++;
      renderSections(this.sections);
    }
  },
  dropStudent: function (sectionNumber) {
    const sectionIdx = this.sections.findIndex(
      (sec) => sec.sectionNum == sectionNumber
    );
    if (sectionIdx >= 0) {
      this.sections[sectionIdx].enrolled--;
      renderSections(this.sections);
    }
  },
  changeEnrollment: function (sectionNumber, enroll = true) {
    const sectionIdx = this.sections.findIndex(
      (sec) => sec.sectionNum == sectionNumber
    );
    if (sectionIdx >= 0) {
      if (enroll) {
        this.sections[sectionIdx].enrolled++;
      } else {
        this.sections[sectionIdx].enrolled--;
      }
      renderSections(this.sections);
    }
  },
};

const renderCourseInfo = (course) => {
  const courseName = document.querySelector("#courseName");
  const courseCode = document.querySelector("#courseCode");
  courseName.textContent = course.name;
  courseCode.textContent = course.code;
};

function renderSections(sections) {
  const sectionContent = sections.map(
    (section) =>
      `<tr><td>${section.sectionNum}</td><td>${section.roomNum}</td><td>${section.enrolled}</td><td>${section.days}</td></tr>`
  );
  console.log({ sectionContent });
  document.querySelector("#sections").innerHTML = sectionContent.join("");
}

/*
document.querySelector("#enrollStudent").addEventListener("click", () => {
  const sectionNumber = document.querySelector("#sectionNumber").value;
  aCourse.enrollStudent(sectionNumber);
});
document.querySelector("#dropStudent").addEventListener("click", () => {
  const sectionNumber = document.querySelector("#sectionNumber").value;
  aCourse.dropStudent(sectionNumber);
});
*/

document.querySelector("#enrollStudent").addEventListener("click", () => {
  const sectionNumber = document.querySelector("#sectionNumber").value;
  aCourse.changeEnrollment(sectionNumber);
});
document.querySelector("#dropStudent").addEventListener("click", () => {
  const sectionNumber = document.querySelector("#sectionNumber").value;
  aCourse.changeEnrollment(sectionNumber, false);
});

renderCourseInfo(aCourse);
renderSections(aCourse.sections);
