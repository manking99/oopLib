/**
 * @oopLib Various tool functions.
 * @author <a href="mailto:manking@list.ru">Dmitriy Belonovskiy</a>
 * @version 1.0.1
 */
window.oopLib = {}; // global object


/**
 * Getting class config if it defined
 * @param {string} - name of the class
 */
function getClassConfig(className) {

    if (!(className in window.oopLib)) {
        console.error('Class ' + className + " not defined! getClassConfig()");
        return null;
    }
    return window.oopLib[className];
}


/**
 * Get all parents 
 * @param {array} - names of parent classes
 */
function getAllParents(array_parents, parents, level, order) {

    level++;
    for (var i = 0; i < array_parents.length; i++) {
        var cfg = getClassConfig(array_parents[i]);

        order++;
        parents.push({
            level: level,
            order: order,
            value: array_parents[i]
        });

        if (cfg.extends) {
            parents.concat(getAllParents(cfg.extends, parents, level, order));
        }
    }
    return parents;
}

/**
 * Defining a class by name
 * @param {string} - name of the class
 * @param {Object} - config options of the object. Thay will replace same name options in parent class.
 */
function defineClass(className, config) {

    if (className in oopLib) {
        console.error('Class ' + className + " already defined!");
        return;
    }

    if (config.extends) {
        if (!Array.isArray(config.extends)) {
            config.extends = [config.extends];
        }
    }

    if (!(className in window.oopLib)) {
        window.oopLib[className] = {};
    }
    Object.assign(window.oopLib[className], config);
}


function unique(a_, compareFunc) {
    var a = a_.slice();
    a.sort(compareFunc);
    for (var i = 1; i < a.length;) {
        if (compareFunc(a[i - 1], a[i]) === 0) {
            a.splice(i, 1);
        } else {
            i++;
        }
    }
    return a;
}



/**
 * Mixins configs of the classes to obj
 * @param {array} - strings - name of the classes
 * @param {object} - instance of the class
 */
function mixinConfig(parentsNames, obj) {

    if (parentsNames) {
        if (!Array.isArray(parentsNames)) {
            parentsNames = [parentsNames];
        }

        for (var i = 0; i < parentsNames.length; i++) {
            if (!(parentsNames[i] in window.oopLib)) {
                console.error('Parent class "' + parentsNames[i] + '" not found!');
                throw "oopLib Error!"
            } else {
                Object.assign(obj, window.oopLib[parentsNames[i]]);
            }
        }
    }
    return obj;
}


/**
 * Creating a class by name
 * @param {string} - name of the class
 * @param {Object} - config options of the object. Thay will replace same name options in parent class.
 */
function createClass(className, config) {

    if (!(className in oopLib)) {
        console.error('Class ' + className + " not defined!");
        throw "oopLib Error!"
        return;
    }

    var mainObject = oopLib[className],
        obj = {},
        array_parents = [].concat(mainObject.extends || []),
        order = 0,
        all_parents = getAllParents(array_parents, [], 0, order),
        all_parents_arr = unique(all_parents, function(a, b) {
            if (a.level === b.level && a.value === b.value) {
                return 0;
            }
            return 1;
        });

    all_parents_arr.sort(function(a, b) {
        if (a.level != b.level) {
            return (a.level < b.level);
        }
        if (a.order != b.order) {
            return (a.order < b.order);
        }
        return a.value != b.value;
    });

    var all_parents2 = [];

    for (var i = 0; i < all_parents_arr.length; i++) {
        all_parents2.push(all_parents_arr[i].value);
    }
    if (config.extends) {
        all_parents2 = all_parents2.concat(config.extends);
    }

    obj = mixinConfig(all_parents2, obj);

    Object.assign(obj, oopLib[className]);
    Object.assign(obj, config);

    obj.className = className;
    obj.init();
    return obj;
}