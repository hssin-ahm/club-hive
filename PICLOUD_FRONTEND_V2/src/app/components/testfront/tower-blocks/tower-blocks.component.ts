import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// interface BlockReturn {
//   placed?: any;
//   chopped?: any;
//   plane: 'x' | 'y' | 'z';
//   direction: number;
//   bonus?: boolean;
// }

// class Stage {
//   private container: any;
//   private camera: any;
//   private scene: any;
//   private renderer: any;
//   private light: any;
//   private softLight: any;
//   private group: any;
// }

// class Block {
//   STATES = { ACTIVE: 'active', STOPPED: 'stopped', MISSED: 'missed' };
//   MOVE_AMOUNT = 12;

//   dimension = { width: 0, height: 0, depth: 0 };
//   position = { x: 0, y: 0, z: 0 };

//   mesh: any;
//   state!: string;
//   index!: number;
//   speed!: number;
//   direction!: number;
//   colorOffset!: number;
//   color!: number;
//   material: any;

//   workingPlane!: string;
//   workingDimension!: string;

//   targetBlock!: Block;
// }

// class Game {
//   STATES = {
//     LOADING: 'loading',
//     PLAYING: 'playing',
//     READY: 'ready',
//     ENDED: 'ended',
//     RESETTING: 'resetting'
//   };
//   blocks: Block[] = [];
//   state: string = this.STATES.LOADING;

//   // groups
//   newBlocks: any;
//   placedBlocks: any;
//   choppedBlocks: any;

//   // UI elements
//   scoreContainer: any;
//   mainContainer: any;
//   startButton: any;
//   instructions: any;
// }

@Component({
  selector: 'app-tower-blocks',
  templateUrl: './tower-blocks.component.html',
  styleUrls: ['./tower-blocks.component.scss']
})
export class TowerBlocksComponent {
  // @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  // private blocks: Block[] = [];
  // private state: string = Game.prototype.STATES.LOADING;
  // private newBlocks: any;
  // private placedBlocks: any;
  // private choppedBlocks!: any;
  // private scoreContainer!: HTMLElement;
  // private mainContainer!: HTMLElement;
  // private instructions!: HTMLElement;
  // private score!: string;

  // private stage!: Stage;

  // ngOnInit() {
  //   this.stage = new Stage();
  //   this.mainContainer = document.getElementById('container');
  //   this.scoreContainer = document.getElementById('score');
  //   this.instructions = document.getElementById('instructions');
  //   this.scoreContainer.innerHTML = '0';

  //   this.newBlocks = new THREE.Group();
  //   this.placedBlocks = new THREE.Group();
  //   this.choppedBlocks = new THREE.Group();

  //   this.stage.add(this.newBlocks);
  //   this.stage.add(this.placedBlocks);
  //   this.stage.add(this.choppedBlocks);

  //   this.addBlock();
  //   this.tick();

  //   this.updateState(Game.STATES.READY);

  //   document.addEventListener('keydown', (e) => {
  //     if (e.keyCode === 32) {
  //       this.onAction();
  //     }
  //   });

  //   document.addEventListener('click', () => {
  //     this.onAction();
  //   });

  //   document.addEventListener('touchstart', (e) => {
  //     e.preventDefault();
  //     // this.onAction();
  //     // ☝️ this triggers after click on Android, so you
  //     // insta-lose, will figure it out later.
  //   });
  // }

  // updateState(newState: string) {
  //   for (let key in Game.STATES) {
  //     this.mainContainer.classList.remove(Game.STATES[key]);
  //   }
  //   this.mainContainer.classList.add(newState);
  //   this.state = newState;
  // }

  // onAction() {
  //   switch (this.state) {
  //     case Game.STATES.READY:
  //       this.startGame();
  //       break;
  //     case Game.STATES.PLAYING:
  //       this.placeBlock();
  //       break;
  //     case Game.STATES.ENDED:
  //       this.restartGame();
  //       break;
  //   }
  // }

  // startGame() {
  //   if (this.state !== Game.STATES.PLAYING) {
  //     this.scoreContainer.innerHTML = '0';
  //     this.updateState(Game.STATES.PLAYING);
  //     this.addBlock();
  //   }
  // }

  // restartGame() {
  //   this.updateState(Game.STATES.RESETTING);
  //   let oldBlocks = this.placedBlocks.children;
  //   let removeSpeed = 0.2;
  //   let delayAmount = 0.02;
  //   for (let i = 0; i < oldBlocks.length; i++) {
  //     TweenLite.to(oldBlocks[i].scale, removeSpeed, {
  //       x: 0,
  //       y: 0,
  //       z: 0,
  //       delay: (oldBlocks.length - i) * delayAmount,
  //       ease: Power1.easeIn,
  //       onComplete: () => this.placedBlocks.remove(oldBlocks[i])
  //     });
  //     TweenLite.to(oldBlocks[i].rotation, removeSpeed, {
  //       y: 0.5,
  //       delay: (The code you provided is an Angular component for a game called "Tower Blocks".It seems to be a 3D game where players stack blocks on top of each other to create a tower.Here's a breakdown of the code:
    
}
