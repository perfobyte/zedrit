
import {
    parse,
    create_document,
    Node,
    UnclosedHtmlTags as unclosed,
    SpaceCharacters as space,
    QuotesCharacters as quotes,
    ELEMENT_NODE,
} from './import/strucdom.js';

import { html_compile, html_compress } from './f/i.js';
import {readFileSync, writeFileSync} from 'fs';
import {join, dirname} from 'path';



(() => {

    var
        locals = {
            mode: 0,
            lang: 'en',

            is_prod: (t) => {
                return t.mode === 1;
            },
        },

        file_path = "/home/dencelman/gt/space/app/perfobyte/code/h/.html",

        cwd = dirname(file_path),

        html = readFileSync(file_path).toString(),

        document = create_document([]),

        api = {
            read: readFileSync,

            join,
            dirname,
            
            Nodes:Array,
            Node,
            unclosed,
            quotes,
            space,
        },

        result_code = (
            parse(
                html, document,
                0, html.length,
                unclosed, space, quotes,
                Node, Array,
            )
        )
    ;
        
    html_compile(document, cwd, locals, api, html_compile);
    html_compress(document, html_compress);
    
    writeFileSync("dist.html",document.outer_html(unclosed))

})();
