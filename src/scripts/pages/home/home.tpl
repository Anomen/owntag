<h:button value="Home"></h:button>
<h:button value="Heyy">
    <h:buttonEntry href="#">Test</h:buttonEntry>
    <h:buttonEntry href="#">Test</h:buttonEntry>
    <h:buttonEntry href="#">Test</h:buttonEntry>
    <h:buttonEntry href="#">
        <h:date format="MMM Do YY"></h:date>
    </h:buttonEntry>
</h:button>
<br/>
<h:date format="MMMM Do YYYY, h:mm:ss a">
    <%= new Date().getTime() %>
</h:date>
<br/>
<h:subview>testSubview</h:subview>