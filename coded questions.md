Here are additional **code-specific questions** that can be asked during the defense presentation. These questions focus on the implementation details, coding practices, and specific challenges faced during development. These questions are designed to test the students' understanding of the codebase and their ability to explain their implementation.

---

### **Code-Specific Questions**

#### **Backend (Node.js) Questions**

1. **Q: Show us the code for creating the `userTable` in MySQL. What fields did you include, and why?**

   - **A:** Example code:
     ```sql
     CREATE TABLE userTable (
         user_id INT AUTO_INCREMENT PRIMARY KEY,
         username VARCHAR(50) UNIQUE NOT NULL,
         first_name VARCHAR(50) NOT NULL,
         last_name VARCHAR(50) NOT NULL,
         email VARCHAR(100) UNIQUE NOT NULL,
         password VARCHAR(255) NOT NULL
     );
     ```
     - **Explanation:** The `user_id` is the primary key, `username` and `email` are unique to avoid duplicates, and `password` is hashed before storage.

2. **Q: How did you implement password hashing in the Sign-up API? Show the code.**

   - **A:** Example code using `bcrypt`:

     ```javascript
     const bcrypt = require("bcrypt");
     const saltRounds = 10;

     async function hashPassword(password) {
       return await bcrypt.hash(password, saltRounds);
     }

     // Usage in Sign-up API
     const hashedPassword = await hashPassword(req.body.password);
     ```

     - **Explanation:** We used `bcrypt` to hash passwords with a salt round of 10 for security.

3. **Q: Show the code for the authentication middleware. How does it verify JWT tokens?**

   - **A:** Example code:

     ```javascript
     const jwt = require("jsonwebtoken");

     function authenticateToken(req, res, next) {
       const token = req.headers["authorization"];
       if (!token) return res.status(401).json({ error: "Unauthorized" });

       jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
         if (err) return res.status(403).json({ error: "Invalid token" });
         req.user = user;
         next();
       });
     }
     ```

     - **Explanation:** The middleware checks for a valid JWT token in the request headers and verifies it using the secret key.

4. **Q: How did you handle errors in the Login API? Show the code.**

   - **A:** Example code:

     ```javascript
     app.post("/api/login", async (req, res) => {
       const { email, password } = req.body;
       if (!email || !password) {
         return res
           .status(400)
           .json({ error: "Email and password are required" });
       }

       const user = await getUserByEmail(email);
       if (!user) {
         return res.status(401).json({ error: "Invalid credentials" });
       }

       const validPassword = await bcrypt.compare(password, user.password);
       if (!validPassword) {
         return res.status(401).json({ error: "Invalid credentials" });
       }

       const token = jwt.sign(
         { userId: user.user_id },
         process.env.JWT_SECRET,
         { expiresIn: "1h" }
       );
       res.status(200).json({ token });
     });
     ```

     - **Explanation:** We checked for missing fields, invalid credentials, and returned appropriate error messages.

5. **Q: Show the code for the API endpoint to get all questions. How did you handle pagination?**

   - **A:** Example code:

     ```javascript
     app.get("/api/question", async (req, res) => {
       const { page = 1, limit = 10 } = req.query;
       const offset = (page - 1) * limit;

       const query = "SELECT * FROM questionTable LIMIT ? OFFSET ?";
       const questions = await db.query(query, [limit, offset]);
       res.status(200).json(questions);
     });
     ```

     - **Explanation:** We used query parameters (`page` and `limit`) to implement pagination.

---

#### **Frontend (React) Questions**

6. **Q: Show the code for the Sign-up component. How did you handle form validation?**

   - **A:** Example code:

     ```javascript
     const SignUp = () => {
       const [formData, setFormData] = useState({
         username: "",
         firstName: "",
         lastName: "",
         email: "",
         password: "",
       });
       const [errors, setErrors] = useState({});

       const validateForm = () => {
         const newErrors = {};
         if (!formData.username) newErrors.username = "Username is required";
         if (!formData.email.includes("@")) newErrors.email = "Invalid email";
         if (formData.password.length < 6)
           newErrors.password = "Password must be at least 6 characters";
         setErrors(newErrors);
         return Object.keys(newErrors).length === 0;
       };

       const handleSubmit = async (e) => {
         e.preventDefault();
         if (!validateForm()) return;

         // Call Sign-up API
       };

       return (
         <form onSubmit={handleSubmit}>
           <input
             type="text"
             name="username"
             onChange={(e) =>
               setFormData({ ...formData, username: e.target.value })
             }
           />
           {errors.username && <span>{errors.username}</span>}
           {/* Other fields */}
           <button type="submit">Sign Up</button>
         </form>
       );
     };
     ```

     - **Explanation:** We used state to manage form data and implemented validation logic before submitting the form.

