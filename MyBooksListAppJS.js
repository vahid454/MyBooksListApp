class Book
{
	constructor(title,author,isbn,price){
		this.title=title;
		this.author=author;
		this.isbn=isbn;
		this.price=price;
	}
}
class Store
{
	static getBooks()
	{
		let books;
		if(localStorage.getItem('books') === null)
		{
			books=[];
		}else{
			books=JSON.parse(localStorage.getItem('books'));
		}
		return books;
	}
	static addBook(book)
	{
		const books=Store.getBooks();
		books.push(book);
		localStorage.setItem('books',JSON.stringify(books));
	}
	static removeBook(isbn){
		const books=Store.getBooks();
		books.forEach((book,index)=>{
			if(book.isbn===isbn)
			{
				books.splice(index,1);
			}
		});
		localStorage.setItem('books',JSON.stringify(books));
	}
}
//handle the UI parts
class UI
{
static displayBooks(){

	//const StoredBooks=[{title:'Book one',author:'Vahid',isbn:'2BS8948',price:340},{title:'Book Two',author:'Firoz',isbn:'2BS4566',price:540}];

	const books=Store.getBooks();  
//	console.log(books==null);

	books.forEach((book) => UI.addBookToList(book));
	
	//we do it for total spend money later

	//const pricetag=100;

	//UI.addSpecialRow(pricetag);
}
static addSpecialRow(price)
{
const list=document.querySelector('#book-list');
	const row=document.createElement('tr');
row.innerHTML=`

<td colspan='5'>You have spend total ${price} rs in books</td>
`;

list.appendChild(row);	
}
static addBookToList(book)
{
	const list=document.querySelector('#book-list');
	const row=document.createElement('tr');
row.innerHTML=`
<td>${book.title}</td>
<td>${book.author}</td>
<td>${book.isbn}</td>
<td>${book.price}</td>
<td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
`;

list.appendChild(row);
}
static deleteBook(el)
{
if(el.classList.contains('delete')){
	el.parentElement.parentElement.remove();
	UI.showAlert("Book removed successfully",'danger');
}	
}

static showAlert(msg,className)
{
const div=document.createElement('div');
div.className=`alert alert-${className}`;
div.appendChild(document.createTextNode(msg));
const container=document.querySelector('.container');
const form=document.querySelector('#book-form');
container.insertBefore(div,form);
//Make visible for 3 sec
setTimeout(()=> document.querySelector('.alert').remove(),3000);
}
static clearFields(){
	document.querySelector('#title').value="";
	document.querySelector('#author').value="";
	document.querySelector('#isbn').value="";
	document.querySelector('#price').value="";

}
} //UI class


document.addEventListener('DOMContentLoaded',UI.displayBooks);


document.querySelector('#book-form').addEventListener('submit',(e)=>{
//to prevent actual action
	e.preventDefault();
const title=document.querySelector('#title').value;
const author=document.querySelector('#author').value;
const isbn=document.querySelector('#isbn').value;
const price=document.querySelector('#price').value;

if(title === '' ||  author === ' ' || isbn  ==='' || price ==='')
{

	UI.showAlert('Please fill in all fields','danger');
}
else
{
const book=new Book(title,author,isbn,price);
//to print at console
//console.log(book);
//to add it out UI;
UI.addBookToList(book);
//clear fields
Store.addBook(book);
UI.showAlert("Book added successfully",'success');
UI.clearFields();

}
});


//Remove a book
document.querySelector('#book-list').addEventListener('click',(e)=>{
	UI.deleteBook(e.target);
	Store.removeBook(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
});