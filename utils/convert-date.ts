import { z } from "zod";

const convertDate = (dateString: string) => {
  const [day, month, year] = dateString.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
};

const customDateSchema = z
  .string()
  .refine(
    (date) => {
      const regex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;
      console.log("Date string for validation:", date.trim()); // Adicionando log para depuração
      return regex.test(date.trim()); // Adicionando trim para remover espaços em branco antes da validação
    },
    {
      message: "Data deve estar no formato DD-MM-AAAA",
    }
  )
  .transform((date) => {
    console.log("Date string before conversion:", date.trim());
    return convertDate(date.trim());
  });

export { customDateSchema };
