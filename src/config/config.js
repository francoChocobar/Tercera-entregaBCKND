export const config = {
  server: {
    port: 8080,
    secretSession: "claveSecretaSessions",
  },
  mongo: {
    url: "mongodb+srv://proyectoBackEnd:franco_chocobar41969274@cluster0.l2ryfyv.mongodb.net/tienda43380?retryWrites=true&w=majority",
  },
  github: {
    clientId: " Iv1.09f619d1652dcd25",
    clientSecret: "d574503591e089d4746c8ec8ed01d88916ca4496",
    callbackUrl: "http://localhost:8080/api/sessions/github-callback",
  },
};
