import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NotificationService} from '../../../services/notification.service';
import {Upload} from '../../../utils/upload';
import {Ng4FilesConfig} from '../../../utils/ng4-files/declarations/ng4-files-config';
import {Ng4FilesService} from '../../../utils/ng4-files/services/ng4-files.service';
import {Ng4FilesSelected, Ng4FilesStatus} from '../../../utils/ng4-files/declarations/ng4-files-selected';
import {StoreService} from '../../../services/api-routes/store.service';
import {UploadImageService} from '../../../services/api-routes/upload-image.service';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';
import * as firebase from 'firebase';
declare const $;

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css']
})


export class StoresComponent implements OnInit {
  userId: number;
  userObj: any;
  loaderBtn: boolean;
  loading: boolean;
  uploadPicture: boolean;
  picSelected: boolean;
  storePicProperty: Upload;
  pixSelected: any;
  selectedFiles: any;
  imageUrl: string;
  orgObj: any;
  private testConfig: Ng4FilesConfig = {
    acceptExtensions: ['jpg', 'gif', 'png', 'jpeg'],
    maxFilesCount: 1,
    maxFileSize: 5120000,
    totalFilesSize: 5120000
  };
  inProgress: boolean;
  public createStoreForm: FormGroup;
  public role: any;
  public id = 0;
  public globalStore: any;
  showUpdate: boolean;
  isReady: boolean;
  btnText: string;
  public list = {
    allStores: []
  };
  public p = 1;

  public booleans = {
    submitLoader: false,
    loader: false,
    showUpdate: false,
    loadingStatus: false,
  };
  public formData = () => {
    return {
      storeName: ['', [Validators.required, Validators.minLength(3)]],
      storeLocation: ['', [Validators.required, Validators.minLength(3)]],
    };
  }
  constructor(
    private ng4FilesService: Ng4FilesService,
    private formBuilder: FormBuilder,
    private notification: NotificationService,
    private storeService: StoreService,
    private uploadImage: UploadImageService,
    private userService: UserService,
    private router: Router

  ) {
this.globalStore = {
  storeName: null,
  storeLocation: null
};
const user = userService.getAuthUser().userId;
if (this.getUserStore(user)) {
  this.router.navigateByUrl('/admin/products');
} else {
  this.router.navigateByUrl('/admin/stores');
}
this.showUpdate = false;
this.createStoreForm = this.formBuilder.group(this.formData());
// this.role = this.userService.getAuthUser()[ 'roles'][0];
// console.log('this is role', this.role);
//
// if (this.role === 'ROLE_SUPERADMIN' || this.role === 'ROLE_ADMIN') {
//     this.router.navigateByUrl('/admin/');
// }
  }

  ngOnInit() {
   this.loading = true;
    this.loaderBtn = false;
    this.uploadPicture = false;
    this.picSelected = false;
    this.inProgress = false;
  }
  getPage(event) {
    this.p += event;
    this.getStores(this.p - 1);
  }
  getStores(pageNo) {
    this.booleans.loader = true;
    this.storeService.getAllStores(pageNo).subscribe(
      (response) => {
        this.list.allStores = response;
        this.booleans.loader = false;
      },
      error => {
        this.booleans.loader = false;
        this.notification.error('Unable to load store');
      }
    );
  }
  getUserStore(pageNo): boolean {
    this.storeService.getAllStores(pageNo).subscribe(
      () => {
       return true;
      },
      () => {
        return false;
      }
    );
    return false;
  }
  createStore() {

    this.booleans.submitLoader = true;
    console.log('this.createStoreForm', this.createStoreForm);
    this.userId = this.userService.getAuthUser().id;
    const storeData = {
      userId: this.userId
    };
  const newData =  Object.assign(storeData, this.createStoreForm.value);
    console.log('newData', newData, 'userId', this.userService.getAuthUser());
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
  public uploadToDB(url, data) {
    console.log('ÚRL : ', url);
    data['storeImage'] = url;
    this.storeService.createStore(data).subscribe(
      (response) => {
        console.log('this is response', response);
        // this.uploadImage.upload(JSON.parse(JSON.parse(JSON.stringify(response))._body).id);
        this.notification.success('New Store is successfully created');
        this.booleans.submitLoader = false;
        // this.list.allStores['content'].unshift(response);
        $('#modal-slideinright').modal('hide');
      },
      error => {
        this.booleans.submitLoader = false;
        this.notification.error(error);
      }
    );
  }
  updateStore() {
    this.booleans.submitLoader = true;
    // this.createForm.value['roleId'];
    this.storeService.updateStore(this.createStoreForm.value).subscribe(
      (response) => {
        this.booleans.submitLoader = false;
        this.booleans.showUpdate = false;
        this.notification.success('Update was successful');
        this.list.allStores['content'].forEach((val, i) => {
          if (+val.id === this.id) {
            val = response;
          }
        });
        $('#modal-slideinright').modal('hide');
        },
      error => {
        this.booleans.submitLoader = false;
        this.notification.error('Unable to update store', error);
      }
    );
  }
  onSubmit() {
    if (this.booleans.showUpdate) {
      this.updateStore();
      this.router.navigateByUrl('/admin/products');
    } else {
      this.createStore();
      this.router.navigateByUrl('/admin/products');
    }
  }

  createNewStore(): void {
    this.isReady = true;
    this.showUpdate = false;
    this.btnText = 'Submit';
    setTimeout(() => {
      this.openModal();
    }, 20);
  }
  openModal() {
    $('#modal-slideinright').modal('show');
  }
  closeModal() {
    this.createStoreForm.reset();
    this.booleans.showUpdate = true;
  }
  onChangeStatus(store, event) {
    this.storeService.toggleStore(store.storeId).subscribe(
      (response) => {
        this.notification.success('Store status was successfully changed');
      },
      error => {
        this.notification.error('unable to toggle store', error);
      }
    );
  }
  onEdit(store) {
    this.isReady = true;
    this.globalStore = JSON.parse(JSON.stringify(store));
    this.showUpdate = true;
    this.btnText = 'Update';
    setTimeout(() => {
      this.openModal();
    }, 20);
    const formData = () => {
      return {
        id: [store.id, Validators.compose(([]))],
        storeName: [store.storeName, Validators.compose([Validators.required])],
        storeLocation: [store.storeLocation, Validators.compose([Validators.required])]
      };
    };
  }

  enablePicture() {
    this.uploadPicture = true;
  }

  /**
   * Allows user select image for upload
   * @param {Ng4FilesSelected} selectedFiles
   */
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



}
