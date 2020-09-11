const semver = require('semver');

class ServiceRegistry {
  constructor(log) {
    this.log = log;
    this.services = {};
    this.timeout = 10;
  }

  get(name, version) {
    this.cleanup();
    const candidates = Object.values(this.services)
      .filter(service => service.name === name && semver.satisfies(service.version, version));

    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  register(name, version, ip, port) {
    this.cleanup();
    const key = name + version + ip + port;

    // add new service
    if (!this.services[key]) {
      this.services[key] = {};
      // unix timestamp in seconds
      this.services[key].timestamp = Math.floor(new Date() / 1000);
      this.services[key].ip = ip;
      this.services[key].port = port;
      this.services[key].name = name;
      this.services[key].version = version;
      this.log.debug(`Added services ${name}, version ${version}, at ${ip}:${port}`);
      return key;
    }
    // update service
    this.serivces[key].timestamp = Math.floor(new Date() / 1000);
    this.log.debug(`Updated services ${name}, version ${version}, at ${ip}:${port}`);
    return key;
  }

  unregister(name, version, ip, port) {
    const key = name + version + ip + port;
    delete this.services[key];
    return key;
  }

  cleanup() {
    const now = Math.floor(new Date/1000);
    Object.keys(this.services).forEach((service) => {
      if (now - this.timeout > this.services[service].timestamp) {
        delete this.services[service]
        this.log.debug(`Removed service ${service}`);
      }
    });
  }
}

module.exports = ServiceRegistry;
