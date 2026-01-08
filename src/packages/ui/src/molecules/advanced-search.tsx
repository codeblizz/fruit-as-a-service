// "use client";

// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   MagnifyingGlassIcon,
//   XMarkIcon,
//   MicrophoneIcon,
//   FunnelIcon,
//   SparklesIcon
// } from '@heroicons/react/24/outline';
// import { cn } from '@/packages/helpers/src/utils';
// import { Button } from '../atoms/button';

// interface SearchFilter {
//   id: string;
//   name: string;
//   type: 'select' | 'range' | 'toggle' | 'multi-select';
//   options?: Array<{ value: string; label: string; }>;
//   min?: number;
//   max?: number;
//   step?: number;
//   value?: any;
// }

// interface SearchSuggestion {
//   id: string;
//   text: string;
//   type: 'query' | 'category' | 'product';
//   icon?: string;
//   count?: number;
// }

// interface AdvancedSearchProps {
//   placeholder?: string;
//   value?: string;
//   onChange?: (value: string) => void;
//   onSearch?: (query: string, filters: Record<string, any>) => void;
//   filters?: SearchFilter[];
//   suggestions?: SearchSuggestion[];
//   showVoiceSearch?: boolean;
//   showAiSuggestions?: boolean;
//   debounceMs?: number;
//   className?: string;
// }

// export function AdvancedSearch({
//   placeholder = "Search for fresh fruits...",
//   value = "",
//   onChange,
//   onSearch,
//   filters = [],
//   suggestions = [],
//   showVoiceSearch = true,
//   showAiSuggestions = true,
//   debounceMs = 300,
//   className,
// }: AdvancedSearchProps) {
//   const [query, setQuery] = useState(value);
//   const [isOpen, setIsOpen] = useState(false);
//   const [showFilters, setShowFilters] = useState(false);
//   const [isListening, setIsListening] = useState(false);
//   const [filterValues, setFilterValues] = useState<Record<string, any>>({});
//   const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);

//   const inputRef = useRef<HTMLInputElement>(null);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const recognition = useRef<SpeechRecognition | null>(null);
//   const debounceTimer = useRef<NodeJS.Timeout>();

//   // Initialize speech recognition
//   useEffect(() => {
//     if (showVoiceSearch && typeof window !== 'undefined' && 'SpeechRecognition' in window) {
//       recognition.current = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
//       recognition.current.continuous = false;
//       recognition.current.interimResults = false;
//       recognition.current.lang = 'en-US';

//       recognition.current.onstart = () => setIsListening(true);
//       recognition.current.onend = () => setIsListening(false);
//       recognition.current.onerror = () => setIsListening(false);

//       recognition.current.onresult = (event) => {
//         const transcript = event.results[0][0].transcript;
//         handleQueryChange(transcript);
//       };
//     }
//   }, [showVoiceSearch]);

//   // Debounced search
//   const debouncedSearch = useCallback((searchQuery: string) => {
//     if (debounceTimer.current) {
//       clearTimeout(debounceTimer.current);
//     }

//     debounceTimer.current = setTimeout(() => {
//       onChange?.(searchQuery);
//       onSearch?.(searchQuery, filterValues);
//     }, debounceMs);
//   }, [onChange, onSearch, filterValues, debounceMs]);

//   const handleQueryChange = (newQuery: string) => {
//     setQuery(newQuery);
//     setIsOpen(newQuery.length > 0 || Object.keys(filterValues).some(key => filterValues[key]));
//     debouncedSearch(newQuery);
//   };

//   const handleFilterChange = (filterId: string, newValue: any) => {
//     const newFilterValues = { ...filterValues, [filterId]: newValue };
//     setFilterValues(newFilterValues);
//     onSearch?.(query, newFilterValues);
//   };

//   const startVoiceSearch = () => {
//     if (recognition.current) {
//       recognition.current.start();
//     }
//   };

//   const handleSuggestionClick = (suggestion: SearchSuggestion) => {
//     handleQueryChange(suggestion.text);
//     setIsOpen(false);
//     setActiveSuggestionIndex(-1);
//     inputRef.current?.focus();
//   };

//   const handleKeyDown = (e: React.KeyboardEvent) => {
//     if (!isOpen) return;

