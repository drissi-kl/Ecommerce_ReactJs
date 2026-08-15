# 🛒 Modern E-Commerce Application (Frontend Focused)

A sleek, responsive, and performance-focused **Frontend E-Commerce web application** built with **React** and **Custom CSS**. 

This project focuses on rich Client-Side state management, API integration, data manipulation, dynamic UI components, and modern CSS micro-interactions.

---

## 📌 Architecture & Data Source

> **Note on Backend & Data**: This project is purely **Frontend-focused**. It integrates with external APIs to simulate real-world e-commerce workflows without needing a custom server:
> - **[DummyJSON API](https://dummyjson.com/)**: Used as the primary mock REST API to fetch products, handle categories, limits, and pagination.
> - **Data Manipulation**: Fetched JSON data is transformed, filtered, and manipulated on the client side (handling categories, price calculations, and carousel displays).
> - **Services Layer**: Uses a clean, modular API services structure (built with **Axios**) to keep HTTP requests decoupled from UI components.
> - **Form Services**: Integrated with **Formspree** to process real shipping confirmation emails directly from the frontend.

---

## ✨ Key Features

- 📦 **Dynamic Product Showcase**: Interactive product cards featuring category badges, dynamic image sizing, hover micro-interactions, and automated price formatting.
- 🔄 **Related Products Carousel**: Fully responsive product slider built with **Swiper.js**, featuring touch-swipe support and customized pagination.
- 📋 **Glassmorphism Shipping Modal**: Accessible confirmation modal with blur backdrop effects and dynamic animation transitions.
- ⚡ **Form Validation & State Management**: Real-time form handling and field validation using **React Hook Form**.
- ⏳ **Async & Loading States**: Integrated spinner animations (`lucide-react`) and button disable states during form submissions to prevent duplicate submissions.
- 🔔 **Toast Feedback**: Real-time feedback messages powered by **React Hot Toast**.
- 📱 **Fully Responsive Layout**: Adaptive display optimized across Mobile, Tablet, and Desktop breakpoints.

---

## 🛠️ Tech Stack

### **Frontend Core**
- **React.js** - UI Component Library
- **JavaScript (ES6+)** - Core logic, array methods & async/await operations
- **CSS3** - Custom styling, Glassmorphism design, CSS animations, & Swiper pagination overrides

### **Libraries & Utilities**
- **Axios** - Service layer HTTP client for handling REST API requests
- **React Hook Form** - Performance-focused form management
- **Swiper.js** - Touch slider and carousel implementation
- **Lucide React** - Modern UI icons
- **React Hot Toast** - User notification system

### **External APIs & Services**
- **DummyJSON API** - Mock data provider for e-commerce products
- **Formspree API** - Automated contact/shipping form backend processing

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js** (v16.0 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/drissi-kl/Ecommerce_ReactJs.git
