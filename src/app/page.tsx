import { redirect } from "next/navigation";

const Home = () => {
  return redirect("/rooms");
};

export default Home;
