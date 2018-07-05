({
    getResponse: function(component, base) {
        // create a server side action.       
        var action = component.get("c.getCalloutResponseContents");
        // set the url parameter for getCalloutResponseContents method (to use as endPoint) 
        action.setParams({
            //"url": 'http://api.fixer.io/latest?base=' + base
            "url": 'https://yourinstance.service-now.com/api/now/table/kb_knowledge?sysparam_limit=10&sys_param_query=GOTO123TEXTQUERY321='+base
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                // set the response(return Map<String,object>) to response attribute.      
                component.set("v.response", response.getReturnValue());
 
                // get the all articles from map by using key              
                var getAllArticles = component.get("v.response")["result"];
                var ArticlesList = [];
                // play a loop on articles object 
                for (var key in getAllArticles) {
                    // push all articles with there Name in ArticlesList variable.        
                    ArticlesList.push(getAllArticles[key]); // i.e : number = KB1234  
                }
                // set the ArticlesList to ListOfArticles attribute on component.           
                component.set("v.ListOfArticles", ArticlesList);
            }
        });
 
        $A.enqueueAction(action);
    },
})
