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

alunos <- filter(alunos, periodo_ingresso >= 1999.1)

ccbs <- filter(cursos, (floor(cursos$codigo_curso / 100000)) == "122")
cct <- filter(cursos, (floor(cursos$codigo_curso / 100000)) == "111")
ceei <- filter(cursos, (floor(cursos$codigo_curso / 100000)) == "141")
ch <- filter(cursos, (floor(cursos$codigo_curso / 100000)) == "133")
ctrn <- filter(cursos, (floor(cursos$codigo_curso / 100000)) == "151")

alunosCCBS <- filter(alunos, codigo_curso %in% ccbs$codigo_curso)
alunosCCT <- filter(alunos, codigo_curso %in% cct$codigo_curso)
alunosCEEI <- filter(alunos, codigo_curso %in% ceei$codigo_curso)
alunosCH <- filter(alunos, codigo_curso %in% ch$codigo_curso)
alunosCTRN <- filter(alunos, codigo_curso %in% ctrn$codigo_curso)

#---- Calcular porcentagem de mulheres por periodo
mulheresCCBS <- filter(alunosCCBS, genero == "F")
mulheres_por_periodoCCBS <- group_by(mulheresCCBS, periodo_ingresso) %>% summarise("total_mulheres"=n())
total_alunosCCBS <- group_by(alunosCCBS, periodo_ingresso) %>% summarise("total_alunos"=n())
porcentagem_mulheresCCBS <- merge(total_alunosCCBS, mulheres_por_periodoCCBS)
porcentagem_mulheresCCBS$porcentagem_mulheres <- (mulheres_por_periodoCCBS$total_mulheres * 100) / total_alunosCCBS$total_alunos
write.table(porcentagem_mulheresCCBS, file="porcentagem_mulheresCCBS.csv", sep=",", row.names=FALSE, col.names = FALSE)

mulheresCCT <- filter(alunosCCT, genero == "F")
mulheres_por_periodoCCT <- group_by(mulheresCCT, periodo_ingresso) %>% summarise("total_mulheres"=n())
total_alunosCCT <- group_by(alunosCCT, periodo_ingresso) %>% summarise("total_alunos"=n())
porcentagem_mulheresCCT <- merge(total_alunosCCT, mulheres_por_periodoCCT)
porcentagem_mulheresCCT$porcentagem_mulheres <- (mulheres_por_periodoCCT$total_mulheres * 100) / total_alunosCCT$total_alunos
write.table(porcentagem_mulheresCCT, file="porcentagem_mulheresCCT.csv", sep=",", row.names=FALSE, col.names = FALSE)

mulheresCEEI <- filter(alunosCEEI, genero == "F")
mulheres_por_periodoCEEI <- group_by(mulheresCEEI, periodo_ingresso) %>% summarise("total_mulheres"=n())
total_alunosCEEI <- group_by(alunosCEEI, periodo_ingresso) %>% summarise("total_alunos"=n())
porcentagem_mulheresCEEI <- merge(total_alunosCEEI, mulheres_por_periodoCEEI)
porcentagem_mulheresCEEI$porcentagem_mulheres <- (mulheres_por_periodoCEEI$total_mulheres * 100) / total_alunosCEEI$total_alunos
#write.table(porcentagem_mulheresCEEI, file="porcentagem_mulheresCEEI.csv", sep=",", row.names=FALSE, col.names = FALSE)

mulheresCH <- filter(alunosCH, genero == "F")
mulheres_por_periodoCH <- group_by(mulheresCH, periodo_ingresso) %>% summarise("total_mulheres"=n())
total_alunosCH <- group_by(alunosCH, periodo_ingresso) %>% summarise("total_alunos"=n())
porcentagem_mulheresCH <- merge(total_alunosCH, mulheres_por_periodoCH)
porcentagem_mulheresCH$porcentagem_mulheres <- (mulheres_por_periodoCH$total_mulheres * 100) / total_alunosCH$total_alunos
#write.table(porcentagem_mulheresCH, file="porcentagem_mulheresCH.csv", sep=",", row.names=FALSE, col.names = FALSE)

mulheresCTRN <- filter(alunosCTRN, genero == "F")
mulheres_por_periodoCTRN <- group_by(mulheresCTRN, periodo_ingresso) %>% summarise("total_mulheres"=n())
total_alunosCTRN <- group_by(alunosCTRN, periodo_ingresso) %>% summarise("total_alunos"=n())
porcentagem_mulheresCTRN <- merge(total_alunosCTRN, mulheres_por_periodoCTRN)
porcentagem_mulheresCTRN$porcentagem_mulheres <- (mulheres_por_periodoCTRN$total_mulheres * 100) / total_alunosCTRN$total_alunos
#write.table(porcentagem_mulheresCTRN, file="porcentagem_mulheresCTRN.csv", sep=",", row.names=FALSE, col.names = FALSE)

