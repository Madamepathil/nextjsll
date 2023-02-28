import { useDispatch, useSelector } from "react-redux";
import CartContainer from "./components/CartContainer";
import { Navbar } from "./components/Navbar";
import { cartActions } from "./features/cart/cartSlice";
import { useEffect } from "react";
import Modal from "./components/Modal";
import { getCartItems } from "./features/cart/cartSlice";
function App() {
  const cartItems = useSelector((store) => store.cart.cartItems);
  const modal = useSelector((store) => store.modal.isOpen);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(cartActions.calculateTotals());
  }, [cartItems]);

  useEffect(() => {
    dispatch(getCartItems());
  }, []);

  return (
    <main>
      {modal && <Modal />}
      <Navbar />
      <CartContainer />
    </main>
  );
}
export default App;
