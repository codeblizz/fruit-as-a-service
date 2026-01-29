// "use client";

// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   UserIcon,
//   CogIcon,
//   BellIcon,
//   HeartIcon,
//   ShieldCheckIcon,
//   PaintBrushIcon,
//   LanguageIcon,
//   CurrencyDollarIcon,
//   ClockIcon,
//   ExclamationTriangleIcon
// } from '@heroicons/react/24/outline';
// import { cn } from '@/packages/helpers/src/utils';
// import { Button } from '../atoms/button';
// import { Card, CardHeader, CardTitle, CardContent } from '../molecules/card';

// interface UserPreferences {
//   // Personal Info
//   theme: 'light' | 'dark' | 'system';
//   language: string;
//   currency: string;
//   timezone: string;

//   // Dietary Preferences
//   dietaryRestrictions: string[];
//   allergies: string[];
//   favoriteCategories: string[];

//   // Shopping Preferences
//   priceRange: { min: number; max: number };
//   preferredDeliveryTime: string;
//   autoReorder: boolean;
//   organicOnly: boolean;
//   localOnly: boolean;

//   // Notifications
//   emailNotifications: {
//     orders: boolean;
//     promotions: boolean;
//     newsletters: boolean;
//     priceDrops: boolean;
//   };
//   pushNotifications: {
//     orders: boolean;
//     delivery: boolean;
//     promotions: boolean;
//     reminders: boolean;
//   };
//   smsNotifications: {
//     orders: boolean;
//     delivery: boolean;
//   };

//   // Privacy
//   shareData: boolean;
//   personalizedAds: boolean;
//   cookieConsent: boolean;
//   dataRetention: string;
// }

// interface UserPreferencesProps {
//   preferences: UserPreferences;
//   onSave: (preferences: UserPreferences) => Promise<void>;
//   loading?: boolean;
//   className?: string;
// }

// const defaultPreferences: UserPreferences = {
//   theme: 'system',
//   language: 'en',
//   currency: 'USD',
//   timezone: 'America/New_York',
//   dietaryRestrictions: [],
//   allergies: [],
//   favoriteCategories: [],
//   priceRange: { min: 0, max: 100 },
//   preferredDeliveryTime: 'morning',
//   autoReorder: false,
//   organicOnly: false,
//   localOnly: false,
//   emailNotifications: {
//     orders: true,
//     promotions: true,
//     newsletters: false,
//     priceDrops: true,
//   },
//   pushNotifications: {
//     orders: true,
//     delivery: true,
//     promotions: false,
//     reminders: true,
//   },
//   smsNotifications: {
//     orders: true,
//     delivery: true,
//   },
//   shareData: false,
//   personalizedAds: false,
//   cookieConsent: true,
//   dataRetention: '1year',
// };

// const tabs = [
//   { id: 'general', name: 'General', icon: CogIcon },
//   { id: 'dietary', name: 'Dietary', icon: HeartIcon },
//   { id: 'shopping', name: 'Shopping', icon: CurrencyDollarIcon },
//   { id: 'notifications', name: 'Notifications', icon: BellIcon },
//   { id: 'privacy', name: 'Privacy', icon: ShieldCheckIcon },
// ];

// const dietaryOptions = [
//   'Vegetarian', 'Vegan', 'Gluten-Free', 'Keto', 'Paleo', 'Low-Carb', 'Organic Only'
// ];

// const allergyOptions = [
//   'Nuts', 'Seeds', 'Citrus', 'Stone Fruits', 'Berries', 'Tropical Fruits'
// ];

// const categoryOptions = [
//   'Citrus', 'Berries', 'Tropical', 'Stone Fruits', 'Melons', 'Exotic', 'Seasonal'
// ];

// const languages = [
//   { code: 'en', name: 'English' },
//   { code: 'es', name: 'Spanish' },
//   { code: 'fr', name: 'French' },
//   { code: 'de', name: 'German' },
//   { code: 'it', name: 'Italian' },
// ];

