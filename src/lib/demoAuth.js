
const USERS_KEY = "freevance_users";
const SESSION_KEY = "freevance_session";
const OTP_KEY = "freevance_pending_otp";

const OTP_EXPIRY = 10 * 60 * 1000; // 10 minutes
const MAX_OTP_ATTEMPTS = 5;

// Generate a random six-digit demo OTP
export function generateDemoOtp(email) {
  const code = String(
    Math.floor(100000 + Math.random() * 900000)
  );

  const otpData = {
    email: email.toLowerCase().trim(),
    code,
    expiresAt: Date.now() + OTP_EXPIRY,
    attempts: 0,
  };

  localStorage.setItem(OTP_KEY, JSON.stringify(otpData));

  return code;
}

// Verify the entered OTP
export function verifyDemoOtp(email, enteredCode) {
  const savedOtp = localStorage.getItem(OTP_KEY);

  if (!savedOtp) {
    return { success: false, message: "Please request a new OTP." };
  }

  const otpData = JSON.parse(savedOtp);

  if (otpData.email !== email.toLowerCase().trim()) {
    return { success: false, message: "Email does not match." };
  }

  if (Date.now() > otpData.expiresAt) {
    localStorage.removeItem(OTP_KEY);
    return { success: false, message: "OTP expired. Request a new one." };
  }

  if (otpData.attempts >= MAX_OTP_ATTEMPTS) {
    localStorage.removeItem(OTP_KEY);
    return { success: false, message: "Too many attempts. Request a new OTP." };
  }

  if (otpData.code !== enteredCode.trim()) {
    otpData.attempts += 1;
    localStorage.setItem(OTP_KEY, JSON.stringify(otpData));

    return { success: false, message: "Incorrect OTP." };
  }

  localStorage.removeItem(OTP_KEY);

  return { success: true };
}

// Get all registered users
export function getUsers() {
  if (typeof window === "undefined") return [];

  return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
}

// Find an existing user by email
export function findUserByEmail(email) {
  return getUsers().find(
    (user) => user.email === email.toLowerCase().trim()
  );
}

// Create a new user
export function createUser(userData) {
  const users = getUsers();

  const newUser = {
    id: crypto.randomUUID(),
    email: userData.email.toLowerCase().trim(),
    name: userData.name,
    role: userData.role || "freelancer",
    country: userData.country || "",
    status: userData.role === "freelancer" ? "pending" : "active",

    // Freelancer profile fields
    providerType: userData.providerType || "Individual",
    category: userData.category || "",
    skills: userData.skills || [],
    bio: "",
    rate: "",
    qualifications: [],
    badges: [],
    portfolio: [],
    payout: null,
    taxFile: null,

    createdAt: new Date().toISOString(),
  };

  users.push(newUser);

  localStorage.setItem(USERS_KEY, JSON.stringify(users));

  return newUser;
}

// Update an existing user
export function updateUser(userId, updates) {
  const users = getUsers();

  const updatedUsers = users.map((user) =>
    user.id === userId ? { ...user, ...updates } : user
  );

  localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));

  return updatedUsers.find((user) => user.id === userId);
}

// Save login session
export function loginUser(user) {
  localStorage.setItem(SESSION_KEY, user.id);
}

// Get currently logged-in user
export function getCurrentUser() {
  if (typeof window === "undefined") return null;

  const userId = localStorage.getItem(SESSION_KEY);

  if (!userId) return null;

  return getUsers().find((user) => user.id === userId) || null;
}

// Logout
export function logoutUser() {
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(OTP_KEY);
}
