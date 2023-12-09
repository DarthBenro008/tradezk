import axios from "axios";

export default class OktoWallet {
  _gtoken;
  _token;
  _vendor;
  _base = "https://3p-bff.oktostage.com";
  tradezk_address = "0x3D2DE24CF696eBe80dD768029b597A9b0e750c0A";
  usdc_address = "0xAf729D03090e5586B48F6e600ac8B5aC7959F8A7";
  constructor(gtoken, id_token, vendor) {
    this._gtoken = gtoken;
    this._token = id_token;
    this._vendor = vendor;
  }


  async lol(){
    let data = JSON.stringify({
        "id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImU0YWRmYjQzNmI5ZTE5N2UyZTExMDZhZjJjODQyMjg0ZTQ5ODZhZmYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI0MDc0MDg3MTgxOTIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI0MDc0MDg3MTgxOTIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTYxNDM3ODAyODA4MTIzOTI0MTQiLCJlbWFpbCI6ImhrcGRldjAwOEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6InZxWkVEUnhPV0NkZ1FEYlBKcDZxb1EiLCJpYXQiOjE3MDIxMTI3OTUsImV4cCI6MTcwMjExNjM5NX0.bVcGh_icaMNjgjq5TDzrP0fBUNvZ8NcpZnjXlUfL2Qqrzksg4TItunKR8NAZGduJnFh-2aoYJtz29rRCr-bHajeypxrw_0o82Pdb_fdKJ5dM-LrCgXOgSAesPHaiDyBqFZpdGBcCBfg8Nc1TU-GuHaAehbxV3e3C33XtTJx1XhDasg9qqtWX--eqKhB3poKeiWwTCnLYoqk4h5zMShsPa7TFxJlVAkh5LRwoO70d_Bt_ZxvXbZOYHDDEN-92qBtrS01OxEKxmCRufjz7da1ct6suSEWXH8tNSvGDVt83hYyRDmJtV2O0KTURaXKOI336tcFHZGyE1Al54QyrmbDBdA"
      });
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://3p-bff.oktostage.com/api/v1/authenticate',
        headers: { 
          'x-api-key': 'b67539fd-60d1-4469-8db2-8ade89d63d37', 
          'Content-Type': 'application/json', 
        },
        data : data
      };
      
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // 1. Call `/api/v1/authenticate` endpoint to get an access token
  async authenticate(pin) {
    let { data } = await axios.post(
      `${this._base}/api/v1/authenticate`,
      {
        id_token: this._gtoken,
      },
      {
        headers: {
          "x-api-key": this._token,
        },
      }
    );

    const token = data.token;

    // user signup flow
    if (token) {
      const { data } = await axios.post(
        `${this._base}/api/v1/set_pin`,
        {
          id_token: idToken,
          token: token,
          relogin_pin: pin,
          purpose: "set_pin",
        },
        {
          headers: {
            "x-api-key": this._token,
          },
        }
      );
      const { auth_token, refresh_auth_token, device_token } = data;
      return { auth_token, refresh_auth_token, device_token };
    }
    // user login flow
    else {
      const { auth_token, refresh_auth_token, device_token } = data;
      return { auth_token, refresh_auth_token, device_token };
    }
  }

  async create_wallet() {
    const { data } = await axios.post(
      `${this._base}/api/v1/wallet`,
      {},
      {
        headers: {
          "x-api-key": this._vendor,
          authorization: `Bearer ${this._gtoken}`,
        },
      }
    );
    const { wallets } = data;
    return wallets;
  }

  async fetch_network() {
    const { data } = await axios.get(`${this._base}/api/v1/supported/networks`, {
      headers: {
        "x-api-key": this._vendor,
        authorization: `Bearer ${this._token}`,
      },
    });
    return data.network;
  }

  async execute_raw_transaction(from, to, tx_data, value) {
    const { data } = await axios.post(
      `${this._base}/api/v1/rawtransaction/execute`,
      {
        network_name: "POLYGON_TESTNET",
        transaction: {
          from: from,
          to: to,
          data: tx_data,
          value: 0,
        }, // raw transaction
      },
      {
        headers: {
          "x-api-key": this._vendor,
          authorization: `Bearer ${this._gtoken}`,
        },
      }
    );
    return data;
  }
}
