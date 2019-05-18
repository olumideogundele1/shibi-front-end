import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {environment} from "../../../environments/environment";


@Injectable()
export class UploadImageService {

private stores = environment.API_URL.store;
filesToUpload: Array<File>;

  constructor(private http: HttpClient) {
    this.filesToUpload = [];
  }

  upload(storeId: number) {
    this.makeFileRequest(`${this.stores}/create/image?id=` + storeId, [], this.filesToUpload )
      .then((result) => {
        console.log(result);
      }, (error) => {
        console.log(error);
      });
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>> fileInput.target.files;
  }

  makeFileRequest(url: string, params: Array<string>, files: Array<File> ) {
    return new Promise((resolve, reject) => {
      let formData: any = new FormData();
      let xhr = new XMLHttpRequest();

      for ( let i = 0; i < files.length; i++) {
         formData.append('uploads[]', files[i], files[i].name);
      }
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log('image uploaded successfully!');
          } else {
            reject(xhr.response);
          }
      }
      };
      xhr.open('POST', url, true);
      xhr.setRequestHeader('x-auth-token', localStorage.getItem('xauthToken'));
      xhr.send(formData);
    });
  }

  // pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
  //
  //   let formdata: FormData = new FormData();
  //
  //   formData.append('file', file);
  //
  //   const req = new HttpRequest('POST', '/post', formdata,{
  //     reportProgress: true,
  //     responseType: 'text'
  //   });
  //
  //   req.


}