// const currencies = [
//   { code: 'USD', name: 'US Dollar', symbol: '$' },
//   { code: 'EUR', name: 'Euro', symbol: '€' },
//   { code: 'GBP', name: 'British Pound', symbol: '£' },
//   { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
// ];

// const deliveryTimes = [
//   { value: 'morning', label: '8AM - 12PM' },
//   { value: 'afternoon', label: '12PM - 5PM' },
//   { value: 'evening', label: '5PM - 8PM' },
//   { value: 'flexible', label: 'Flexible' },
// ];

// export function UserPreferencesComponent({
//   preferences,
//   onSave,
//   loading = false,
//   className,
// }: UserPreferencesProps) {
//   const [activeTab, setActiveTab] = useState('general');
//   const [currentPreferences, setCurrentPreferences] = useState<UserPreferences>(preferences);
//   const [hasChanges, setHasChanges] = useState(false);
//   const [saving, setSaving] = useState(false);

//   useEffect(() => {
//     const changed = JSON.stringify(preferences) !== JSON.stringify(currentPreferences);
//     setHasChanges(changed);
//   }, [preferences, currentPreferences]);

//   const updatePreference = (path: string, value: any) => {
//     const keys = path.split('.');
//     const newPreferences = { ...currentPreferences };
//     let current: any = newPreferences;

//     for (let i = 0; i < keys.length - 1; i++) {
//       current = current[keys[i]];
//     }
//     current[keys[keys.length - 1]] = value;

//     setCurrentPreferences(newPreferences);
//   };

//   const handleSave = async () => {
//     setSaving(true);
//     try {
//       await onSave(currentPreferences);
//       setHasChanges(false);
//     } catch (error) {
//       console.error('Failed to save preferences:', error);
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleReset = () => {
//     setCurrentPreferences(preferences);
//     setHasChanges(false);
//   };

//   const renderGeneralTab = () => (
//     <div className="space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Theme */}
//         <div>
//           <label className="block text-sm font-medium mb-3">Theme</label>
//           <div className="space-y-2">
//             {(['light', 'dark', 'system'] as const).map((theme) => (
//               <label key={theme} className="flex items-center gap-2">
//                 <input
//                   type="radio"
//                   checked={currentPreferences.theme === theme}
//                   onChange={() => updatePreference('theme', theme)}
//                   className="w-4 h-4"
//                 />
//                 <span className="capitalize">{theme}</span>
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* Language */}
//         <div>
//           <label className="block text-sm font-medium mb-3">Language</label>
//           <select
//             value={currentPreferences.language}
//             onChange={(e) => updatePreference('language', e.target.value)}
//             className="w-full p-2 border rounded-md bg-ghost-apple"
//           >
//             {languages.map((lang) => (
//               <option key={lang.code} value={lang.code}>
//                 {lang.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Currency */}
//         <div>
//           <label className="block text-sm font-medium mb-3">Currency</label>
//           <select
//             value={currentPreferences.currency}
//             onChange={(e) => updatePreference('currency', e.target.value)}
//             className="w-full p-2 border rounded-md bg-ghost-apple"
//           >
//             {currencies.map((currency) => (
//               <option key={currency.code} value={currency.code}>
//                 {currency.symbol} {currency.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Timezone */}
//         <div>
//           <label className="block text-sm font-medium mb-3">Timezone</label>
//           <select
//             value={currentPreferences.timezone}
//             onChange={(e) => updatePreference('timezone', e.target.value)}
//             className="w-full p-2 border rounded-md bg-ghost-apple"
//           >
//             <option value="America/New_York">Eastern Time</option>
//             <option value="America/Chicago">Central Time</option>
//             <option value="America/Denver">Mountain Time</option>
//             <option value="America/Los_Angeles">Pacific Time</option>
//             <option value="Europe/London">GMT</option>
//             <option value="Europe/Paris">Central European Time</option>
//           </select>
//         </div>
//       </div>
//     </div>
//   );

