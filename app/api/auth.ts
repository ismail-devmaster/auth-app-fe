import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL // Replace with your backend URL

export const auth = {
  // Signup
  signup: async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/signup`, {
        email,
        password,
      });
      return response.data;
    } catch (error: any) {
      console.error("Signup error:", error.response?.data || error.message);
      throw error.response?.data?.error || { error: "Failed to sign up" };
    }
  },

  // Login
  login: async (email: string, password: string) => {
    // Login will set an HTTP-only cookie; no need to store token manually
    const response = await axios.post(
      `${API_URL}/login`,
      { email, password },
      { withCredentials: true } // Ensure cookies are sent/received
    );
    return response.data;
  },

  // Verify Admin Access
  verifyAdmin: async () => {
    try {
      const response = await axios.get(`${API_URL}/api/admin/verify`, {
        withCredentials: true, // Ensures the auth cookie is sent
      });
      return response.data;
    } catch (error: any) {
      console.error(
        "Admin verification error:",
        error.response?.data || error.message
      );
      throw (
        error.response?.data?.error || {
          error: "Failed to verify admin access",
        }
      );
    }
  },

  // Forgot Password
  forgotPassword: async (email: string) => {
    try {
      const response = await axios.post(`${API_URL}/forgot-password`, {
        email,
      });
      return response.data;
    } catch (error: any) {
      console.error(
        "Forgot password error:",
        error.response?.data || error.message
      );
      throw (
        error.response?.data?.error || { error: "Failed to process request" }
      );
    }
  },

  // Reset Password
  resetPassword: async (token: string, newPassword: string) => {
    try {
      const response = await axios.post(`${API_URL}/reset-password/${token}`, {
        newPassword,
      });
      return response.data;
    } catch (error: any) {
      console.error(
        "Reset password error:",
        error.response?.data || error.message
      );
      throw (
        error.response?.data?.error || { error: "Failed to reset password" }
      );
    }
  },

  // Refresh Token
  refreshToken: async () => {
    try {
      const response = await axios.post(
        `${API_URL}/refresh-token`,
        {},
        { withCredentials: true } // Ensure cookies are sent/received
      );
      return response.data;
    } catch (error: any) {
      console.error(
        "Token refresh error:",
        error.response?.data || error.message
      );
      throw error.response?.data?.error || { error: "Failed to refresh token" };
    }
  },

  // Logout
  logout: async () => {
    try {
      const response = await axios.post(
        `${API_URL}/logout`,
        {},
        { withCredentials: true } // Ensure cookies are sent/received
      );
      return response.data;
    } catch (error: any) {
      console.error("Logout error:", error.response?.data || error.message);
      throw error.response?.data?.error || { error: "Failed to log out" };
    }
  },

  googleLogin: async () => {
    window.location.href = `${API_URL}/auth/google`;
    const response = await axios.get(`${API_URL}/profile`);
    return response.data;
  },
};
