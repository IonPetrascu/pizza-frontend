import { NextPage } from 'next'
import { useTranslations } from 'next-intl'
interface Props { }

const DashboardPage: NextPage<Props> = ({ }) => {
    const t = useTranslations("HomePage")
    return <div>Главная страница Dashboard {t("title")}</div>
}

export default DashboardPage

