import React, { useEffect } from "react";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);

const Home = ({ name, products }: any) => {
  console.log(__filename);

  const [count, setCount] = React.useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      Home {name} {count}
      <ul>
        {products.map((product: any, index: number) => (
          <li key={index}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
