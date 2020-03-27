module.exports = app =>{
    app.post('/signup',app.api.User.save)
    app.post('/signin', app.api.auth.signin)

    app.route('/tasks')
        .all(app.config.passaport.authenticate())
        .get(app.api.task.getTasks)
        .post(app.api.task.save)
    
    app.route('/tasks/:id')
        .all(app.config.passaport.authenticate())
        .delete(app.api.task.remove)
    
    app.route('/tasks/:id/toggle')
        .all(app.config.passaport.authenticate())
        .put(app.api.task.toggleTask)

}