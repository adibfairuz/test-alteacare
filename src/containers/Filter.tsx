import React, { useState } from 'react';
import Select from 'react-select';

type OptionType = {
    label: string
    value: boolean
};

const hospitalOptions: OptionType[] = [
    {
        label: 'Yes',
        value: true,
    },
    {
        label: 'No',
        value: false,
    },
];

const specializationOptions: OptionType[] = [
    {
        label: 'Yes',
        value: true,
    },
    {
        label: 'No',
        value: false,
    },
];

const Filter = () => {
    const [keyword, setKeyword] = useState('');

    return (
        <div className="container mx-auto px-5 pt-8 pb-3">
            <h2 className="font-semibold text-2xl mb-6">
                Doctor Finder
            </h2>
            <div className="flex items-center flex-wrap md:flex-nowrap">
                <input
                    className="css-1s2u09g-control mr-4 flex-1 px-2 min-w-[10em] mb-2"
                    placeholder="Keyword"
                    onChange={(e) => setKeyword(e.target.value)}
                    value={keyword}
                />
                <Select
                    isClearable
                    className="w-60 mr-4 flex-1 min-w-[10em] mb-2"
                    placeholder="Hospital"
                    options={hospitalOptions}
                />
                <Select
                    isClearable
                    className="w-60 mr-4 flex-1 min-w-[10em] mb-2"
                    placeholder="Specialization"
                    options={specializationOptions}
                />
            </div>
        </div>
    );
};

export default Filter;