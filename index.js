const express = require("express");
const path = require("path");
const session = require("express-session");
const bcrypt = require("bcrypt");

const app = express();
const PORT = 3000;
const SALT_ROUNDS = 10;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "replace_this_with_a_secure_key",
    resave: false,
    saveUninitialized: true,
  })
);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const USERS = [
  {
    id: 1,
    username: "AdminUser",
    email: "admin@example.com",
    password: bcrypt.hashSync("admin123", SALT_ROUNDS), //In a database, you'd just store the hashes, but for
    // our purposes we'll hash these existing users when the
    // app loads
    role: "admin",
  },
  {
    id: 2,
    username: "RegularUser",
    email: "user@example.com",
    password: bcrypt.hashSync("user123", SALT_ROUNDS),
    role: "user",
  },
];

// GET /login - Render login form
app.get("/login", (request, response) => {
  response.render("login", { error: null });
});

// POST /login - Allows a user to login
app.post("/login", (request, response) => {
  const { email, password } = request.body;
  const user = USERS.find((user) => user.email === email);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return response.render("login", { error: "Invalid email or password." });
  }

  // If login is successful, store the user in the session
  request.session.user = {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
  };

  // Redirect to landing page after successful login
  response.redirect("/landing");
});

// GET /signup - Render signup form
app.get("/signup", (request, response) => {
  response.render("signup", { error: null });
});

// POST /signup - Allows a user to signup
app.post("/signup", async (request, response) => {
  const { username, email, password } = request.body;

  if (!username || !email || !password) {
    return response.render("signup", { error: "All fields are required." });
  }
  const userExists = USERS.some(
    (user) => user.email === email || user.username === username
  );
  if (userExists) {
    return response.render("signup", { error: "User already exists." });
  }

  // Hash the password
  hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  // Add the user to the USERS array
  const newUser = {
    id: USERS.length + 1,
    username,
    email,
    password: hashedPassword,
    role: "user",
  };
  USERS.push(newUser);
  console.log(USERS);

  // Redirect to login page after successful signup
  response.redirect("/login");
});

// GET / - Render index page or redirect to landing if logged in
app.get("/", (request, response) => {
  if (request.session.user) {
    return response.redirect("/landing");
  }
  response.render("index");
});

// GET /landing - Shows a welcome page for users, shows the names of all users if an admin
app.get("/landing", (request, response) => {
  if (!request.session.user) {
    return response.redirect("/login");
  }

  const user = request.session.user;

  if (user.role === "admin") {
    // Display all users if the logged-in user is an admin
    return response.render("landing", { user: user, users: USERS });
  }

  // Display user-specific information for regular users
  response.render("landing", { user });
});

// GET /logout - Logs the user out by destroying the session
app.get("/logout", (request, response) => {
  // Destroy the session
  request.session.destroy((err) => {
    if (err) {
      console.log("Error destroying session:", err);
      return response.redirect("/landing");
    }

    // Redirect to the login page after logging out
    response.redirect("/login");
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
