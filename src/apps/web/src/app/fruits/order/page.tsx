"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Fade, Slide } from "react-awesome-reveal";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { 
  ShoppingCartIcon, 
  MagnifyingGlassIcon, 
  FunnelIcon,
  HeartIcon,
  StarIcon,
  PlusIcon,
  MinusIcon,
  TrashIcon
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import toast, { Toaster } from "react-hot-toast";
import Card from "@/packages/ui/src/molecules/card";
import Button from "@/packages/ui/src/atoms/button";
import Section from "@/packages/ui/src/atoms/section";
import Fragment from "@/packages/ui/src/atoms/fragment";
import Paragraph from "@/packages/ui/src/atoms/paragraph";
import AuthForm from "@/packages/ui/src/molecules/authForm";
import CONSTANT from "@/packages/helpers/src/constants";

// Enhanced fruit data with more details
const enhancedFruits = CONSTANT.fruits.map(fruit => ({
  ...fruit,
  rating: Math.floor(Math.random() * 2) + 4, // 4-5 stars
  reviews: Math.floor(Math.random() * 200) + 50,
  inStock: Math.floor(Math.random() * 100) + 10,
  organic: Math.random() > 0.5,
  localGrown: Math.random() > 0.6,
  description: `Fresh, premium quality ${fruit.name.toLowerCase()} sourced from local farms.`,
  benefits: [
    "Rich in vitamins",
    "High fiber content", 
    "Natural antioxidants",
    "Sustainably grown"
  ]
}));

const categories = [
  { name: "All", value: "all" },
  { name: "Citrus", value: "citrus" },
  { name: "Berries", value: "berries" },
  { name: "Tropical", value: "tropical" },
  { name: "Stone Fruits", value: "stone" }
];

