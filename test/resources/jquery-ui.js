(function() {

    var parts = document.location.search.slice( 1 ).split( "&" ),
        length = parts.length,
        version = "1.8.2",
        current,
        i = 0;

    for ( ; i < length; i++ ) {
        current = parts[ i ].split( "=" );
        if ( current[ 0 ] === "jquery-ui" ) {
            version = current[ 1 ];
            break;
        }
    }

    css = "resources/jquery-ui/jquery-ui-" + version + "/jquery-ui-" + version + ".custom.css";
    js = "resources/jquery-ui/jquery-ui-" + version + "/jquery-ui-" + version + ".custom.min.js";

    document.write( "<link rel='stylesheet' href='" + css + "' type='text/css' />" );
    document.write( "<script src='" + js + "'></script>" );

})();