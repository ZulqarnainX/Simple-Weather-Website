// const apiKey = "Your API Key Here";

// Getting current date
const today = new Date();
const date = today.toLocaleDateString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

function getWeather() {
  console.log("Function Run");
  const city = document.getElementById("cityInput").value;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  )
    .then((response) => {
      if (!response.ok) throw new Error("City not found");
      return response.json();
    })
    .then((data) => {
      const weatherHtml = `
        <div class="city">
          <h1>${data.name}</h1>
          <hr class="rounded">
          <p>${date}</p>
        </div>
        <div class="cent">
          <h1 id="tempp">${data.main.temp}°C</h1>
        </div>
        <div class="ce">
          <h1 id="status">${data.weather[0].main}</h1>
          <div class="humidity">
            <img src="assets/humidity.webp" alt="" width="40">
            <p>${data.main.humidity}%</p>
          </div>
          <div class="wind">
            <img src="assets/wind.webp" alt="" width="40">
            <p>${data.wind.speed} m/s</p>
          </div>
        </div>
      `;

      const card = document.querySelector(".card");
      card.innerHTML = weatherHtml;

      document
        .querySelectorAll("hr:not(.rounded)")
        .forEach((hr) => hr.remove());

      if (data.weather[0].main === "Clear") {
        document.body.style.backgroundImage = "url('assets/sunny_bg.png')";
        card.style.backgroundImage = "url('assets/sunny.jpg')";
        card.style.boxShadow =
          "0 10px 30px rgba(0, 0, 0, 0.5), 0 0 25px rgba(0, 123, 255, 0.5), inset 0 0 15px rgba(0, 123, 255, 0.3)";
      } else if (data.weather[0].main === "Rain") {
        document.body.style.backgroundImage = "url('assets/rainy_bg.png')";
        document.body.style.width = "100vw";
        document.body.style.height = "100vh";
        card.style.backgroundImage = "url('assets/rainy.jpg')";
        card.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
        document.getElementById("tempp").style.color = "rgb(89 128 177)";
        document.getElementById("status").style.color = "rgb(89 128 177)";

        if (!document.getElementById("rainStyles")) {
          const style = document.createElement("style");
          style.id = "rainStyles";
          document.head.appendChild(style);

          style.sheet.insertRule(
            `
            hr.thunder {
              border: unset;
              position: absolute;
              width: 100vw;
              height: 100vh;
              animation-name: thunder;
              animation-duration: var(--thunder-duration);
              animation-timing-function: linear;
              animation-delay: var(--thunder-delay);
              animation-iteration-count: infinite;
            }`,
            0
          );

          style.sheet.insertRule(
            `
            hr:not(.thunder) {
              width: 50px;
              border-color: transparent;
              border-right-color: rgba(255, 255, 255, 0.7);
              border-right-width: 50px;
              position: absolute;
              bottom: 100%;
              transform-origin: 100% 50%;
              animation-name: rain;
              animation-duration: 1s;
              animation-timing-function: linear;
              animation-iteration-count: infinite;
            }`,
            1
          );

          style.sheet.insertRule(
            `
            @keyframes rain {
              from {
                transform: rotate(105deg) translateX(0);
              }
              to {
                transform: rotate(105deg) translateX(calc(100vh + 20px));
              }
            }`,
            2
          );

          style.sheet.insertRule(
            `
            @keyframes thunder {
              0% { background-color: transparent; }
              1% { background-color: white; }
              2% { background-color: rgba(255, 255, 255, 0.8); }
              8% { background-color: transparent; }
            }`,
            3
          );
        }

        let counter = 100;
        for (let i = 0; i < counter; i++) {
          const hrElement = document.createElement("hr");
          if (i === counter - 1) {
            hrElement.className = "thunder";
          } else {
            hrElement.style.left =
              Math.floor(Math.random() * window.innerWidth) + "px";
            hrElement.style.animationDuration = 0.2 + Math.random() * 0.3 + "s";
            hrElement.style.animationDelay = Math.random() * 5 + "s";
          }
          document.body.appendChild(hrElement);
        }
      } else if (data.weather[0].main === "Clouds") {
        console.log("Cloudddsss");
        document.body.style.backgroundImage = "url('assets/cloudy_bg.png')";
        document.querySelector(".card").style.backgroundImage =
          "url('assets/cloudyyy.jpg')";
        document.querySelector(".card").style.boxShadow =
          "0 4px 20px rgba(0, 0, 0, 0.3), 0 0 10px rgba(0, 0, 0, 0.2)";
        // document.querySelector(".card").style.border = '1px solid black'
        document.getElementById("tempp").style.color = "#dddddd";
        document.getElementById("status").style.color = "#dddddd";
      }
    })
    .catch((error) => {
      document.querySelector(
        ".container"
      ).innerHTML = `<p>${error.message}</p>`;
    });
}

// Hide search bar after clicking search
const searchBar = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchbutton");
const starting = document.getElementById("starting");

searchBtn.addEventListener("click", () => {
  searchBar.style.display = "none";
  searchBtn.style.display = "none";
  starting.style.display = "none";
});