#---- de onde vem as mulheres de cada centro? (cidades)
mulheresCCBS <- filter(mulheresCCBS, naturalidade != "N/A")
mulheresCCBS$cidade_e_estado <- (paste(mulheresCCBS$naturalidade, "+", mulheresCCBS$estado))
naturalidade_cidades_mulheresCCBS <- group_by(mulheresCCBS, cidade_e_estado) %>% summarise("cidade"=n())
estados_mulheresCCBS <- filter(mulheresCCBS, estado != "NA")
estados_mulheresCCBS <- group_by(estados_mulheresCCBS, estado) %>% summarise(n=n())
write.table(estados_mulheresCCBS, file="estados_mulheresCCBS.csv", sep=",", row.names = FALSE, col.names = FALSE)
write.table(naturalidade_cidades_mulheresCCBS, file="naturalidade_cidades_mulheresCCBS.csv", sep=",",row.names=FALSE, col.names = FALSE)

mulheresCTRN <- filter(mulheresCTRN, naturalidade != "N/A")
mulheresCTRN$cidade_e_estado <- (paste(mulheresCTRN$naturalidade, "+", mulheresCTRN$estado))
naturalidade_cidades_mulheresCTRN <- group_by(mulheresCTRN, cidade_e_estado) %>% summarise("cidade"=n())
estados_mulheresCTRN <- filter(mulheresCTRN, estado != "NA")
estados_mulheresCTRN <- group_by(estados_mulheresCTRN, estado) %>% summarise(n=n())
write.table(estados_mulheresCTRN, file="estados_mulheresCTRN.csv", sep=",", row.names = FALSE, col.names = FALSE)
write.table(naturalidade_cidades_mulheresCTRN, file="naturalidade_cidades_mulheresCTRN.csv", sep=",",row.names=FALSE, col.names = FALSE)

mulheresCH <- filter(mulheresCH, naturalidade != "N/A")
mulheresCH$cidade_e_estado <- (paste(mulheresCH$naturalidade, "+", mulheresCH$estado))
naturalidade_cidades_mulheresCH <- group_by(mulheresCH, cidade_e_estado) %>% summarise("estado"=n())
estados_mulheresCH <- filter(mulheresCH, estado != "NA")
estados_mulheresCH <- group_by(estados_mulheresCH, estado) %>% summarise(n=n())
write.table(estados_mulheresCH, file="estados_mulheresCH.csv", sep=",", row.names = FALSE, col.names = FALSE)
write.table(naturalidade_cidades_mulheresCH, file="naturalidade_cidades_mulheresCH.csv", sep=",",row.names=FALSE, col.names = FALSE)

mulheresCEEI <- filter(mulheresCEEI, naturalidade != "N/A")
mulheresCEEI$cidade_e_estado <- (paste(mulheresCEEI$naturalidade, "+", mulheresCEEI$estado))
naturalidade_cidades_mulheresCEEI <- group_by(mulheresCEEI, cidade_e_estado) %>% summarise("cidade"=n())
estados_mulheresCEEI <- filter(mulheresCEEI, estado != "NA")
estados_mulheresCEEI <- group_by(estados_mulheresCEEI, estado) %>% summarise(n=n())
write.table(estados_mulheresCEEI, file="estados_mulheresCEEI.csv", sep=",", row.names = FALSE, col.names = FALSE)
write.table(naturalidade_cidades_mulheresCEEI, file="naturalidade_cidades_mulheresCEEI.csv", sep=",",row.names=FALSE, col.names = FALSE)

mulheresCCT <- filter(mulheresCCT, naturalidade != "N/A")
mulheresCCT$cidade_e_estado <- (paste(mulheresCCT$naturalidade, "+", mulheresCCT$estado))
naturalidade_cidades_mulheresCCT <- group_by(mulheresCCT, cidade_e_estado) %>% summarise("cidade"=n())
estados_mulheresCCT <- filter(mulheresCCT, estado != "NA")
estados_mulheresCCT <- group_by(estados_mulheresCCT, estado) %>% summarise(n=n())
write.table(estados_mulheresCCT, file="estados_mulheresCCT", sep=",", row.names = FALSE, col.names = FALSE)
write.table(naturalidade_cidades_mulheresCCT, file="naturalidade_cidades_mulheresCCT.csv", sep=",",row.names=FALSE, col.names = FALSE)

