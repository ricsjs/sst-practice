import { Resend } from "resend";
import { env } from "../env";

const resend = new Resend(env.RESEND_API_KEY);

(async () => {
  try {
    await resend.domains.verify(env.RESEND_SITE_DOMAIN);
  } catch (error) {
    console.error("Erro ao verificar o domínio:", error);
  }
})();

export { resend };
