import { useEffect, useState } from "react";

// PayPal script loading component
const PayPalScriptProvider: React.FC<{
  children: React.ReactNode;
  clientId: string;
}> = ({ children, clientId }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`;
    script.async = true;
    script.onload = () => setLoaded(true);
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [clientId]);

  if (!loaded) {
    return <div>Loading PayPal...</div>;
  }

  return <>{children}</>;
};

export default PayPalScriptProvider;