var myLibrary = []

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages
    this.isRead = isRead
}

function addBookToLibrary(book){
    myLibrary.push(book)
}


// Display the books in myLibrary variable

function toggleReadColor(element, book) {
    element.classList.toggle('read', book.isRead == true)
    element.classList.toggle('not-read', book.isRead == false)
}

function toggleBookRead(e) {
    let title = e.target.parentElement.firstChild.textContent
    let bookIndex = searchInLibrary(title)
    let book = myLibrary[bookIndex]
    
    console.log()
    if (book.isRead == true) {
        book.isRead = false
        e.target.innerHTML = 'Not Read'
    } else {
        book.isRead = true
        e.target.innerHTML = 'Read'
    }
    
    toggleReadColor(e.target, a)
}

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

// book registration

let registerSection = document.querySelector('.register-book-section')
let openBtn = document.querySelector('#newBookBtn')
let closeBtn = document.querySelector('#close')

openBtn.addEventListener('click', ()=>{
        registerSection.style.display = 'flex'
})

closeBtn.addEventListener('click', () => {
    registerSection.style.display = 'none'
})

let addBookBtn = document.querySelector('#addBookBtn')

let title = document.querySelector('#titleInput')
let author = document.querySelector('#authorInput')
let pages = document.querySelector('#pagesInput')
let radioYes = document.querySelector('#yes')
let radioNo = document.querySelector('#no')

function clearInput() {
    title.value = ''
    author.value = ''
    pages.value = ''
    radioYes.checked = false
    radioNo.checked = false
}

function addBook(){
    let isRead = false

    if(radioYes.checked){
        isRead = true
    } else {
        isRead = false
    }
    
    book = new Book(title.value, author.value, pages.value, isRead)
    addBookToLibrary(book)

    displayBook(book)
    clearInput()
}

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


let a = new Book('Game of Thrones', 'LL.jonkin', 500, true)

displayBook(a)
addBookToLibrary(a)
addBookBtn.onclick = addBook
