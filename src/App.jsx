// src/App.jsx
import { useState, useEffect, useContext } from "react";
import Nav from "./components/Nav";
import Products from "./components/Products";
import Carrito from "./components/Carrito";
import { CartContext } from "./context/CartContext";

function App() {
  const url = "https://fakestoreapi.com/products";

  const [info, setInfo] = useState([]);

  const [sininfo, setSininfo] = useState(false);

  const {open} = useContext(CartContext)

  const [filter, setFilter] = useState({
    category: "all",
    minPrice: 0,
    maxPrice: 1000
  });

  const [filteredProducts, setFilteredProducts] = useState([]);

  const api = (url) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setInfo(data);
      });
  };

  useEffect(() => {
    api(url);
  }, []);

  useEffect(() => {
    const filteredProducts = info.filter(product => {
      return (
        product.price >= filter.minPrice &&
        (filter.category === "all" || product.category === filter.category) &&
        product.price <= filter.maxPrice
      );
    });
    setFilteredProducts(filteredProducts);
  }, [info, filter]);

  if (info.length === 0) {
    return <h1 className="carga">Cargando...</h1>
  }

  const sinProducts = () => {
    const noProductsInPriceRange = filteredProducts.length === 0;
    const noProductsInCategory = sininfo;
    const allProductsInPriceRange = filteredProducts.length === info.length;
    
    if (noProductsInPriceRange && noProductsInCategory) {
      setSininfo(true);
    } else if (allProductsInPriceRange) {
      setSininfo(false);
    }
  };

  return (
    <>
      <Nav filter={setFilter}/>
      <Products 
        info={filteredProducts}
        sinProducts={sinProducts}
        sininfo={sininfo}
      />
      <aside className={open ? `carrito-con open` : `carrito-con`}>
        <Carrito />
      </aside>
    </>
  );
}

export default App;
