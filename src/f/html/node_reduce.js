export default (
    (stack, cb, r) => {
        var
            I = 0,
            i = 0,
            l = 0,
            node = null,
            childNodes = null
        ;
        
        while (stack.length) {
            r = cb(r,(node = stack.pop()),I,stack);
            
            if (
                (childNodes = node.childNodes)
                &&
                (l = childNodes.length)
            ) {
                i = (l - 1);
                for (; i >= 0; i--) {
                    stack.push(childNodes[i]);
                }
            };
            I++;
        }

        return r;
    }   
);
