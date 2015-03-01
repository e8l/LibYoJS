var LibYo = {};
/**
 * @module LibYo
 * @class LibYo
 */
(function() {
  var isValidString = function(s) {
    return (s && (typeof s).toLowerCase()=== "string");
  };

  /**
   * return instance of Yo API Wrapper Class
   * This is only way to get Yo class's instance.
   *
   *     var yo = LibYo.getInstance("<api token>");
   *
   * @static
   * @method getInstance
   * @param {String} api_token your Yo App's API Token.
   * @return {Yo} an instance of class Yo
   */
  LibYo.getInstance = function(api_token) {
    if (!isValidString(api_token)) {
      return undefined;
    }

    var baseURL = "https://api.justyo.co/";

    /**
     * Yo API Wrapper.
     * please get instance by calling LibYo.getInstance.
     * @class Yo
     * @protected
     * @constructor
     */
    return (function() {
      /**
       * event listener when send method has finished.
       * @private
       * @method _listener
       * @param {Boolean} The value is true when send method has succeeded.
       * @param {Number}  status code.
       * @param {String}  response text.
       */
      var _listener = function(isSucc, sCode, res){};
      var _setPref = function(method, xhr, params) {
        if (method === "POST") {
          xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
          xhr.setRequestHeader("Content-length", params.length);
        }
        xhr.setRequestHeader("Connection", "close");

        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              _listener(true, xhr.status, xhr.responseText);
            }
            else {
              _listener(false, xhr.status, xhr.responseText);
            }
          }
        };
      };

      return {
        /**
         * send yo to 'username'.
         * this method **does not** check if recipient exists really.
         *
         *     var yo = LibYo.getInstance(...);
         *     
         *     yo.yo("HOGE"); // only say yo
         *     yo.yo("HOGE", "http://example.com/sample.jpg"); // yo with link
         *
         * @async
         * @method yo
         * @param {String} username  Yo recipient user name
         * @param {String} [link=""] (optional) link URL
         * @return {Boolean} it returns false if username is not valid as a string.
         */
        yo: function(username, link) {
              if (!isValidString(username)) {
                return false;
              }

              var xhr = new XMLHttpRequest();
              var url = baseURL + "yo/";
              var params = "api_token=" + api_token + "&username=" + username;
              if (isValidString(link)) {
                params = params + "&link=" + encodeURIComponent(link);
              }

              console.log(params);

              xhr.open("POST", url, true);
              _setPref("POST", xhr, params);
              xhr.send(params);

              return true;
            },

          /**
           * send yo to all subscribers
           *
           *     var yo = LibYo.getInstance(...);
           *     
           *     yo.yoAll(); // send yo to all
           *     yo.yoAll("http://example.com/sample.jpg"); // yoall with link
           *
           * @async
           * @method yoall
           * @param {String} [link=""] (optional) link url
           */
          yoAll: function(link) {
                   var xhr = new XMLHttpRequest();
                   var url = baseURL + "yoall/";

                   var params = "api_token=" + api_token;
                   if (isValidString(link)) {
                     params = params + "&link=" + encodeURIComponent(link);
                   }

                   xhr.open("POST", url, true);
                   _setPref("POST", xhr, params);
                   xhr.send(params);
                 },

          /**
           * Check whether 'username' user exists really.
           *
           *     var yo = LibYo.getInstance(...);
           *
           *     yo.checkUserName("FOO");
           *
           * @async
           * @method checkUserName
           * @param {String} username target username.
           * @return {Boolean} it returns false if username is not valid as a string.
           */
          checkUserName: function(username) {
                           if (!isValidString(username)) {
                             return false;
                           }

                           var xhr = new XMLHttpRequest();
                           var url = baseURL + "check_username?username=" + username;

                           xhr.open("GET", url, true);
                           _setPref("GET", xhr);
                           xhr.send();

                           return true;
                         },

          /**
           * Set event listener which will call when send method has finished.
           *
           *     var yo = LibYo.getInstance(...);
           *     
           *     yo.setListener(function(isSucc, retCode, response) {
           *       if( isSucc ) { //when last yo api has succeeded
           *         ...
           *       }
           *       else {
           *         ...
           *       }
           *     });
           * Listener will get 3 arguments.
           * Fisrt argument is whether last API call has succeeded.
           * Second argument is return code such as 200, 400, and so on.
           * Third argument is response text (maybe JSON).
           * @method setListener
           * @param {function} func listener which receive 3 arguments.
           * @return {Boolean} return true when the method has succeeded.
           */
          setListener: function(func) {
                         if ((typeof func).toLowerCase() !== "function") {
                           return false;
                         }

                         _listener = func;

                         return true;
                       },
      };
    })();
  };
})();
