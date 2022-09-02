import { GameObject } from "../../core/objects";

export default class Fighter extends GameObject {

    constructor( ) {
        this.velocity = new Velocity( );
        this.health = new HealthPool(config.health);
        this.energy = new EnergyPool(1000);
        this.sprite = config.sprite;
    }

    damage(value, chip_percentage = 0, recoil_type) {
        this.health.sub(value, chip_percentage);
        this.signal('hurt', recoil_type);
    }


    reposition(row, column) {
        this.centerX = column * Malestrom.TILESIZE;
        this.bottom = row * Malestrom.TILESIZE;   
    }

    jump(height, xvelocity = 0) {
        const formula = 2 * Malestrom.GRAVITY * height;
        const initial_velocity = Math.pow(formula, 0.5);
        this.velocity.y = - initial_velocity;
        
    }


    onUpdate(config) {
        this.position.x += this.velocity.x * config.dt;
        this.position.y += this.velocity.y * config.dt;
        this.animation.update(config.dt); 
    }



}