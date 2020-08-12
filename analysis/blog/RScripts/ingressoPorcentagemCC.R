library("RODBC")
library("dplyr")
library("ggplot2")
#library("xlsx")

channel <- odbcConnect("MyPRE")
#historico <- sqlQuery(channel, "select * from preanalytics2015.historico")
#disciplinas <- sqlQuery(channel, "select * from preanalytics2015.disciplinas")
#cursos <- sqlQuery(channel, "select * from preanalytics2015.cursos")
alunos <- sqlQuery(channel, "select * from preanalytics2015.alunos")

computacao <- filter(alunos,  codigo_curso == 14102100) #todos os alunos de computacao

mulheres <- filter(computacao, genero == "F")
homens <- filter(computacao, genero == "M")

ingressoMulheresPeriodo <- group_by(mulheres, periodo_ingressao) %>% summarise(n=n())
ingressoMulheresPeriodo <- filter(ingressoMulheresPeriodo, periodo_ingressao >= 2002.1)

ingressoHomensPeriodo <- group_by(homens, periodo_ingressao) %>% summarise(n=n())
ingressoHomensPeriodo <- filter(ingressoHomensPeriodo, periodo_ingressao >= 2002.1)

ingresso <- merge(ingressoMulheresPeriodo,
                  ingressoHomensPeriodo,
                  by="periodo_ingressao") 

ingressoPorcentagem <- mutate(ingresso,
       pMulheres = (n.x*100)/(n.x+n.y),
       pHomens = (n.y*100)/(n.x+n.y))

ingressoPorcentagem$periodo_ingressao <- as.character(ingressoPorcentagem$periodo_ingressao)

graphNmulheresPeriodo <- ggplot(ingressoPorcentagem, aes(x = periodo_ingressao, y = n.x)) + geom_point()
graphPMulheresPeriodo <- ggplot(ingressoPorcentagem, aes(x = periodo_ingressao, y = pMulheres)) + geom_point()
histNmulheresFrequencia <- hist(ingressoPorcentagem$n.x, xlab="nº mulheres", ylab="Frequency")

#write.xlsx(ingressoPorcentagem, "c:/home/marcosasn/ingressoPorcentagem.xlsx")
write.table(ingressoPorcentagem, file = "ingressoPorcentagem.csv",
            sep = ",", row.names = FALSE,
            col.names = TRUE, qmethod = "double")

close(channel)