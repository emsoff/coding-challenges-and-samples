const person = {
    name : 'Bob',
    greet(greeting) {
        return `${greeting}, ${this.name}`;
    }

}


class RelectedPerson {
    constructor(person) {

        if (!person || !(person instanceof Object)) {
            throw new Error('Invalid calculator instance');
        }

        this.person = person;

    }

    getProperty(propertyName) {
        return Reflect.get(this.person, propertyName);
    }

    setProperty(propertyName, value) {
        return Reflect.set(this.person, propertyName, value);
    }

    deleteProperty(propertyName) {
        return Reflect.deleteProperty(this.person, propertyName);
    }

    invokeMethod(methodName, argsArray) {
        const method = Reflect.get(this.person, methodName);
        if (typeof method === 'function') {
            return Reflect.apply(method, this.person, argsArray);
        } else {
            throw new Error(`${methodName} is not a function`);
        }
    }

    preventExtensions() {
        return Reflect.preventExtensions(this.person);
    }

    defineProperty(propertyName, descriptor) {
        return Reflect.defineProperty(this.person, propertyName, descriptor);
    }
}

function shouldntBeManipulatingPerson() {
    person.favoriteColor = 'red' // does nothing
}

const _person = new RelectedPerson(person);

_person.setProperty('profession', 'accountant')

_person.preventExtensions()

shouldntBeManipulatingPerson()

_person.setProperty('alive', true) // does nothing

console.log(person)

console.log(_person.invokeMethod('greet', ['hello']))


