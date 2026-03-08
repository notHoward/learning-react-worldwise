import { createContext, useContext, useReducer } from "react";

const FakeAuthContext = createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, isAuthenticated: true, user: action.payload };
    case "logout":
      return { ...state, isAuthenticated: false, user: null };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function FakeAuthProvider({ children }) {
  const [{ isAuthenticated, user }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  const FAKE_USER = {
    name: "Jack",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
  };

  function login({ email, password }) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    } else {
      alert("Invalid credentials");
    }
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <FakeAuthContext.Provider value={{ login, logout, isAuthenticated, user }}>
      {children}
    </FakeAuthContext.Provider>
  );
}

function useFakeAuth() {
  const context = useContext(FakeAuthContext);
  if (context === undefined) {
    throw new Error("useFakeAuth must be used within a FakeAuthProvider");
  }
  return context;
}

export { FakeAuthProvider, useFakeAuth };
