import { z } from "zod";

const convertDate = (dateString: string) => {
  const [day, month, year] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
};

const customDateSchema = z.string()
  .refine(date => {
    const regex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;
    return regex.test(date);
  }, {
    message: "Data deve estar no formato DD-MM-AAAA"
  })
  .transform(date => convertDate(date));

export { customDateSchema };
