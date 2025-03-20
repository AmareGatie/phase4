### **General Project Questions**\*\*****\*\*****\*\*****\*\*****\*\*****\*\*****\*\*****

1. **Q: What is the purpose of the Evangadi Forum project?**

   - **A:** The Evangadi Forum is a Q&A platform designed to facilitate knowledge sharing and interaction among users. It allows users to post questions, provide answers, and engage in discussions.

2. **Q: Why did you choose React for the frontend and Node.js for the backend?**

   - **A:** React was chosen for its component-based architecture, which makes it easy to build reusable UI components and manage state efficiently. Node.js was chosen for its non-blocking I/O model, which is ideal for handling multiple concurrent requests, and its compatibility with JavaScript, allowing for a unified language across the stack.

3. **Q: How did you ensure the security of user data in the application?**
   - **A:** We implemented several security measures, including:
     - Password hashing using bcrypt to securely store passwords.
     - JSON Web Tokens (JWT) for secure user authentication.
     - HTTPS to encrypt data transmission.
     - Input validation to prevent SQL injection and other attacks.

---

### **Backend-Specific Questions******\*\*\*\*********\*\*********\*\*\*\*********

4. **Q: How did you design the database schema for the Q&A platform?**

   - **A:** We created three main tables:
     - `userTable`: Stores user information (e.g., username, email, password).
     - `questionTable`: Stores questions posted by users.
     - `answerTable`: Stores answers provided by users, linked to specific questions via foreign keys.
     - Relationships were established using foreign keys, and we ensured normalization to reduce redundancy.

5. **Q: How did you handle authentication in the backend?**

   - **A:** We implemented authentication using JWT. When a user logs in, the server generates a token containing the user's ID and role. This token is sent to the client and included in the headers of subsequent requests to access protected endpoints.

6. **Q: How did you handle errors in the backend APIs?**

   - **A:** We used middleware to catch and handle errors. For example, invalid requests return a `400 Bad Request`, unauthorized access returns a `401 Unauthorized`, and server errors return a `500 Internal Server Error`.

7. **Q: How did you implement the API endpoint to get all questions?**
   - **A:** We created a GET endpoint `/api/question` that queries the `questionTable` and returns a JSON response containing all questions and their metadata.

---

### **Frontend-Specific Questions\*\*\*\***\*\***\*\*\*\***\*\***\*\*\*\***\*\***\*\*\*\***

9. **Q: How did you manage state in the React application?**

   - **A:** We used React's built-in `useState` and `useContext` hooks to manage local and global state, respectively. For example, user authentication state was managed globally using context.

10. **Q: How did you handle routing in the React application?**

    - **A:** We used `react-router-dom` to implement client-side routing. Routes were defined for pages like Home, Sign-up, Login, Question, and Answer.

11. **Q: How did you integrate the frontend with the backend APIs?**

    - **A:** We used the `fetch` API or `axios` to make HTTP requests to the backend. For example, the Sign-up component sends a POST request to `/api/register` with user details.

12. **Q: How did you handle form validation in the Sign-up and Login components?**

    - **A:** We used controlled components in React to manage form inputs and implemented validation logic to check for required fields, valid email formats, and password strength. Error messages were displayed dynamically.

13. **Q: How did you implement the logout functionality?**
    - **A:** We cleared the JWT token stored in the browser's local storage or context and redirected the user to the login page.

---

### **Advanced Questions**

1.  **Q: How would you deploy this application?**

    - **A:** We would deploy the backend on a cloud platform like AWS or Heroku and the frontend on a static hosting service like Netlify or Vercel. We would also configure environment variables for sensitive data like database credentials.

2.  **Q: What additional features would you add to this project in the future?**
    - **A:** Some potential features include:
      - Upvoting/downvoting answers.
      - User profiles with activity history.
      - Notifications for new answers or comments.
      - Search functionality for questions and answers.

---
