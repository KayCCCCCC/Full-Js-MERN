import React from "react";
import { Checkbox, Rate, Flex } from 'antd';
import { useState } from "react";

const Navbar = () => {
    const [value, setValue] = useState(3);
    const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
    const onChange = (checkedValues) => {
        console.log('checked = ', checkedValues);
    };

    const renderContent = (type, options) => {
        switch (type) {
            case 'text':
                return options.map((option) => (
                    <h1 key={option} className="text-[56,56,61] text-xl font-medium">{option}</h1>
                ));
            case 'checkbox':
                return (
                    <Checkbox.Group style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }} onChange={onChange}>
                        {options.map((option) => (
                            <Checkbox style={{ marginLeft: 0 }} key={option.value} value={option.value}>
                                {option.label}
                            </Checkbox>
                        ))}
                    </Checkbox.Group>
                );
            case 'star':
                return options.map((option) => {
                    return (
                        <React.Fragment>
                            <div className="flex gap-2">
                                <Rate style={{ fontSize: '12px' }} key={option} disabled defaultValue={option} />
                                <span>{`Tu ${option} sao`}</span>
                            </div>
                        </React.Fragment>
                    )
                })
            case 'price':
                return options.map((option) => {
                    return (
                        <React.Fragment>
                            <div key={option} className="p-1 text-[rgb(56,56,61)] rounded-xl bg-gray-400 w-fit">{options}</div>
                        </React.Fragment>
                    )
                })
            // <Flex gap="middle" vertical>
            //     <Rate tooltips={desc} onChange={setValue} value={value} />
            //     {value ? <span>{desc[value - 1]}</span> : null}
            // </Flex>
            default:
                return {};
        }
    };

    return (
        <React.Fragment>
            <div>
                <div className="flex flex-col gap-3">
                    {renderContent('text', ['Tu Lanh', 'TV', 'May Giat'])}
                </div>
                <div className="flex flex-col gap-3">
                    {renderContent('checkbox', [
                        { value: 'a', label: 'A' },
                        { value: 'b', label: 'B' },
                    ])}
                </div>
                <div className="flex flex-col gap-3">
                    {renderContent('star', [3, 4, 5])}
                </div>
                <div className="flex flex-col gap-3">
                    {renderContent('price', ['duoi 40', 'tren 50.000'])}
                </div>
            </div>
        </React.Fragment>
    );
};

export default Navbar;
