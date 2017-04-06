export class FirebaseFlatSnapshot {
    public $key?: string;

    constructor(obj?) {
        if (obj && obj.$key) {
            this.$key = obj.$key
        }
    }
}