//   const renderDietaryTab = () => (
//     <div className="space-y-6">
//       {/* Dietary Restrictions */}
//       <div>
//         <label className="block text-sm font-medium mb-3">Dietary Restrictions</label>
//         <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
//           {dietaryOptions.map((option) => (
//             <label key={option} className="flex items-center gap-2 p-2 border rounded hover:bg-muted">
//               <input
//                 type="checkbox"
//                 checked={currentPreferences.dietaryRestrictions.includes(option)}
//                 onChange={(e) => {
//                   const restrictions = e.target.checked
//                     ? [...currentPreferences.dietaryRestrictions, option]
//                     : currentPreferences.dietaryRestrictions.filter(r => r !== option);
//                   updatePreference('dietaryRestrictions', restrictions);
//                 }}
//               />
//               <span className="text-sm">{option}</span>
//             </label>
//           ))}
//         </div>
//       </div>

//       {/* Allergies */}
//       <div>
//         <label className="block text-sm font-medium mb-3">
//           <ExclamationTriangleIcon className="w-4 h-4 inline mr-1 text-yellow-500" />
//           Allergies
//         </label>
//         <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
//           {allergyOptions.map((allergy) => (
//             <label key={allergy} className="flex items-center gap-2 p-2 border rounded hover:bg-muted border-yellow-200">
//               <input
//                 type="checkbox"
//                 checked={currentPreferences.allergies.includes(allergy)}
//                 onChange={(e) => {
//                   const allergies = e.target.checked
//                     ? [...currentPreferences.allergies, allergy]
//                     : currentPreferences.allergies.filter(a => a !== allergy);
//                   updatePreference('allergies', allergies);
//                 }}
//               />
//               <span className="text-sm">{allergy}</span>
//             </label>
//           ))}
//         </div>
//       </div>

//       {/* Favorite Categories */}
//       <div>
//         <label className="block text-sm font-medium mb-3">Favorite Categories</label>
//         <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
//           {categoryOptions.map((category) => (
//             <label key={category} className="flex items-center gap-2 p-2 border rounded hover:bg-muted">
//               <input
//                 type="checkbox"
//                 checked={currentPreferences.favoriteCategories.includes(category)}
//                 onChange={(e) => {
//                   const categories = e.target.checked
//                     ? [...currentPreferences.favoriteCategories, category]
//                     : currentPreferences.favoriteCategories.filter(c => c !== category);
//                   updatePreference('favoriteCategories', categories);
//                 }}
//               />
//               <span className="text-sm">{category}</span>
//             </label>
//           ))}
//         </div>
//       </div>
//     </div>
//   );

//   const renderShoppingTab = () => (
//     <div className="space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Price Range */}
//         <div>
//           <label className="block text-sm font-medium mb-3">
//             Price Range: ${currentPreferences.priceRange.min} - ${currentPreferences.priceRange.max}
//           </label>
//           <div className="space-y-3">
//             <div>
//               <label className="text-xs text-muted/50">Minimum: ${currentPreferences.priceRange.min}</label>
//               <input
//                 type="range"
//                 min="0"
//                 max="200"
//                 step="5"
//                 value={currentPreferences.priceRange.min}
//                 onChange={(e) => updatePreference('priceRange.min', Number(e.target.value))}
//                 className="w-full"
//               />
//             </div>
//             <div>
//               <label className="text-xs text-muted/50">Maximum: ${currentPreferences.priceRange.max}</label>
//               <input
//                 type="range"
//                 min="10"
//                 max="500"
//                 step="10"
//                 value={currentPreferences.priceRange.max}
//                 onChange={(e) => updatePreference('priceRange.max', Number(e.target.value))}
//                 className="w-full"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Delivery Time */}
//         <div>
//           <label className="block text-sm font-medium mb-3">Preferred Delivery Time</label>
//           <div className="space-y-2">
//             {deliveryTimes.map((time) => (
//               <label key={time.value} className="flex items-center gap-2">
//                 <input
//                   type="radio"
//                   checked={currentPreferences.preferredDeliveryTime === time.value}
//                   onChange={() => updatePreference('preferredDeliveryTime', time.value)}
//                   className="w-4 h-4"
//                 />
//                 <span>{time.label}</span>
//               </label>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Toggle Options */}
//       <div className="space-y-4">
//         <label className="flex items-center gap-3 p-3 border rounded hover:bg-muted">
//           <input
//             type="checkbox"
//             checked={currentPreferences.autoReorder}
//             onChange={(e) => updatePreference('autoReorder', e.target.checked)}
//           />
//           <div>
//             <div className="font-medium">Auto-reorder favorites</div>
//             <div className="text-sm text-muted/50">Automatically reorder your favorite fruits weekly</div>
//           </div>
//         </label>

