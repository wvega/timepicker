VERSION=1.2.0
NAME=jquery.timepicker-${VERSION}

SOURCES=${NAME}.js ${NAME}.css
COMPRESSED=${NAME}.min.js ${NAME}.min.css
MISC=AUTHORS CHANGELOG GPL-LICENSE.txt MIT-LICENSE.txt README.md

FILES=${SOURCES} ${COMPRESSED} ${MISC}

BUILD=builds/jquery-timepicker-${VERSION}.zip


build: ${NAME}.js ${NAME}.css
	cp jquery.timepicker.js ${NAME}.js
	cp jquery.timepicker.css ${NAME}.css
	zip ${BUILD} ${FILES}

${NAME}.js:
	curl -d compilation_level=WHITESPACE_ONLY \
	     -d output_format=text \
	     -d output_info=compiled_code \
	     --data-urlencode js_code@jquery.timepicker.js \
	     http://closure-compiler.appspot.com/compile > jquery.timepicker-${VERSION}.min.js

${NAME}.css:
	curl http://mabblog.com/cssoptimizer/service.php \
		 -F "data=<jquery.timepicker.css" > jquery.timepicker-${VERSION}.min.css

cleanup:
	rm ${SOURCES} ${COMPRESSED}
