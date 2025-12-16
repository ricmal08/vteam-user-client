import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function GithubCallback({ setUserStatus }) {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("hej från callback")
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    console.log(token)

    if (token) {
      localStorage.setItem("accessToken", token);
      setUserStatus("logged-in");
      navigate("/");
    } 
  }, []);

  return <p>Logging in with GitHub</p>;
}

export default GithubCallback;
