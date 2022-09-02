export class HealthPool {

    static CHIP_REGEN = 5;
    static CHIP_INTERVAL = 3;
    static CHIP_REDUCTION = 0.20;

    #data = new Float32Array(5);

    constructor(total) {
        this.#data[0] = total; //max health
        this.#data[1] = total; //current health 
        //data 2 recoverable health
        //data 3 regen interval
        //data 4 regen countdown
    }

    get health( ) {
        return parseInt(this.#data[1]);
    }

    get recoverable( ) {
        return parseInt(this.#data[2]);
    }

    get regen_interval( ) {
        return this.#data[3];
    }

    get regen_countdown( ) {
        return this.#data[4];
    }

    get data( ) {
        return {
            max: this.#data[0],
            health: this.health,
            this.recoverable: this.recoverable,
            regen: {
                interval: this.regen_interval,
                countdown: this.regen_countdown
            }
        }
    }

    #manageChip(dt) {

    }

    #setChip(value) {
        if(this.#data[2] > 0) {
            this.damage(Math.max(value * HealthPool.CHIP_REDUCTION, 1));
        }
        this.#data[2] += value;
    }

    damage(raw) {
        let value = this.data - raw; 
        this.#data = Math.max(value, 0);
    }

    chip(value, damage_value = 0) {
        this.damage(damage_value);
        this.#setChip(value);
    }

    update(config) {
        this.#manageChip(config.dt);
    }

}

export class EnergyPool {

    static REGEN_RATE = 10;
    static STOCK_SEGMENT = 100;

    #data = new Int16Array(3);

    constructor(max, start, rate = EnergyPool.REGEN_RATE) {
        this.#data[0] = start ? Math.min(start, max) : max;
        this.#data[1] = max;
        this.#data[2] = rate;
    }

    get stocks( ) {
        return Math.floor(this.#data[0] / EnergyPool.STOCK_SEGMENT);
    }

    get value( ) {
        return this.#data[0];
    }

    get max( ) {
        return this.#data[1];
    }

    get regen_rate( ) {
        return this.#data[2];
    }

    generate(strength) {
        this.#data[0] += strength * this.#data[2];
        this.#data[0] = Math.min(this.#data[0], this.#data[1]);
    }

    use(value) {
        if(value <= this.#data[0]) {
            this.#data[0] -= value;
            return true;
        } else {
            return false;
        }
    }

}

