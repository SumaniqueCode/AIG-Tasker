📝 AIG Tasker – Task Management Application

AIG Tasker is a full-stack task management application that allows users to register, authenticate, manage and update using drag and drop in kanban styled tasks efficiently. The project is built using a modern MERN-style stack with MongoDB Atlas as the database and is production-ready for deployment.

🚀 Features

User authentication (Register & Login)
Secure task creation, update, and deletion (CRUD)
Kanban Styled Drag and Drop status update.
User-specific tasks (each user sees only their own tasks)
RESTful API architecture
MongoDB Atlas cloud database integration
CORS-enabled backend for secure frontend communication

Production-ready deployment support

🛠️ Technologies Used
Frontend
React.js(TypeScript)
React Router DOM
Axios
Vite
Material UI
Backend
Node.js
Express.js
MongoDB Atlas
Mongoose
CORS

Deployment
Frontend: Vercel
Backend: Vercel
Database: MongoDB Atlas (Cloud)

🌐 Production Links
👉 https://aig-tasker.vercel.app


▶️ How to Run Locally
1️⃣ Clone the Repository
git clone https://github.com/your-username/aig-tasker.git
cd aig-tasker

2️⃣ Backend Setup
cd server
npm install
npm run dev

Backend will start at:
http://localhost:2000

3️⃣ Frontend Setup
cd client
npm install
npm run dev

Frontend will start at:
http://localhost:5173


📂 API Endpoints Overview
Authentication
POST /auth/register – Register user
POST /auth/login – Login user

Tasks
GET /tasks – Fetch tasks
POST /tasks – Create task
PUT /tasks/:id – Update task
DELETE /tasks/:id – Delete task

🔒 Security Notes

MongoDB Atlas IP Whitelist is configured (0.0.0.0/0 for development).

👨‍💻 Author
Suman Regmi
GitHub: [sumaniquecode](https://github.com/SumaniqueCode)
Website: https://sumanr.com.np
LinkedIn: [Suman Regmi](https://www.linkedin.com/in/suman-regmi-0b2440244/)

📌 Future Improvements
Role-based access control
Task status (Kanban view)
Email notifications
Refresh token support
UI enhancements