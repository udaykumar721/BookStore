const readline = require("readline-sync");

let books = [
    {
        name:"Book1",
        price:299,
        status:"available",
        quantity:4
    },
    {
        name:"Book2",
        price:199,
        status:"available",
        quantity:5
    },
    {
        name:"Book3",
        price:499,
        status:"available",
        quantity:6
    }]

function displayBooks() {
    let id = 1
    console.log(`\nAvailable Books:
+----+--------------------+-------+----------+
| ID |        Name        | Price | Quantity |
+----+--------------------+-------+----------+`);
    books.forEach(ele => {
        console.log(`| ${id}  |        ${ele.name}       |  $${ele.price}  |     ${ele.quantity}    |`);
        id++
        if (ele.quantity==0) {
            ele.status="Unavailable"
        }
    });
    console.log(`+----+--------------------+-------+----------+`);
}

let cart = []
let total = 0

function addBook(id,quantity) {
    let name = books[id-1].name
    let price = books[id-1].price
    books[id-1].quantity-=quantity
    let ntotal = price*quantity
    total += ntotal
    cart.push({name:name,price:price,quantity:quantity,total:ntotal})
}

function showCart() {
    if (total==0) {
        console.log("Your Cart is Empty");
    } else {
        console.log(`+---------------+-----------+-----------+-------+`);
        console.log(`|     Name      |   Price   |  Quantity | Total |`);
        console.log(`+---------------+-----------+-----------+-------+`);
        cart.forEach(ele => {
            console.log(`|     ${ele.name}     |     ${ele.price}    |     ${ele.quantity}     |  ${ele.total}  |`); 
        });
        console.log(`+---------------+-----------+-----------+-------+`);
        console.log("Total Cart Price = "+total);
    }
}

let choice = 0
while (choice!=4) {
    choice = readline.questionInt("1.Display All Books\n2.Add Books to Cart\n3.Show Cart\n4.Exit\nEnter The Above Option You Want:")
    switch (choice) {
        case 1:
            displayBooks()
            break;
        case 2:
            let id = readline.questionInt("Enter Book ID to Add to Cart: ")
            let quantity = readline.questionInt("Enter Quantity to Add to Cart: ")
            addBook(id,quantity)
            displayBooks()
            break;
        case 3:
            showCart()
            displayBooks()
            break;
        case 4:
            console.log("Thank You For Visiting!!\n");
            choice=4
            break;
        default:
            console.log("Invaild Option! Enter Vaild Option\n");
            break;
    }
}