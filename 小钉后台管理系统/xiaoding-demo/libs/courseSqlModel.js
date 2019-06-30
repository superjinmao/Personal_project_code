let courseSqlModel = {
    courseList: 'SELECT * FROM course',
    oldCourse: 'SELECT * FROM course WHERE id=?',
    newCourse: 'UPDATE course SET courseName=?,courseAddress=?,category=?,class=?,status=? WHERE id=?',
    addCourse: 'INSERT INTO course(courseName,courseAddress,category,class,status) VALUES(?,?,?,?,?)',
    deleteCourse: 'DELETE FROM course WHERE id=?'
};

module.exports = courseSqlModel;
