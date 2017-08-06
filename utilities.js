// Checks whether or not the area is defined on the country object
function isAreaDefined(country, isDefined, isNotDefined) {
    return country.area > -1 ? isDefined : isNotDefined;
}

// Returns the country's calling code as an integer
function getCallingCode(country) {
    return country.callingCode[0]
        ? parseInt(country.callingCode[0]) > 1000 ? 1000 : parseInt(country.callingCode[0])
        : 0;
}

// Updates an svg text object
function updateText(textObject, newText, transitionProperties) {
    if (transitionProperties) {
        textObject.transition(transitionProperties).text(strings.axisTitles[newText]);
    } else {
        textObject.text(strings.axisTitles[newText]);
    }
}
