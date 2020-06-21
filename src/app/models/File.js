const db = require('../../config/db')

module.exports = {

    create(filename, path, product_id){
        const query = `
            INSERT INTO files (
                product_id,
                path,
                name
            )VALUES($1, $2, $3)
            RETURNING id    
    `    
    const values = [
        product_id,
        path,
        filename,      
    ]
    
    return db.query(query, values)
    },
}