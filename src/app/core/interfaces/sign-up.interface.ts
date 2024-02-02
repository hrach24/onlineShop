import { Form, FormControl } from "@angular/forms";

export interface ISignUpForm {
  name: FormControl<string>;
  surname: FormControl<string>;
  email: FormControl<string>;
  phoneNumber: FormControl<string>;
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
  companyName?: FormControl<string>;
  companyPassword?: FormControl<string>
}

export interface ILoginForm {
  email: FormControl<string>;
  password: FormControl<string>;
}
