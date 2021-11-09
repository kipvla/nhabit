import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { ApiClientService } from 'src/app/services/api-client/api-client.service';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss'],
})
export class CreateGameComponent implements OnInit {
  myForm: FormGroup;
  slide = this.fb.group({
    buttonText: ['Click me', Validators.required],
    commentary: [
      'There is no right or wrong way to click',
      Validators.required,
    ],
    delay: 700,
  });
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private firebaseService: FirebaseService,
    private apiClientService: ApiClientService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      title: ['', Validators.required],
      slides: this.fb.array([this.slide]),
    });
  }

  get slideForms() {
    return this.myForm.get('slides') as FormArray;
  }

  get title() {
    return this.myForm.get('title');
  }

  addSlide() {
    this.slideForms.push(this.slide);
  }

  deleteSlide(i: number) {
    this.slideForms.removeAt(i);
  }

  addGame() {
    this.isLoading = true;
    this.firebaseService.firebaseAuth.authState.subscribe(res => {
      if (res) {
        console.log({
          email: res.email,
          ...this.myForm.value
        })
        this.apiClientService.createGame({
          email: res.email,
          ...this.myForm.value
        }).subscribe(res => {
          this.isLoading = false;
          this.snackBar.open('Game submitted!', 'Dismiss', {duration: 5000})
          console.log('Game created ', res)
        });
      } else {
        this.router.navigate(['/']);
      }
      this.myForm = this.fb.group({
        title: ['', Validators.required],
        slides: this.fb.array([this.slide]),
      });
    })
  }
}