7. **Q: Show the code for the Login component. How did you store the JWT token after login?**

   - **A:** Example code:

     ```javascript
     const Login = () => {
       const [email, setEmail] = useState("");
       const [password, setPassword] = useState("");

       const handleLogin = async () => {
         const response = await fetch("/api/login", {
           method: "POST",
           headers: { "Content-Type": "application/json" },
           body: JSON.stringify({ email, password }),
         });
         const data = await response.json();
         if (response.ok) {
           localStorage.setItem("token", data.token);
           // Redirect to home page
         } else {
           alert("Login failed");
         }
       };

       return (
         <div>
           <input
             type="email"
             value={email}
             onChange={(e) => setEmail(e.target.value)}
           />
           <input
             type="password"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
           />
           <button onClick={handleLogin}>Login</button>
         </div>
       );
     };
     ```

     - **Explanation:** We stored the JWT token in `localStorage` after a successful login.

8. **Q: Show the code for fetching all questions from the backend and displaying them in the Home component.**

   - **A:** Example code:

     ```javascript
     const Home = () => {
       const [questions, setQuestions] = useState([]);

       useEffect(() => {
         const fetchQuestions = async () => {
           const response = await fetch("/api/question");
           const data = await response.json();
           setQuestions(data);
         };
         fetchQuestions();
       }, []);

       return (
         <div>
           {questions.map((question) => (
             <div key={question.question_id}>
               <h3>{question.title}</h3>
               <p>{question.body}</p>
             </div>
           ))}
         </div>
       );
     };
     ```

     - **Explanation:** We used the `useEffect` hook to fetch questions from the backend when the component mounts.

9. **Q: How did you implement routing in the React app? Show the code for the router setup.**

   - **A:** Example code:

     ```javascript
     import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

     const App = () => (
       <Router>
         <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/login" element={<Login />} />
           <Route path="/signup" element={<SignUp />} />
           <Route path="/question/:question_id" element={<QuestionPage />} />
         </Routes>
       </Router>
     );
     ```

     - **Explanation:** We used `react-router-dom` to define routes for different pages.

10. **Q: Show the code for the QuestionPage component. How did you fetch and display a single question?**

    - **A:** Example code:

      ```javascript
      const QuestionPage = ({ match }) => {
        const [question, setQuestion] = useState(null);

        useEffect(() => {
          const fetchQuestion = async () => {
            const response = await fetch(
              `/api/question/${match.params.question_id}`
            );
            const data = await response.json();
            setQuestion(data);
          };
          fetchQuestion();
        }, [match.params.question_id]);

        if (!question) return <div>Loading...</div>;

        return (
          <div>
            <h1>{question.title}</h1>
            <p>{question.body}</p>
            {/* Display answers */}
          </div>
        );
      };
      ```

      - **Explanation:** We used the `question_id` from the URL to fetch and display a single question.

---

### **Advanced Code Questions**

11. **Q: How did you handle CORS in the backend? Show the code.**

    - **A:** Example code:
      ```javascript
      const cors = require("cors");
      app.use(
        cors({
          origin: "http://localhost:3000", // Frontend URL
          methods: ["GET", "POST", "PUT", "DELETE"],
          credentials: true,
        })
      );
      ```
      - **Explanation:** We used the `cors` middleware to allow requests from the frontend.

12. **Q: How did you handle file uploads (if implemented)? Show the code.**

    - **A:** Example code using `multer`:

      ```javascript
      const multer = require("multer");
      const upload = multer({ dest: "uploads/" });

      app.post("/api/upload", upload.single("file"), (req, res) => {
        res.status(200).json({ filePath: req.file.path });
      });
      ```

      - **Explanation:** We used `multer` to handle file uploads and save them to the `uploads` directory.

13. **Q: How did you implement logging in the backend? Show the code.**
    - **A:** Example code using `morgan`:
      ```javascript
      const morgan = require("morgan");
      app.use(morgan("combined"));
      ```
      - **Explanation:** We used `morgan` to log HTTP requests for debugging and monitoring.

---

Here are **additional code-specific questions** that delve deeper into the implementation details, coding practices, and advanced concepts. These questions are designed to test the students' ability to explain their code, troubleshoot issues, and demonstrate their understanding of best practices.

---

### **Advanced Backend (Node.js) Questions**

1. **Q: How did you handle environment variables in your Node.js application? Show the code for accessing them.**

   - **A:** Example code:
     ```javascript
     require("dotenv").config(); // Load environment variables from .env file
     const jwtSecret = process.env.JWT_SECRET;
     const dbPassword = process.env.DB_PASSWORD;
     ```
     - **Explanation:** We used the `dotenv` package to load environment variables from a `.env` file, which keeps sensitive information like API keys and database credentials secure.

