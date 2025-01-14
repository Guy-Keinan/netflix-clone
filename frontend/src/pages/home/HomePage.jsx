import HomeScreen from "./HomeScreen";
import AuthScreen from "./AuthScreen";
import { useAuthStore } from "../../store/authStore";

const HomePage = () => {
  const { user } = useAuthStore();
  return (
    <div>
      {user ? <HomeScreen /> : <AuthScreen />}
    </div>
  );
};

export default HomePage;
