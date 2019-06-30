// 引入数据库及数据库命令
var pool = require('../libs/mysql');
var courseSqlMap = require('../libs/courseSqlModel');

let courseModel = {
    courseList: function (callback) {
        pool.query(courseSqlMap.courseList,function (error,result) {
            if (error) throw  error;
            callback && callback(result)
        })
    },
    // 旧数据回显
    oldCourse: function (oldCourseInfo,callback) {
        pool.query(courseSqlMap.oldCourse,oldCourseInfo.id,function (error,result) {
            if (error) throw  error;
            callback && callback(result)
        })
    },
    // 新数据写回
    newCourse: function (newCourseInfo,callback) {
        pool.query(courseSqlMap.newCourse,[newCourseInfo.courseName,newCourseInfo.courseAddress,newCourseInfo.courseCategory,
        newCourseInfo.courseCount,newCourseInfo.status,newCourseInfo.id],function (error,result) {
            if (error) throw error;
            callback && callback(result)
        })
    },
    // 添加课程
    addCourse: function (addCourseInfo,callback) {
        pool.query(courseSqlMap.addCourse,[addCourseInfo.courseName,addCourseInfo.courseAddress,addCourseInfo.courseCategory,
        addCourseInfo.courseCount,addCourseInfo.status],function (error,result) {
            if (error) throw error;
            callback && callback(result)
        })
    },
    // 删除课程
    deleteCourse: function (deleteCourseInfo,callback) {
        pool.query(courseSqlMap.deleteCourse,[deleteCourseInfo.id],function (error,result) {
            if (error) throw error;
            callback && callback(result)
        })
    }
};

module.exports = courseModel;
