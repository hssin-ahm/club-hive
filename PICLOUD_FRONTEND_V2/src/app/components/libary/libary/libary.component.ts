import {
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
} from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FilesService } from 'src/app/services/libary/files.service';
import { saveAs } from 'file-saver';
import { PeoplesData, Person } from '../../../core/dummy-datas/peoples.data';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Category } from 'src/app/services/libary/Category';
import { SweetAlertService } from 'src/app/services/chat/sweet-alert.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-libary',
  templateUrl: './libary.component.html',
  styleUrls: ['./libary.component.scss'],
})
export class LibaryComponent implements OnInit {
  myForm: FormGroup | undefined;
  catForm: FormGroup | undefined;

  categories: Category[];
  resources;

  ngOnInit(): void {
    this.getAllCateg();

    this.getAllResources();
  }

  getAllCateg() {
    this.fileService.getAllCate().subscribe((data: Category[]) => {
      this.categories = data;
    });
  }

  getAllResources() {
    this.fileService.getAllResources().subscribe((data) => {
      this.resources = data;
      console.log(data);
    });
  }

  uploadedfiles: any;
  filenames: string[] = [];
  fileStatus = { status: '', requestType: '', percent: 0 };

  constructor(
    private fileService: FilesService,
    private alert: SweetAlertService,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) {
    this.myForm = this.fb.group({
      name: new FormControl(''),
      description: new FormControl(''),
      category: new FormControl(),
    });

    this.catForm = this.fb.group({
      name: new FormControl(''),
    });
  }
  onUploadFiles(event): void {
    let files: File[] = null;
    files = <File[]>event.target.files;
    const formData = new FormData();
    for (const file of files) {
      formData.append('files', file, file.name);
    }
    this.fileService.upload(formData).subscribe(
      (event) => {
        console.log(event);
        this.resportProgress(event);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  // define a function to download files
  onDownloadFile(filename: string): void {
    this.fileService.download(filename).subscribe(
      (event) => {
        console.log(event);
        this.resportProgress(event);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  private resportProgress(httpEvent: HttpEvent<string[] | Blob>): void {
    switch (httpEvent.type) {
      case HttpEventType.UploadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Uploading... ');
        break;
      case HttpEventType.DownloadProgress:
        this.updateStatus(
          httpEvent.loaded,
          httpEvent.total!,
          'Downloading... '
        );
        break;
      case HttpEventType.ResponseHeader:
        console.log('Header returned', httpEvent);
        break;
      case HttpEventType.Response:
        if (httpEvent.body instanceof Array) {
          this.fileStatus.status = 'done';
          this.uploadedfiles = httpEvent.body;
          for (const file of this.uploadedfiles) {
            this.filenames.unshift(file.name);
          }
        } else {
          saveAs(
            new File([httpEvent.body!], httpEvent.headers.get('File-Name')!, {
              type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`,
            })
          );
          // saveAs(new Blob([httpEvent.body!],
          //   { type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`}),
          //    httpEvent.headers.get('File-Name'));
        }
        this.fileStatus.status = 'done';
        break;
      default:
        console.log(httpEvent);
        break;
    }
  }

  private updateStatus(
    loaded: number,
    total: number,
    requestType: string
  ): void {
    this.fileStatus.status = 'progress';
    this.fileStatus.requestType = requestType;
    this.fileStatus.percent = Math.round((100 * loaded) / total);
  }
  validForm: FormGroup | undefined;

  submitForm() {
    const category: Category = this.categories.find(
      (e) => e.id == this.myForm.value.category
    );
    this.validForm = this.fb.group({
      name: this.myForm.value.name,
      description: this.myForm.value.description,
      category: category,
      filesName: new Array<any>(this.uploadedfiles),
    });

    this.fileService.addResource(this.validForm.value).subscribe((data) => {
      console.log(data);
      this.getAllResources();
      this.alert.openAlertMixin(`successfully added`, 'top-end', 'success');
    });

    this.myForm.reset();
  }
  getResources(cat: Category): any {
    return this.resources.filter((r) => {
      if (r.category != null && r.category.name == cat.name) {
        return r;
      }
    });
  }

  getImagewithResourceType(filename) {
    const extention = filename.slice(-3);

    switch (extention.toLowerCase()) {
      case 'mp4':
        return 'video.png';
      case 'pdf':
        return 'pdf.png';
      case 'ocx':
        return 'doc.png';
      default:
        return 'default.png';
    }
  }
  basicModalCloseResult: string = '';

  openBasicModal(content: TemplateRef<any>) {
    this.modalService
      .open(content, {})
      .result.then((result) => {
        if (result != 'by: close button') {
          this.fileService.addCat(this.catForm.value).subscribe((data) => {
            console.log(data);
            this.alert.openAlertMixin(
              `successfully added`,
              'top-end',
              'success'
            );
            this.getAllCateg();
            this.catForm.reset();
          });
        }
      })
      .catch((res) => {});
  }
  onaddCat() {
    this.fileService.addCat(this.catForm.value).subscribe((data) => {
      console.log(data);
      this.alert.openAlertMixin(`successfully added`, 'top-end', 'success');
      this.getAllCateg();
      this.catForm.reset();
    });
  }
}
