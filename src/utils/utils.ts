import { publicIpv4 } from "public-ip";

async function getPublicIp(): Promise<string> {
  try {
    return await publicIpv4();
  } catch (error) {
    console.error("Errore durante il recupero dell'IP pubblico:", error);
    return ""; // In caso di errore, ritorna una stringa vuota
  }
}

export { getPublicIp };
