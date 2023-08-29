/*import React, {useState} from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import "./ShoppingCart.css"


const cartItems = [{
    id: 1,
    name: "Chaussure 1",
    price: 19.99,
    quantity: 1
}];
const ShoppingCart = () => {
    const { search } = useLocation();
    const [searchParams] = useSearchParams(search);
    const params = new URLSearchParams(search);
    const productname = params.get('param1');
    const price = params.get('param2');
    const image = params.get('param3');
    console.log(image);
    console.log("Received" + productname);
    const [quantity, setQuantity] = useState(1);

    // const price = searchParams.get("price")
    const quantity1 = searchParams.get("quantity");
    const decreaseQuantity = () => {
        if (quantity > 1) {
        setQuantity(quantity - 1);
        }
    };

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };
    console.log(price);
    const removeFromCart = (item) => {
        cartItems = cartItems.filter((cartItem) => cartItem.id !== item.id);
        };

    const calculateTotal = () => {
        let total = 0;
        total = price * quantity;
        return total.toFixed(2);
        };

    const checkout = () => {
    
    };*/

//  return (
//    <div>
//      <h2>Panier</h2>
//        <div class="mainc">
 //           <img class="imgc" src={image}></img>
//            <h3>{productname}</h3>
//            <p>Price：{price}</p>
//            <p>Number：</p>
//            <div className="quantity">
//            <button className="btn" onClick={decreaseQuantity}>-</button>
//            <input type="number" value={quantity} min="1" readOnly />
//            <button className="btn" onClick={increaseQuantity}>+</button>
//           {/* <button onClick={() => removeFromCart(item)}>Remove</button> */}
//        </div>
//            <h4>Sum：{calculateTotal()} Ether</h4>
//            <button onClick={checkout}>Payer</button>
//        </div>
//    </div>
//  );
//};

//export default ShoppingCart;