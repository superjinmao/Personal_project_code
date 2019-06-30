var navSqlMap = {
    navList: 'SELECT * FROM nav',
    oldNav: 'SELECT * FROM nav WHERE id=?',
    newNav: 'UPDATE nav SET nav_name=?,nav_address=?,status=? WHERE id=?',
    addNav: 'INSERT INTO nav(nav_name,nav_address,status) VALUES(?,?,?)',
    deleteNav: 'DELETE FROM nav WHERE id=?'
};

module.exports = navSqlMap;
