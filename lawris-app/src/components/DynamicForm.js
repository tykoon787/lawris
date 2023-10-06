import React from 'react';

// const fields = [
//     { id: "case-number", name: "Case Number", type: "text", placeholder: "22 of 2023 or 22/23" },
//     { id: "names_of_deceased", type: "text", name: "Full Names of Deceased", placeholder: "OKWEMA WANJIKU" },
//     { id: "value", type: "text", name: "Value of the Deceased estate", placeholder: "2000" },
//     { id: "affiant", type: "text", name: "Affiant (Your Name)", placeholder: "Your Name" },
//     { id: "address", type: "text", name: "Address (Your Address)", placeholder: "P.O BOX 7766-00200" },
//     { id: "date_of_death", type: "date", name: "Date of Death of deceased", placeholder: "2001-08-21" },
//     { id: "state_of_death", type: "text", name: "State of Death", placeholder: "Kenya" },
//     { id: "name_of_advocate", type: "text", name: "Name of Advocate", placeholder: "OKUMU MAN" },
//     { id: "address_of_advocate", type: "text", name: "Addres of Advocate", placeholder: "OKUMU MAN" }
// ]

const FormInputFields = ({ formFields }) => {
    return (
        <div className="mb-3">
            {formFields.map((formField, index) => (
                <div className="form-floating mb-3" key={index}>
                    <input type={formField.type} className="form-control" placeholder={formField.placeholder} id={formField.id}></input>
                    <label htmlFor={formField.id} className="form-label">{formField.name}</label>
                </div>
            ))}
        </div>
    )
}

const DynamicForm = ({ formFields }) => {
    return (
        <form>
            <FormInputFields formFields={formFields} />
        </form>
    )
}

export default DynamicForm