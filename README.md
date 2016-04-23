# oopLib
oopLib is a javascript microlibrary, that provides OOP STYLE programming in javascript.

EXAMPLE:
```
defineClass('parent_class_name', {
    parent_class_name_property: 'I am parent!'
});
defineClass('parent_class_name2', {
    parent_class_name_property2: 'I am parent 2!'
});

defineClass('class_name', {
    extends: ['parent_class_name','parent_class_name2'], // inheritance from
    myProp: [1, 2]
});

var cls = createClass('class_name', {
    myProp: [1, 2, 3, 4],
    myProp2: 'second property',

    init: function(){
        var me = this;
    }

});

cls.myProp[0]; // 1
```
