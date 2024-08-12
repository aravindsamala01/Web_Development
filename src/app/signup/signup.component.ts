import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, this.validateName]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      address: ['', Validators.required],
      university: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, { validator: this.passwordMatchValidator });
  }

  validateName(control: any): { [key: string]: boolean } | null {
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!control.value.match(nameRegex)) {
      return { 'invalidName': true };
    }
    return null;
  }

  passwordMatchValidator(form: FormGroup): { [key: string]: boolean } | null {
    return form.get('password').value === form.get('confirmPassword').value ? null : { 'mismatch': true };
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);
    }
  }
}
