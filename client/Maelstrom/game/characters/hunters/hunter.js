export default class Hunter extends Arachnid.GameObject {

    #health = {max: 0, value: 0};
    #energy = {max: 0, value: 0};
    #boost = 300;

    #palette;

    constructor(config) {
        super(config);
        this.#palette = config.palette;
        this.#health.max = config.health_max;
        this.#health.value = config.health_max;
        this.#energy.max = config.energy_max;
        this.#energy.value = config.energy_max * 0.25;
    }



}