//         <label className="flex items-center gap-3 p-3 border rounded hover:bg-muted">
//           <input
//             type="checkbox"
//             checked={currentPreferences.organicOnly}
//             onChange={(e) => updatePreference('organicOnly', e.target.checked)}
//           />
//           <div>
//             <div className="font-medium">Organic only</div>
//             <div className="text-sm text-muted/50">Show only organic fruits in search results</div>
//           </div>
//         </label>

//         <label className="flex items-center gap-3 p-3 border rounded hover:bg-muted">
//           <input
//             type="checkbox"
//             checked={currentPreferences.localOnly}
//             onChange={(e) => updatePreference('localOnly', e.target.checked)}
//           />
//           <div>
//             <div className="font-medium">Local produce only</div>
//             <div className="text-sm text-muted/50">Prioritize locally grown fruits</div>
//           </div>
//         </label>
//       </div>
//     </div>
//   );

//   const renderNotificationsTab = () => (
//     <div className="space-y-6">
//       {/* Email Notifications */}
//       <div>
//         <h4 className="font-medium text-sm mb-3">📧 Email Notifications</h4>
//         <div className="space-y-3">
//           {Object.entries(currentPreferences.emailNotifications).map(([key, value]) => (
//             <label key={key} className="flex items-center gap-3 p-2 hover:bg-muted rounded">
//               <input
//                 type="checkbox"
//                 checked={value}
//                 onChange={(e) => updatePreference(`emailNotifications.${key}`, e.target.checked)}
//               />
//               <div>
//                 <div className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
//                 <div className="text-xs text-muted/50">
//                   {key === 'orders' && 'Order confirmations and status updates'}
//                   {key === 'promotions' && 'Special offers and discounts'}
//                   {key === 'newsletters' && 'Weekly fruit tips and recipes'}
//                   {key === 'priceDrops' && 'Alerts when favorites go on sale'}
//                 </div>
//               </div>
//             </label>
//           ))}
//         </div>
//       </div>

//       {/* Push Notifications */}
//       <div>
//         <h4 className="font-medium text-sm mb-3">🔔 Push Notifications</h4>
//         <div className="space-y-3">
//           {Object.entries(currentPreferences.pushNotifications).map(([key, value]) => (
//             <label key={key} className="flex items-center gap-3 p-2 hover:bg-muted rounded">
//               <input
//                 type="checkbox"
//                 checked={value}
//                 onChange={(e) => updatePreference(`pushNotifications.${key}`, e.target.checked)}
//               />
//               <div>
//                 <div className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
//               </div>
//             </label>
//           ))}
//         </div>
//       </div>

//       {/* SMS Notifications */}
//       <div>
//         <h4 className="font-medium text-sm mb-3">📱 SMS Notifications</h4>
//         <div className="space-y-3">
//           {Object.entries(currentPreferences.smsNotifications).map(([key, value]) => (
//             <label key={key} className="flex items-center gap-3 p-2 hover:bg-muted rounded">
//               <input
//                 type="checkbox"
//                 checked={value}
//                 onChange={(e) => updatePreference(`smsNotifications.${key}`, e.target.checked)}
//               />
//               <div>
//                 <div className="font-medium capitalize">{key}</div>
//               </div>
//             </label>
//           ))}
//         </div>
//       </div>
//     </div>
//   );

