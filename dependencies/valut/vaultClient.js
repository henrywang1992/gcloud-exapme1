const Vault = require("./valut")
const vault = new Vault();

class vaultClientWrapper {
  constructor() {
  }

  async accessSecretVersion(data) {
    const result = await vault.readKey(data.name.split("/")[0])
    return [{
      "payload": {
        "data": result
      }
    }
    ]
  }

  async addSecretVersion(data) {
    const result = await vault.writeKey(data.parent, data.payload)
    return [{
      "name": result.data.version
    }]
  }

  async destroySecretVersion(data) {
    await vault.deleteKey(data.name)
    return [{
      "name": data.name
    }]
  }

  async listSecretVersions(data) {
    return Promise.resolve([[{
      "name": data.parent
    }, {
      "name": data.parent
    }]])
  }
}

module.exports.vaultClient = vaultClientWrapper;





