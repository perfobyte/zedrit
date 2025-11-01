import put_inside from './put_inside.js';


export default (
    (childs,i,locals, put_deep_inside) => {
                
        var
            l = childs.length,
            child = null,
            type = ""
        ;
        
        
        for(;i<l;i++){
            child = childs[i];
            if ((type = child.type) === 1) {
                put_deep_inside(child.children,0,locals)
            }
            else if (type === 2) {
                put_inside(child, child.data, locals)
            }
        }

    }
);