export default function OrderPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [showCartSidebar, setShowCartSidebar] = useState(false);

  // Filter and sort fruits
  const filteredFruits = useMemo(() => {
    let filtered = enhancedFruits.filter(fruit => 
      fruit.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedCategory !== "all") {
      // Simple category filtering - in a real app, you'd have proper categorization
      filtered = filtered.filter(fruit => {
        const name = fruit.name.toLowerCase();
        switch (selectedCategory) {
          case "citrus": return name.includes("orange") || name.includes("lemon") || name.includes("lime");
          case "berries": return name.includes("berry") || name.includes("grape");
          case "tropical": return name.includes("mango") || name.includes("pineapple") || name.includes("kiwi");
          case "stone": return name.includes("peach") || name.includes("plum") || name.includes("cherry");
          default: return true;
        }
      });
    }

    // Sort fruits
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low": return a.price - b.price;
        case "price-high": return b.price - a.price;
        case "rating": return b.rating - a.rating;
        case "name": 
        default: return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, sortBy]);

  const addToCart = (fruitId: string) => {
    setCart(prev => ({
      ...prev,
      [fruitId]: (prev[fruitId] || 0) + 1,
    }));
    toast.success('Added to cart!', {
      icon: '🛒',
      duration: 2000,
    });
  };

  const removeFromCart = (fruitId: string) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[fruitId] > 1) {
        newCart[fruitId]--;
      } else {
        delete newCart[fruitId];
      }
      return newCart;
    });
  };

  const toggleFavorite = (fruitId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(fruitId)) {
        newFavorites.delete(fruitId);
        toast('Removed from favorites', { icon: '💔' });
      } else {
        newFavorites.add(fruitId);
        toast('Added to favorites!', { icon: '❤️' });
      }
      return newFavorites;
    });
  };

  const getTotalAmount = (): number => {
    return Object.entries(cart).reduce((total, [fruitId, quantity]) => {
      const fruit = enhancedFruits.find((f) => f.id === fruitId);
      return total + (fruit?.price || 0) * quantity;
    }, 0);
  };

  const getTotalItems = (): number => {
    return Object.values(cart).reduce((total, quantity) => total + quantity, 0);
  };

  const handleCheckout = () => {
    if (getTotalAmount() === 0) {
      toast.error('Your cart is empty!');
      return;
    }
    router.push('/fruits/checkout');
  };

  if (!session) {
    return (
      <main className="flex min-h-screen bg-gradient-to-br from-background via-quaternary to-background flex-col items-center justify-center p-8">
        <Fade duration={1000}>
          <div className="max-w-md w-full">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-primary mb-4">Welcome Back!</h1>
              <p className="text-secondary-text">Please sign in to start shopping for fresh fruits.</p>
            </div>
            <AuthForm className="w-full p-8 shadow-xl" />
          </div>
        </Fade>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-quaternary to-background pt-20">
      <Toaster position="top-right" />
      
      {/* Header */}
      <section className="bg-gradient-to-r from-apple-green/10 to-orange/10 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <Fade duration={1000}>
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-apple-green via-orange to-strawberry bg-clip-text text-transparent mb-4">
                Fresh Fruit Market
              </h1>
              <p className="text-xl text-secondary-text max-w-2xl mx-auto">
                Discover our premium selection of farm-fresh fruits, delivered with care
              </p>
            </div>
          </Fade>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filters */}
        <Slide direction="down">
          <div className="bg-primary-text rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary-text" />
                <input
                  type="text"
                  placeholder="Search fruits..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-quaternary rounded-xl focus:ring-2 focus:ring-apple-green focus:border-transparent outline-none transition-all"
                />
              </div>
              
              {/* Category Filter */}
              <div className="flex gap-2 flex-wrap">
                {categories.map(category => (
                  <button
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === category.value
                        ? 'bg-apple-green text-primary-text shadow-lg'
                        : 'bg-quaternary text-secondary-text hover:bg-apple-green hover:text-primary-text'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
              
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-quaternary rounded-xl focus:ring-2 focus:ring-apple-green focus:border-transparent outline-none"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </Slide>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Fruits Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredFruits.map((fruit, index) => (
                  <motion.div
                    key={fruit.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Card name="" className="h-full bg-primary-text hover:shadow-xl transition-all duration-300 overflow-hidden group">
                      <div className="relative">
                        {/* Fruit Image/Emoji */}
                        <div className="h-32 bg-gradient-to-br from-quaternary to-background flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-300">
                          {fruit.image}
                        </div>
                        
                        {/* Favorite Button */}
                        <button
                          onClick={() => toggleFavorite(fruit.id)}
                          className="absolute top-3 right-3 p-2 rounded-full bg-primary-text/80 hover:bg-primary-text transition-all"
                        >
                          {favorites.has(fruit.id) ? (
                            <HeartSolid className="w-5 h-5 text-strawberry" />
                          ) : (
                            <HeartIcon className="w-5 h-5 text-secondary-text hover:text-strawberry" />
                          )}
                        </button>
                        
                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex flex-col gap-1">
                          {fruit.organic && (
                            <span className="px-2 py-1 bg-apple-green text-primary-text text-xs font-medium rounded-full">
                              Organic
                            </span>
                          )}
                          {fruit.localGrown && (
                            <span className="px-2 py-1 bg-orange text-primary-text text-xs font-medium rounded-full">
                              Local
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-bold text-primary">{fruit.name}</h3>
                          <div className="flex items-center gap-1">
                            <StarIcon className="w-4 h-4 text-banana fill-current" />
                            <span className="text-sm text-secondary-text">
                              {fruit.rating} ({fruit.reviews})
                            </span>
                          </div>
                        </div>
                        
                        <p className="text-secondary-text text-sm mb-3">{fruit.description}</p>
                        
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <span className="text-2xl font-bold text-primary">
                              ${(fruit.price / 100).toFixed(2)}
                            </span>
                            <span className="text-secondary-text text-sm ml-1">/{fruit.unit}</span>
                          </div>
                          <span className="text-sm text-apple-green font-medium">
                            {fruit.inStock} in stock
                          </span>
                        </div>
                        
                        {/* Cart Controls */}
                        {cart[fruit.id] ? (
                          <div className="flex items-center justify-between bg-quaternary rounded-xl p-2">
                            <button
                              onClick={() => removeFromCart(fruit.id)}
                              className="w-10 h-10 rounded-lg bg-primary-text hover:bg-strawberry hover:text-primary-text transition-all flex items-center justify-center"
                            >
                              {cart[fruit.id] === 1 ? (
                                <TrashIcon className="w-4 h-4" />
                              ) : (
                                <MinusIcon className="w-4 h-4" />
                              )}
                            </button>
                            <span className="font-bold text-lg">{cart[fruit.id]}</span>
                            <button
                              onClick={() => addToCart(fruit.id)}
                              className="w-10 h-10 rounded-lg bg-apple-green text-primary-text hover:bg-kiwi transition-all flex items-center justify-center"
                            >
                              <PlusIcon className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => addToCart(fruit.id)}
                            className="w-full bg-gradient-to-r from-apple-green to-kiwi text-primary-text font-semibold py-3 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                          >
                            <ShoppingCartIcon className="w-5 h-5" />
                            Add to Cart
                          </button>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            {filteredFruits.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-primary mb-2">No fruits found</h3>
                <p className="text-secondary-text">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
          
          {/* Cart Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card name="" className="p-6 bg-primary-text">
                <div className="flex items-center gap-3 mb-6">
                  <ShoppingCartIcon className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-bold text-primary">Your Cart</h3>
                  {getTotalItems() > 0 && (
                    <span className="bg-apple-green text-primary-text text-sm font-bold px-2 py-1 rounded-full">
                      {getTotalItems()}
                    </span>
                  )}
                </div>
                
                {Object.keys(cart).length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-3">🛒</div>
                    <p className="text-secondary-text">Your cart is empty</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                      {Object.entries(cart).map(([fruitId, quantity]) => {
                        const fruit = enhancedFruits.find(f => f.id === fruitId);
                        if (!fruit) return null;
                        
                        return (
                          <div key={fruitId} className="flex items-center gap-3 p-3 border border-quaternary rounded-lg">
                            <div className="text-2xl">{fruit.image}</div>
                            <div className="flex-1">
                              <h4 className="font-medium text-primary text-sm">{fruit.name}</h4>
                              <p className="text-xs text-secondary-text">
                                ${(fruit.price / 100).toFixed(2)} × {quantity}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-primary">
                                ${((fruit.price * quantity) / 100).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    <div className="border-t border-quaternary pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-bold text-primary">Total:</span>
                        <span className="text-2xl font-bold text-primary">
                          ${(getTotalAmount() / 100).toFixed(2)}
                        </span>
                      </div>
                      
                      <button
                        onClick={handleCheckout}
                        className="w-full bg-gradient-to-r from-primary to-secondary text-primary-text font-bold py-4 rounded-xl hover:shadow-lg transition-all duration-300"
                      >
                        Proceed to Checkout
                      </button>
                    </div>
                  </>
                )}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
