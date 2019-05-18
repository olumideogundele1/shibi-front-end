import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {ProductService} from "../../../services/api-routes/product.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {NotificationService} from "../../../services/notification.service";
import {StoreService} from "../../../services/api-routes/store.service";
import {Ng4FilesService} from "../../../utils/ng4-files/services/ng4-files.service";
import {Upload} from "../../../utils/upload";
import {Ng4FilesConfig} from "../../../utils/ng4-files/declarations/ng4-files-config";
import {Ng4FilesSelected, Ng4FilesStatus} from "../../../utils/ng4-files/declarations/ng4-files-selected";
import * as firebase from "firebase";
import {CategoryService} from "../../../services/api-routes/category.service";
import {UserDataService} from "../../../services/api-routes/user-data.service";

declare const $;

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
public createProductForm: FormGroup;
public id = 0;
public productId = 0;
storeid: any;
showUpdate: boolean;
isReady: boolean;
  myLoader: boolean;
  userStore: any;
btnText: string;
  loaderBtn: boolean;
  loading: boolean;
  uploadPicture: boolean;
  picSelected: boolean;
  storePicProperty: Upload;
  pixSelected: any;
  selectedFiles: any;
  imageUrl: string;
  public categories: any[] = [];
  categoryId = 0;
  categoryName = '';

  orgObj: any;
  private testConfig: Ng4FilesConfig = {
    acceptExtensions: ['jpg', 'gif', 'png', 'jpeg'],
    maxFilesCount: 1,
    maxFileSize: 5120000,
    totalFilesSize: 5120000
  };
  inProgress: boolean;
  public globalProduct: any;
