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
      },
      "dist/LICENSE-GPL": "LICENSE-GPL",
      "dist/LICENSE-MIT": "LICENSE-MIT",
      "dist/README.md": "README.md",
      "dist/CHANGELOG": "CHANGELOG",
      "dist/AUTHORS": "AUTHORS"
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
      dist: {
        src: ['jquery.<%= pkg.name %>.css'],
        rules: {
          "box-model": false
        }
      }
    },
    compress: {
      zip: {
        options: {
          mode: "zip",
          basePath: "dist/"
        },
        files: {
          "builds/jquery-<%= pkg.name %>-<%= pkg.version %>.zip": [
            "<config:concat.js.dest>",
            "<config:concat.css.dest>",
            "<config:min.dist.dest>",
            "<config:cssmin.dist.dest>",
            "dist/LICENSE-GPL",
            "dist/LICENSE-MIT",
            "dist/README.md",
            "dist/CHANGELOG",
            "dist/AUTHORS"
          ]
        }
      }
    },
    copy: {
      legacy: {
        options: {
          basePath: "dist/"
        },
        files: {
          ".": ["<config:min.dist.dest>", "<config:cssmin.dist.dest>"]
        }
      }
    },
    clean: ["dist/*"],
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

  grunt.loadNpmTasks('grunt-css');
  grunt.loadNpmTasks('grunt-contrib');

  grunt.registerTask('default', 'lint csslint concat min cssmin copy:legacy compress clean');

};
