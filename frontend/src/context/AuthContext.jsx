import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      if (token) {
        try {
          console.log(
            "Making request to:",
            `${import.meta.env.VITE_API_URL}/users/verify`
          );
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/users/verify`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          // Ensure the response contains valid user data
          if (response.data && response.data.user) {
            setUser(response.data.user);
            setIsAuthenticated(true);
            await processPendingFavorite();
          } else {
            throw new Error("Invalid user data in response");
          }
        } catch (error) {
          console.error("Token verification failed:", error);
          clearAuthState();
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    verifyToken();
  }, [token]);

  const clearAuthState = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  // Save token to localStorage whenever it changes
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const processPendingFavorite = async (newToken) => {
    const favoriteCountry = localStorage.getItem("favoriteAfterLogin");
    if (favoriteCountry) {
      try {
        const tokenToUse = newToken || token;

        await axios.post(
          `${import.meta.env.VITE_API_URL}/favorites`,
          { country: favoriteCountry },
          {
            headers: {
              Authorization: `Bearer ${tokenToUse}`,
            },
          }
        );

        localStorage.removeItem("favoriteAfterLogin");
        return true;
      } catch (error) {
        console.error("Failed to add favorite after login:", error);
        return false;
      }
    }
    return false;
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/login`,
        {
          email,
          password,
        }
      );

      // Validate response structure
      if (!response.data.token || !response.data.user) {
        throw new Error("Invalid response structure from server");
      }

      const { token: newToken, user: userData } = response.data;

      // Update all state together
      setToken(newToken);
      setUser(userData);
      setIsAuthenticated(true);

      await processPendingFavorite(newToken);

      return { success: true };
    } catch (error) {
      console.error("Login failed:", error);
      clearAuthState();
      return {
        success: false,
        message:
          error.response?.data?.message || error.message || "Login failed",
      };
    }
  };

  const register = async (username, email, password) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/register`,
        {
          username,
          email,
          password,
        }
      );

      if (!response.data.token || !response.data.user) {
        throw new Error("Invalid response structure from server");
      }

      const { token: newToken, user: userData } = response.data;

      setToken(newToken);
      setUser(userData);
      setIsAuthenticated(true);

      await processPendingFavorite(newToken);

      return { success: true };
    } catch (error) {
      console.error("Registration failed:", error);
      clearAuthState();
      return {
        success: false,
        message:
          error.response?.data?.message ||
          error.message ||
          "Registration failed",
      };
    }
  };

  const logout = () => {
    clearAuthState();
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    processPendingFavorite,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
