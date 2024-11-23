import { Variants, Transition } from "framer-motion";

// animation variants for table rows
export const rowVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

// animation variants for expanding chevron
export const chevronVariants: Variants = {
  rotated: { rotate: 90 },
  default: { rotate: 0 },
};

// transition for table rows
export const tableRowTransition: Transition = {
  duration: 0.3,
};

// animation variants for modal backdrops
export const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

// animation variants for modal content
export const modalVariants: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.3 } },
  exit: { scale: 0.8, opacity: 0, transition: { duration: 0.3 } },
};

// animation variants for tables with staggered children
export const tableVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

// animation variants for menu items in MenuTable
export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

// animation variants for menuItem rows
export const menuItemRowVariants: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
};

// animation variants for ingredient rows
export const ingredientRowVariants: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
};

// animation variants for image selector
export const imageSelectorVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

// Fade-In Up SalesOverview and VolumeOverview
export const fadeInUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Hover in VolumeOverview
export const hoverVariants: Variants = {
  hover: {
    y: -5,
    boxShadow: "0 10px 30px -12px rgba(0, 0, 0, 0.5)",
    transition: { duration: 0.3 },
  },
};

// Fade-In Down variant for FoodItemsModal
export const fadeInDownVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: 50, transition: { duration: 0.3 } },
};

//Dropdown variants for dropdown menus in NavBar and Sidebar
export const dropdownVariants: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};
