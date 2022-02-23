const API_VERSION = process.env.API_VERSION || "v1";
const ENDPOINT = process.env.ENDPOINT || "http://127.0.0.1:8200"
const ROLE_ID = process.env.ROLE_ID || "53062968-4e9b-4434-88a1-f5dabcf0ac28";
const ROLE_SECRET = process.env.ROLE_SECRET || "0c7be15f-4ce1-359f-7eeb-fdb2f363de62";
const VAULT_BASE_PATH = process.env.VAULT_BASE_PATH || "secret/data/salpay-service-offers-backend/";

const vault = require("node-vault")({
  apiVersion: API_VERSION,
  endpoint: ENDPOINT,
});

class Vault {
  constructor() {
  }

  setToken = async () => {
    const result = await vault.approleLogin({
      role_id: ROLE_ID,
      secret_id: ROLE_SECRET,
    });

    vault.token = result.auth.client_token;
  }

  writeKey = async (secretName, payload) => {
    await this.setToken();
    return vault.write(VAULT_BASE_PATH + secretName, {
      data: {
        [secretName]: payload.data.toString()
      }
    });
  }

  readKey = async (secretName) => {
    await this.setToken();
    const {data} = await vault.read(VAULT_BASE_PATH + secretName)
      .catch(e => {
        console.log(e);
      });
    return data.data[secretName];
  }

  deleteKey = async (secretName) => {
    await this.setToken();
    return vault.delete(VAULT_BASE_PATH + secretName)
  }
}

module.exports = Vault

