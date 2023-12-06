const readline = require("readline-sync");

let books = [
    {
        id :721,
        name:"Book1",
        price:299,
        status:"available",
        quantity:5
    },
    {
        id : 722,
        name:"Book2",
        price:199,
        status:"available",
        quantity:7
    },
    {
        id : 723,
        name:"Book3",
        price:399,
        status:"available",
        quantity:8
    }]

function displayBooks() {
    let id = 0
    console.log(`\nAvailable Books:
+------+--------------------+-------+----------+
| ID   |        Name        | Price | Quantity |
+------+--------------------+-------+----------+`);
    books.forEach(ele => {
        if (ele.status=="available"){
        console.log(`| ${ele.id}  |        ${ele.name}       |  $${ele.price}  |     ${ele.quantity}    |`);
        }
    });
    console.log(`+------+--------------------+-------+----------+`);
}

let cart = []
let total = 0

function addBook(i,quant) {
    let flag = true
    let {id,quantity} =books[i]

    if (quant<=books[i].quantity && quant!=0 ) {
        let name = books[i].name
        let price = books[i].price
        books[i].quantity -= quant
        let ntotal = price*quant
        total += ntotal
        cart.forEach(ele => {
            if (ele.name==books[i-1].name){
                ele.quantity += quant
                ele.total += ntotal
                flag = false
                console.log("Book Updated in Cart!");
            }
        })
        if (flag) {
            cart.push({id:id,name:name,price:price,quantity:quant,total:ntotal})
            console.log("Book Added to Cart!");
        }
    } else {
        if (quantity==0){
            console.log("Enter Quantity > 0!");
            quantity=readline.question("Enter new Quantity available quantity is "+books[id-1].quantity+" : ")
            addBook(id,quantity)
        }
        else if(books[id-1].quantity==0) {
            console.log("Book Out of Stock!");
        }
        else{
            quantity=readline.question("Enter new Quantity available quantity is "+books[id-1].quantity+" : ")
            addBook(id,quantity)
        }
    }
}
function removeFromCart(i){
    c = cart.find((ele)=>ele.id==i)
    b = books.find((ele)=>ele.id==i)
    total-=c.total
    b.quantity += c.quantity
    cart=cart.filter((ele)=>ele.id!=i)
    if (b.quantity>0){b.status="available"}
    console.log("Book Removed Successfully!!!");
}
function editDetailsInCart(i,q){
    let uc = cart.find((ele)=>ele.id==i)
    let ub = books.find((ele)=>ele.id==i)
    if (uc.quantity<q) {
        ub.quantity+=(uc.quantity-q)
    } else {
        ub.quantity+=(uc.quantity-q)
    }
    if (ub.quantity>0){ub.status="available"}
    uc.quantity=q
    console.log("\nCart is Updated Successfully!!");
}

function showCart() {
    if (cart.length == 0) {
        console.log("Your Cart is Empty");
    }else {
        console.log("\nCart:");
        console.log(`+----+-----------+-----------+-----------+-------+`);
        console.log(`| ID |    Name   |   Price   |  Quantity | Total |`);
        console.log(`+----+-----------+-----------+-----------+-------+`);
        cart.forEach(ele => {
            console.log(`| ${ele.id}|    ${ele.name}  |    $${ele.price}    |     ${ele.quantity}     |  $${ele.total}  |`); 
        });
        console.log(`+----+-----------+-----------+-----------+-------+`);
        console.log("Total Cart Price = $"+total);
        let ch = readline.questionInt("\nEnter\n1:Remove Book from Cart\n2:Update Book Quantity\nPress Any Number Key For Continue:");
        switch (ch) {
            case 1:
                i=readline.questionInt("Enter Book ID To Remove Book: ")
                removeFromCart(i)
                break;
            case 2:
                i=readline.questionInt("Enter Book ID To Update Book: ")
                q = readline.questionInt("Enter Quantity to Update: ")
                editDetailsInCart(i,q)        
                break;
            default:
                break;
        }
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
            id=id-books[0].id
            if (id>books.length) {
                id = readline.questionInt("Enter Vaild Book ID to Add to Cart: ")
                id=id-books[0].id
            }    
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