//   const renderPrivacyTab = () => (
//     <div className="space-y-6">
//       <div className="space-y-4">
//         <label className="flex items-center gap-3 p-3 border rounded hover:bg-muted">
//           <input
//             type="checkbox"
//             checked={currentPreferences.shareData}
//             onChange={(e) => updatePreference('shareData', e.target.checked)}
//           />
//           <div>
//             <div className="font-medium">Share data for better experience</div>
//             <div className="text-sm text-muted/50">
//               Help us improve by sharing anonymous usage data
//             </div>
//           </div>
//         </label>

//         <label className="flex items-center gap-3 p-3 border rounded hover:bg-muted">
//           <input
//             type="checkbox"
//             checked={currentPreferences.personalizedAds}
//             onChange={(e) => updatePreference('personalizedAds', e.target.checked)}
//           />
//           <div>
//             <div className="font-medium">Personalized advertisements</div>
//             <div className="text-sm text-muted/50">
//               Show relevant ads based on your preferences
//             </div>
//           </div>
//         </label>

//         <label className="flex items-center gap-3 p-3 border rounded hover:bg-muted">
//           <input
//             type="checkbox"
//             checked={currentPreferences.cookieConsent}
//             onChange={(e) => updatePreference('cookieConsent', e.target.checked)}
//           />
//           <div>
//             <div className="font-medium">Cookie consent</div>
//             <div className="text-sm text-muted/50">
//               Allow cookies for better website functionality
//             </div>
//           </div>
//         </label>
//       </div>

//       <div>
//         <label className="block text-sm font-medium mb-3">Data Retention</label>
//         <select
//           value={currentPreferences.dataRetention}
//           onChange={(e) => updatePreference('dataRetention', e.target.value)}
//           className="w-full max-w-xs p-2 border rounded-md bg-ghost-apple"
//         >
//           <option value="6months">6 months</option>
//           <option value="1year">1 year</option>
//           <option value="2years">2 years</option>
//           <option value="forever">Keep forever</option>
//         </select>
//         <p className="text-xs text-muted/50 mt-1">
//           How long we keep your data after account deletion
//         </p>
//       </div>
//     </div>
//   );

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case 'general': return renderGeneralTab();
//       case 'dietary': return renderDietaryTab();
//       case 'shopping': return renderShoppingTab();
//       case 'notifications': return renderNotificationsTab();
//       case 'privacy': return renderPrivacyTab();
//       default: return renderGeneralTab();
//     }
//   };

//   return (
//     <div className={cn("max-w-6xl mx-auto", className)}>
//       <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//         {/* Sidebar */}
//         <div className="lg:col-span-1">
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <UserIcon className="w-5 h-5" />
//                 Preferences
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="p-0">
//               <nav className="space-y-1">
//                 {tabs.map((tab) => (
//                   <button
//                     key={tab.id}
//                     onClick={() => setActiveTab(tab.id)}
//                     className={cn(
//                       "w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-muted transition-colors",
//                       activeTab === tab.id && "bg-primary text-primary/50"
//                     )}
//                   >
//                     <tab.icon className="w-4 h-4" />
//                     {tab.name}
//                   </button>
//                 ))}
//               </nav>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Main Content */}
//         <div className="lg:col-span-3">
//           <Card>
//             <CardHeader>
//               <div className="flex items-center justify-between">
//                 <CardTitle>
//                   {tabs.find(tab => tab.id === activeTab)?.name} Settings
//                 </CardTitle>
//                 {hasChanges && (
//                   <div className="flex items-center gap-2">
//                     <Button
//                       variant="outline"
//                       onClick={handleReset}
//                       disabled={saving}
//                     >
//                       Reset
//                     </Button>
//                     <Button
//                       onClick={handleSave}
//                       loading={saving}
//                       disabled={!hasChanges}
//                     >
//                       Save Changes
//                     </Button>
//                   </div>
//                 )}
//               </div>
//             </CardHeader>
//             <CardContent>
//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key={activeTab}
//                   initial={{ opacity: 0, x: 20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: -20 }}
//                   transition={{ duration: 0.2 }}
//                 >
//                   {renderTabContent()}
//                 </motion.div>
//               </AnimatePresence>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default UserPreferencesComponent;
