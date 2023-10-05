import { Pipe, PipeTransform } from '@angular/core';
import { parsePhoneNumber, CountryCode } from 'libphonenumber-js/min';

@Pipe({
  name: 'phoneNumber'
})
export class PhoneNumberPipe implements PipeTransform {
  transform(rawNum:string) {
    rawNum = "+"+ rawNum;

    const countryCodeStr = rawNum.slice(0,2);
    const areaCodeStr = rawNum.slice(2,5);
    const firstSectionStr = rawNum.slice(5,8);
    const  midSectionStr = rawNum.slice(8,10);
    const lastSectionStr = rawNum.slice(10);

    return `${countryCodeStr}(${areaCodeStr}) ${firstSectionStr}-${midSectionStr}-${lastSectionStr}`;
  }

}
