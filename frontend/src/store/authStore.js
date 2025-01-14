import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  user: null,
  isSigningUp: false,
  isCheckingAuth: true,
  isLoggingIn: false,
  isLoggingOut: false,

  signup: async (credentials) => {
    try {
      set({ isSigningUp: true });
      const response = await axios.post("/api/auth/signup", credentials);
      set({ user: response.data.user });
      toast.success("Account created successfully");
    } catch (err) {
      console.log("Error in signup useAuthStore" + err.message);
      toast.error(err.response.data.message || "An error occurred");
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (credentials) => {
    try {
      set({ isLoggingIn: true });
      const response = await axios.post("/api/auth/login", credentials);
      set({ user: response.data.user });
      toast.success("Logged in successfully");
    } catch (err) {
      set({ user: null });
      console.log("Error in login useAuthStore" + err.message);
      toast.error(err.response.data.message || "An error occurred");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      set({ isLoggingOut: true });
      const response = await axios.post("/api/auth/logout");
      set({ user: null, isLoggingOut: false });
      toast.success("Logged out successfully");
    } catch (err) {
      console.log("Error in logout useAuthStore " + err.message);
      toast.error(err.response.data.message || "An error occurred");
    }
  },

  authCheck: async () => {
    try {
      set({ isCheckingAuth: true });
      const response = await axios.get("/api/auth/authCheck");
      set({ user: response.data.user, isCheckingAuth: false });
    } catch (err) {
      console.log("Error in authCheck useAuthStore " + err.message);
      set({ isCheckingAuth: false, user: null });
      toast.error(err.response.data.message || "An error occurred");
    }
  },
}));
