var userSqlMap = {
    getByEmail: 'select * from user where email=?',
    getRegister: 'INSERT INTO user(email,password,create_time) VALUES(?,?,?)',
    getLogin: 'SELECT * FROM user WHERE username=? AND password=?',
    userList: 'SELECT * FROM user',
    addUser: 'INSERT INTO user(username,email,password,role,status,create_time) VALUES(?,?,?,?,?,?)',
    oldUser: 'SELECT * FROM user WHERE id=?',
    newUser: 'UPDATE user SET username=?,email=?,role=?,status=? WHERE id=?',
    deleteUser: 'DELETE FROM user WHERE id=?',
    passwordUser: 'UPDATE user SET password=? WHERE username=?'
};

module.exports = userSqlMap;


// 将语句分离出去的好处，以后关于用户模块的sql语句相关配置，都可以在这里面去找即可

// 自此，整个项目自始自终体现了js模块化编程的特点
