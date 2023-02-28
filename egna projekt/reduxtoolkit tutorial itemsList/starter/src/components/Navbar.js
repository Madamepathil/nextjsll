import { useSelector } from "react-redux";
import React from "react";
import { CartIcon } from "../icons";

export const Navbar = () => {
  const amount = useSelector((store) => store.cart.amount);
  const isLoading = useSelector((store) => store.cart.isLoading);
  const hasError = useSelector((store) => store.cart.hasError);
  console.log(isLoading);
  console.log(amount);
  return (
    <nav>
      <div className="nav-center">
        <h3>redux toolkit</h3>

        <div className="api-data">
          {isLoading && <p>Loading data....</p>}
          {hasError && !isLoading && <p>{hasError}</p>}
        </div>
        <div className="nav-container">
          <CartIcon />
          <div className="amount-container">
            <p className="total-amount">{amount}</p>
          </div>
        </div>
      </div>
    </nav>
  );
};
