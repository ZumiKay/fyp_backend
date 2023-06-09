
const fetch = require('node-fetch')
const { v4: uuidv4 } = require('uuid')
require('dotenv').config()


export const jwtconfig = {
    secret: process.env.JWT_SECRET,
    option: {
        expiresIn:'1h'
    }
}
export const dbconfig = {
    host: process.env.DB_HOST,
    dialect:"postgres",
    user: process.env.DB_USER,
    password: "lms123",
    db: process.env.DB_NAME,
   
}
export const initalrole = async (role , book) => {
    const allrole = await role.findAll()
    const data = [
        {
            role_id: uuidv4(),
            role: "librarian",
            role_description: ''
        } ,
        {
            role_id: uuidv4(),
            role: "student",
            role_description: ""
        },
        {
            role_id: uuidv4(),
            role: "headdepartment",
            role_description: ""
        }
    ]
    if(allrole.length < 0) {
        role.bulkCreate(data).then(() => 
        {
        console.log("role created")
       
        
        }
        
        ).catch(err => console.log(err))
        // getgooglebook('Business & Economics',book)
       
    
    } else {
        data.map(i => role.findOne({where: {role: i.role}})
        .then((rl) => {
                if(rl) return
                else {
                    role.create(i)
                }
            })
        .catch(err => console.log(err))
        )
        
       

    }
   

}
export const getgooglebook = (categories , db) => {
    const subject = categories
    const url = `https://www.googleapis.com/books/v1/volumes?q=subject:${subject}&printType=books&orderBy=relevance&maxResults=10&key=${process.env.GOOGLEBOOK_APIKEY}`
    let book = []
    fetch(url)
    .then(response => response.json())
    .then(data => {
        data.items.map(i => book.push({
            ISBN: i.volumeInfo.industryIdentifiers,
            title: i.volumeInfo.title,
            description: i.volumeInfo.description,
            cover_img: i.volumeInfo.imageLinks.thumbnail,
            author: i.volumeInfo.authors,
            publisher_date: i.volumeInfo.publishedDate,
            categories: i.volumeInfo.categories,
            status:"available"
        }))
        db.bulkCreate(book).then(() => console.log("book saved")).catch(err => console.log(err))
     
    })
    .catch(err => {
        console.log(err)
    })
   
    
}




