var categorySqlMap = {
    categoryList: 'SELECT * FROM category',
    oldCategory: 'SELECT * FROM category WHERE id=?',
    newCategory: 'UPDATE category SET category_name=?,sort=?,description=?,icon=?,status=? WHERE id=?',
    addCategory: 'INSERT INTO category(category_name,sort,description,icon,status) VALUES(?,?,?,?,?)',
    deleteCategory: 'DELETE FROM category WHERE id=?'
};

module.exports = categorySqlMap;
