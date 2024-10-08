import METEO_URL from '../../Utils/Utils.js';
class MeteoApi {
  constructor({ address }) {
    this._address = address;
  }

  _checkStatus = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  };

  fetchData = () => {
    return fetch(`${this._address}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    }).then((res) => this._checkStatus(res));
  };
}
const ourApi = new MeteoApi({
  address: METEO_URL,
});

export default ourApi;
