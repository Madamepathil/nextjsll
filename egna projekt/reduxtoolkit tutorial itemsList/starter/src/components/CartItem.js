import React from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../features/cart/cartSlice";
import { ChevronDown, ChevronUp } from "../icons";

export const CartItem = ({ id, img, title, price, amount }) => {
  const dispatch = useDispatch();
  console.log(amount);
  return (
    <article className="cart-item">
      <img src={img} alt={title} />
      <div>
        <h4>{title}</h4>
        <h4 className="item-price">$ {price}</h4>
        <button
          className="remove-btn"
          onClick={() => dispatch(cartActions.removeItem(id))}
        >
          remove
        </button>
      </div>
      <div>
        <button
          onClick={() =>
            dispatch(cartActions.toggleAmount({ id: id, option: "INCREASE" }))
          }
          className="amount-btn"
        >
          <ChevronUp />
        </button>
        <p className="amount">{amount}</p>
        <button
          className="amount-btn"
          onClick={() => {
            if (amount == 1) {
              dispatch(cartActions.removeItem(id));
              return;
            } else if (amount > 1) {
              dispatch(
                cartActions.toggleAmount({ id: id, option: "DECREASE" })
              );
            }
          }}
        >
          <ChevronDown />
        </button>
      </div>
    </article>
  );
};
