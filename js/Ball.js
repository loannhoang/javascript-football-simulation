class Ball {
    constructor(scene, x, y, assignment) {
        this.scene = scene;

        //create ball sprite at given location
        var sprite = scene.physics.add.image(x, y, 'football').setDisplaySize(11/3/3*this.scene.px_per_yd,1.5*8/3/3*this.scene.px_per_yd);

        //create pointer to physics body
        this.body = sprite.body;

        //set a few physics options for the ball
        this.body.setCollideWorldBounds(true)
            .setMass(1/32.2);

        this.assignment = assignment;
    }

    moveTo(x1, y1) {
        x0 = this.body.x;
        y0 = this.body.y;
        if ((x0 != x1) || (y0 != y1)) {
            this.body.setVelocity(
                (x1 - x0) / 0.1,
                (y1 - y0) / 0.1
            );
        } else {
            this.body.stop()
        }
    }

    moveWith(player){
        
    }

    update(){

    }
}