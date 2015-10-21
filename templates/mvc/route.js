    var <%= controller %> = require('./../controllers/<%= controller %>');
<% if(hasFetch || hasPatch || hasUpdate || hasDelete) {  %>
    app.route('<%= apiRoute %>:id/')
<% if(hasFetch) {    %>       .get(<%= controller %>.fetch)
<% } if(hasPatch) {  %>       .patch(<%= controller %>.patch)
<% } if(hasUpdate) { %>       .put(<%= controller %>.update)
<% } if(hasDelete) { %>       .delete(<%= controller %>.delete)
<%                 } %>       ; <% } %>
<% if(hasCreate || hasFilter) {%>
    app.route('<%= apiRoute %>')
<% if(hasCreate) {   %>       .get(<%= controller %>.create)
<% } if(hasFilter) { %>       .patch(<%= controller %>.filter)
<%                 } %>       ; <% } %>
