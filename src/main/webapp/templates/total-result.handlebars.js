(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['total-result'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<li>\n<h3>";
  if (stack1 = helpers.place) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.place; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + ". ";
  if (stack1 = helpers.team) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.team; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h3>\n<p class=\"result\"><strong>";
  if (stack1 = helpers.totalResult) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.totalResult; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</strong> (";
  if (stack1 = helpers.firstRun) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.firstRun; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " / ";
  if (stack1 = helpers.secondRun) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.secondRun; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + ")</p>\n";
  stack1 = helpers.each.call(depth0, depth0.competitorResult, {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</li>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n<p>"
    + escapeExpression(((stack1 = ((stack1 = depth0.competitor),stack1 == null || stack1 === false ? stack1 : stack1.bib)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ". "
    + escapeExpression(((stack1 = ((stack1 = depth0.competitor),stack1 == null || stack1 === false ? stack1 : stack1.firstName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(((stack1 = ((stack1 = depth0.competitor),stack1 == null || stack1 === false ? stack1 : stack1.lastName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " (";
  if (stack2 = helpers.firstRun) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.firstRun; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + " / ";
  if (stack2 = helpers.secondRun) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.secondRun; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + ")</p>\n";
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<li>\n<h3>";
  if (stack1 = helpers.team) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.team; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h3>\n";
  stack1 = helpers.each.call(depth0, depth0.competitorResult, {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</li>\n";
  return buffer;
  }

  buffer += "<li data-role=\"list-divider\">Placerade</li>\n";
  stack1 = helpers.each.call(depth0, depth0.placed, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n<li data-role=\"list-divider\">Ej Placerade</li>\n";
  stack1 = helpers.each.call(depth0, depth0['not-placed'], {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer;
  });
})();