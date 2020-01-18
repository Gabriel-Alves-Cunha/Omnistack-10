module.exports = function parseStringAsArray(arrayAsString) {
    return arrayAsString.split(",").map(tech => tech.trim()); // trim() remove espaços antes e depois de uma string!
};