2. **Q: Show the code for connecting to the MySQL database. How did you handle connection pooling?**

   - **A:** Example code:
     ```javascript
     const mysql = require("mysql2");
     const pool = mysql.createPool({
       host: process.env.DB_HOST,
       user: process.env.DB_USER,
       password: process.env.DB_PASSWORD,
       database: process.env.DB_NAME,
       waitForConnections: true,
       connectionLimit: 10,
       queueLimit: 0,
     });
     ```
     - **Explanation:** We used `mysql2` with connection pooling to improve performance by reusing database connections.

3. **Q: How did you implement transaction handling in the database? Show the code.**

   - **A:** Example code:

     ```javascript
     const connection = await pool.getConnection();
     await connection.beginTransaction();

     try {
       await connection.query("INSERT INTO userTable SET ?", {
         username: "test",
         email: "test@example.com",
       });
       await connection.query("INSERT INTO questionTable SET ?", {
         user_id: 1,
         title: "Test Question",
       });
       await connection.commit();
     } catch (error) {
       await connection.rollback();
       throw error;
     } finally {
       connection.release();
     }
     ```

     - **Explanation:** We used transactions to ensure atomicity when performing multiple database operations.

4. **Q: How did you handle rate limiting in your API? Show the code.**

   - **A:** Example code using `express-rate-limit`:
     ```javascript
     const rateLimit = require("express-rate-limit");
     const limiter = rateLimit({
       windowMs: 15 * 60 * 1000, // 15 minutes
       max: 100, // Limit each IP to 100 requests per windowMs
     });
     app.use(limiter);
     ```
     - **Explanation:** We used `express-rate-limit` to prevent abuse of the API by limiting the number of requests from a single IP address.

5. **Q: How did you implement input validation in the backend? Show the code.**

   - **A:** Example code using `express-validator`:

     ```javascript
     const { body, validationResult } = require("express-validator");

     app.post(
       "/api/register",
       [
         body("username").notEmpty().withMessage("Username is required"),
         body("email").isEmail().withMessage("Invalid email"),
         body("password")
           .isLength({ min: 6 })
           .withMessage("Password must be at least 6 characters"),
       ],
       (req, res) => {
         const errors = validationResult(req);
         if (!errors.isEmpty()) {
           return res.status(400).json({ errors: errors.array() });
         }
         // Proceed with registration
       }
     );
     ```

     - **Explanation:** We used `express-validator` to validate user input and return meaningful error messages.

---

### **Advanced Frontend (React) Questions**

6. **Q: How did you handle global state management in your React app? Show the code.**

   - **A:** Example code using `React Context`:

     ```javascript
     const AuthContext = React.createContext();

     const AuthProvider = ({ children }) => {
       const [user, setUser] = useState(null);

       const login = (userData) => {
         setUser(userData);
         localStorage.setItem("user", JSON.stringify(userData));
       };

       const logout = () => {
         setUser(null);
         localStorage.removeItem("user");
       };

       return (
         <AuthContext.Provider value={{ user, login, logout }}>
           {children}
         </AuthContext.Provider>
       );
     };

     const useAuth = () => useContext(AuthContext);
     ```

     - **Explanation:** We used React Context to manage global state like user authentication.

7. **Q: How did you handle protected routes in your React app? Show the code.**

   - **A:** Example code:

     ```javascript
     const ProtectedRoute = ({ children }) => {
       const { user } = useAuth();
       if (!user) {
         return <Navigate to="/login" />;
       }
       return children;
     };

     // Usage
     <Route
       path="/dashboard"
       element={
         <ProtectedRoute>
           <Dashboard />
         </ProtectedRoute>
       }
     />;
     ```

     - **Explanation:** We created a `ProtectedRoute` component to restrict access to authenticated users only.

8. **Q: How did you implement lazy loading for components in React? Show the code.**

   - **A:** Example code:

     ```javascript
     const LazyComponent = React.lazy(() => import("./LazyComponent"));

     const App = () => (
       <Suspense fallback={<div>Loading...</div>}>
         <LazyComponent />
       </Suspense>
     );
     ```

     - **Explanation:** We used `React.lazy` and `Suspense` to load components only when needed, improving performance.

9. **Q: How did you handle form submissions with file uploads in React? Show the code.**

   - **A:** Example code:

     ```javascript
     const handleSubmit = async (e) => {
       e.preventDefault();
       const formData = new FormData();
       formData.append("file", e.target.file.files[0]);

       const response = await fetch("/api/upload", {
         method: "POST",
         body: formData,
       });
       const data = await response.json();
       console.log(data);
     };
     ```

     - **Explanation:** We used the `FormData` API to handle file uploads in React.

