import {stylom, scriptast, strucdom} from './import/i.js';
import {to_html_string, html_node_reduce} from './f/i.js';

(
    () => {
        var
            l = console.log,
            document = (
                strucdom.parse(
                    `
                    <html>
                        <head/>
                        <body>
                            <paste from="<hello>world</hello>"></paste>
                            <p class="x">Hello <b>World</b></p>

                            <paste from="<hello>world</hello>"></paste>
                        </body>
                    </html>
                    `
                )
            )

            // stack = [...document.childNodes],
            // compresed = to_html_string(stack)
        ;
        

        

        html_node_reduce(
            [document],
            (r,node,i,a) => {
                var 
                    i = 0,
                    child = null,
                    l = 0,
                    childNodes = null,
                    tagName = "",
                    fromAttr = null
                ;
                if (node.tagName === 'body' && (childNodes=node.childNodes)) {
                    l = childNodes.length;

                    for (; i < l; i++) {
                        child = childNodes[i];

                        if (child.tagName === 'paste') {
                            console.dir(childNodes);

                            (fromAttr = child.attrs.find(a => a.name === 'from') || null)
                            &&
                            (
                                childNodes[i] = (
                                    r
                                    .parseFragment(fromAttr.value)
                                    .childNodes[0]
                                )
                            );
                        }
                    }
                }
                return r;
            },
            {
                cwd: "",
                parseFragment:strucdom.parseFragment,
            }
        );

        return console.log(to_html_string([...document.childNodes]));
    }
)()




