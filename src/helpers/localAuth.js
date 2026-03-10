// Local Auth Service to mock backend behavior using localStorage

const USERS_KEY = 'roomsfy_users';

const getUsers = () => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const registerUser = (userData) => {
  const users = getUsers();
  if (users.find(u => u.email === userData.email)) {
    return { success: false, message: 'User already exists' };
  }
  
  // In a real app we'd hash the password, but this is a mock for offline-first demo
  const newUser = {
    ...userData,
    id: Date.now().toString(),
    role: 'subscriber' // default role
  };
  
  users.push(newUser);
  saveUsers(users);
  
  // Return a mock token (using simple base64 or just random string)
  const token = btoa(JSON.stringify({ id: newUser.id, email: newUser.email }));
  
  return {
    success: true,
    message: 'Registration successful! You can now log in.',
    user: newUser,
    token
  };
};

export const loginUser = (email, password) => {
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    return { success: false, message: 'Invalid email or password' };
  }
  
  const token = btoa(JSON.stringify({ id: user.id, email: user.email }));
  
  return {
    success: true,
    user,
    token
  };
};

export const activateUser = (token) => {
  // For offline first, we can just say it's successful if the token exists
  // In our case, signup is direct, but if we wanted to keep the flow:
  return { success: true, message: 'Account activated successfully' };
};
