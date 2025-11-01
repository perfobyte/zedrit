

export default (
    (node,data,locals) => {
        var
            index = 0,
            index_2 = 0
        ;
        
        while (true) {
            if (
                ((
                    index = data.indexOf("${")
                ) !== -1)
                &&
                ((index_2 = data.indexOf("}")) > index)
            ) {
                
                data = (
                    data.substring(0,index)
                    + locals[
                        data
                        .substring(index+2,index_2)
                        .trim()
                    ]
                    + data.substring(index_2+1)
                );
            }
            else {
                node.data = data;
                data = "";
                break;
            }
        }
    }
);
