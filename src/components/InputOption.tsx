import { useState } from 'react';
import { components, OptionProps } from 'react-select'

interface Props {
    isDisabled: boolean
    isFocused: boolean
    isSelected: boolean
    children: React.ReactNode
    innerProps: any
    getStyles: any
    rest?: OptionProps
}

const InputOption: React.FC<Props> = ({
    getStyles,
    isDisabled,
    isFocused,
    isSelected,
    children,
    innerProps,
    ...rest
}) => {
    const [isActive, setIsActive] = useState(false);
    const onMouseDown = () => setIsActive(true);
    const onMouseUp = () => setIsActive(false);
    const onMouseLeave = () => setIsActive(false);

    let bg = 'transparent';
    if (isFocused) { bg = 'bg-gray-200'; }
    if (isActive) { bg = 'bg-blue-200'; }

    const className = `flex items-center ${bg}`;

    // prop assignment
    const props = {
        ...innerProps,
        onMouseDown,
        onMouseUp,
        onMouseLeave,
        className
    };

    return (
        <components.Option
            {...rest as any}
            isDisabled={isDisabled}
            isFocused={isFocused}
            isSelected={isSelected}
            getStyles={getStyles}
            innerProps={props}
        >
            <input
                className="mr-2"
                type="checkbox"
                checked={isSelected}
            />
            {children}
        </components.Option>
    );
};

export default InputOption