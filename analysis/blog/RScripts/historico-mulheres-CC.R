library("RODBC")
library("dplyr")
library("ggplot2")

channel <- odbcConnect("MyPRE")
historico <- sqlQuery(channel, "select * from preanalytics2015.historico where situacao = 'Aprovado'")
disciplinas <- sqlQuery(channel, "select * from preanalytics2015.disciplinas")
cursos <- sqlQuery(channel, "select * from preanalytics2015.cursos")
alunos <- sqlQuery(channel, "select * from preanalytics2015.alunos")

computacao <- filter(alunos,  codigo_curso == 14102100) #todos os alunos de computacao
computacaoAlunos <- group_by(computacao, periodo_ingressao) %>% summarise(n=n())

mulheres <- filter(computacao, genero == "F")#44% se graduaram
homens <- filter(computacao, genero == "M") #45% se graduaram
homen_evasao <- group_by(homens, codigo_evasao) %>% summarise(n=n())

#grafico da entrada de mulheres por periodo em CC
mulheresEntrada <- group_by(mulheres, periodo_ingressao) %>% summarise(n=n())
mulheresEntrada$periodo_ingressao <- as.character(mulheresEntrada$periodo_ingressao)
ggplot(mulheresEntrada, aes(x = periodo_ingressao, y = n)) + geom_point()
mulheres <- filter(mulheresAlunos, periodo_ingressao >= 2002.1)

#historico de mulheres em cc                                                                                       
mulheresMerge <- subset(historico, matricula %in% mulheres$matricula) #historico mulheres

#Mulheres em computacao por cidade
mulheresPorCidade <- subset(mulheres, naturalidade != "N/A")
mulheresPorCidade <- subset(mulheresPorCidade, estado != "N/A")
mulheresPorCidade <- subset(mulheresPorCidade, naturalidade != "NA")
mulheresPorCidadeQtd <- group_by(mulheresPorCidade, naturalidade) %>% summarise(n=n())


#desistencia das mulheres em cc por periodo
motivoEvasao <- group_by(mulheres, codigo_evasao) %>% summarise(n=n())
mulheresNConclusao <- subset(mulheres, codigo_evasao != 0 & codigo_evasao != 1)

#desistencia x periodo
saidaPeriodoMulheres <- subset(mulheres, matricula %in% mulheresNConclusao$matricula)
saidaPeriodoMulheres <- group_by(saidaPeriodoMulheres, periodo_evasao) %>% summarise(n=n())

saidaPeriodoMulheres$periodo_evasao <- as.character(saidaPeriodoMulheres$periodo_evasao)
graficoSaidaMulheres <- ggplot(saidaPeriodoMulheres, aes(x = periodo_evasao, y = n)) + geom_point()

alunosCCPorPeriodo <- filter(computacao, periodo_ingressao >= 2002.1)
alunosCCPorPeriodo <- group_by(alunosCCPorPeriodo, periodo_ingressao) %>% summarise(n=n())

periodoIngressoMulheres <- group_by(mulheresMerge, periodo) %>% summarise(n=n())
mulheresPorPeriodoAlunos <- group_by(mulheres, periodo_ingressao) %>% summarise(n=n())

#histogramaMulheresCC <- hist(mulheresPorPeriodoAlunos$n)
graficoIngressoMulheres <- ggplot(periodoIngressoMulheres, aes(x = periodo_ingressao, y = n)) + geom_point()

#de onde vêm as mulheres
cidades <- filter(mulheres, naturalidade != "N/A")
cidades$naturalidade <- (paste(cidades$naturalidade, cidades$estado, sep = "+")) 
cidadesQtdMulheres <- group_by(cidades, naturalidade) %>% summarise(n=n())
write.table(cidadesQtdMulheres, file = "cidades_mulheresCC.csv", row.names = FALSE)


close(channel)
