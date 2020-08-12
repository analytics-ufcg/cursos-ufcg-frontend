library("RODBC")
library("dplyr")

channel <- odbcConnect("MyPRE")
historico <- sqlQuery(channel, "select * from preanalytics2015.historico where situacao = 'Aprovado'")
disciplinas <- sqlQuery(channel, "select * from preanalytics2015.disciplinas")
cursos <- sqlQuery(channel, "select * from preanalytics2015.cursos")
alunos <- sqlQuery(channel, "select * from preanalytics2015.alunos")

alunosCC <- filter(alunos, codigo_curso == 14102100)
mulheres <- filter(alunosCC, genero == "F")
homens <- filter(alunosCC, genero == "M")

mulheresPorPeriodo <- group_by(mulheres, periodo_ingressao) %>% summarise(n = n())
homensPorPeriodo <- group_by(homens, periodo_ingressao) %>% summarise(n = n())


# vendo se há diferença entre o banco e o csv
#alunos2 <- read.csv("../dataSets/alunos_ate_20152.csv", sep=";", header=TRUE)

#alunosCC2 <- filter(alunos, codigo_curso == 14102100)
#mulheres2 <- filter(alunosCC, genero == "F")
#homens2 <- filter(alunosCC, genero == "M")

#mulheres2 <- group_by(mulheres2, periodo_evasao) %>% summarise(n = n())
#homens2 <- group_by(homens2, periodo_evasao) %>% summarise(n = n())


close(channel)
