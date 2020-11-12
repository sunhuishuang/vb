const gulp = require("gulp");
const sass = require("gulp-sass");
const connect = require("gulp-connect");
const sourcemaps = require("gulp-sourcemaps");
// 拷贝
gulp.task("html", done => {
        gulp.src("index.html")
            .pipe(gulp.dest("dist"))
            .pipe(connect.reload());
        gulp.src("html/*.html")
            .pipe(gulp.dest("dist/html"))
            .pipe(connect.reload());
        gulp.src("image/**/*")
            .pipe(gulp.dest("dist/image"))
            .pipe(connect.reload());
        gulp.src("js/*.js", )
            .pipe(gulp.dest("dist/js"))
            .pipe(connect.reload());
        gulp.src("iconfont/**", )
            .pipe(gulp.dest("dist/iconfont"))
            .pipe(connect.reload());
        done();
    })
    // css
gulp.task("sass", done => {

    gulp.src("sass/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: "compressed"
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("dist/css"))
        .pipe(connect.reload());

    done();
});

// 开服器
gulp.task("server", done => {

    connect.server({
        root: "dist",
        livereload: true
    })

    done();

});
// 监听
gulp.task("watch", done => {

    gulp.watch("index.html", gulp.series("html"));
    gulp.watch("html/*.html", gulp.series("html"));
    gulp.watch("sass/*.scss", gulp.series("sass"));
    gulp.watch("image/**/*", gulp.series("html"));
    gulp.watch("js/*.js", gulp.series("html"));
    gulp.watch("iconfont/**/*", gulp.series("html"));

    done();
});

gulp.task("build", gulp.parallel("html", "sass"));

gulp.task("default", gulp.series("build", "server", "watch"));