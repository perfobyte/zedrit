
// condition
<if is_dev>
    <div>dev_mode = true</div>
</if>
// is_def();

// put:
<put>
    <div data="${mode}">1</div>
</put>

<html lang="${lang}">
    <put to="parentElement"></put>
</html>

// paste (node):
<paste from="./path.html"></paste>


// [ NEXT ]:

// escape content:
<escape levels="2">

</escape>
