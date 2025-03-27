import { useEffect, useState } from "react";
import Routes from "./routes";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadDataWithDelay = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setIsLoaded(true);
    };
    loadDataWithDelay();
  }, []);

  return isLoaded && <Routes />;
}

export default App;
