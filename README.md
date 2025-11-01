# zedrit
A language that makes your web app truly native — without kludges or workarounds.


# Installation:

```bash
npm i @perfobyte/zedrit @perfobyte/strucdom
```


# HTML:

## Nested elements:

* Input:

```xml
<html>
    <paste from="./html_content.html"></paste>
</html>
```

* Output:

```xml
<html>
    <head><title>hello</title></head>
    <body><p>world</p></body>
</html>
```

## Inserting values ​​into a string:

* Input:
```xml
<html lang="${lang}">
    <put to="parentElement"/>

    <head></head>
    <body>
        <put>
            <div data-a="${mode}">
        </put>
    </body>
</html>
```


* Output:
```xml
<html lang="en">
    <head></head>
    <body>
        <div data-a="0">
    </body>
</html>
```

## Condition:

### IF:

* Input:
```xml
<html lang="en">
    <head>
        <if is_dev>
            <script src="./debug.js"></script>
        </if>
    </head>
    <body></body>
</html>
```


* Output
```xml
<html lang="en">
    <head>
        <script src="./debug.js"></script>
    </head>
    <body></body>
</html>
```


## Compress:

* Before:
```xml
<html lang="en">
    <head>
        <script src="./debug.js"></script>
    </head>
    <body></body>
</html>
```


* After:
```xml
<html lang="en"><head><script src="./debug.js"></script></head><body></body></html>
```


# Working example:
```js

import {
    parse,
    create_document,
    Node,
    UnclosedHtmlTags as unclosed,
    SpaceCharacters as space,
    QuotesCharacters as quotes,
    ResultCode,
} from '@perfobyte/strucdom';

import { html_compile, html_compress } from '@perfobyte/zedrit';
import {readFileSync, writeFileSync} from 'fs';
import {join, dirname} from 'path';



(() => {

    var
        locals = {
            mode: 0,
            lang: 'en',

            is_dev: (t) => {
                return (
                    t.mode === 0
                );
            },
        },

        file_path = "/home/user/my_html/index.html",
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
    if (result_code === ResultCode.SUCCESS) {
        html_compile(document, cwd, locals, api, html_compile);
        html_compress(document, html_compress);
    
        writeFileSync("dist.html", document.outer_html(unclosed))
    }
    else {
        console.log(result_code)
    }
})();

```