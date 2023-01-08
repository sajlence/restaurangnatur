export default function fetchRandom() {
  return new Promise((resolve, reject) => {
    let request = new XMLHttpRequest();
    request.addEventListener("load", () => {
      if (request.readyState === 4 && request.status === 200) {
        let data = JSON.parse(request.responseText);
        resolve(data);
      } else if (request.readyState === 4) {
        reject("error getting resources");
      }
    });
    request.open(
      "GET",
      "https://www.thecocktaildb.com/api/json/v1/1/random.php",
      true
    );
    request.send();
  });
}
