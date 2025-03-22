import { FilterCheckbox } from "@/components/shared";
import { Skeleton } from "@/components/ui";
import { useTranslations } from "next-intl";

type Item = { value: string, text: string }

interface Props {
    title: string;
    items: Item[]
    onClickCheckbox?: (id: string) => void;
    selected?: Set<string>;
    className?: string;
    name?: string
    loading?: boolean
}

export const CheckBoxGroup: React.FC<Props> = ({ title,
    items,
    loading,
    onClickCheckbox,
    selected,
    name }) => {

        const t = useTranslations(name)
    if (loading) return (<div className="flex flex-col items-center gap-3">
        {[...new Array(5)].map((_, idx) => (<Skeleton key={idx} className="h-7 w-full" />))}

    </div>)

    return (
        <div className="max-h-[500px]">
            {items.map((item, index) => {

                // const translationKey = `${name}.${item}` as any;
                return (
                    <FilterCheckbox
                        key={index}
                        text={t(item.value)}
                        value={item.value}
                        checked={selected?.has(item.value)}
                        onCheckedChange={() => onClickCheckbox?.(item.value)}
                        name={name}
                    />
                );
            })}
        </div>
    )
}
