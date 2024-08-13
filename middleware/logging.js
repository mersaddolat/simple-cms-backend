
module.exports = function () {

    process.on('unhandledRejection', (err) => {
        console.log('Uncaught exception, shutting down...');
        console.error(err);
        process.exit(1);
    });

    process.on('uncaughtException', (err) => {
        console.log('Uncaught exception, shutting down...');
        console.error(err);
        process.exit(1);
    });


}