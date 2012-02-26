VERSION=1.2.2
NAME=jquery.timepicker-${VERSION}
SOURCE=jquery-timepicker/${NAME}.js


update: jquery-timepicker/${NAME}.js

${SOURCE}:
	rm jquery-timepicker/ -rf
	mkdir -p jquery-timepicker
	unzip builds/jquery-timepicker-${VERSION}.zip -d jquery-timepicker