import put_inside from './put_inside.js';
import put_deep_inside from './put_deep_inside.js';


export default (
    (element, cwd, locals, api, compile) => {
        var
            i = 0,
            length = 0,
            nodes = element.children,
            l = nodes.length,
            children = null,
            node = null,
            parent = null,
            j = 0,
            jl = 0,
            childs = null,
            index = 0,
            index_2 = 0,
            data = "",
            type = 0,

            name = "",
            html = "",
            path = "",
            dc = null,
            child = null,
            Nodes = api.Nodes,

            bool = false
        ;
        for (;i<l;i++) {
            node = nodes[i];
            type = node.type;
            
            if (type === 1) {

                name = node.name;
                if (name === "put") {
                    
                    if (node.get_attribute("to") === "parentElement") {
                        parent = node.parent;
                        node.remove();
                        l--;
                        i--;

                        j = 0;
                        jl = (childs = parent.children).length;

                        for(;j<jl;j++){
                            child = childs[j];
                            if (child.type === 2) {
                                put_inside(child,child.data,locals);
                            }
                        }
                    }
                    else {
                        
                        
                        jl = (childs = node.children).length;

                        if (jl) {
                            
                            j = 0;
                            for (;j<jl;j++) {
                                child = childs[j];
                                
                                if ((type = child.type) === 1) {
                                    put_deep_inside(child.children,0,locals,put_deep_inside);
                                }
                            };

                            node.replace_with_many((children=node.children).slice());
                            l += (length = children.length - 1);
                            i += (length);
                        }
                        else {
                            node.remove();
                            i--;
                            l--;
                        }
                    }

                }
                else if (
                    name === "if"
                ) {
                    j = 0;
                    jl = (childs = node.children).length;
                    bool = true;

                    for(;j<jl;j++) {
                        child = childs[j];
                        if (child.type === 2) {
                            bool &&= locals[child.name](locals);
                        }
                    };

                    if (bool && (length = (children = node.children).length)) {
                        node.replace_with_many(children.slice());
                        l += (--length);
                        i += (length);
                    }
                    else {
                        node.remove();
                        i--;
                        l--;
                    }
                }
                else if (
                    name === "paste"
                ) {
                    path = api.join(cwd, node.get_attribute("from"));
                    console.log(path);

                    html = api.read(path).toString();
                    
                    dc = element.create_document(new Nodes());

                    node.parse(
                        html, dc,
                        0, html.length,
                        api.unclosed, api.space, api.quotes,
                        api.Node, Nodes,
                    );

                    compile(
                        dc,
                        api.dirname(path),
                        locals,
                        api,
                        compile,
                    );

                    (length = (children=dc.children).length)
                    ? (
                        node.replace_with_many(children.slice()),
                        
                        (l += (--length)),
                        (i += (length))
                    )
                    : (
                        node.remove(),
                        (l--),
                        (i--)
                    )
                }
                else {
                    compile(
                        node,
                        cwd,
                        locals,
                        api,
                        compile,
                    );
                }

            }
        }
        return undefined;
    }
)