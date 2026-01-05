📝 AIG Tasker – Task Management Application

AIG Tasker is a full-stack task management application that allows users to register, authenticate, manage and update using drag and drop in kanban styled tasks efficiently. The project is built using a modern MERN-style stack with MongoDB Atlas as the database and is production-ready for deployment.

🚀 Features <br>
User authentication (Register & Login) <br>
Secure task creation, update, and deletion (CRUD) <br>
Kanban Styled Drag and Drop status update. <br>
User-specific tasks (each user sees only their own tasks)\
RESTful API <br>
MongoDB Atlas cloud database integration <br>
CORS-enabled backend for secure frontend communication <br>
Production-ready deployment  <br>

🛠️ Technologies Used <br>
Frontend <br>
React.js(TypeScript) <br>
React Router DOM <br>
Axios <br>
Vite <br>
Material UI <br>
Backend <br>
Node.js <br>
Express.js <br>
MongoDB Atlas <br>
Mongoose <br>

Deployment <br>
Frontend: Vercel <br>
Backend: Vercel <br>
Database: MongoDB Atlas (Cloud) <br>

🌐 Production Links <br>
👉 https://aig-tasker.vercel.app

▶️ How to Run Locally <br>
1️⃣ Clone the Repository <br>
git clone https://github.com/your-username/aig-tasker.git <br>
cd aig-tasker <br>

2️⃣ Backend Setup <br>
cd server <br>
npm install <br>
npm start <br>

Backend will start at: <br>
http://localhost:2000 <br>

3️⃣ Frontend <br> 
cd client <br>
npm install <br>
npm run dev <br>

Frontend will start at: <br>
http://localhost:5173 <br>


📂 API Endpoints <br>
Authentication <br>
POST /auth/register – Register <br>
POST /auth/login – Login user <br>

Tasks
GET /tasks – Fetch tasks <br>
POST /tasks – Create task <br>
PUT /tasks/:id – Update task <br>
DELETE /tasks/:id – Delete task <br>

🔒 Security Notes <br>
MongoDB Atlas IP Whitelist is configured (0.0.0.0/0 for development).\ 

👨‍💻 Author <br>
Suman Regmi <br>
GitHub: [sumaniquecode](https://github.com/SumaniqueCode) <br>
Website: https://sumanr.com.np <br>
LinkedIn: [Suman Regmi](https://www.linkedin.com/in/suman-regmi-0b2440244/) <br>

📌 Future Improvements <br>
Role-based access control <br>
Email <br>
Refresh token support <br>
UI enhancements <br>