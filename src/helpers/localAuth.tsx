const USERS_KEY = 'roomsfy_users';

interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: string;
}

const getUsers = (): User[] => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

const saveUsers = (users: User[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const registerUser = (userData: any) => {
  const users = getUsers();
  if (users.find(u => u.email === userData.email)) {
    return { success: false, message: 'User already exists' };
  }

  const newUser: User = {
    ...userData,
    id: Date.now().toString(),
    role: 'subscriber'
  };

  users.push(newUser);
  saveUsers(users);

  const token = btoa(JSON.stringify({ id: newUser.id, email: newUser.email }));

  return {
    success: true,
    message: 'Registration successful! You can now log in.',
    user: newUser,
    token
  };
};

export const loginUser = (email: string, password: string) => {
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

export const activateUser = (token: string) => {
  return { success: true, message: 'Account activated successfully' };
};
