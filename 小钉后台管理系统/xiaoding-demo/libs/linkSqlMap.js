let linkSqlMap = {
    linkList: 'SELECT * FROM link',
    oldLink: 'SELECT * FROM link WHERE id=?',
    newLink: 'UPDATE link SET linkName=?,linkAddress=?,sort=?,description=? WHERE id=?',
    addLink: 'INSERT INTO link(linkName,linkAddress,sort,description) VALUES(?,?,?,?)',
    deleteLink: 'DELETE FROM link WHERE id=?'
};


module.exports = linkSqlMap;
