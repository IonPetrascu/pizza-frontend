import { FilterCheckbox } from "@/components/shared";

type Item = { value: string, text: string }

interface Props {
    title: string;
    items: Item[]
    onClickCheckbox?: (id: string) => void;
    selected?: Set<string>;
    className?: string;
    name?: string
}

export const CheckBoxGroup: React.FC<Props> = ({ title,
    items,
    onClickCheckbox,
    selected,
    name }) => {


    return (
        <div className="max-h-[500px]">
            {items.map((item, index) => {

                const translationKey = `${name}.${item}` as any;
                return (
                    <FilterCheckbox
                        key={index}
                        text={item.text}
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

