import Select, { ActionMeta, MultiValue } from 'react-select'
import InputOption from './InputOption'

type OptionType = {
    label: string
    value: string
}

interface Props {
    options: OptionType[]
    value: OptionType[]
    className?: string
    onChange: ((newValue: MultiValue<OptionType>, actionMeta: ActionMeta<OptionType>) => void) | undefined
}

const MultiSelect: React.FC<Props> = (props) => {
    const {
        options,
        value,
        onChange,
        className = ''
    } = props
    return (
        <Select
            isMulti
            isClearable
            className={`w-60 flex-1 min-w-[10em] mb-2 ${className}`}
            placeholder="Specialization"
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            options={options}
            onChange={onChange}
            components={{
                Option: InputOption,
            }}
            styles={{
                valueContainer: (provided) => ({
                    ...provided,
                    flexWrap: 'nowrap',
                    overflow: 'hidden'
                })
            }}
            value={value}
        />
    )
}

export default MultiSelect