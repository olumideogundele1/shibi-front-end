import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NotificationService} from "../../../services/notification.service";
import {CategoryService} from "../../../services/api-routes/category.service";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";

declare const $;

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
public createCategoryForm: FormGroup;
  loaderBtn: boolean;
  loading: boolean;
  showUpdate: boolean;
  isReady: boolean;
  btnText: string;
  public id = 0;
  public globalCategory: any;
  public list =
    {
      allCategories: []
    };
  public p = 1;
  /* To spin the click or submit event*/
  public booleans = {
    submitLoader: false,
    loader: false,
    showUpdate: false,
    loadingStatus: false,
  };
  public formData = () => {
    return {
      categoryName: ['', [Validators.required, Validators.minLength(3)]],

    };
  }
  constructor(private categoryService: CategoryService,
              private formBuilder: FormBuilder,
              private notification: NotificationService,
              private userService: UserService,
              private router: Router) {
    this.globalCategory = {
      categoryName: null
    };
    this.showUpdate = false;
    this.createCategoryForm = this.formBuilder.group(this.formData());
  }

  ngOnInit() {
    this.isReady = false;
    this.getCategories(this.p - 1);
  }
  getPage(event) {
    this.p += event;
    this.getCategories(this.p - 1);
  }

  getCategories(pageNo) {
    this.booleans.loader = true;
    this.categoryService.getAllCategory(pageNo).subscribe(
      (response) => {
        this.list.allCategories = response;
        this.booleans.loader = false;
      },
      error => {
        this.booleans.loader = false;
        this.notification.error('Unable to load categories', error);
      }
    );
  }

  createCategory() {
    this.booleans.submitLoader = true;
    console.log('this.createCategoryForm', this.createCategoryForm);
    this.categoryService.createCategory(this.createCategoryForm.value).subscribe (
      (response) => {
          this.notification.success('New category is created successfully');
          this.booleans.submitLoader = false;
          this.list.allCategories['content'].unshift(response);
          $('#modal-slideinright').modal('hide');
      },
      error => {
        this.booleans.submitLoader = false;
        this.notification.error('Unable to create category', error);
      }
    );
  }

  updateCategory() {
    this.booleans.submitLoader = true;
    this.categoryService.updateCategory(this.createCategoryForm.value).subscribe(
      (response) => {
        this.booleans.submitLoader = false;
        this.booleans.showUpdate = false;
        this.notification.success('Update was successful');
        this.list.allCategories['content'].forEach((val, i) => {
          if (+val.id === +this.id) {
            val = response;
          }
        });
        $('modal-slideinright').modal('hide');
      },
      error => {
        this.booleans.submitLoader = false;
        this.notification.error('Unable to update category ')
      }
    );
  }
  onSubmit() {
    if (this.booleans.showUpdate) {
      this.updateCategory();
    } else {
      this.createCategory();
    }
  }
  createNewCategory(): void {
    this.isReady = true;
    this.showUpdate = false;
    this.btnText = 'Submit';
    setTimeout( () => {
      this.openModal();
    }, 20);
  }
  openModal( ) {
    $('#modal-slideinright').modal('show');
  }

  closeModal() {
    this.createCategoryForm.reset();
    this.booleans.showUpdate = true;
  }

  onChangeStatus(category, event) {
    console.log('category', category)
    this.categoryService.toggleCategory(category.categoryId).subscribe(
      (response) => {
        this.notification.success('category status was successfully changed');
      },
      error => {
        this.notification.error('unable to toggle category', error);
      }
    );
  }
  onEdit(category) {
    this.isReady = true;
    this.globalCategory = JSON.parse(JSON.stringify(category));
    this.showUpdate = true;
    this.btnText = 'Update';

    const formData = () => {
      return {
        id: [category.id, Validators.compose(([]))],
        categoryName: [category.name, Validators.compose([Validators.required])],

      };
    };
  }
}
