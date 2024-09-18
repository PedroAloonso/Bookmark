// book = {title:'Titulo do livro', link:'link do livro', page:123}
let books = [
    { title: "Titulo do livro", link: "link do livro", page: 123 },
    { title: "Title of Book 2", link: "link of Book 2", page: 456 },
    { title: "Title of Book 3", link: "link of Book 3", page: 789 },
    { title: "Title of Book 4", link: "link of Book 4", page: 1011 },
];

// let editBtn = document.querySelectorAll(".editBtn");
// editBtn.addEventListener("click", (e) => {
//     console.log(e.target);
//     console.log(e.target.parentElement.parentElement);
// });

function renderBooks() {
    let bookList = document.querySelector("main");
    bookList.innerHTML = "";
    books.forEach((book, index) => { // Criar um container para botar o editIcon e o input do link
        bookList.innerHTML += `
            <section class="book-card">
                    <input type="hidden" id="bookId" value="${index++}" />

                    
                    <div class="book-title"> 
                        <img
                            src="./img/edit-icon.png"
                            alt="Editar"
                            class="editBtn"
                            onclick="toggleEdit()"
                        />

                        <h2 class="title">
                            <a href="${book.link}"
                                >${book.title}</a
                            >
                        </h2>

                        <input type="text" placeholder="Link" class="disable"/>
                    </div>

                    <div class="page-container">
                        <h3>Página:</h3>

                        <img src="./img/arrow-left-icon.png" alt="Anterior" />

                        <p class="page">${book.page}</p>

                        <img src="./img/arrow-right-icon.png" alt="Próximo" />
                    </div>
                </section>
        `;
    });
}

function toggleEdit() {
    let bookTitle = document.querySelectorAll(".title");
    let bookInput = document.querySelectorAll(".book-title input")
    bookTitle.forEach((title) => {
        let isEditable = title.getAttribute("contenteditable")
        isEditable === "true"
            ? title.setAttribute("contenteditable", "false")
            : title.setAttribute("contenteditable", "true");
    });
    bookInput.forEach((input) => {
        input.classList.toggle('disable')
    })
}

window.onload = renderBooks