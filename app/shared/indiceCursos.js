var cores = [
    '#047AAC', '#99C40C', '#649AA6', '#DE6DA9', '#59877F', '#32C3E4', '#A84055', '#A80C0C', '#907AB7', '#F26464',
    '#9174FC', '#79CC0C', '#904676', '#C42727', '#D44598', '#58BAA8', '#1E962A', '#E34F77', '#521782', '#FF6600',
    '#2D10D1', '#4F3C2B', '#D11071', '#83B6DE', '#1F5C7F', '#EB3434', '#2D5738', '#0DBCBF', '#5878A6', '#2691A6',
    '#54A16C', '#87BA27', '#FF7B00', '#61D649', '#961C1C', '#D13281', '#626ACC', '#F48B8C', '#ED3237', '#48887B',
    '#41AB99', '#6C3D94', '#83D2E8', '#FAAA31', '#157866', '#6DDE74', '#21488F', '#F58634', '#DE2F95'
]

app.service('cursos', function(request, stringUtils) {
    var self = this

    var promise = request('cursos_2015').then(function(data) {
        self.all = []
        data.forEach(function(curso) {
            if (curso.schema != "engenharia_de_alimentos_d_cg" &
                curso.schema != "filosofia_n_cg" &
                curso.schema != "licenciatura_indigena_d_cg") {
                self.all.push(curso);
            }            
        });
    })

    this.ready = function() {
        return promise
    }

    this.getCor = function(schema) {
        var index = stringUtils.hashCode(schema) % cores.length
        if(index < 0) index += cores.length
        return cores[index]
    }

    this.getRandomCor = function() {
        var index =  Math.random() * cores.length
        return cores[Math.floor(index)]
    }
})
