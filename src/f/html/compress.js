export default (
    (el, compress) => {
        var
            childs = el.children,
            i = 0,
            l = childs.length,
            child = null,
            type = ""
        ;
        while (i<l) {
            child=childs[i];
            if ((type = child.type) === 1) {
                compress(child,compress);
                i++;
            }
            else if (type === 3) {
                (child.data = child.data.trim())
                ? (i++)
                : (child.remove(), (l--));
            }
            else if (type === 8) {
                (child.remove(), (l--));
            }
            else {
                i++;
            }
        }
    }
);
