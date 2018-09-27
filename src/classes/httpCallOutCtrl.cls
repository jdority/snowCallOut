public class httpCallOutCtrl {
    
    // Pass in the endpoint to be used using the string url
	@AuraEnabled
	public static Map < String,
	Object > getCalloutResponseContents(String url) {
    String userName = 'sfi';
    String password = '18!';
    Blob headerValue = Blob.valueOf( username + ':' + password);
    String authorizationHeader = 'BASIC ' + EncodingUtil.base64Encode(headerValue);
        // Instantiate a new http object
		Http h = new Http();
 
		// Instantiate a new HTTP request, specify the method (GET) as well as the endpoint
		HttpRequest req = new HttpRequest();
		req.setHeader('Accept', 'application/json');
        req.setHeader('Authorization', authorizationHeader);  
        req.setMethod('GET');
        req.setEndpoint(url);

		// Send the request, and return a response
		HttpResponse res = h.send(req);
		System.debug('response:--> ' + res.getBody());
 
		// Deserialize the JSON string into collections of primitive data types.
		Map < String,
		Object > resultsMap = (Map < String, Object > ) JSON.deserializeUntyped(res.getBody());
		system.debug('resultsMap-->' + resultsMap);
 
		return resultsMap;
	}
}
