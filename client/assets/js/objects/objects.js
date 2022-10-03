import { glMatrix } from "gl-matrix";

export class Point {
    #data = glMatrix.vec3.create( );

    constructor( ) {

    }


    get x( ) {
        return this.#data[0];
    }

    set x(n) {
        this.#data[0] = n;
    }

    get y( ) {
        return this.#data[1];
    }

    set y(n) {
        this.#data[1] = n;
    }

    get z( ) {
        return this.#data[2];
    }

    set z(n) {
        this.#data[2] = n;
    }

    get xy( ) {
        return this.#data.subarray(0, 2);
    }

    set xy(ar) {
        this.#data.set(ar.slice(0, 2));
    }

    get xyz( ) {
        return this.#data;
    }

    set xyz(ar) {
        this.#data.set(ar);
    }

    add(ar) {
        glMatrix.vec3.add(this.#data, ar);
    }

    sub(ar) {
        glMatrix.vec3.sub(this.#data, ar);
    }

}

export class Velocity {

    #data = glMatrix.vec4.create( );

    constructor( ) {

    }

    get value( ) {
        return this.#data;
    }

    get x( ) {
        return this.#data[0];
    }

    set x(n) {
        this.#data[0] = n;
    }

    get y( ) {
        return this.#data[1];
    }

    set y(n) {
        this.#data[1] = n;
    }

    get z( ) {
        return this.#data[2];
    }

    set z(n) {
        this.#data[2] = n;
    }

    get xy( ) {
        return this.#data.subarray(0, 2);
    }

    set xy(ar) {
        this.#data.set(ar);
    }

    get xyz( ) {
        return this.#data.subarray(0, 3);
    }

    set xyz(ar) {
        this.#data.set(ar);
    }

    add(velocity) {
        let value = velocity.value ? velocity.value : velocity;
        glMatrix.vec4.add(this.#data, this.#data, value);
    }

    sub(velocity) {
        let value = velocity.value ? velocity.value : velocity;
        glMatrix.vec4.sub(this.#data, this.#data, value);
    }

}

export class HealthPool {

    static CHIP_REGEN_TIMER = 3;
    static CHIP_REGEN_RATE = 4;
    #data = new ArrayBuffer();

    constructor(n) {
        this.#value[0] = n;
    }

    sub(amount, chip_percentage) {
        let p = amount * chip_percentage;
        this.#value[0] -= amount - p;
        this.#value[1] = p;
        if(this.#value[1] > 0) this.#value[3] = HealthPool.CHIP_REGEN_TIMER;
    }

    update(config) {

    }

}