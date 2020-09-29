
const axios = require('axios');


class SpeakersService {
  //accepts the config object then destructures the url and version
  constructor({serviceRegistryUrl, serviceVersionIdentifier}) {
    this.serviceRegistryUrl = serviceRegistryUrl;
    this.serviceVersionIdentifier = serviceVersionIdentifier;
  }

  async getNames() {
    const { ip, port } = await this.getService('speakers-service');
    return this.callService({
      method: 'GET',
      url: `http://${ip}:${port}/names`
    })
  }

  async getListShort() {
    const { ip, port } = await this.getService('speakers-service');
    return this.callService({
      method: 'GET',
      url: `http://${ip}:${port}/list-short`
    })
  }

  async getList() {
    const { ip, port } = await this.getService('speakers-service');
    return this.callService({
      method: 'GET',
      url: `http://${ip}:${port}/list`
    })
  }

  async getAllArtwork() {
    const { ip, port } = await this.getService('speakers-service');
    return this.callService({
      method: 'GET',
      url: `http://${ip}:${port}/artwork`
    })
  }

  async getSpeaker(shortname) {
    const { ip, port } = await this.getService('speakers-service');
    return this.callService({
      method: 'GET',
      url: `http://${ip}:${port}/speaker/${shortname}`
    })
  }

  async getArtworkForSpeaker(shortname) {
    const { ip, port } = await this.getService('speakers-service');
    return this.callService({
      method: 'GET',
      url: `http://${ip}:${port}/artwork/${shortname}`
    })
  }

  async callService(requestOptions) {
    const res = await axios(requestOptions)
    return res.data;
  } 

  async getService(servicename) {
    const res = await axios.get(`${this.serviceRegistryUrl}/find/${servicename}/${this.serviceVersionIdentifier}`);
    return res.data;
  }
}

module.exports = SpeakersService;
