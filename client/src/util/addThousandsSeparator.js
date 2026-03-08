
export const addThousandsSeparator = (num) => {
    
    if ( num == null || isNaN(num)) return "";

    const numStr = num.toString();
    const parts = numStr.split(".");

    let integralPart = parts[0]
    let fractionalPart = parts[1]


    const lastThree = integralPart.substring(integralPart.length - 3);
    const otherNumbers = integralPart.substring(0, integralPart.length - 3);

    if(otherNumbers !== '') {

        const formattedOtherNumbers = otherNumbers.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        integralPart = formattedOtherNumbers + ',' + lastThree;

    }else {

        integralPart = lastThree;
    }

    return fractionalPart ? `${integralPart}.${fractionalPart}` : integralPart;
}