#--- Porcentagem de formandas por período por centro
concluintes_periodoCCBS <- filter(mulheresCCBS, codigo_evasao == 1)
concluintes_periodoCCBS <- group_by(concluintes_periodoCCBS, periodo_evasao) %>% summarise("mulheres_concluintes"=n())
total_concluintes_periodoCCBS <- filter(alunosCCBS, codigo_evasao == 1)
total_concluintes_periodoCCBS <- group_by(total_concluintes_periodoCCBS, periodo_evasao) %>% summarise("total_concluintes"=n())
porcentagem_concluintesCCBS <- merge(concluintes_periodoCCBS, total_concluintes_periodoCCBS)
porcentagem_concluintesCCBS$porcentagem <- (porcentagem_concluintesCCBS$mulheres_concluintes * 100) / porcentagem_concluintesCCBS$total_concluintes
#write.table(naturalidade_estados_mulheresCCBS, file="concluintesCCBS.csv", sep=",",row.names=FALSE, col.names = FALSE)

concluintes_periodoCCT <- filter(mulheresCCT, codigo_evasao == 1)
concluintes_periodoCCT <- group_by(concluintes_periodoCCT, periodo_evasao) %>% summarise("mulheres_concluintes"=n())
total_concluintes_periodoCCT <- filter(alunosCCT, codigo_evasao == 1)
total_concluintes_periodoCCT <- group_by(total_concluintes_periodoCCT, periodo_evasao) %>% summarise("total_concluintes"=n())
porcentagem_concluintesCCT <- merge(concluintes_periodoCCT, total_concluintes_periodoCCT)
porcentagem_concluintesCCT$porcentagem <- (porcentagem_concluintesCCT$mulheres_concluintes * 100) / porcentagem_concluintesCCT$total_concluintes
#write.table(naturalidade_estados_mulheresCCT, file="concluintesCCT.csv", sep=",",row.names=FALSE, col.names = FALSE)

#---- Concluintes por centro
concluintes_periodoCEEI <- filter(mulheresCEEI, codigo_evasao == 1)
concluintes_periodoCEEI <- group_by(concluintes_periodoCEEI, periodo_evasao) %>% summarise("mulheres_concluintes"=n())
total_concluintes_periodoCEEI <- filter(alunosCEEI, codigo_evasao == 1)
total_concluintes_periodoCEEI <- group_by(total_concluintes_periodoCEEI, periodo_evasao) %>% summarise("total_concluintes"=n())
porcentagem_concluintesCEEI <- merge(concluintes_periodoCEEI, total_concluintes_periodoCEEI)
porcentagem_concluintesCEEI$porcentagem <- (porcentagem_concluintesCEEI$mulheres_concluintes * 100) / porcentagem_concluintesCEEI$total_concluintes
#write.table(naturalidade_estados_mulheresCEEI, file="concluintesCEEI.csv", sep=",",row.names=FALSE, col.names = FALSE)

concluintes_periodoCH <- filter(mulheresCH, codigo_evasao == 1)
concluintes_periodoCH <- group_by(concluintes_periodoCH, periodo_evasao) %>% summarise("mulheres_concluintes"=n())
total_concluintes_periodoCH <- filter(alunosCH, codigo_evasao == 1)
total_concluintes_periodoCH <- group_by(total_concluintes_periodoCH, periodo_evasao) %>% summarise("total_concluintes"=n())
porcentagem_concluintesCH <- merge(concluintes_periodoCH, total_concluintes_periodoCH)
porcentagem_concluintesCH$porcentagem <- (porcentagem_concluintesCH$mulheres_concluintes * 100) / porcentagem_concluintesCH$total_concluintes
#write.table(naturalidade_estados_mulheresCH, file="concluintesCH.csv", sep=",",row.names=FALSE, col.names = FALSE)

concluintes_periodoCTRN <- filter(mulheresCTRN, codigo_evasao == 1)
concluintes_periodoCTRN <- group_by(concluintes_periodoCTRN, periodo_evasao) %>% summarise("mulheres_concluintes"=n())
total_concluintes_periodoCTRN <- filter(alunosCTRN, codigo_evasao == 1)
total_concluintes_periodoCTRN <- group_by(total_concluintes_periodoCTRN, periodo_evasao) %>% summarise("total_concluintes"=n())
porcentagem_concluintesCTRN <- merge(concluintes_periodoCTRN, total_concluintes_periodoCTRN)
porcentagem_concluintesCTRN$porcentagem <- (porcentagem_concluintesCTRN$mulheres_concluintes * 100) / porcentagem_concluintesCTRN$total_concluintes
#write.table(naturalidade_estados_mulheresCTRN, file="concluintesCTRN.csv", sep=",",row.names=FALSE, col.names = FALSE)
