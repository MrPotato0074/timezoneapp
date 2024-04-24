const inputCountry = document.getElementById('inputCountry');
const searchCountry = document.getElementById('searchCountry');
const hourContainer = document.getElementById('hour');
const url = `http://worldtimeapi.org/api/timezone/Europe/`;
let intervalId;

const getApi = async (url, country) => {
  const fetchData = url + country;
  try {
    const resp = await fetch(fetchData);
    if (!resp.ok) {
      throw new Error(`HTTP error! Status: ${resp.status}`);
    }
    const data = await resp.json();
    if (data.datetime) {
      const date = data.datetime.slice(0, 10);
      const time = data.datetime.slice(11, 19);
      const dateTimeString = `${date} <br> ${time}`;
      hourContainer.innerHTML = dateTimeString;
    } else {
      throw new Error('Invalid data received');
    }
  } catch (error) {
    console.error('Failed to fetch time data:', error);
    hourContainer.innerHTML = 'Error, you did not enter a European capital!';
    clearInterval(intervalId)
  }
};



searchCountry.addEventListener('click', () => {
  clearInterval(intervalId);
  let city = inputCountry.value.trim().toLowerCase();
  if (city) {
    getApi(url, city);
    intervalId = setInterval(() => {
      getApi(url, city);
    }, 1000);
  } else {
    hourContainer.innerHTML = 'Please enter a European capital';
  }
});

window.addEventListener('beforeunload', () => {
  clearInterval(intervalId);
});
