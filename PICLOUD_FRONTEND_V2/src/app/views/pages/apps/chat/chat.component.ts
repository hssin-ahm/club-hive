import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  AfterViewChecked,
  TemplateRef,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { ChatService } from 'src/app/services/chat/chat.service';
import { JwtService } from 'src/app/services/jwt.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
} from '@angular/common/http';

import { saveAs } from 'file-saver';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, AfterViewChecked, AfterViewInit {
  url = environment.uri;
  otherUser?: any;
  thisUser?: any = '';
  thisUserEmail: string;
  otherUserEmail: string;
  channelName?: string;
  socket?: WebSocket;
  stompClient?: any;
  newMessage = new FormControl('');
  messages?: Array<any> = [];
  users: any;
  searchQuery: string = '';

  defaultNavActiveId = 1;

  constructor(
    private chatService: ChatService,
    private route: ActivatedRoute,
    private el: ElementRef,
    private jwtService: JwtService,
    private modalService: NgbModal
  ) {}
  ngAfterViewChecked(): void {
    //this.scrollDown();
  }
  ngAfterViewInit(): void {
    // Show chat-content when clicking on chat-item for tablet and mobile devices
    document.querySelectorAll('.chat-list .chat-item').forEach((item) => {
      item.addEventListener('click', (event) => {
        document.querySelector('.chat-content')!.classList.toggle('show');
      });
    });
  }
  backToChatList() {
    document.querySelector('.chat-content')!.classList.toggle('show');
  }

  scrollDown() {
    var container = this.el.nativeElement.querySelector('#chat');
    container.scrollTop = container.scrollHeight;
  }
  showicon: boolean = false;
  ngOnInit(): void {
    this.thisUserEmail = this.chatService.getEmailFromToken();

    this.route.paramMap.subscribe((params: ParamMap) => {
      let exist = this.route.snapshot.paramMap.has('email');
      this.otherUserEmail = params.get('email');

      if (!exist) {
        this.getthisUser();
      } else {
        this.getthisUser();
        this.getOtherUser();
      }
    });

    this.chatService.getAllUsers(this.thisUserEmail).subscribe((data) => {
      this.users = data;
      console.log(data);
    });
    setTimeout(() => {
      this.showicon = true;
    }, 5000);
  }
  getthisUser() {
    this.chatService.getUserByEmail(this.thisUserEmail).subscribe((data) => {
      this.thisUser = data;
      if (data) {
        this.getclubsbythisuser();
      }
    });
  }
  clubs;
  getclubsbythisuser() {
    this.chatService.getclubbyuser(this.thisUser.id).subscribe((data) => {
      this.clubs = data;
      console.log(data);
    });
  }
  getUserimage(email) {
    this.chatService.getUserByEmail(email).subscribe((data) => {
      if (data) {
        this.otherUser = data;
        return this.otherUser.profileImage;
      }
    });
  }
  getOtherUser() {
    this.chatService.getUserByEmail(this.otherUserEmail).subscribe((data) => {
      this.otherUser = data;

      this.connectToChat();

      //this.el.nativeElement.querySelector('#chat').scrollIntoView();

      //this.scrollDown();
    });
  }
  clubname;
  onConnectToGroupChat() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let exist = this.route.snapshot.paramMap.has('clubname');
      this.channelName = params.get('clubname');
      this.clubname = this.channelName;
      if (exist) {
        this.loadChat(this.channelName);

        this.socket = new SockJS(this.url + '/chat-socket', [
          'Authorization',
          `${this.jwtService.createAuhtorizationHeader()}`,
        ]);
        this.stompClient = Stomp.over(this.socket);

        this.stompClient.connect({}, (frame) => {
          this.stompClient!.subscribe(
            '/topic/' + this.channelName,
            (response) => {
              this.loadChat(this.channelName);
            }
          );
        });
      }
    });
  }

  connectToChat() {
    const id1 = this.thisUser.id!;
    const nick1 = this.thisUser.email;
    const id2 = this.otherUser?.id!;
    const nick2 = this.otherUser?.email!;

    if (id1 > id2) {
      this.channelName = nick1 + '&' + nick2;
    } else {
      this.channelName = nick2 + '&' + nick1;
    }

    this.loadChat(this.channelName);
    this.socket = new SockJS(this.url + '/chat-socket', [
      'Authorization',
      `${this.jwtService.createAuhtorizationHeader()}`,
    ]);
    this.stompClient = Stomp.over(this.socket);

    this.stompClient.connect({}, (frame) => {
      this.stompClient!.subscribe('/topic/' + this.channelName, (response) => {
        this.loadChat(this.channelName);
      });
    });
  }
  loadChat(channelName) {
    this.chatService.loadChat(channelName).subscribe((data) => {
      let mgs: Array<any> = data;
      mgs.sort((a, b) => (a.ms_id > b.ms_id ? 1 : -1));
      this.messages = mgs;
    });
  }

  profileimage = null;
  sendMsg() {
    let filename = null;
    if (this.filenames.length != 0) {
      filename = this.filenames[0];
    }
    if (this.clubname) {
      this.profileimage = this.thisUser.profileImage;
    }
    if (this.newMessage.value !== '' || filename != null) {
      this.stompClient!.send(
        '/app/chat/' + this.channelName,
        {},
        JSON.stringify({
          sender: this.thisUser.email,
          t_stamp: 'to be defined in server',
          content: this.newMessage.value,
          filename: filename,
          profileimage: this.profileimage,
        })
      );
      this.newMessage.setValue('');
    }
    this.fileStatus.status = '';
    this.filenames = [];
  }

  deletefor(id, forr) {
    this.stompClient!.send(
      '/app/chat/' + this.channelName,
      {},
      JSON.stringify({
        deleteForAll: forr,
        ms_id: id,
        whoMakeDelete: this.thisUserEmail,
      })
    );
  }

  whenWasItPublished(myTimeStamp: string) {
    const endDate = myTimeStamp.indexOf('-');
    return (
      myTimeStamp.substring(0, endDate) +
      ' at ' +
      myTimeStamp.substring(endDate + 1)
    );
  }
  whenTheDAteWasItPublished(myTimeStamp: string) {
    const endDate = myTimeStamp.indexOf('-');
    return myTimeStamp.substring(0, endDate);
  }

  whenWastheTimeItPublished(myTimeStamp: string) {
    if (myTimeStamp == '') {
      return '';
    }
    const endDate = myTimeStamp.indexOf('-');
    return myTimeStamp.substring(endDate + 1);
  }

  react(id: any, react: boolean) {
    this.stompClient!.send(
      '/app/chat/' + this.channelName,
      {},
      JSON.stringify({
        reaction: react,
        ms_id: id,
      })
    );
  }

  get filteredUsers(): any {
    if (this.users) {
      return this.users.filter((user) =>
        user.user.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }

  getImagewithResourceType(filename) {
    const extention = filename.slice(-3);

    switch (extention.toLowerCase()) {
      case 'mp4':
        return 'video';
      case 'pdf':
        return 'pdf.png';
      case 'ocx':
        return 'doc.png';
      default:
        return 'image';
    }
  }

  receivedicon: string;

  receiveDataFromChild(data: string) {
    let curValue;
    if (this.newMessage.value == '') {
      curValue = '';
    } else {
      curValue = this.newMessage.value;
    }
    this.newMessage.setValue(curValue + data);
  }

  imagename;
  openVerticalCenteredModal(content: TemplateRef<any>, filename) {
    this.imagename = filename;
    this.modalService
      .open(content, { centered: true })
      .result.then((result) => {})
      .catch((res) => {});
  }

  filenames: string[] = [];
  fileStatus = { status: '', requestType: '', percent: 0 };
  onUploadFiles(event): void {
    let files: File[] = null;
    files = <File[]>event.target.files;
    const formData = new FormData();
    formData.append('files', files[0], files[0].name);
    this.chatService.upload(formData).subscribe(
      (event) => {
        this.resportProgress(event);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  // define a function to download files
  onDownloadFile(filename: string): void {
    this.chatService.download(filename).subscribe(
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
          for (const filename of httpEvent.body) {
            this.filenames.unshift(filename);
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
  openFileInput() {
    document.getElementById('fileInput')?.click();
  }
}
