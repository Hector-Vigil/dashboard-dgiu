const getMajors = (studentsData, treeLevel, tableData) => {
  if (treeLevel === 1) {
    studentsData.forEach((level) => {
      tableData.push({
        name: level.name,
        faculty: level.faculty,
        matchInformation: level.matchInformation,
        total: level.total,
        id: level.id,
        facultyParent: level.facultyParent,
      });
    });
  }
  studentsData.forEach((level) => {
    getMajors(level.children, treeLevel + 1, tableData);
  });
};

export default getMajors;
