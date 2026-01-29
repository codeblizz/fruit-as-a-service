"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Plus,
  Leaf,
  Heart,
  Minus,
  Search,
  Trash2,
  ArrowRight,
  ShoppingBag,
  ShoppingBasket,
  SlidersHorizontal,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import NextLink from "@/packages/ui/src/atoms/link";
import Section from "@/packages/ui/src/atoms/section";
import { useCreateStore } from "@/packages/store/src";
import { Button } from "@/packages/ui/src/atoms/button";
import useFruit from "@/packages/ui/src/molecules/hooks/useFruit";
import { FruitCategorySchema } from "@/packages/helpers/src/validations/fruits.validate";
import NextImage from "@/packages/ui/src/atoms/image";

export default function Order() {
  const router = useRouter();
  const {
    cart,
    favorites,
    addToCart,
    totalItems,
    totalAmounts,
    removeFromCart,
    toggleFavorites,
  } = useCreateStore((state) => state);
  const {
    sortBy,
    fruits,
    setSortBy,
    searchTerm,
    setSearchTerm,
    filteredFruits,
    fruitCategories,
    selectedCategory,
    setSelectedCategory,
  } = useFruit({ name: "", description: "", kinds: [""] }, FruitCategorySchema);

  console.log("fruits:", fruits);

  return (
    <main className="min-h-screen pt-20">
      <Toaster position="bottom-center" />
      <Section className="min-h-screen p-6 opacity-95 bg-ghost-apple/70">
        {/* --- Header Section --- */}
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 flex flex-col items-center justify-center bg-ghost-apple rounded-lg p-3 md:items-start">
            <div className="flex items-center gap-2 text-apple-green font-bold tracking-widest uppercase text-xs">
              <Leaf size={14} className="font-extrabold" />
              <span className="font-extrabold">Direct from Nature</span>
            </div>
            <h1 className="flex flex-col md:flex-row items-center text-5xl font-black text-stone-900 tracking-tight">
              Premium <span className="text-apple-green pl-4"> Harvest.</span>
            </h1>
          </div>

          {/* Floating Stats */}
          <div className="hidden md:flex gap-8 bg-ghost-apple rounded-lg border-l border-stone-200 p-3">
            <div>
              <p className="text-stone-400 text-xs font-bold uppercase">
                Items
              </p>
              <p className="text-2xl font-black text-stone-900">{totalItems}</p>
            </div>
            <div>
              <p className="text-stone-400 text-xs font-bold uppercase">
                Subtotal
              </p>
              <p className="text-2xl font-black text-apple-green">
                ${(totalAmounts / 100).toFixed(2)}
              </p>
            </div>
          </div>
        </header>

        {/* --- Advanced Filter Bar --- */}
        <div className="sticky top-20 z-30 mb-10 backdrop-blur-xl border border-white shadow-sm rounded-3xl p-3 flex flex-col lg:flex-row items-center gap-4">
          <div className="relative w-full lg:w-96 group">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-apple-green transition-colors"
              size={18}
            />
            <input
              type="text"
              placeholder="Search the orchard..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-stone-50 border-none rounded-2xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-apple-green/20 transition-all outline-none"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2 flex-1">
            {["all", "citrus", "berries", "tropical", "stone"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2.5 rounded-2xl text-sm font-bold capitalize transition-all ${
                  selectedCategory === cat
                    ? "bg-stone-900 text-white shadow-xl shadow-stone-200"
                    : "hover:bg-stone-100 text-stone-500"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 border-l pl-4 border-stone-100">
            <SlidersHorizontal size={16} className="text-stone-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent font-bold text-sm text-stone-900 outline-none cursor-pointer"
            >
              <option value="name">Alpha</option>
              <option value="price-low">Budget</option>
              <option value="price-high">Luxury</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* --- Main Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredFruits.map((fruit) => (
              <motion.div
                key={fruit.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group bg-ghost-apple rounded-[2.5rem] p-4 border border-stone-100 shadow-sm hover:shadow-2xl hover:shadow-apple-green/5 transition-all duration-500"
              >
                {/* Visual Area */}
                <div className="relative h-64 bg-ghost-apple rounded-[2rem] overflow-hidden flex items-center justify-center transition-transform duration-500 group-hover:scale-[0.98]">
                  <NextImage
                    width={94}
                    height={94}
                    priority={true}
                    alt="fruit-image"
                    src={fruit.images[2].imageUrl}
                    className="text-sm size-full object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Floating Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {fruit.isOrganic && (
                      <span className="bg-ghost-apple/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter text-apple-green border border-apple-green/20">
                        Organic
                      </span>
                    )}
                  </div>

                  <Button
                    onClick={() => toggleFavorites(String(fruit.id))}
                    variant="ghost"
                    className="absolute top-4 right-4 p-3 rounded-2xl bg-ghost-apple/90 backdrop-blur-sm text-stone-400 hover:bg-ghost-apple/90 hover:text-strawberry transition-all active:scale-90"
                  >
                    <Heart
                      size={20}
                      fill={
                        favorites?.has?.(String(fruit.id))
                          ? "currentColor"
                          : "none"
                      }
                      className={
                        favorites?.has?.(String(fruit.id))
                          ? "text-strawberry"
                          : ""
                      }
                    />
                  </Button>
                </div>

                {/* Content Area */}
                <div className="px-4 py-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-2xl font-black text-stone-900">
                        {fruit?.commonName}
                      </h3>
                      <div className="flex items-center gap-1 mt-1">
                        <Star size={14} className="fill-banana text-banana" />
                        <span className="text-xs font-bold text-stone-400">
                          {fruit?.rating} • {fruit?.reviews} reviews
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black text-stone-900">
                        $
                        {(Number(fruit.inventory[0]?.unitPrice) / 100).toFixed(
                          2
                        )}
                      </p>
                      <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                        Per {fruit.inventory[0]?.packagingUnit}
                      </p>
                    </div>
                  </div>

                  <p className="text-stone-500 text-sm leading-relaxed mb-6 line-clamp-2">
                    {fruit.description}
                  </p>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    {cart[String(fruit.id)] ? (
                      <div className="flex-1 flex items-center justify-between bg-stone-900 rounded-2xl p-1 shadow-xl shadow-stone-200">
                        <Button
                          onClick={() => removeFromCart(String(fruit.id))}
                          className="p-3 text-white hover:bg-ghost-apple/10 rounded-xl transition-colors"
                        >
                          {cart[String(fruit.id)] === 1 ? (
                            <Trash2 size={18} />
                          ) : (
                            <Minus size={18} />
                          )}
                        </Button>
                        <span className="text-white font-black text-lg">
                          {cart[String(fruit.id)]}
                        </span>
                        <Button
                          onClick={() => addToCart(String(fruit.id))}
                          className="p-3 text-white hover:bg-ghost-apple/10 rounded-xl transition-colors"
                        >
                          <Plus size={18} />
                        </Button>
                      </div>
                    ) : (
                      <>
                        <Button
                          onClick={() => addToCart(String(fruit.id))}
                          className="flex-1 bg-apple-green hover:bg-stone-900 text-white font-bold py-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                        >
                          <ShoppingBasket
                            size={20}
                            className="group-hover/btn:rotate-12 transition-transform"
                          />
                          Add to Cart
                        </Button>
                        <Button
                          variant="link"
                          className="flex-1 bg-apple-green hover:bg-stone-900 text-white font-bold py-4 rounded-2xl transition-all duration-300 flex items-center justify-center hover:no-underline gap-2 group/btn"
                        >
                          <NextLink
                            href={`/fruits/checkout/${fruit.id}?amount=${fruit.inventory[0]?.unitPrice}`}
                            className="flex items-center justify-center gap-2"
                          >
                            <ShoppingBag
                              size={20}
                              className="group-hover/btn:rotate-12 transition-transform"
                            />
                            Checkout
                          </NextLink>
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </Section>

      {/* --- Floating Bottom Checkout (Mobile Optimized) --- */}
      {totalItems > 0 && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md"
        >
          <div className="bg-stone-900/90 backdrop-blur-2xl rounded-3xl p-4 shadow-2xl flex items-center justify-between border border-white/10">
            <div className="flex items-center gap-4 ml-2">
              <div className="relative">
                <ShoppingBasket className="text-apple-green" size={28} />
                <span className="absolute -top-2 -right-2 bg-strawberry text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-stone-900">
                  {totalItems}
                </span>
              </div>
              <div>
                <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest">
                  Total
                </p>
                <p className="text-white font-black text-xl">
                  ${(totalAmounts / 100).toFixed(2)}
                </p>
              </div>
            </div>
            <button
              onClick={() => router.push("/fruits/checkout")}
              className="bg-apple-green hover:bg-ghost-apple text-stone-900 px-6 py-3 rounded-2xl font-black flex items-center gap-2 transition-all active:scale-95"
            >
              Checkout <ArrowRight size={18} />
            </button>
          </div>
        </motion.div>
      )}
    </main>
  );
}
