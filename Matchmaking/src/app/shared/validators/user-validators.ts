import { ValidatorFn, FormGroup } from '@angular/forms';

export function createValidatorText(cntName: string, min: number, max: number,pattern?: RegExp): Array<ValidatorFn>  {
    return [
       
      f => !f.value ? { "val": ` ${cntName}  שדה חובה` } : null,
      f => f.value && f.value.length > max ? { "val": ` שדה ${cntName} מכיל עד ${max} תווים ` } : null,
      f => f.value && f.value.length < min ? { "val": `${cntName} מינימום ${min} תווים` } : null,
      f => pattern && f.value && !f.value.match(pattern) ? { "val": `${cntName} לא תואם את התבנית` } : null,
    ];
  }

  export function createValidatorEmail(cntName: string, min: number, max: number,pattern?: RegExp): Array<ValidatorFn>  {
    return [
       
      f => f.value && f.value.length > max ? { "val": ` שדה ${cntName} מכיל עד ${max} תווים ` } : null,
      f => f.value && f.value.length < min ? { "val": `${cntName} מינימום ${min} תווים` } : null,
      f => pattern && f.value && !f.value.match(pattern) ? { "val": `${cntName} לא תואם את התבנית` } : null,
    ];
  }

  export function createValidatorNumber(cntName: string, min: number, max: number): Array<ValidatorFn>  {
    return [
      f => !f.value ? { "val": ` ${cntName}  שדה חובה`  } : null,
      f => f.value && Number( f.value) > max ? { "val": `${cntName} מקסימום עד ${max}` } : null,
      f => f.value && Number( f.value)< min ? { "val": `${cntName} מינימום עד ${min}` } : null,
    ];
  }

  export function createValidatorBirthday(cntName: string): Array<ValidatorFn>  {
    return [
      f => !f.value ? { "val": ` ${cntName}  שדה חובה` } : null,
      f=>f.value&&new Date().getFullYear()-new Date(f.value).getFullYear()<16?{ "val": `הגיל חיב להיות לפחות 16 שנים` } : null
    ];
  }

    export function validatePassword(group: FormGroup) {
      var pw = group.controls['password'];
      var pw2 = group.controls['confirmPassword'];
      if(pw&&pw2)
       pw.value !=pw2.value?pw2.setErrors({'incorrect': "passwords not confirm"}):pw2.clearValidators();
      return null;
    }
