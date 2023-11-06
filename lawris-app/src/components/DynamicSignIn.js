import React from 'react';
import { BriefcaseIcon } from '../icon.js';

inputGroupList = {
    {"lawyer": {
        "icon" : BriefcaseIcon,
        "uniqueField" : "licenceNumber"
    }, 
    {

    },
    {

    }
}
}

const InputGruops = (inputGroupList) => {
    return (
        <div className='input-group mb-3'> 
            {inputGroupList.map((inputGroup) => (
                <span>
                    {inputGroup.icon}
                </span>
                <input>
                    ... 
                </input>
            ))}
        </div>
    )
}

const DynamicFormComponent = () => {
    return (
        <form className='w-100 p-4 needs-validation' noValidate onSubmit={handleSubmit}>
            <InputGroups ></InputGroups>
        </form>
    )
}