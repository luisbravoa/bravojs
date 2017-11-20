export class Component extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        console.log(this.constructor.props);

        let propsConfig = this.constructor.props || {};

        Object.keys(propsConfig)
            .forEach((prop) => {
                this._watchProp(prop, propsConfig[prop]);
            });

    }

    static get  propsConfig (){
        return this.props || {};
    }

    get  propsConfig (){
        return this.constructor.props || {};
    }


    static get observedAttributes() {
        console.log('observedAttributes');

        let observedAttributes = [];

        Object.keys(this.propsConfig)
            .map((prop) => {
                if(this.propsConfig[prop].attribute === true){
                    observedAttributes.push(prop);
                }
            });
        console.log(observedAttributes);
        return observedAttributes;
    }

    onPropChange (prop, oldValue, newValue){
        console.log('this.onPropChange()')
    }

    attributeChangedCallback (name, oldvalue, newValue){
        if(this.propsConfig[name]){
            this._setProp(name, newValue);
        }
    }

    _watchProp(prop, config) {

        Object.defineProperty(this, prop, {

            enumerable: true,

            get() {
                return this[`_${prop}`];
            },

            set(value) {
                this._setProp(prop, value);
                console.log('prop', prop, value);
                if(config.attribute === true){
                    this.setAttribute(prop, value);
                }
            }

        });
    }

    _setProp (prop, value, silent){
        let old = this[prop];
        this[`_${prop}`] = value;
        if(!silent){
            this.onPropChange(prop, old, this[prop]);
        }
    }
}