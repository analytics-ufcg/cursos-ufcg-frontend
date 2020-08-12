library("RODBC")
library("dplyr")
library("ggplot2")

channel <- odbcConnect("MyPRE")
historico <- sqlQuery(channel, "select * from preanalytics2015.historico")
disciplina <- sqlQuery(channel, "select * from preanalytics2015.disciplinas")
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

alunos_campusCG <- filter(alunos, codigo_curso %in% ccbs$codigo_curso | codigo_curso %in% cct$codigo_curso |
                            codigo_curso %in% ceei$codigo_curso | codigo_curso %in% ch$codigo_curso | codigo_curso %in% ctrn$codigo_curso)

alunosCCBS <- filter(alunos, codigo_curso %in% ccbs$codigo_curso)
alunosCCT <- filter(alunos, codigo_curso %in% cct$codigo_curso)
alunosCEEI <- filter(alunos, codigo_curso %in% ceei$codigo_curso)
alunosCH <- filter(alunos, codigo_curso %in% ch$codigo_curso)
alunosCTRN <- filter(alunos, codigo_curso %in% ctrn$codigo_curso)

motivos_evasao_campusCG <- group_by(alunos_campusCG, codigo_evasao) %>% summarise("qtd"=n())
motivos_evasao_campusCG$porcentagem <- (motivos_evasao_campusCG$qtd * 100) / 16640
motivos_evasao_campusCG$porcentagem[1] <- 0
motivos_evasao_campusCG$porcentagem[2] <- 0
colSums(Filter(is.numeric, motivos_evasao_campusCG))
total_newRow <- data.frame(codigo_evasao='nao conclusao', qtd='-', porcentagem = 70.44471)
motivos_evasao_campusCG <- rbind(motivos_evasao_campusCG, total_newRow)

write.table(motivos_evasao_campusCG, file="motivos_evasao_campusCG.csv", sep=",", row.names = FALSE, col.names = FALSE)

nao_conclusaoCCBS <- filter(alunosCCBS, codigo_evasao != 1 && codigo_evasao != 0)
nao_conclusaoCCBS <- group_by(alunosCCBS, codigo_evasao) %>% summarise(n=n())
nao_conclusaoCCBS$porcentagem <- (nao_conclusaoCCBS$n * 100) / 1502
nao_conclusaoCCBS$porcentagem[1] <- 0
nao_conclusaoCCBS$porcentagem[2] <- 0
colSums(Filter(is.numeric, nao_conclusaoCCBS))
total_newRow <- data.frame(codigo_evasao='nao conclusao', n='-', porcentagem =38.68176)
nao_conclusaoCCBS <- rbind(nao_conclusaoCCBS, total_newRow)
write.table(nao_conclusaoCCBS, file="nao_conclusaoCCBS.csv", sep=",", row.names = FALSE, col.names = FALSE)

nao_conclusaoCCT <- filter(alunosCCT, codigo_evasao != 1 && codigo_evasao != 0)
nao_conclusaoCCT <- group_by(alunosCCT, codigo_evasao) %>% summarise(n=n())
nao_conclusaoCCT$porcentagem <- (nao_conclusaoCCT$n * 100) / 4039
nao_conclusaoCCT$porcentagem[1] <- 0
nao_conclusaoCCT$porcentagem[2] <- 0
colSums(Filter(is.numeric, nao_conclusaoCCT))
total_newRow <- data.frame(codigo_evasao='nao conclusao', n='-', porcentagem = 71.13147)
nao_conclusaoCCT <- rbind(nao_conclusaoCCT, total_newRow)
write.table(nao_conclusaoCCT, file="nao_conclusaoCCT.csv", sep=",", row.names = FALSE, col.names = FALSE)

nao_conclusaoCEEI <- filter(alunosCEEI, codigo_evasao != 1 && codigo_evasao != 0)
nao_conclusaoCEEI <- group_by(alunosCEEI, codigo_evasao) %>% summarise(n=n())
nao_conclusaoCEEI$porcentagem <- (nao_conclusaoCEEI$n * 100) / 2984
nao_conclusaoCEEI$porcentagem[1] <- 0
nao_conclusaoCEEI$porcentagem[2] <- 0
colSums(Filter(is.numeric, nao_conclusaoCEEI))
total_newRow <- data.frame(codigo_evasao='nao conclusao', n='-', porcentagem = 81.86997)
nao_conclusaoCEEI <- rbind(nao_conclusaoCEEI, total_newRow)
write.table(nao_conclusaoCEEI, file="nao_conclusaoCEEI.csv", sep=",", row.names = FALSE, col.names = FALSE)

nao_conclusaoCH <- filter(alunosCH, codigo_evasao != 1 && codigo_evasao != 0)
nao_conclusaoCH <- group_by(alunosCH, codigo_evasao) %>% summarise(n=n())
nao_conclusaoCH$porcentagem <- (nao_conclusaoCH$n * 100) / 5271
nao_conclusaoCH$porcentagem[1] <- 0
nao_conclusaoCH$porcentagem[2] <- 0
colSums(Filter(is.numeric, nao_conclusaoCH))
total_newRow <- data.frame(codigo_evasao='nao conclusao', n='-', porcentagem = 70.21438)
nao_conclusaoCH <- rbind(nao_conclusaoCH, total_newRow)
write.table(nao_conclusaoCH, file="nao_conclusaoCH.csv", sep=",", row.names = FALSE, col.names = FALSE)

nao_conclusaoCTRN <- filter(alunosCTRN, codigo_evasao != 1 && codigo_evasao != 0)
nao_conclusaoCTRN <- group_by(alunosCTRN, codigo_evasao) %>% summarise(n=n())
nao_conclusaoCTRN$porcentagem <- (nao_conclusaoCTRN$n * 100) / 2844
nao_conclusaoCTRN$porcentagem[1] <- 0
nao_conclusaoCTRN$porcentagem[2] <- 0
colSums(Filter(is.numeric, nao_conclusaoCTRN))
total_newRow <- data.frame(codigo_evasao='nao conclusao', n='-', porcentagem = 74.68354)
nao_conclusaoCTRN <- rbind(nao_conclusaoCTRN, total_newRow)
write.table(nao_conclusaoCTRN, file="nao_conclusaoCTRN.csv", sep=",", row.names = FALSE, col.names = FALSE)

maiores_evasoes <- filter(alunos, codigo_evasao != 0)
concluiram <- filter(maiores_evasoes, codigo_evasao == 1)
nao_concluiram <- filter(maiores_evasoes, codigo_evasao != 0)
concluiram <- group_by(concluiram, codigo_curso) %>% summarise(n=n())
nao_concluiram <- group_by(nao_concluiram, codigo_curso) %>% summarise(n=n())

nao_concluiram <- filter(nao_concluiram, codigo_curso %in% concluiram$codigo_curso)

nao_concluiram$porcentagem <- (nao_concluiram$n * 100) / (nao_concluiram$n + concluiram$n)
nao_concluiram <- filter(nao_concluiram, codigo_curso %in% alunos_campusCG$codigo_curso)
write.table(nao_concluiram, file="nao_concluiram.csv", sep=",", row.names = FALSE, col.names = FALSE)