//     switch (e.key) {
//       case 'ArrowDown':
//         e.preventDefault();
//         setActiveSuggestionIndex(prev =>
//           prev < suggestions.length - 1 ? prev + 1 : 0
//         );
//         break;
//       case 'ArrowUp':
//         e.preventDefault();
//         setActiveSuggestionIndex(prev =>
//           prev > 0 ? prev - 1 : suggestions.length - 1
//         );
//         break;
//       case 'Enter':
//         e.preventDefault();
//         if (activeSuggestionIndex >= 0) {
//           handleSuggestionClick(suggestions[activeSuggestionIndex]);
//         } else {
//           onSearch?.(query, filterValues);
//           setIsOpen(false);
//         }
//         break;
//       case 'Escape':
//         setIsOpen(false);
//         setActiveSuggestionIndex(-1);
//         break;
//     }
//   };

//   const clearSearch = () => {
//     handleQueryChange("");
//     setFilterValues({});
//     setIsOpen(false);
//     inputRef.current?.focus();
//   };

//   // Click outside handler
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
//         setIsOpen(false);
//         setActiveSuggestionIndex(-1);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const hasActiveFilters = Object.keys(filterValues).some(key => filterValues[key]);
//   const filteredSuggestions = suggestions.filter(suggestion =>
//     suggestion.text.toLowerCase().includes(query.toLowerCase())
//   );

//   return (
//     <div ref={containerRef} className={cn("relative w-full max-w-2xl mx-auto", className)}>
//       {/* Main Search Input */}
//       <div className={cn(
//         "relative flex items-center bg-ghost-apple border rounded-xl shadow-sm transition-all duration-200",
//         isOpen ? "border-primary shadow-md" : "border-border",
//         "focus-within:border-primary focus-within:shadow-md"
//       )}>
//         <MagnifyingGlassIcon className="w-5 h-5 text-muted/50 ml-4" />

//         <input
//           ref={inputRef}
//           type="text"
//           value={query}
//           onChange={(e) => handleQueryChange(e.target.value)}
//           onFocus={() => setIsOpen(true)}
//           onKeyDown={handleKeyDown}
//           placeholder={placeholder}
//           className="flex-1 px-4 py-3 bg-transparent border-none outline-none text-base placeholder:text-muted/50"
//         />

//         <div className="flex items-center gap-1 pr-2">
//           {/* Clear Button */}
//           {(query || hasActiveFilters) && (
//             <Button
//               size="icon"
//               variant="ghost"
//               onClick={clearSearch}
//               className="h-8 w-8 hover:bg-muted"
//             >
//               <XMarkIcon className="w-4 h-4" />
//             </Button>
//           )}

//           {/* Voice Search */}
//           {showVoiceSearch && (
//             <Button
//               size="icon"
//               variant="ghost"
//               onClick={startVoiceSearch}
//               disabled={isListening}
//               className={cn(
//                 "h-8 w-8 hover:bg-muted",
//                 isListening && "text-red-500 animate-pulse"
//               )}
//             >
//               <MicrophoneIcon className="w-4 h-4" />
//             </Button>
//           )}

//           {/* Filters Toggle */}
//           {filters.length > 0 && (
//             <Button
//               size="icon"
//               variant="ghost"
//               onClick={() => setShowFilters(!showFilters)}
//               className={cn(
//                 "h-8 w-8 hover:bg-muted",
//                 (showFilters || hasActiveFilters) && "text-primary bg-muted"
//               )}
//             >
//               <FunnelIcon className="w-4 h-4" />
//               {hasActiveFilters && (
//                 <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />
//               )}
//             </Button>
//           )}
//         </div>
//       </div>

//       {/* Dropdown */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: -10, scale: 0.95 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: -10, scale: 0.95 }}
//             transition={{ duration: 0.2 }}
//             className="absolute top-full left-0 right-0 mt-2 bg-ghost-apple border rounded-xl shadow-lg z-50 max-h-96 overflow-hidden"
//           >
//             {/* Suggestions */}
//             {filteredSuggestions.length > 0 && (
//               <div className="py-2">
//                 {showAiSuggestions && (
//                   <div className="flex items-center gap-2 px-4 py-2 text-sm text-muted/50 border-b">
//                     <SparklesIcon className="w-4 h-4" />
//                     Smart Suggestions
//                   </div>
//                 )}