10. **Q: How did you implement dark mode in your React app? Show the code.**

    - **A:** Example code:

      ```javascript
      const [darkMode, setDarkMode] = useState(false);

      useEffect(() => {
        document.body.className = darkMode ? "dark-mode" : "light-mode";
      }, [darkMode]);

      return (
        <button onClick={() => setDarkMode(!darkMode)}>Toggle Dark Mode</button>
      );
      ```

      - **Explanation:** We used state to toggle between dark and light modes and applied corresponding CSS classes.

---

### **Testing and Debugging Questions**

11. **Q: How did you write unit tests for your backend APIs? Show an example.**

    - **A:** Example code using `Jest` and `Supertest`:

      ```javascript
      const request = require("supertest");
      const app = require("../app");

      describe("GET /api/question", () => {
        it("should return all questions", async () => {
          const res = await request(app).get("/api/question");
          expect(res.statusCode).toEqual(200);
          expect(res.body).toHaveLength(10); // Assuming 10 questions are returned
        });
      });
      ```

      - **Explanation:** We used `Jest` and `Supertest` to test API endpoints.

12. **Q: How did you debug performance issues in your React app?**

    - **A:** Example approach:
      - Used React DevTools to identify unnecessary re-renders.
      - Implemented `React.memo` to memoize components.
      - Used `useCallback` and `useMemo` to optimize performance.
      - Example code:
        ```javascript
        const memoizedComponent = React.memo(MyComponent);
        ```

13. **Q: How did you test your React components? Show an example.**

    - **A:** Example code using `React Testing Library`:

      ```javascript
      import { render, screen } from "@testing-library/react";
      import Login from "./Login";

      test("renders login form", () => {
        render(<Login />);
        const emailInput = screen.getByLabelText("Email");
        expect(emailInput).toBeInTheDocument();
      });
      ```

      - **Explanation:** We used `React Testing Library` to test component rendering and behavior.

---

### **Deployment and DevOps Questions**

14. **Q: How did you deploy your Node.js backend? Show the deployment script.**

    - **A:** Example deployment script using `PM2`:

      ```bash
      # Install PM2 globally
      npm install -g pm2

      # Start the application
      pm2 start app.js --name evangadi-forum

      # Save the process list
      pm2 save

      # Set up PM2 to start on server reboot
      pm2 startup
      ```

      - **Explanation:** We used `PM2` to manage the Node.js process and ensure it runs continuously.

15. **Q: How did you set up CI/CD for your project? Show the configuration.**
    - **A:** Example `.github/workflows/ci.yml` for GitHub Actions:
      ```yaml
      name: CI/CD Pipeline
      on: [push]
      jobs:
        build:
          runs-on: ubuntu-latest
          steps:
            - uses: actions/checkout@v2
            - name: Install dependencies
              run: npm install
            - name: Run tests
              run: npm test
            - name: Deploy
              run: npm run deploy
      ```
      - **Explanation:** We used GitHub Actions to automate testing and deployment.

---

### **Advanced Questions**

16. **Q: How did you implement real-time notifications in your app? Show the code.**

    - **A:** Example code using `Socket.IO`:

      ```javascript
      // Server-side
      const io = require("socket.io")(server);
      io.on("connection", (socket) => {
        socket.on("newAnswer", (data) => {
          io.emit("notification", data);
        });
      });

      // Client-side
      const socket = io("http://localhost:3000");
      socket.on("notification", (data) => {
        console.log("New answer:", data);
      });
      ```

      - **Explanation:** We used `Socket.IO` to enable real-time communication between the server and clients.

17. **Q: How did you handle localization (i18n) in your React app? Show the code.**

    - **A:** Example code using `i18next`:

      ```javascript
      import i18n from "i18next";
      import { initReactI18next } from "react-i18next";

      i18n.use(initReactI18next).init({
        resources: {
          en: { translation: { welcome: "Welcome" } },
          fr: { translation: { welcome: "Bienvenue" } },
        },
        lng: "en",
        fallbackLng: "en",
      });

      const App = () => {
        const { t } = useTranslation();
        return <h1>{t("welcome")}</h1>;
      };
      ```

      - **Explanation:** We used `i18next` to support multiple languages in the app.

18. **Q: How did you optimize your React app for production? Show the code.**
    - **A:** Example steps:
      - Minified and bundled the app using `webpack`.
      - Used `React.memo` and `useMemo` to optimize rendering.
      - Example `webpack.config.js`:
        ```javascript
        const TerserPlugin = require("terser-webpack-plugin");
        module.exports = {
          mode: "production",
          optimization: {
            minimize: true,
            minimizer: [new TerserPlugin()],
          },
        };
        ```

---

These additional questions will help students demonstrate their technical depth and problem-solving skills. They should be prepared to explain their code, discuss best practices, and troubleshoot potential issues.
