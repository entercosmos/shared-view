import reduce from "lodash/reduce"
import isObject from "lodash/isObject"
import isArray from "lodash/isArray"
import get from "lodash/get"

const mapIdentifier = (object) => {
    const id = get(object, 'id')
    return id ? id : object
}

const mapIdentifiers = (objects) => {
    return objects.map(object => {
        const __typename = get(object, '__typename')
        const id = get(object, 'id')
        return __typename && id ? id : object
    })
}

const storeObject = (cache, object) => {

    const __typename = get(object, '__typename')

    if (!__typename) return cache

    const id = get(object, 'id')

    if (!id) return cache

    object = reduce(object, (result, value, key) => {
        if (isObject(value) && !isArray(value)) {
            value = mapIdentifier(value)
        }
        if (isArray(value)) {
            value = mapIdentifiers(value)
        }
        result[key] = value
        return result
    }, {})

    cache.push(object)

    return cache
}

const walk = (source, result = {cache: []}) => {

    return reduce(
        source,
        (result, value) => {

            if (isObject(value) || isArray(value)) {
                result = walk(value, result)
            }

            if (isObject(value) && !isArray(value)) {
                result.cache = storeObject(result.cache, value)
            }

            return result
        },
        result
    )
}

export default (source) => {
    const {cache} = walk(source)
    return cache
}