
import axios from "axios";
import "./styles/register.css";
import "./styles/base.css";


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

    try {
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

      if (response.status === 201) {
        location.href = "/login.html";
      }
    } catch (error) {
      const TheApp = document.getElementById("app");
      const theDiv = document.createElement("div");
      theDiv.innerHTML = "Det gick fel att skapa en användare";
      TheApp?.appendChild(theDiv);
      console.error("Fel vid registrering:", error);
    }
  });
