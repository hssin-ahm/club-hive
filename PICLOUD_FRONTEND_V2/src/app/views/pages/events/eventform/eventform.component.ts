import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtService } from 'src/app/services/jwt.service';
import { ImageService } from 'src/app/services/eventModule/image.service';
import { Image } from 'src/app/model/image';
import Swal from 'sweetalert2';
import { EventService } from 'src/app/services/eventModule/event.service';
import { end } from '@popperjs/core';
import { CropperComponent } from 'angular-cropperjs';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-eventform',
  templateUrl: './eventform.component.html',
  styleUrls: ['./eventform.component.scss']
})
export class EventformComponent implements OnInit {
  @ViewChild('angularCropper') public angularCropper: CropperComponent;
 
  imageUrl: string = 'assets/images/others/placeholder.jpg';
  resultImage: any;
 
  // Plugin configuration
  config = {
    zoomable: false
  };
  image: File | null = null;
  eventForm: FormGroup;
  events: any;
  eventTypes: string[] = ['Hackathon', 'Formation', 'Dons', 'Crowfunding', 'Other'];
 
  constructor(private formBuilder: FormBuilder, private jwtService: JwtService, 
    private imageService: ImageService, private eventService: EventService, private router: Router) {
    this.eventForm = this.formBuilder.group({
      eventTitle: ['', Validators.required],
      eventDescription: ['', Validators.required],
      eventImage: [null],
      maxParticipants: ['', Validators.required],
      eventType: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      location: ['', Validators.required],
      isPublic: ['', Validators.required],
      creator: [null],
        // other fields...
        isFree: [true],
      price: [{value: '', disabled: true}, Validators.min(0)],
        // other fields...
 
 
    });
    this.eventForm.get('isFree').valueChanges.subscribe(isFree => {
      const priceControl = this.eventForm.get('price');
      if (isFree) {
        priceControl.disable();
      } else {
        priceControl.enable();
      }
    });
  }
  thisUserEmail;
  thisUser;
  ngOnInit(): void {
    this.thisUserEmail = this.eventService.getEmailFromToken();
    this.eventService.getUserByEmail(this.thisUserEmail).subscribe((data) => {
      this.thisUser = data;
      console.log(data);
    });
   
  }
 
 
  onSubmit() {
    const imageControl = this.eventForm.get('eventImage');
    if (imageControl && imageControl.value) {
      const image = imageControl.value;
      this.imageService.upload(image).subscribe(response => {
        try {
          const responseObj = JSON.parse(response);
          const uploadedImage = new Image();
          uploadedImage.name = responseObj.name;
          uploadedImage.imageUrl = responseObj.url;
          uploadedImage.imageId = responseObj.public_id;
          imageControl.setValue(uploadedImage);
          this.createEvent();
        } catch (error) {
          Swal.fire('Error', 'Invalid server response', 'error');
        }
      }, error => {
        Swal.fire('Error', 'Could not upload the image', 'error');
      });
    } else {
      this.createEvent();
    }
  }
 
  createEvent() {
    this.eventForm.value.creator = this.thisUser;
   
    console.log(this.eventForm.value);
   
    this.eventService.addEvent(this.eventForm.value).subscribe(response => {
      Swal.fire('Success', 'Event and image uploaded successfully', 'success');
      this.router.navigateByUrl('/events')
      this.getEvents();
    }, error => {
      Swal.fire('Error', 'Could not create the event', 'error');
    });
  }
 
 
  getEvents() {
    this.eventService.getEvents().subscribe(events => {
      this.events = events;
    });
  }
 
  onFileChange(event: any): void {
    this.image = event.target.files[0];
    this.eventForm.get('eventImage')?.setValue(this.image);
    const reader = new FileReader();
        const angularCropper = this.angularCropper;
        reader.onload = (event) => {
          if(event.target?.result) {
            angularCropper.imageUrl = event.target.result;
          }
        };
        reader.readAsDataURL(event.target.files[0]);
  }
 
  handleFileInput(event: any) {
    if (event.target.files.length) {
      var fileTypes = ['jpg', 'jpeg', 'png'];  //acceptable file types
      var extension = event.target.files[0].name.split('.').pop().toLowerCase(),  //file extension from input file
      isSuccess = fileTypes.indexOf(extension) > -1;  //is extension in acceptable types
      if (isSuccess) { //yes
        // start file reader
        this.image = event.target.files[0];
        this.eventForm.get('eventImage')?.setValue(this.image);
 
        const reader = new FileReader();
        const angularCropper = this.angularCropper;
        reader.onload = (event) => {
          if(event.target?.result) {
            angularCropper.imageUrl = event.target.result;
          }
        };
        reader.readAsDataURL(event.target.files[0]);
      } else { //no
        alert('Selected file is not an image. Please select an image file.')
      }
    }
  }
 
  cropImage() {
    this.resultImage = this.angularCropper.cropper.getCroppedCanvas().toDataURL();
   
    let dwn: HTMLElement = document.querySelector('.download') as HTMLElement;
    dwn.setAttribute('href', this.resultImage);
  }
}