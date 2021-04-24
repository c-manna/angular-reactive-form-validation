import { Component, VERSION } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from './must-match.validator';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
     registerForm: FormGroup;
    submitted = false;

    constructor(private formBuilder: FormBuilder) {
      setTimeout(() => {
      this.registerForm.controls['firstName'].disable();
      this.registerForm.controls['lastName'].enable();
    }, 2000)
     }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            //'firstName': new FormControl({value: 'hello', disabled: true}),
            title: ['', Validators.required],
            firstName: ['first', [Validators.required]],
            lastName: [{value: 'last',disabled: true}, Validators.required],
            // validates date format yyyy-mm-dd
            dob: ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', Validators.required],
            acceptTerms: [false, Validators.requiredTrue]
        }, {
            validator: MustMatch('password', 'confirmPassword')
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        // display form values on success
        alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
    }

    onReset() {
        this.submitted = false;
        this.registerForm.reset();
    }

}
