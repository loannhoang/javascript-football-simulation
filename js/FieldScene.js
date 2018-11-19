class FieldScene extends Phaser.Scene {
  constructor() {
    super(); //this is used to call the parent class Phase.Scene
    this.px_per_yd = game.config.width / 120;
  }

  //load assets
  preload() {
    //load images
    this.load.image('field', 'assets/football-field.jpg');
    this.load.image('football', 'assets/football.png');
    this.load.image('red-dot', 'assets/red-circle-64.png');
    this.load.image('blue-dot', 'assets/blue-circle-64.png');
  }

  //called once after preload ends
  create() {
    //create a scene variable so we can reference it when needed
    var scene = this;

    //create background sprite
    let background = this.add.sprite(0, 0, 'field');

    //change origin of background sprite
    background.setOrigin(0, 0);

    //scale background to fit
    background.setDisplaySize(game.config.width, game.config.height);

    //create ball from Ball class
    this.ball = new Ball(this, 60 * this.px_per_yd, 27 * scene.px_per_yd);

    //create camera to zoom in and follow ball
    this.cameras.main.startFollow(this.ball.body).setZoom(1);

    // set bounds so the camera won't go outside the game world
    this.cameras.main.setBounds(0, 0, game.config.width, game.config.height);

    //create offensive group
    this.offense = {};
    Papa.parse('https://docs.google.com/spreadsheets/d/e/2PACX-1vTJwIgCS-T2qFvOjVAFo0TzBbUHxtWDxy60DWNED1gQeS8V43zI5toweqvyia2uuFK67xUlntvQMDjT/pub?gid=0&single=true&output=csv&headers=false', {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: function (result) {
        result.data.forEach(function (player, index, array) {
          scene.offense[player.id] = new Player(scene, 'red-dot', player.id, player.weight, player.power, player.speed, player.agility, player.x * scene.px_per_yd, player.y * scene.px_per_yd, player.do);
        });
      }
    });
    console.log(this.offense);

    //create offensive group
    this.defense = {};
    Papa.parse('https://docs.google.com/spreadsheets/d/e/2PACX-1vTJwIgCS-T2qFvOjVAFo0TzBbUHxtWDxy60DWNED1gQeS8V43zI5toweqvyia2uuFK67xUlntvQMDjT/pub?gid=1074706941&single=true&output=csv&headers=false', {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: function (result) {
        result.data.forEach(function (player, index, array) {
          scene.defense[player.id] = new Player(scene, 'blue-dot', player.id, player.weight, player.power, player.speed, player.agility, player.x * scene.px_per_yd, player.y * scene.px_per_yd, player.do);
        });
      }
    });
    console.log(this.defense);

    //create a tooltip next to mouse cursor
    this.tooltip = scene.add.text(0, 0, '(0, 0)', { font: '12px Arial', fill: '#ffffff' })
      .setOrigin(0, 1);
  }

  //this will try to run 60 times per second
  update() {
    this.tooltip.setText('(' + Math.round(10 * this.input.x / this.px_per_yd) / 10 + ', ' + Math.round(10 * this.input.y / this.px_per_yd) / 10 + ')');
    this.tooltip.setPosition(this.input.x, this.input.y);

    this.ball.update();

    for (var player in this.offense) {
      this.offense[player].update();
    }

    for (var player in this.defense) {
      this.defense[player].update();
    }
  }
}