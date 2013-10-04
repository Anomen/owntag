var precompile = function(text){
    // Save the previous text to detect when the recursive
    // function ends.
    var previousText = text;

    // Search for all <h:.....></h:.....> tags, and for each of them,
    // replace by a sting text to be interpreted by Lodash template
    // engine.
    var replacedText = text.replace(/<h:(\w+)([^>]*)>([\W\w]*?)<\/h:\1>/gm, function(match, tagName, attrs, content){

        // Retrieve the attributes of the tag
        var attributes = attrs.match(/\w+="[^"]+"/gi);

        // Generate the call of helper() with all arguments
        var str = '<% __p += helper("' + tagName.replace('h:', '') + '", {';
        for (var i in attributes) {
            var splitAttr = attributes[i].split('=');
            str += '"' + splitAttr[0] + '": ' + splitAttr[1] + ', ';
        }
        str += '}';

        // If there is a content, create a third argument to the helper() call.
        if (content)
            str += ', (function(){ var __p = ""; %>' + content + '<% return __p; })()';

        // End the string to replace
        str += ') %>';

        return str;
    });

    // If the previous text is the same as the replaced text,
    // it means that we are done with the pre-compilation...
    if (previousText === replacedText)
        return replacedText;

    // ... otherwise, once again!
    return precompile(replacedText);
}

// Save the original function
var oldTemplate = _.template;

// Create a new template function
_.template = function(text, data, settings){
    // If it's already a function, it means that it has 
    // already been compiled!
    if (typeof (text) === "function") 
        return text;
    
    // Otherwise, we pre-compile and compile the template.
    var precompiledText = precompile(text);
    return oldTemplate(precompiledText, data, settings);
};