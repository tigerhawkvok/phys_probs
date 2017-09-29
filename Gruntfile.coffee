Promise = require('es6-promise').Promise
module.exports = (grunt) ->
  # Gruntfile
  # https://github.com/sindresorhus/grunt-shell
  grunt.option('stack', true)
  grunt.loadNpmTasks("grunt-shell")
  # https://www.npmjs.com/package/grunt-contrib-coffee
  grunt.loadNpmTasks("grunt-contrib-coffee")
  grunt.loadNpmTasks("grunt-contrib-uglify")
  grunt.loadNpmTasks("grunt-contrib-cssmin")
  grunt.loadNpmTasks('grunt-postcss')
  grunt.loadNpmTasks('grunt-contrib-less')
  # https://www.npmjs.com/package/grunt-phplint
  grunt.loadNpmTasks("grunt-phplint")
  # https://github.com/gruntjs/grunt-contrib-clean
  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')
    shell:
      options:
        stderr: false
      bower:
        command: ["bower update"].join("&&")
      movesrc:
        command: ["mv js/c.src.coffee js/maps/c.src.coffee", "cp node_modules/prismjs/prism.js js/prism.js"].join("; ")
    postcss:
      options:
        processors: [
          require('autoprefixer')({browsers: 'last 1 version'})
          ]
      dist:
        src: "css/main.css"
    uglify:
      dist:
        options:
          sourceMap:true
          # sourceMapName:"js/maps/c.map"
          sourceMapIncludeSources:true
          sourceMapIn: (fileIn) ->
            fileName = fileIn.split("/").pop()
            fileNameArr = fileName.split(".")
            fileNameArr.pop()
            fileId = fileNameArr.join(".")
            "js/maps/#{fileId}.js.map"
          compress:
            # From https://github.com/mishoo/UglifyJS2#compressor-options
            dead_code: true
            unsafe: true
            conditionals: true
            unused: true
            loops: true
            if_return: true
            drop_console: false
            warnings: false
            properties: true
            sequences: true
            cascade: true
        files:
          "js/c.min.js":["js/c.js"]
      minpurl:
        options:
          sourceMap:true
          sourceMapName:"js/maps/purl.map"
        files:
          "js/purl.min.js": ["bower_components/purl/purl.js"]
    less:
      # https://github.com/gruntjs/grunt-contrib-less
      options:
        sourceMap: true
        outputSourceFiles: true
        banner: "/*** Compiled from LESS source ***/\n\n"
      files:
        dest: "css/main.css"
        src: ["less/main.less"]
    cssmin:
      options:
        sourceMap: true
        advanced: false
      target:
        files:
          "css/main.min.css":["css/main.css"]
    coffee:
      compile:
        options:
          bare: true
          join: true
          sourceMapDir: "js/maps"
          sourceMap: true
        files:
          "js/c.js":["coffee/core.coffee", "coffee/behaviours.coffee"]
    phplint:
      root: ["*.php","core/*/*.php", "core/*.php"]
  ## Now the tasks
  grunt.registerTask "css", "Process LESS -> CSS", ["less","postcss","cssmin"]
  grunt.registerTask("compile","Compile coffeescript",["coffee:compile","uglify:dist","shell:movesrc"])
  # Main call
  grunt.registerTask "qbuild","CoffeeScript and CSS", ->
    # ,"vulcanize"
    grunt.task.run("phplint","compile","css")
  grunt.registerTask("default",["qbuild"])
