const readline = require("readline-sync");

let books = [
    {
        name:"Book1",
        price:299,
        status:"available",
        quantity:5
    },
    {
        name:"Book2",
        price:199,
        status:"available",
        quantity:7
    },
    {
        name:"Book3",
        price:399,
        status:"available",
        quantity:8
    }]

function displayBooks() {
    let id = 0
    console.log(`\nAvailable Books:
+----+--------------------+-------+----------+
| ID |        Name        | Price | Quantity |
+----+--------------------+-------+----------+`);
    books.forEach(ele => {
        id++
        if (ele.status=="available"){
        console.log(`| ${id}  |        ${ele.name}       |  $${ele.price}  |     ${ele.quantity}    |`);
        }
    });
    console.log(`+----+--------------------+-------+----------+`);
}

let cart = []
let total = 0

function addBook(id,quantity) {
    if (quantity<=books[id-1].quantity) {
        let name = books[id-1].name
        let price = books[id-1].price
        books[id-1].quantity-=quantity
        let ntotal = price*quantity
        total += ntotal
        if(books[id-1].quantity==0){
            books[id-1].status = "unavailable"
        }
        cart.push({name:name,price:price,quantity:quantity,total:ntotal})   
    } else {
        console.log("Book Out of Stock!");
        quantity=readline.question("Enter new Quantity \navailable quantity is "+books[id-1].quantity+" : ")
        addBook(id,quantity)
    }
}

function showCart() {
    if (cart.length == 0) {
        console.log("Your Cart is Empty");
    } else {
        console.log("\nCart:");
        console.log(`+---------------+-----------+-----------+-------+`);
        console.log(`|     Name      |   Price   |  Quantity | Total |`);
        console.log(`+---------------+-----------+-----------+-------+`);
        cart.forEach(ele => {
            console.log(`|     ${ele.name}     |    $${ele.price}    |     ${ele.quantity}     |  $${ele.total} |`); 
        });
        console.log(`+---------------+-----------+-----------+-------+`);
        console.log("Total Cart Price = $"+total);
    }
}

let choice = 0
while (choice!=4) {
    choice = readline.questionInt("1.Display Books\n2.Add Books to Cart\n3.Show Cart\n4.Exit\nEnter The Above Option You Want:")
    switch (choice) {
        case 1:
            displayBooks()
            break;
        case 2:
            let id = readline.questionInt("Enter Book ID to Add to Cart: ")
            let quantity = readline.questionInt("Enter Quantity to Add to Cart: ")
            addBook(id,quantity)
            break;
        case 3:
            showCart()
            break;
        case 4:
            console.log("Thank You For Visiting!!\n");
            choice=4
            break;
        default:
            console.log("Invaild Option! Enter Vaild Input\n");
            break;
    }
}