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
          authorization: `Bearer ${this._token}`,
        },
      }
    );
    const { wallets } = data;
    return wallets;
  }

  async fetch_network() {
    const { data } = await axios.get(
      `${this._base}/api/v1/supported/networks`,
      {
        headers: {
          "x-api-key": this._vendor,
          authorization: `Bearer ${this._token}`,
        },
      }
    );
    return data.network;
  }

  async get_wallet() {
    const { data } = await axios.get(`${this._base}/api/v1/wallet`, {
      headers: {
        "x-api-key": this._vendor,
        authorization: `Bearer ${this._token}`,
      },
    });
    return data.data.wallets[0];
  }

  async execute_raw_transaction(tradezk, tx_data) {
    const { data } = await axios.post(
      `${this._base}/api/v1/rawtransaction/execute`,
      {
        network_name: "POLYGON_TESTNET",
        transaction: {
          from: localStorage.getItem("address"),
          to: tradezk ? this.tradezk_address : this.usdc_address,
          data: tx_data,
          value: "0x0",
        }, // raw transaction
      },
      {
        headers: {
          "x-api-key": this._vendor,
          authorization: `Bearer ${this._token}`,
        },
      }
    );
    return data;
  }
}
