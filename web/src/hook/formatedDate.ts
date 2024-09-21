import dayjs from "dayjs";

export function formatDateCustom(postDate: Date) {
  const now = dayjs();
  const date = dayjs(postDate);
  const diffInMinutes = now.diff(date, "minute");
  const diffInHours = now.diff(date, "hour");
  const diffInDays = now.diff(date, "day");

  if (diffInMinutes < 60) {
    // Menos de 60 minutos
    return `há ${diffInMinutes} ${diffInMinutes === 1 ? "minuto" : "m"}`;
  } else if (diffInHours < 24) {
    // Menos de 24 horas
    return `há ${diffInHours} ${diffInHours === 1 ? "hora" : "h"}`;
  } else if (diffInDays <= 5) {
    // Entre 1 e 5 dias
    return `há ${diffInDays} ${diffInDays === 1 ? "dia" : "dias"}`;
  } else {
    // Mais de 5 dias, exibe a data completa
    return date.format("DD/MM/YYYY");
  }
}
