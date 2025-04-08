import axios from "axios";
import "./style.css";

document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const userEmail = (document.getElementById("userEmail") as HTMLInputElement)
    .value;
  const userPassword = (
    document.getElementById("userPassword") as HTMLInputElement
  ).value;

  const response = await axios.post(
    "http://localhost:3000/login",
    {
      email: userEmail,
      password: userPassword,
    },
    {
      withCredentials: true,
    }
  );
  if (response.status > 200) {
    const TheApp = document.getElementById("app");
    const theDiv = document.createElement("div");
    theDiv.innerHTML = "fel lösenord eller mailadress";
    TheApp?.appendChild(theDiv);
  }

  location.href = "/";
});