//                 <div className="max-h-64 overflow-y-auto">
//                   {filteredSuggestions.map((suggestion, index) => (
//                     <button
//                       key={suggestion.id}
//                       onClick={() => handleSuggestionClick(suggestion)}
//                       className={cn(
//                         "w-full flex items-center gap-3 px-4 py-3 hover:bg-muted text-left transition-colors",
//                         activeSuggestionIndex === index && "bg-muted"
//                       )}
//                     >
//                       {suggestion.icon && (
//                         <span className="text-lg">{suggestion.icon}</span>
//                       )}
//                       <div className="flex-1">
//                         <div className="font-medium">{suggestion.text}</div>
//                         {suggestion.count && (
//                           <div className="text-sm text-muted/50">
//                             {suggestion.count} results
//                           </div>
//                         )}
//                       </div>
//                       {suggestion.type && (
//                         <span className={cn(
//                           "text-xs px-2 py-1 rounded-full",
//                           suggestion.type === 'query' && "bg-blue-100 text-blue-700",
//                           suggestion.type === 'category' && "bg-green-100 text-green-700",
//                           suggestion.type === 'product' && "bg-orange-100 text-orange-700"
//                         )}>
//                           {suggestion.type}
//                         </span>
//                       )}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* No Results */}
//             {query && filteredSuggestions.length === 0 && (
//               <div className="p-8 text-center text-muted/50">
//                 <MagnifyingGlassIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
//                 <p>No suggestions found for "{query}"</p>
//                 <p className="text-sm mt-1">Try a different search term</p>
//               </div>
//             )}
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Advanced Filters */}
//       <AnimatePresence>
//         {showFilters && filters.length > 0 && (
//           <motion.div
//             initial={{ opacity: 0, y: -10, scale: 0.95 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: -10, scale: 0.95 }}
//             transition={{ duration: 0.2 }}
//             className="absolute top-full left-0 right-0 mt-2 bg-ghost-apple border rounded-xl shadow-lg z-40 p-6"
//           >
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-lg font-semibold">Filters</h3>
//               <Button
//                 size="sm"
//                 variant="outline"
//                 onClick={() => setFilterValues({})}
//                 disabled={!hasActiveFilters}
//               >
//                 Clear All
//               </Button>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {filters.map((filter) => (
//                 <FilterComponent
//                   key={filter.id}
//                   filter={filter}
//                   value={filterValues[filter.id]}
//                   onChange={(value) => handleFilterChange(filter.id, value)}
//                 />
//               ))}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// // Filter Component
// interface FilterComponentProps {
//   filter: SearchFilter;
//   value: any;
//   onChange: (value: any) => void;
// }

// function FilterComponent({ filter, value, onChange }: FilterComponentProps) {
//   switch (filter.type) {
//     case 'select':
//       return (
//         <div>
//           <label className="block text-sm font-medium mb-2">{filter.name}</label>
//           <select
//             value={value || ''}
//             onChange={(e) => onChange(e.target.value)}
//             className="w-full p-2 border rounded-md bg-ghost-apple"
//           >
//             <option value="">All</option>
//             {filter.options?.map((option) => (
//               <option key={option.value} value={option.value}>
//                 {option.label}
//               </option>
//             ))}
//           </select>
//         </div>
//       );

//     case 'range':
//       return (
//         <div>
//           <label className="block text-sm font-medium mb-2">
//             {filter.name}: ${value || filter.min}
//           </label>
//           <input
//             type="range"
//             min={filter.min}
//             max={filter.max}
//             step={filter.step || 1}
//             value={value || filter.min}
//             onChange={(e) => onChange(Number(e.target.value))}
//             className="w-full"
//           />
//           <div className="flex justify-between text-xs text-muted/50 mt-1">
//             <span>${filter.min}</span>
//             <span>${filter.max}</span>
//           </div>
//         </div>
//       );

//     case 'toggle':
//       return (
//         <div className="flex items-center gap-2">
//           <input
//             type="checkbox"
//             checked={value || false}
//             onChange={(e) => onChange(e.target.checked)}
//             className="rounded"
//           />
//           <label className="text-sm font-medium">{filter.name}</label>
//         </div>
//       );

//     case 'multi-select':
//       const selectedValues = value || [];
//       return (
//         <div>
//           <label className="block text-sm font-medium mb-2">{filter.name}</label>
//           <div className="space-y-2">
//             {filter.options?.map((option) => (
//               <label key={option.value} className="flex items-center gap-2">
//                 <input
//                   type="checkbox"
//                   checked={selectedValues.includes(option.value)}
//                   onChange={(e) => {
//                     if (e.target.checked) {
//                       onChange([...selectedValues, option.value]);
//                     } else {
//                       onChange(selectedValues.filter((v: string) => v !== option.value));
//                     }
//                   }}
//                   className="rounded"
//                 />
//                 <span className="text-sm">{option.label}</span>
//               </label>
//             ))}
//           </div>
//         </div>
//       );

//     default:
//       return null;
//   }
// }

// export default AdvancedSearch;
