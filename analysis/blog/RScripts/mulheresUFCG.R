library("RODBC")
library("dplyr")
library("ggplot2")

channel <- odbcConnect("MyPRE")
historico <- sqlQuery(channel, "select * from preanalytics2015.historico where situacao = 'Aprovado'")
disciplinas <- sqlQuery(channel, "select * from preanalytics2015.disciplinas")
cursos <- sqlQuery(channel, "select * from preanalytics2015.cursos")
alunos <- sqlQuery(channel, "select * from preanalytics2015.alunos")

#--- Alteracao: periodo_ingressao -> periodo_ingresso; codigo_ingressao -> codigo_ingresso
colnames(alunos)[4] <- "periodo_ingresso"
colnames(alunos)[5] <- "codigo_ingresso"
#---

mulheresUFCG <- filter(alunos, genero == "F")
mulheresUFCG_ingresso <- filter(mulheresUFCG, periodo_ingresso >= 2002.1)
mulheresUFCG_evasao <- filter(mulheresUFCG, periodo_evasao >= 2002.1)

alunosPorPeriodo <- group_by(alunos, periodo_ingresso) %>% summarise(n=n())
alunosPorPeriodo <- filter(alunosPorPeriodo, periodo_ingresso >= 2002.1)
colnames(alunosPorPeriodo)[2] <- "total_alunos"
mulheresPorPeriodo <- group_by(mulheresUFCG_ingresso, periodo_ingresso) %>% summarise("total_mulheres"=n()) #numero absoluto de mulheres por periodo
write.table(mulheresPorPeriodo, file="mulheres_por_periodo_ufcg.csv", sep=",")
colnames(mulheresPorPeriodo)[2] <- "mulheres_periodo"

#calcula porcentagem de entrada de mulheres por periodo
porcentagem_entrada_mulheres <- merge(alunosPorPeriodo, mulheresPorPeriodo)
porcentagem_entrada_mulheres$porcentagem <- (porcentagem_entrada_mulheres$mulheres_periodo * 100) / porcentagem_entrada_mulheres$total_alunos
write.table(porcentagem_entrada_mulheres, file="porcentagem_entrada_mulheres.csv", sep=",")

#numero absoluto e porcentagem de formandas por período
formandasPorPeriodo <- filter(mulheresUFCG_evasao, codigo_evasao == 1)
formandasPorPeriodo <- group_by(formandasPorPeriodo, periodo_evasao) %>% summarise("formandas"=n()) ## CHECAR: periodo de 2002.1 so tem 16 formandas
write.table(formandasPorPeriodo, file="formandas_por_periodo.csv", sep=",")

totalFormandosPeriodo <- filter(alunos, periodo_evasao >= 2002.1, codigo_evasao == 1)
totalFormandosPeriodo <- group_by(totalFormandosPeriodo, periodo_evasao) %>% summarise("total_formandos"=n())

porcentagem_formandas <- merge(totalFormandosPeriodo, formandasPorPeriodo)
porcentagem_formandas$porcentagem <- (porcentagem_formandas$formandas * 100) / porcentagem_formandas$total_formandos
write.table(porcentagem_formandas, file="porcentagem_formandas.csv", sep=",")

#De onde vem as mulheres da ufcg?
naturalidade_cidade_mulheres <- group_by(mulheresUFCG_ingresso, naturalidade) %>% summarise("total_mulheres"=n())
write.table(naturalidade_cidade_mulheres, file="naturalidade_cidade_mulheresUFCG.csv", sep=",")
naturalidade_estados_mulheres <- group_by(mulheresUFCG_ingresso, estado) %>% summarise("total_mulheres"=n())
write.table(naturalidade_estados_mulheres, file="naturalidade_estado_mulheresUFCG.csv", sep=",")

#Porcentagem de mulheres por curso
total_alunos_curso <- filter(alunos, periodo_ingresso >= 2002.1)
total_alunos_curso <- group_by(total_alunos_curso, codigo_curso) %>% summarise("total_alunos"=n())

mulheres_por_curso <- group_by(mulheresUFCG_ingresso, codigo_curso) %>% summarise("total_mulheres"=n())
write.table(mulheres_por_curso, file="mulheres_por_curso.csv", sep=",")

porcentagem_mulheres_curso <- merge(total_alunos_curso, mulheres_por_curso)
porcentagem_mulheres_curso$porcentagem <- (porcentagem_mulheres_curso$total_mulheres * 100) / porcentagem_mulheres_curso$total_alunos
write.table(porcentagem_mulheres_curso, file="porcentagem_mulheres_curso.csv", sep=",")
