
let myLibrary = [];

function Book(title, author, pages, read){
    this.bookTitle = title;
    this.bookAuthor = author;
    this.noOfPages = pages;
    this.read = read;
}

Book.prototype.info = function(){
    if(!this.read){
        return `The ${this.bookTitle} by ${this.bookAuthor}, ${this.noOfPages}, not read yet. `;
    }
    return `The ${this.bookTitle} by ${this.bookAuthor}, ${this.noOfPages}, has been read. `;
}

if(localStorage.getItem("mylib")!=null){
    let myLibraryStr = localStorage.getItem("mylib");
    myLibrary = JSON.parse(myLibraryStr);
}
else{
    myLibrary.push(new Book("Panchtantra","Vishnu Sharma",200,true));
    myLibrary.push(new Book("Anna Karenina","Leo Tolstoy",500,false));
    myLibrary.push(new Book("Hamlet","William Shakespeare",400,true));
    myLibrary.push(new Book("To the Lighthouse","Virginia Woolf",400,false));
    localStorage.setItem("mylib",JSON.stringify(myLibrary));
}

const dialog = document.querySelector("dialog");
const addBookBttn = document.querySelector("#add-book");
addBookBttn.addEventListener("click",function(){
    dialog.showModal();
});
const closeDialogBttn = document.querySelector("#cancel");
closeDialogBttn.addEventListener("click",function(){
    dialog.close();
});

function displayLiberary(){
    const retrivedString = localStorage.getItem("mylib");
    const retrivedArray = JSON.parse(retrivedString);
    // console.table(retrivedArray);
    const table = document.querySelector("#table-rows");
    table.innerHTML = "";
    let i=0;
    retrivedArray.forEach(element => {
        // console.table(element);
        if(element.read){
            table.innerHTML += `<tr data-index = ${i}>
            <td>${element.bookTitle}</td>
            <td>${element.bookAuthor}</td>
            <td>${element.noOfPages}</td>
            <td><button class="read-bttn true">Yes</button></td>
            <td><button class="delete-bttn">Delete</button></td>
            </tr>`
        }
        else{
            table.innerHTML += `<tr data-index = ${i}>
            <td>${element.bookTitle}</td>
            <td>${element.bookAuthor}</td>
            <td>${element.noOfPages}</td>
            <td><button class="read-bttn false">No</button></td>
            <td><button class="delete-bttn">Delete</button></td>
            </tr>`
        }
        
    i++;
    });
    const deleteBttns = document.querySelectorAll(".delete-bttn");
    deleteBttns.forEach((bttn)=>{
        bttn.addEventListener('click',deleteRow);
    });
    const readBttns = document.querySelectorAll(".read-bttn");
    readBttns.forEach((bttn)=>{
        bttn.addEventListener('click',updateRead);
    });
}
function addBookToLiberary(){
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    if(title!="" && author!="" && pages!=""){
        if(document.querySelector("#yes").checked===true){
            myLibrary.push(new Book(title,author,pages,true));
        }
        else{
            myLibrary.push(new Book(title,author,pages,false));
        }
        // console.table(myLiberary);
        localStorage.setItem("mylib",JSON.stringify(myLibrary));
        displayLiberary();
        dialog.close();
    }
    
}
function deleteRow(e){
    console.log(e.target.parentNode.parentNode.dataset.index);
    myLibrary.splice(+e.target.parentNode.parentNode.dataset.index,1);
    localStorage.setItem("mylib",JSON.stringify(myLibrary));
    displayLiberary();
}
function updateRead(e){
    // console.log(myLibrary[e.target.parentNode.parentNode.dataset.index]);
    myLibrary[e.target.parentNode.parentNode.dataset.index].read = !(myLibrary[e.target.parentNode.parentNode.dataset.index].read)
    localStorage.setItem("mylib",JSON.stringify(myLibrary));
    displayLiberary();
}


displayLiberary();

const cancelBttn = document.querySelector("#cancel");
const submitBttn = document.querySelector("#submit");
submitBttn.addEventListener("click",addBookToLiberary);

