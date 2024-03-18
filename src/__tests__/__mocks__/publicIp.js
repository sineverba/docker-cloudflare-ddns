const publicIp = jest.createMockFromModule("public-ip");

publicIp.publicIpv4 = async () => "1.2.3.4";

module.exports = publicIp;
