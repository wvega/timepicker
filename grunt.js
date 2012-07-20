/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:jquery.json>',
    meta: {
      banner: '/**\n' +
        ' * <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        ' * <%= pkg.homepage %>\n' +
        ' *\n' +
        ' * <%= pkg.description %>\n' +
        ' *\n' +
        ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>\n' +
        ' */'
    },
    concat: {
      js: {
        src: ['<banner:meta.banner>', '<file_strip_banner:jquery.<%= pkg.name %>.js>'],
        dest: 'dist/jquery.<%= pkg.name %>.js'
      },
      css: {
        src: ['<banner:meta.banner>', '<file_strip_banner:jquery.<%= pkg.name %>.css>'],
        dest: 'dist/jquery.<%= pkg.name %>.css'
      }
    },
    min: {
      dist: {
        src: ['<banner:meta.banner>', '<config:concat.js.dest>'],
        dest: 'dist/jquery.<%= pkg.name %>.min.js'
      }
    },
    lint: {
      files: ['grunt.js', 'jquery.<%= pkg.name %>.js', 'test/**/*.js']
    },
    cssmin: {
      dist: {
        src: ['a', '<config:concat.css.dest>', '<config:concat.css.dest>', 'b'],
        dest: 'dist/jquery.<%= pkg.name %>.min.css'
      }
    },
    csslint: {
      timepicker: {
        src: ['jquery.<%= pkg.name %>.css'],
        rules: {
          "box-model": false
        }
      }
    },
    qunit: {
      files: ['test/playground.html']
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'lint qunit'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: false,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      },
      globals: {
        jQuery: true,
        LazyLoad: true
      }
    },
    uglify: {}
  });

  grunt.loadNpmTasksWithRequire('grunt-css');
  grunt.loadNpmTasksWithRequire('grunt-less');

  grunt.registerTask('default', 'lint csslint concat min cssmin');

};
