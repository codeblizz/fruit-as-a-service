import React from "react";
import { ShoppingCart } from "lucide-react";
import Section from "../../atoms/section";
import { useSearchParams } from "next/navigation";

function FruitHeader() {
  const searchParams = useSearchParams();
  const selectSearchParam = searchParams.get("selected");
  return (
    <Section className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-gradient-to-br from-peach via-quaternary to-peach/70 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-blackcurrant capitalize">{`${selectSearchParam ?? "Fruit"} Inventories`}</h2>
          <p
            className="mt-2 max-w-md text-blackcurrant"
            style={{ color: "#333333" }}
          >
            Manage your seasonal stock levels and distributor logistics from one
            central hub.
          </p>
        </div>
        <ShoppingCart className="absolute right-[-20px] bottom-[-20px] w-48 h-48 opacity-10 rotate-12" />
      </div>
    </Section>
  );
}

export default FruitHeader;
