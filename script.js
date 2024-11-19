const input = document.querySelector("input"); //tag
const button = document.querySelector("button");
const img = document.querySelector("img");
const city = document.querySelector("#city"); //id
const degree = document.querySelector("#degree");
const content = document.querySelector(".content"); //class

//O addEventListener observará se o botão recebeu um clique. Quando isso ocorrer, ele vai verificar se há algum dado no input. Em caso positivo, a função de chamada API será executada. Em caso negativo, a execução do script será encerrada.

button.addEventListener("click", () => {
  if (!input.value) return;
  getTempo();
});

//O fetch recebe a url e devolve o conteúdo da requisição, em formato JSON.
//Caso a requisição seja bem sucedida, chamamos uma função que vai montar os dados na tela, passando como parâmetro as informações climáticas.
//Já em caso negativo, um alerta será disparado, descrevendo o erro.

function getTempo() {
  let UrlApi = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
    input.value
  )}&units=metric&appid=51253157a5688b302b9b7d87973fd040`;

  try {
    fetch(UrlApi)
      .then((res) => res.json())
      .then((data) => {
        if (data?.cod && data.cod === "404") {
          return alert("Cidade não encontrada!");
        }
        loadWeatherInfo(data);
        console.log(data);
      });
  } catch (error) {
    alert(error);
  }
}

//função que mostra os dados na tela
function loadWeatherInfo(data) {
  city.innerHTML = `${data.name}, ${data.sys.country}`;
  degree.innerHTML = `Temperatura: ${Math.floor(data.main.temp)}°C`;
  img.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  content.style.display = "flex";
}
