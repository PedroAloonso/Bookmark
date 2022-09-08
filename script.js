var myLibrary = []

class Book {
    
    constructor(title, author, pages, isRead) {
        this._title = title;
        this._author = author;
        this._pages = pages
        this._isRead = isRead
    }

    get title() {
        return this._title
    }
    get author() {
        return this._author
    }
    get pages() {
        return this._pages
    }
    get isRead() {
        return this._isRead
    }

}

function addBookToLibrary(book){
    myLibrary.push(book)
}

// Change text and color in button read

function toggleReadColor(element, book) {
    element.classList.toggle('read', book.isRead == true)
    element.classList.toggle('not-read', book.isRead == false)
}

function toggleBookRead(e) {
    let title = e.target.parentElement.firstChild.textContent
    let bookIndex = searchInLibrary(title)
    let book = myLibrary[bookIndex]
    
    if (book.isRead == true) {
        book.isRead = false
        e.target.innerHTML = 'Not Read'
    } else {
        book.isRead = true
        e.target.innerHTML = 'Read'
    }
    
    toggleReadColor(e.target, book)
}

// Add book card in HTML

function displayBook(book) {
    cardContainer = document.querySelector('.card-container')
    
    let card = document.createElement('div',)
    let titleElement = document.createElement('h2')
    let authorElement = document.createElement('h3')
    let pagesElement = document.createElement('h4')
    let readBtnElement = document.createElement('button')
    let removeBtnElement = document.createElement('button')
    
    titleElement.id = 'title'
    authorElement.id = 'author'
    pagesElement.id = 'pages'
    
    card.classList.add('card')
    readBtnElement.classList.add('btn')
    removeBtnElement.classList.add('btn')
    removeBtnElement.classList.add('remove')

    titleElement.innerHTML = book.title
    authorElement.innerHTML = book.author
    pagesElement.innerHTML = book.pages + ' pages'
    removeBtnElement.innerHTML = 'Remove'
    
    readBtnElement.onclick = toggleBookRead
    removeBtnElement.onclick = removeBook

    if (book.isRead) {
        readBtnElement.innerText = 'Read'
        readBtnElement.classList.add('read')
    } else {
        readBtnElement.innerText = 'Not Read'
        readBtnElement.classList.add('not-read')
    }

    card.appendChild(titleElement)
    card.appendChild(authorElement)
    card.appendChild(pagesElement)
    card.appendChild(readBtnElement)
    card.appendChild(removeBtnElement)
    cardContainer.appendChild(card)
    
}

// Open and close the registration panel 

let registerSection = document.querySelector('.register-book-section')
let openBtn = document.querySelector('#newBookBtn')
let closeBtn = document.querySelector('#close')

openBtn.addEventListener('click', ()=>{
    registerSection.style.display = 'flex'
})

closeBtn.addEventListener('click', () => {
    registerSection.style.display = 'none'
})

//Take book data in registration panel and add book in myLibrary variable

let title = document.querySelector('#titleInput')
let author = document.querySelector('#authorInput')
let pages = document.querySelector('#pagesInput')
let radioYes = document.querySelector('#yes')
let radioNo = document.querySelector('#no')

let addBookBtn = document.querySelector('#addBookBtn')
addBookBtn.onclick = addBook

let counter = 0
function addBook(e){  
    
    if(searchInLibrary(title.value) == undefined) {
        let isRead = false
        
        if(radioYes.checked){
            isRead = true
        } else {
            isRead = false
        }

        if (title.value == '' && author.value == '') {
            if (counter == 0) {
                counter++
                let container =  e.target.parentNode
                let advice = document.createElement('p')
                advice.innerHTML = 'Without title and author '
                container.appendChild(advice)
                
                setTimeout(() => {
                    e.target.parentNode.lastChild.remove()
                    counter--
                }, 3000)
            }
        } else {
            book = new Book(title.value, author.value, pages.value, isRead)
            addBookToLibrary(book)
            
            displayBook(book)
            clearInput()
        }

    } else {
        if (counter == 0) {
            counter++
            let container =  e.target.parentNode
            let advice = document.createElement('p')
            advice.innerHTML = 'this book already existed'
            container.appendChild(advice)
            
            setTimeout(() => {
                e.target.parentNode.lastChild.remove()
                counter--
            }, 3000)
        }
    }
    
}

function clearInput() {
    title.value = ''
    author.value = ''
    pages.value = ''
    radioYes.checked = false
    radioNo.checked = false
}

// Remove the book in HTML and in myLibrary variable

function searchInLibrary(title) {
    for (let index = 0; index < myLibrary.length; index++) {
        let element = myLibrary[index].title;
        if(title == element){
            return index
        }
    }
}

function removeBook(e) {
    e.target.parentElement.remove()
    removeInLibrary(e)
}

function removeInLibrary(e) {
    let title = e.target.parentElement.firstChild.textContent
    let bookIndex = searchInLibrary(title)

    if (bookIndex >= 0) {
        myLibrary.splice(bookIndex, 1)
    }
}