public list =
  {
    allProducts: [],
    allCategories: [],
    allQuantityTypes: [
      'SPOON',
      'UNIT',
      'WRAP',
      'PIECE',
      'BOTTLE',
    ]
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
      productName: ['', [Validators.required, Validators.minLength(3)]],
      Type: ['', [Validators.required, Validators.minLength(3)]],
      salePrice: ['', [Validators.required, Validators.minLength(3)]],
      categoryId: ['', [Validators.required, Validators.minLength(3)]],
      };
  }
  constructor( private userService: UserService,
               private productService: ProductService,
              private categoryService: CategoryService,
              private userDataService: UserDataService,
              private formBuilder: FormBuilder,
              private router: Router,
              private notification: NotificationService,
              private storeService: StoreService, private ng4FilesService: Ng4FilesService) {
    this.globalProduct = {
      productName: null,
      Type: null,
      salePrice: null,
      categoryId: null
    };
    this.showUpdate = false;
    this.createProductForm = this.formBuilder.group(this.formData());
  }

  ngOnInit() {
    this.myLoader = false;
    this.isReady = false;
    this.getProducts(this.p - 1);
    this.getCategories(this.id);
    this.getStore();
  }



  getProducts(pageNo) {
    this.booleans.loader = true;
    this.productService.getAllProducts(pageNo).subscribe(
      (response) => {
        this.list.allProducts = response;
        this.booleans.loader = false;
      },
      error => {
        this.booleans.loader = false;
        this.notification.error('Unable to load products', error);
      }
    );
  }

  createProduct() {
    this.booleans.submitLoader = true;
    console.log('this.createProductForm', this.createProductForm);
    const user = this.userService.getAuthUser().id;
    console.log(this.userService.getAuthUser().id);
    console.log(this.userDataService.getUser(user));
    this.createProductForm.value['categoryId'] = this.categoryId;
   const storeid = this.userStore;
    console.log(storeid);
    const productData = {
      storeId: storeid
    };
    const newData = Object.assign(productData, this.createProductForm.value);
    console.log('new Data', newData);
    this.uploadToFirebase(this.storePicProperty, newData);
  }
  public uploadToFirebase(storePicProperty: Upload, newData) {
    const path = 'storeImg';
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${path}/${storePicProperty.file.name}`).put(storePicProperty.file);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        storePicProperty.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log('File Upload failed', error);
      },
      () => {
        // upload.url = uploadTask.snapshot.getDownloadURL;
        console.log('Hello world ', uploadTask.snapshot);
        storePicProperty.url = uploadTask.snapshot.downloadURL;
        this.uploadToDB(storePicProperty.url, newData);
      }
    );
  }
  public onSelected(event) {
    this.categoryId = event.categoryId;
    console.log('Úser select ', event);
  }
  handler() {
    console.log('Clicked');
  }
  public onDeselected(event) {
    console.log('Úser select ', event);
  }
  public uploadToDB(url, data) {
    console.log('ÚRL : ', url);
    data['productImage'] = url;
    this.productService.createProduct(data).subscribe(
      (response) => {
        console.log('this is response', response);
        // this.uploadImage.upload(JSON.parse(JSON.parse(JSON.stringify(response))._body).id);
        this.notification.success('Product is successfully created');
        this.booleans.submitLoader = false;
        this.list.allProducts['content'].unshift(response);
        $('#modal-slideinright').modal('hide');
      },
      error => {
        this.booleans.submitLoader = false;
        this.notification.error(error);
      }
    );
  }

  updateProduct() {
    this.booleans.submitLoader = true;
    this.productService.updateProduct(this.createProductForm.value).subscribe(
      (response) => {
        this.booleans.submitLoader = false;
        this.booleans.showUpdate = false;
        this.notification.success('Update was successful');
        this.list.allProducts['content'].forEach((val, i) => {
          if (+val.id === +this.id) {
            val = response;
          }
        });
        $('modal-slideinright').modal('hide');
      },
      error => {
        this.booleans.submitLoader = false;
        this.notification.error('Unable to update product', error);
      }
      );
  }

  onSubmit() {
    if (this.booleans.showUpdate) {
      this.updateProduct();
    } else {
      this.createProduct();
    }
  }

  createNewProduct(): void {
    this.isReady = true;
    this.showUpdate = false;
    this.btnText = 'Submit';
    setTimeout( () => {
      this.openModal();
    }, 20);
  }

  openModal() {
    $('#modal-slideinright').modal('show');
  }

  closeModal() {
    this.createProductForm.reset();
    this.booleans.showUpdate = true;
  }

  onChangeStatus(product, event) {
    this.productService.toggleProduct(product.productId).subscribe(
      (response) => {
        this.notification.success('product status was successfully changed');
      },
      error => {
        this.notification.error('unable to toggle product', error);
      }
    );
  }

  onEdit(product) {
    this.isReady = true;
    this.globalProduct = JSON.parse(JSON.stringify(product));
    this.showUpdate = true;
    this.btnText = 'Update';
    this.createProductForm.value['categoryId'] = this.categoryId;
    const formData = () => {
      return {
        id: [product.id, Validators.compose(([]))],
        productName: [product.productName, Validators.compose([Validators.required])],
        Type: [product.Type, Validators.compose([Validators.required])],
        salePrice: [product.salePrice, Validators.compose([Validators.required])],
        categoryId: [product.categoryId, Validators.compose([Validators.required])],
      };
    };
  }
  filesSelect(selectedFiles: Ng4FilesSelected): void {
    console.log('Event:', selectedFiles.files);
    this.pixSelected = selectedFiles.files[0];
    this.storePicProperty = new Upload(this.pixSelected);
    const reader = new FileReader();
    reader.onloadend = () => {
      this.picSelected = true;
      // Assign the result to variable for setting the src of image element
      this.imageUrl = reader.result;
    };
    reader.readAsDataURL(selectedFiles.files[0]);
    if (selectedFiles.status !== Ng4FilesStatus.STATUS_SUCCESS) {
      this.selectedFiles = selectedFiles.status;
      return;
      // Handle error statuses here
    }

    this.selectedFiles = Array.from(selectedFiles.files).map(file => file.name);
    console.log('selected files: ', this.selectedFiles);
  }
  removeSelectedPicture() {
    this.imageUrl = '';
    this.selectedFiles = '';
    this.picSelected = false;

  }
  updateStorePicture() {
    const file = this.pixSelected;
    this.storePicProperty = new Upload(file);
    console.log('prof: ', this.storePicProperty, file);
    // this.uploadStoreImage.uploadPicture(this.storePicProperty, 'organisation');

  }
  updateUploadImg(evt) {
    console.log('Finish pix upload', evt);
    this.uploadPicture = false;
    this.orgObj['logoPath'] = evt;
  }
  getCategories(data) {
    this.booleans.loader = true;
    this.categoryService.getAllCategory(data).subscribe(
    (response) => {
        console.log('all categories', response);
      this.categories = response.content;
      this.booleans.loader = false;
      this.myLoader = true;
    },
      error => {
        console.log(error);
        this.notification.error('unable to load categories', error);
        this.booleans.loader = false;
      }
    );
  }
 public getStore() {
    const data = this.userService.getAuthUser().id;
    this.userDataService.getUser(data).subscribe(
      (response) => {
        console.log('User', response);
        this.userStore = response['stores']['storeId'];
      },
      error => {
        console.log(error);
      }
    );
 }


}
