
function el(node) {
  var result = {},
      i;

  if(node.nodeType === document.DOCUMENT_NODE) {
    result.type = 'tag';
    result.name = 'root';
  } else if(node.nodeType === document.ELEMENT_NODE) {
    result.type = 'tag';
    result.name = node.nodeName.toString().toLowerCase();
  } else if(node.nodeType === document.TEXT_NODE) {
    result.type = 'text';
    result.data = node.nodeValue;
  } else if(node.nodeType === document.COMMENT_NODE) {
    result.type = 'comment';
    result.data = node.nodeValue;
  } else if(node.nodeType === document.DOCUMENT_TYPE_NODE) {
    result.type = 'doctype';
    result.data = node.nodeValue;
  } else {
    console.log(node);
  }

  if (node.attributes && node.attributes.length) {
    result.attribs = {};
    // Get the known-existent list of attributes and iterate over them
    var attrs = node.attributes;
    for (var length = attrs.length, i = 0; i < length; i++) {
      // IE 5-8 (all currently shipping versions) always list all possible attributes, specified or not.
      // The "specified" member of each attribute indicates whether it was existent in the HTML and is required for the purpose here.
      // IE will also report the unique jQuery identifiers as well as jQuery's sizzle engine cache attributes, so parse those out entirely.
      if (attrs[i].specified
        && attrs[i].nodeName.indexOf('jQuery') == -1
        && attrs[i].nodeName.indexOf('sizcache') == -1
        && attrs[i].nodeName.indexOf('sizset') == -1) {

        result.attribs[attrs[i].nodeName] = attrs[i].nodeValue;
      }
    }
  }

  if(node.hasChildNodes()) {
    result.children = [];
    for(i = 0; i < node.childNodes.length; i++) {
      result.children[i] = el(node.childNodes[i]);
    }
  }

  return result;
}

el(document);
