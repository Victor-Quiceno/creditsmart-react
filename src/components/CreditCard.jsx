import React from "react";

// props
export const CreditCard = ({ credit }) => {

    const{
        name,
        desciption,
        minAmount,
        maxAmount,
        interestRate,
        maxTerm,
        requeriments,
        icon,
    } = credit;

    return (
        <div className='credit-card'>
            <div className='card-header'>
                <span className='icon'>{icon}</span>
                <h4>{name}</h4>
            </div>

            <p className='description'>{desciption}</p>
            <p className='details'> </p>

            <div className='detail-item'>
                <span>className='label</span>
            </div>
        </div>
    )
};