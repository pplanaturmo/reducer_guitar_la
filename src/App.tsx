import { useEffect, useReducer } from "react";
import Guitar from "./Components/Guitar";
import Header from "./Components/Header";
import { useCart } from "./hooks/useCart";
import { cartReducer, initialState } from "./reducers/cartReducer";

function App() {
  const {
   
    emptyCart,

  } = useCart();

  const [state, dispatch] = useReducer(cartReducer, initialState);

  
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <>
      <Header
        cart={state.cart}
        emptyCart={emptyCart}
        dispatch={dispatch}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {state.data.map((guitar) => {
            return (
              <Guitar key={guitar.id} guitar={guitar} dispatch={dispatch} />
            );
          })}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            Guitar LA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
