class FieldScene extends Phaser.Scene {
	constructor() {
		super(); //this is used to call the parent class Phaser.Scene
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
		var background = this.add.sprite(0, 0, 'field');

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

		this.offTeam = new Team('Offense Team', 'red-dot');
		this.offTeam.setOffensiveLineup(scene, 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTJwIgCS-T2qFvOjVAFo0TzBbUHxtWDxy60DWNED1gQeS8V43zI5toweqvyia2uuFK67xUlntvQMDjT/pub?gid=0&single=true&output=csv&headers=false');

		//parse csv file to create offense
		/*Papa.parse('https://docs.google.com/spreadsheets/d/e/2PACX-1vTJwIgCS-T2qFvOjVAFo0TzBbUHxtWDxy60DWNED1gQeS8V43zI5toweqvyia2uuFK67xUlntvQMDjT/pub?gid=0&single=true&output=csv&headers=false', {
			download: true,
			header: true,
			dynamicTyping: true,
			complete: function (offense) {
				console.log(offense);
				//create offensive group
				offense.data.forEach(function (player, index, array) {
					var attribute = {
						'jersey': 'red-dot',
						'position': player.id,
						'weight': player.weight,
						'power': player.power,
						'speed': player.speed,
						'agility': player.agility
					};
					new Player(scene, player.x * scene.px_per_yd, player.y * scene.px_per_yd, attribute);
				});
				scene.offense = offense;
				//alert("scene.offense = " + scene.offense.data);
				
				for(let player in scene.offense.data) {
					scene.physics.add.overlap(scene.offense.data[player], scene.ball, this.catchBall, null, this); 
					
				}
				//scene.physics.add.overlap(scene.offense, scene.ball, this.catchBall, null, this); 
			}
		}); // */

		//parse csv file to create defense
		Papa.parse('https://docs.google.com/spreadsheets/d/e/2PACX-1vTJwIgCS-T2qFvOjVAFo0TzBbUHxtWDxy60DWNED1gQeS8V43zI5toweqvyia2uuFK67xUlntvQMDjT/pub?gid=1074706941&single=true&output=csv&headers=false', {
			download: true,
			header: true,
			dynamicTyping: true,
			complete: function (defense) {
				console.log(defense);
				//create defensive group
				defense.data.forEach(function (player, index, array) {
					var attribute = {
						'jersey': 'blue-dot',
						'position': player.id,
						'weight': player.weight,
						'power': player.power,
						'speed': player.speed,
						'agility': player.agility
					};
					new Player(scene, player.x * scene.px_per_yd, player.y * scene.px_per_yd, attribute);
				});
			}
		});

		//create a tooltip next to mouse cursor
		this.tooltip = scene.add.text(0, 0, '(0, 0)', { font: '12px Arial', fill: '#ffffff' })
			.setOrigin(0, 1);

		//add click handler that moves the ball around
		background.setInteractive();
		background.on('pointerdown', function () {

			var velocity = 120; // yd/s
			if (scene.ball.body.velocity.x != 0 || scene.ball.body.velocity.y != 0) {
				scene.ball.stop();
			} else {
				scene.ball.moveTo(scene.input.x, scene.input.y,velocity);
			}
		});

		//alert("offense: " + scene.offense);

		//this.physics.add.collider(this.ball, this.player);

		/*this.physics.add.overlap(scene.offense, scene.ball, function() {
			alert("ball caught!");
			scene.ball.stop();
		}, null, this); // */
	}

	//this will try to run 60 times per second
	update() {
		this.tooltip.setText('(' + Math.round(10 * this.input.x / this.px_per_yd) / 10 + ', ' + Math.round(10 * this.input.y / this.px_per_yd) / 10 + ')');
		this.tooltip.setPosition(this.input.x, this.input.y);
	}

	catchBall(player, ball) {
		ball.stop();
		alert("ball caught!");
	} // */
}