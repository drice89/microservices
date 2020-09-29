const fs = require('fs');
const util = require('util');
const axios = require('axios');


const readFile = util.promisify(fs.readFile);

class SpeakersService {
  constructor(datafile) {
    this.datafile = datafile;
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
    const res = await axios.get(`http://localhost:3000/find/${servicename}/1`);
    return res.data;
  }
}

module.exports = SpeakersService;
