const data = require ( './data.json')
const _ = require('lodash')
// const merge = require('deepmerge')

// const deepReduceObject = (object) => {
//     for (const [key, value] of Object.entries(object)){
//         if(value instanceof Array)
//             object[key]=deepMergeArray(value)
//         else if(value instanceof Object)
//             object[key]=deepReduceObject(value)
//     }
//     return object
// }
//
// const deepMergeArray = (array) => {
//     let unionObject = merge.all(array)
//     unionObject = deepReduceObject(unionObject)
//     return new Array(unionObject)
// }
//
// const printPretty=(name, object) =>{
//     console.log(name, '-->', JSON.stringify(object, null, 2))
// }

const newField = (question, answer =  null, type=null) => {
    return {
        question,
        answer,
        type,
        // "staticValue": false
    }
}

const parseArray= (array) => {
    return array.reduce((cdArray, element) => {
        if(element instanceof Array)//CAN THIS NEVER HAPPEN?
            return parseArray(element)
        else if (element instanceof Object)
        {
            const ttt=parseObject(element)
            return _.uniqWith(_.union(cdArray, ttt), _.isEqual)
        }
        return newField(element.valueOf())//SHOULD NEVER HAPPEN
    }, [])
}

const parseObject= (object) =>{
    let newArray=[];
    for (const [key, value] of Object.entries(object)) {
        let new_Field = newField(key, 'root', 'rootRule')

        if(value instanceof Array)
        {
            let internal_object = newField(null, 'root', 'rootRule');
            internal_object.subFields = (parseArray(value));
            new_Field.subFields = new Array(internal_object)

            new_Field.rule = 'asListRule'
        }
        else if (value instanceof Object)
            new_Field.subFields = (parseObject(value))

        newArray.push(new_Field)
    }
    return newArray;
}

const printPretty=(name, object) =>{
    console.log(name, '-->', JSON.stringify(object, null, 2))
}

const configGenerator = (file) =>{
    // printPretty('file', file)
    printPretty('codeGen_output', parseArray(file))
    return parseArray(file)
}

configGenerator(data)

// export default configGenerator;
