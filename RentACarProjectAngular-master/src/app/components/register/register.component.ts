import { OperationClaim } from './../../models/operationClaim';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { OperationClaimService } from './../../services/operation-claim.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private operationClaimService: OperationClaimService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getOperationClaims();
    this.birthYearsCreate();
  }

  operationClaims: OperationClaim[] = [];
  getOperationClaims() {
    this.operationClaimService.getOperationClaims().subscribe((response) => {
      this.operationClaims = response.data;
      this.createRegisterForm();
    });
  }

  getRole() {
    return this.authService.getRole();
  }

  birthYears = [1960];
  birthYearsCreate() {
    for (let i = 1961; i <= 2005; i++) {
      this.birthYears.push(i);
    }
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      nationalityId: ['', Validators.required],
      birthYear: ['', Validators.required],
      password: ['', Validators.required],
      claimId: [
        this.operationClaims.find((o) => o.claimName == 'Müşteri').claimId,
        Validators.required,
      ],
    });
  }

  register() {
    if (this.registerForm.valid) {
      let registerModel = Object.assign({}, this.registerForm.value);
      this.authService.register(registerModel).subscribe(
        (response) => {
          this.toastrService.success(response.message);
          if (!this.getRole()) {
            localStorage.setItem('token', response.data.token);
            this.router.navigate(['']);
          } else {
            setTimeout(this.pageRefresh, 2000);
          }
        },
        (responseError) => {
          this.toastrService.error(responseError.error, 'Hata');
        }
      );
    } else {
      this.toastrService.error('Form Tamamlanmadı', 'Hata');
    }
  }
  pageRefresh() {
    window.location.reload();
  }
}
