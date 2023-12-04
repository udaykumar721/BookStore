const readline = require("readline-sync");

let books = [
    {
        name:"Believe In You",
        price:199,
        status:"available",
        quantity:5
    },
    {
        name:"Run Machine",
        price:599,
        status:"available",
        quantity:7
    },
    {
        name:"Peace Of Mind",
        price:299,
        status:"available",
        quantity:8
    }]

function displayBooks() {
    let id = 1
    console.log(`Available Books:
+----+--------------------+-------+----------+
| ID |        Name        | Price | Quantity |
+----+--------------------+-------+----------+`);
    books.forEach(ele => {
        console.log(`| ${id}  |        ${ele.name}       |  $${ele.price}  |     ${ele.quantity}    |`);
        id++
    });
    console.log(`+----+--------------------+-------+----------+`);
}

let cart = []
let total = 0

function addBook(id) {
    let name = books[id-1].name
    let price = books[id-1].price
    books[id-1].quantity-=1
    total += price
    cart.push({name:name,price:price,quantity:1,total:total})
}

function showCart() {
    if (total==0) {
        console.log("Your Cart is Empty");
    } else {
        console.log(cart);
    }
}

let choice = 0
while (choice!=4) {
    choice = readline.questionInt("1.Display All Books\n2.Add Books to Cart\n3.Show Cart\n4.Exit\n\nEnter The Above Option You Want:")
    switch (choice) {
        case 1:
            displayBooks()
            break;
        case 2:
            let id = readline.questionInt("Enter Book ID to Add to Cart: ")
            addBook(id)
            break;
        case 3:
            showCart()
            break;
        case 4:
            console.log("Thank You For Visiting!!\n");
            choice=4
            break;
        default:
            console.log("Invaild Input! Enter Vaild Input\n");
            break;
    }
}