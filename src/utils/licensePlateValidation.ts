
const LICENSE_PLATE_REGEX = '[A-Z]{3}[0-9][0-9A-Z][0-9]{2}';

export const licensePlateValidation = (licensePlate : string)=>{
    const isLicenseValid = licensePlate.toUpperCase().match(LICENSE_PLATE_REGEX);
    return isLicenseValid;
};
