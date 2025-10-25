export default (stack) => {
  var
    output = "",
    node = null,
    tag = "",
    attrs = null,
    i = 0,
    l = 0,
    attr = null,
    children = null,
    tagName = "",
    text = ""
  ;

  while (stack.length) {
    node = stack.pop();
    
    if (node.nodeName === "#text") {
      if ((text = node.value?.trim())) {
        output += text;
      }
    }

    else if (node.nodeName === "#end") {
      output += `</${node.tag}>`;
    }

    else if (node.tagName) {
      tagName = node.tagName;
      tag = tagName.toLowerCase();

      output += `<${tag}`;

      if ((attrs = node.attrs) && (l = attrs.length)) {
        for (i = 0; i < l; i++) {
          attr = attrs[i];
          output += ` ${attr.name}="${attr.value}"`;
        }
      }

      output += `>`;

      if ((children = node.childNodes) && children.length) {
        stack.push({ nodeName: "#end", tag });
        for (i = children.length - 1; i >= 0; i--) {
          stack.push(children[i]);
        }
      } else {
        output += `</${tag}>`;
      }
    }
  }

  return output;
};
