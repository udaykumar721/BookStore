const readline = require("readline-sync");

let bookStore =[
    {
        id:721,
        name:"Book1",
        price:299,
        status:"available",
        quantity:9
    },
    {
        id:722,
        name:"Book2",
        price:399,
        status:"available",
        quantity:7
    },
    {
        id:723,
        name:"Book3",
        price:799,
        status:"available",
        quantity:5
    }
]
let unAvailableBooks =[]
function displayBooks(){
    if (unAvailableBooks.length){
        console.log(`\nUnavailable Books:
+------+--------------------+-------+----------+------------+
| ID   |        Name        | Price | Quantity |   Status   |
+------+--------------------+-------+----------+------------+`);
bookStore.forEach(ele => {
    if(ele.status == "unavailable"){
        console.log(`| ${ele.id}  |        ${ele.name}       |  $${ele.price}  |     ${ele.quantity}    |  ${ele.status}`);
    }
    
});
console.log(`+------+--------------------+-------+----------+------------+`);
}
    console.log(`\nAvailable Books:
+------+--------------------+-------+----------+------------+
| ID   |        Name        | Price | Quantity |   Status   |
+------+--------------------+-------+----------+------------+`);
    bookStore.forEach(ele=>{ 
        if(ele.status == "available"){

            console.log(`| ${ele.id}  |        ${ele.name}       |  $${ele.price}  |     ${ele.quantity}    |  ${ele.status}`);
        }

    })
    console.log(`+------+--------------------+-------+----------+------------+`);
}
let cartItems = []
let totalPrice = 0
function addBookToCart(userId,userQuantity){
    let flag = true
    bookObj = bookStore.find((ele)=>ele.id==userId)
    cartObj = cartItems.find((ele)=>ele.id==userId)
    if(userQuantity > bookObj.quantity){
        console.log("Books Quantity Not Availabe");
    }
    else {
        if(cartItems.length != 0){
            cartObj = cartItems.find((ele)=>ele.id==userId)
            for(let j = 0 ; j < cartItems.length ;j++){
                if (cartItems[j].name == bookObj.name){
                    total = bookObj.price * userQuantity
                    bookObj.quantity -= userQuantity 
                    cartItems[j].quantity += userQuantity
                    flag = false
                }
             
            }
        }
        if(flag){
            let name = bookObj.name
            let price = bookObj.price
            bookObj.quantity -= userQuantity
            let total = price * userQuantity
            cartItems.push({id:bookObj.id,name:name,price:price,quantity:userQuantity,price:price,total:total})
            totalPrice += total
        }
    }
        
    if(bookObj.quantity == 0){
        bookObj.status = "unavailable"
        unAvailableBooks.push({id:bookObj.id,name:bookObj.name,price:bookObj.price,quantity:0,price:bookObj.price,status:bookObj.status})
    }
}
function removeItemFromCart(removeId){
    cartObj = cartItems.find((ele)=>ele.id==removeId)
    bookObj = bookStore.find((ele)=>ele.id==removeId)
    bookObj.quantity += cartObj.quantity
    cartItems=cartItems.filter((ele)=>ele.id!=removeId)
    if(bookObj.quantity > 0){
        bookObj.status = "available"
        unAvailableBooks = unAvailableBooks.filter((ele)=>ele.id!=removeId)
    }
}

function updateItemInCart(updateId){
    cartObj = cartItems.find((ele)=>ele.id==updateId)
    bookObj = bookStore.find((ele)=>ele.id==updateId)
    updateQuantity = readline.questionInt("Enter The No Of Books You Want To Add Cart:")
    if (cartObj.quantity<updateQuantity) {
        bookObj.quantity+=(cartObj.quantity-updateQuantity)
    } else {
        bookObj.quantity+=(cartObj.quantity-updateQuantity)
    }
    if (bookObj.quantity>0){bookObj.status="available"}
    cartObj.quantity=updateQuantity
    console.log("\nCart is Updated!!");

}


function showCartItems(){
    if(cartItems.length == 0){
        console.log("your Cart Is Empty");
    }else{
        console.log(cartItems);
        console.log("Total Price Of All The Books Are $"+totalPrice);
    }
    userUpdate = readline.questionInt("1.Remove Book From Cart\n2.Edit Book Details In Cart\n3.Enter Any Number Key To Contnue\nEnter The Above Option You Want:")
    switch (userUpdate) {
        case 1:
            removeId = readline.questionInt("Enter The Id To Remove From Cart");
            removeItemFromCart(removeId)
            break;   
        case 2:
            updateId = readline.questionInt("Enter The Id To Edit Details In Cart");
            updateItemInCart(updateId)
            break;
        default:
            break; 
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
            userId = readline.questionInt("Enter The Id Of Book You Want To Add Cart:")
            userQuantity = readline.questionInt("Enter The No Of Books You Want To Add Cart:")
            bookObj = bookStore.find((ele)=>ele.id==userId)
            addBookToCart(userId,userQuantity)
            break;
        case 3:
            showCartItems()
            break;
        case 4:
            break;    
    }
}