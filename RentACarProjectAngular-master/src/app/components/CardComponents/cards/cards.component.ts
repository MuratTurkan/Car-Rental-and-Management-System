import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Card } from 'src/app/models/card';
import { CardDetailDto } from 'src/app/models/cardDetailDto';
import { User } from 'src/app/models/user';
import { CardService } from 'src/app/services/card.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
})
export class CardsComponent implements OnInit {
  cardDetailDtos: CardDetailDto[] = [];
  cardAddForm: FormGroup;

  cardUpdateAndDeleteForm: FormGroup;
  card: Card = {
    cardId: 0,
    userId: 0,
    fullName: '',
    cardNo: 0,
    expiryDate: undefined,
    cvv: 0,
  };

  users: User[] = [];

  dataLoaded = false;
  constructor(
    private formBuilder: FormBuilder,
    private cardService: CardService,
    private userService: UserService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute
  ) {}

  cardFilter = '';

  ngOnInit(): void {
    this.getCardDetailDtos();
    this.getUsers();
    this.createCardAddForm();
    this.createCardUpdateAndDeleteForm();
  }

  getCardDetailDtos() {
    this.cardService.getCardDetailDtos().subscribe((response) => {
      this.cardDetailDtos = response.data;
      this.dataLoaded = true;
    });
  }

  getUsers() {
    this.userService.getUsers().subscribe((response) => {
      this.users = response.data;
    });
  }

  createCardDetail(cardId: number) {
    this.cardService.detailCard(cardId).subscribe((response) => {
      this.card = response.data;
      this.createCardUpdateAndDeleteForm();
    });
  }

  createCardUpdateAndDeleteForm() {
    this.cardUpdateAndDeleteForm = this.formBuilder.group({
      cardId: [this.card.cardId, Validators.required],
      userId: [this.card.userId, Validators.required],
      fullName: [this.card.fullName, Validators.required],
      cardNo: [this.card.cardNo, Validators.required],
      expiryDate: [this.card.expiryDate, Validators.required],
      cvv: [this.card.cvv, Validators.required],
    });
  }

  createCardAddForm() {
    this.cardAddForm = this.formBuilder.group({
      userId: ['', Validators.required],
      fullName: ['', Validators.required],
      cardNo: ['', Validators.required],
      expiryDate: ['', Validators.required],
      cvv: ['', Validators.required],
    });
  }

  add() {
    if (this.cardAddForm.valid) {
      let cardModel = Object.assign({}, this.cardAddForm.value);
      this.cardService.addCard(cardModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          setTimeout(this.pageRefresh,2000);
        },
        (responseError) => {
          if (
            responseError.error.ValidationErrors &&
            responseError.error.ValidationErrors.length > 0
          ) {
            for (
              let i = 0;
              i < responseError.error.ValidationErrors.length;
              i++
            ) {
              this.toastrService.error(
                responseError.error.ValidationErrors[i].ErrorMessage,
                'Doğrulama Hatası'
              );
            }
          } else {
            this.toastrService.error(responseError.error.message, 'Hata');
          }
        }
      );
    } else {
      this.toastrService.error('Form Tamamlanmadı','Hata');
    }
  }

  delete() {
    if (this.cardUpdateAndDeleteForm.valid) {
      let cardModel = Object.assign({}, this.cardUpdateAndDeleteForm.value);
      this.cardService.deleteCard(cardModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          setTimeout(this.pageRefresh,2000);
        },
        (responseError) => {
          if (
            responseError.error.ValidationErrors &&
            responseError.error.ValidationErrors.length > 0
          ) {
            for (
              let i = 0;
              i < responseError.error.ValidationErrors.length;
              i++
            ) {
              this.toastrService.error(
                responseError.error.ValidationErrors[i].ErrorMessage,
                'Doğrulama Hatası'
              );
            }
          } else {
            this.toastrService.error(responseError.error.message, 'Hata');
          }
        }
      );
    } else {
      this.toastrService.error('Form Tamamlanmadı','Hata');
    }
  }

  update() {
    if (this.cardUpdateAndDeleteForm.valid) {
      let cardModel = Object.assign({}, this.cardUpdateAndDeleteForm.value);
      this.cardService.updateCard(cardModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          setTimeout(this.pageRefresh,2000);
        },
        (responseError) => {
          if (
            responseError.error.ValidationErrors &&
            responseError.error.ValidationErrors.length > 0
          ) {
            for (
              let i = 0;
              i < responseError.error.ValidationErrors.length;
              i++
            ) {
              this.toastrService.error(
                responseError.error.ValidationErrors[i].ErrorMessage,
                'Doğrulama Hatası'
              );
            }
          } else {
            this.toastrService.error(responseError.error.message, 'Hata');
          }
        }
      );
    } else {
      this.toastrService.error('Form Tamamlanmadı','Hata');
    }
  }
  pageRefresh(){
    window.location.reload()
  }
}
