const moment =  require('moment')

module.exports = app =>{
    const getTasks = (req, res)=>{
        // verificando se tem date caso contrario color a data de hj
        const date =  req.query.date ? req.query.date
                 //pegando a data de hj .toDate() convert para JS
            :moment().endOf('day').toDate()
        //where filtro
        app.db('tasks')
            .where({ userId: req.user.id})
            .where('estimateAt', '<=', date)
            //ordenção pela data
            .orderBy('estimateAt')
            .then(tasks => res.json(tasks))
            .catch(err => res.status(400).json(err))
    }
    const save = (req, res) => {
        if (!req.body.desc.trim()){
            return res.status(400).send('Descrição é um campo obrigatório')
        }
        req.body.userId = req.user.id
       
        app.db('tasks')
            .insert(req.body)
            .then(_=> res.status(204).send())
            .catch(err => res.status(400).json(err))
    }

    // removendo 
    const remove = (req, res) =>{
        app.db('tasks')
            .where({ id: req.params.id, userId: req.user.id})
            .del()
            .then(rowsDeleted =>{
                if(rowsDeleted >0){
                    res.status(204).send('Deletado com sucesso.')
                }else{
                    const msg = `Não foi encontado task com id: ${req.params.id}.`
                    res.status(400).send(msg)
                }
            })
            .catch(err => res.status(400).json(err))
    }
    const upadateTaskDoneAt =( req, res,doneAt)=>{
        
        app.db('tasks')
            .where({ id: req.params.id, userId: req.user.id})
            .update({ doneAt })
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err))
    }

    const toggleTask = ( req, res) => {
        app.db('tasks')
        .where({ id: req.params.id, userId: req.user.id})
        .first()
        .then(task => {
            if (!task) {
                const msg = `Task com id: ${req.params.id} não encontrada.`
                return res.status(400).send(msg)
            }
            const doneAt = task.doneAt ? null : new Date()
            upadateTaskDoneAt(req, res, doneAt)
        })
        .catch(err => res.status(400).json(err))
    }
    return { getTasks, save, remove, toggleTask}
}