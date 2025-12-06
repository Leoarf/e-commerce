# 🛒 **E-Commerce MERN Stack**

<div align="center">

![MERN](https://img.shields.io/badge/MERN-Full%20Stack-61DAFB?style=for-the-badge&logo=mongodb&logoColor=white)
![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-LTS-339933?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)

**✨ Live Demo:** [https://azurio.vercel.app](https://azurio.vercel.app) | **🚀 Admin Panel:** [https://azurio.vercel.app/admin](https://azurio.vercel.app/admin)

</div>

## 🎯 **About**

A **fully functional e-commerce platform** built with the MERN stack (MongoDB, Express, React, Node.js). Features a complete shopping experience with user authentication, product management, PayPal integration, and an admin dashboard.

## 🚀 **Key Features**

### 🛍️ **Shopping Experience**

- Product catalog with filtering & search
- Persistent shopping cart (guest/user)
- Multi-step checkout process
- **PayPal & Credit Card** payment integration
- Order history & tracking

### 👤 **User System**

- JWT authentication & authorization
- User profiles & dashboard
- Guest checkout with cart merge
- Secure password management

### ⚡ **Admin Panel** (_Fully Functional_)

- 📊 **Product Management** - View/Edit/Delete products
- 📦 **Order Management** - Update order status
- 👥 **User Management** - View/Manage users
- 📈 **Dashboard Analytics** - Sales & performance metrics
- 🖼️ **Image Upload** - Cloudinary CDN integration

### 🛠️ **Technical Highlights**

- Modular component architecture
- Redux Toolkit for state management
- MongoDB Atlas for cloud database
- Responsive design (Mobile First)
- Optimized performance with Vite
- Clean code structure for easy scalability

## 🏗️ **Tech Stack**

**Frontend:** React 19 • Redux Toolkit • React Router • Tailwind CSS • PayPal SDK  
**Backend:** Node.js • Express • MongoDB • Mongoose • JWT • Cloudinary  
**Deployment:** Vercel (Frontend & Backend) • MongoDB Atlas • Cloudinary CDN

## 📦 **Quick Start**

```bash
# Clone repository
git clone https://github.com/Leoarf/azurio.git
cd azurio

# Backend Setup
cd backend
npm install
cp .env.example .env
# Add your MongoDB, Cloudinary, PayPal credentials
npm run dev

# Frontend Setup (new terminal)
cd frontend
npm install
cp .env.example .env
npm run dev
```

## 🌐 **Environment Variables**

### Backend (.env)

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Frontend (.env)

```env
VITE_PAYPAL_CLIENT_ID=your_paypal_client_id
VITE_BACKEND_URL=your_backend_url
```

## 🚢 **Deployment**

**Frontend & Backend:** Deployed on Vercel  
**Database:** MongoDB Atlas (Cloud)  
**Images:** Cloudinary CDN

## 🔮 **Future Improvements**

- [ ] Stripe payment integration
- [ ] User product reviews and ratings
- [ ] Ability to add products through the admin panel (currently only possible via backend seeder or MongoDB Atlas)
- [ ] Coupon/discount system
- [ ] Wishlist feature
- [ ] Data validation in forms such as register, etc.

## 📄 **License**

MIT License - see [LICENSE](LICENSE) for details.

## 👨‍💻 **Author**

**Leonardo** • [GitHub](https://github.com/Leoarf) • [LinkedIn](https://www.linkedin.com/in/leoarf/)

---

<div align="center">

### ⭐ **Star this repo if you like it!**

</div>

---

**Built with ❤️ using the MERN stack • Deployed on Vercel**
