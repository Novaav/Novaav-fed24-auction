import "./style.css";
import axios from "axios";

document
  .getElementById("registerForm")
  ?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const userName = (document.getElementById("userName") as HTMLInputElement)
      .value;
    const userEmail = (document.getElementById("userEmail") as HTMLInputElement)
      .value;
    const userPassword = (
      document.getElementById("userPassword") as HTMLInputElement
    ).value;

    const response = await axios.post(
      "http://localhost:3000/register",
      {
        name: userName,
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
      theDiv.innerHTML = "Det gick fel att skapa en användare";
      TheApp?.appendChild(theDiv);
    }

    location.href = "/login.hmtl";
  });
