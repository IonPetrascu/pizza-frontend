import { NextPage } from "next";
import { useTranslations } from "next-intl";

const DashboardPage: NextPage = ({}) => {
  const t = useTranslations("HomePage");
  return <div>Главная страница Dashboard {t("title")}</div>;
};

export default DashboardPage;
