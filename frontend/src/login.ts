import axios from "axios";
import "./styles/login.css";
import "./styles/base.css";

document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const userName = (document.getElementById("userName") as HTMLInputElement)
    .value;
  const userPassword = (
    document.getElementById("userPassword") as HTMLInputElement
  ).value;

  const response = await axios.post(
    "http://localhost:3000/login",
    {
      name: userName,
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

  location.href = "/auction.html";
});
