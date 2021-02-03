const Conn = require('../config/database');

const Course = function(course) {
    return this;
}

Course.getAll = result => {
    const sql = "SELECT cursos.id_curso, cursos.nome, cursos.descricao, schools.name, cursos.periodo, cursos.duracao_sem, schools.cep, cursos.sal_ini, cursos.sal_med, cursos.sal_exp FROM cursos JOIN schools ON cursos.fk_idscholl = schools.id_scholl";
    Conn.query(sql, (error, res) => {
        if (error){
            return error;
        } console.log("courses: ", res);
        result(null, res);
    })
}

module.exports = Course;
