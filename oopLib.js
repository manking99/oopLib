/**
 * @oopLib Various tool functions.
 * @author <a href="mailto:manking@list.ru">Dmitriy Belonovskiy</a>
 * @version 1.0.0
 */
window.oopLib = {}; // global object


function defineClass(className, config) {

    if (className in oopLib) {
        console.error('Class ' + className + " not defined!");
        return;
    }

    // наследуемся от 
    if (config.extends) {

        if (!Array.isArray(config.extends)) {
            config.extends = [config.extends];
        }

        for (var i = 0; i < config.extends.length; i++) {

            if (!(config.extends[i] in window.oopLib)) {
                console.error('Parent class "' + config.extends[i] + '" not found!');
                throw "oopLib Error!"
            } else {
                if (!(className in window.oopLib)) {
                    window.oopLib[className] = {};
                }

                Object.assign(oopLib[className], window.oopLib[config.extends[i]]);
            }
        }
    }

    if (!(className in window.oopLib)) {
        window.oopLib[className] = {};
    }
    Object.assign(window.oopLib[className], config);
}


function createClass(className, config) {

    if (!(className in oopLib)) {
        console.error('Class ' + className + " not defined!");
        throw "oopLib Error!"
        return;
    }

    var obj = oopLib[className];

    Object.assign(obj, config);
    return obj;
}

