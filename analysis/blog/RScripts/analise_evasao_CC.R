
library("RODBC")
library("dplyr")
library("ggplot2")
library("tidyr")
library("xlsx")

file.names = list.files(pattern="xlsx$")

channel <- odbcConnect("MyPRE")

alunos <- sqlQuery(channel,"select * from ciencia_da_computacao_d_cg.alunos")
historico <- sqlQuery(channel,"select * from ciencia_da_computacao_d_cg.historico")

#---
#   Para fins desta análise, compreendemos evasão como desistência ou impedimento de um (a) aluno (a) de prosseguir no curso
#   (ex: falecimento, jubilação, abandono, etc). Por evasão, nao vamos compreender graduação completa ou conclusão do curso.
#---
evadidos <- filter(alunos, codigo_evasao != 0 & codigo_evasao != 1 & codigo_evasao != 10)





#---
#   Por quais principais motivos os (as) alunos (as) evadem do curso?
#---
motivos_evasao <- evadidos %>% 
                  select(codigo_evasao)

count_freq <- table(motivos_evasao)
legenda <- c('Transferência',
             'Abandono',
             'Matricula cancelada',
             'Mudança de curso',
             'Decisão judicial', 
             'Cancelamento', 
             'Novo vestibular', 
             'Novo regimento', 
             'Reprovações por falta',
             'Reprov. mesma disciplina')

df_motivos <- data.frame(Motivos = legenda, Dados = count_freq)

freq <- df_motivos$Dados.Freq
pct = round(freq/sum(freq) * 100, 1)

#gráfico
ggplot(df_motivos, aes(Motivos, Dados.Freq)) +
       geom_bar(stat = "identity")           +
       xlab("Motivos de evasão")             +
       ylab("Frequência por motivo")         +
       geom_text(vjust = -1,
                 size = 3,
                 aes(label=paste(pct, "%", sep = ""))
       ) +
       theme(axis.title.x = element_text(face="bold"),
             axis.title.y = element_text(face="bold"),
             axis.text.x = element_text(angle=55,vjust=0.5),
             axis.text.y = element_blank(),
             axis.ticks.y=element_blank()
      )

write.xlsx(df_motivos, file="perguntas.xlsx", sheetName="um")





#---
#   Frequência de relação entre período e motivo de evasão
#---
dados <- evadidos %>% 
  group_by(periodos_cursados, codigo_evasao) %>%
  summarise(Frequencia = n() )


motivoEvasao = function(cod) {
  
  ans <- ifelse(cod == 2, 'Transferência',
                ifelse(cod == 4, 'Abandono', 
                       ifelse(cod == 5, 'Matricula cancelada', 
                              ifelse(cod == 6, 'Mudança de curso',
                                     ifelse(cod == 7, 'Decisão judicial',
                                            ifelse(cod == 8, 'Cancelamento',
                                                   ifelse(cod == 12, 'Novo vestibular',
                                                          ifelse(cod == 14, 'Novo regimento',
                                                                 ifelse(cod == 21, 'Reprovações por falta',
                                                                        ifelse(cod == 22, 'Reprov. mesma disciplina', 'ERRO')
                                                                 )
                                                          )
                                                   )
                                            )
                                     )
                              )
                       )
                )
        )
  
  return(ans)
}

dados$motivo <- motivoEvasao(dados$codigo_evasao)

dados <- dados %>% data.frame()
write.xlsx(dados, file="umtwo.xlsx", sheetName="umtwo")





#---
#   Qual o período mais frequente de abandono?
#---
calcPeriodoEvasao = function(ingresso, evasao) {
  
  dec_ing = ingresso %% 1
  dec_eva = evasao %% 1
  
  ingresso = as.integer(ingresso)
  evasao   = as.integer(evasao)
  
  qnt_periodos = ( evasao - ingresso ) * 2
  
  qnt_periodos <- qnt_periodos + ifelse(dec_eva > dec_ing, 1,
                                        ifelse(dec_eva < dec_ing, -1, 0) )

  return(qnt_periodos + 1)
}

evadidos$periodos_cursados <- calcPeriodoEvasao(evadidos$periodo_ingressao, evadidos$periodo_evasao)
evadidos <- filter(evadidos, periodos_cursados < 15 & periodos_cursados != 0) # retira outlier

periodo_evasao <- evadidos %>% 
                  select(periodos_cursados) %>%
                  table() %>%
                  data.frame() 

names(periodo_evasao)[1] <- "Periodo"

pct_evasao_periodo = round( periodo_evasao$Freq  / sum(periodo_evasao$Freq) * 100, 1)

#gráfico
ggplot(periodo_evasao, aes(Periodo, Freq)) +
  geom_bar(stat = "identity")              +
  xlab("Período de evasão")                +
  ylab("Frequência de evasão por período") +
  geom_text(vjust = -1,
            size = 3,
            aes(label=paste(pct_evasao_periodo, "%", sep = ""))
  ) +
  theme(axis.title.x = element_text(face="bold"),
        axis.title.y = element_text(face="bold"),
        axis.text.y = element_blank(),
        axis.ticks.y=element_blank()
  )

write.xlsx(periodo_evasao, file="perguntas.xlsx", sheetName="dois", append=TRUE)






#---
#   A função definida a seguir será usadas nas próximas duas perguntas.
#---
acumuladas = function(dataframe) {
  tam  <- NROW(dataframe)
  FREQ <- 1

  acumulada <- c(dataframe[1,FREQ])
  
  for (i in c(2:tam)) {
    acumulada[i] <- sum( dataframe[1:i, FREQ])
  }
  
  return(acumulada)
}



#---
#   Pessoas que desistiram reprovaram muita vezes cadeiras básicas de programação?
#---
matriculas_evadidos <- (historico$matricula %in% evadidos$matricula)
historico_evadidos <- historico[matriculas_evadidos,]

# codigo para PROGRAMAÇÃO I:  1411167
# codigo para LPI:            1411180
# codigo para PROGRAMAÇÃO II: 1411168
# codigo para LPII:           1411181

by_evadidos  <- historico_evadidos %>% 
                filter( (codigo_disciplina == 1411167 | codigo_disciplina == 1411180 |
                         codigo_disciplina == 1411168 | codigo_disciplina == 1411181 ),
                        (situacao == "Reprovado por Falta" | situacao == "Reprovado")
                ) %>%
                group_by(matricula)

summarise_rpv <- summarise(by_evadidos,
                           n_reprovacoes = n()) 

evadidos_rpvs <- summarise_rpv %>%
                 select(n_reprovacoes) %>%
                 table() %>%
                 data.frame()

names(evadidos_rpvs)[1] <- "N_Reprovacoes"

evadidos_rpvs <- evadidos_rpvs[ -c(9,10,11,12,13), ]  # excluindo valores baixos

# calculando quantos não reprovaram nenhuma vez cadeiras de programação
n_total_rpv <-  historico_evadidos %>% 
                filter( codigo_disciplina == 1411167 | codigo_disciplina == 1411180 |
                        codigo_disciplina == 1411168 | codigo_disciplina == 1411181 ) %>%
                group_by(matricula) %>% summarise() %>% NROW()

n_com_rpv    <- NROW(summarise_rpv)
n_sem_rpv    <- n_total_rpv - n_com_rpv

# organizando evadidos_rpv por ordem
temp <- data.frame(Freq=integer())
temp[1,1] <- n_sem_rpv 
temp[2:9,1] <- evadidos_rpvs[1:8,2]
evadidos_rpvs <- temp
evadidos_rpvs$Reprovacoes <- c(0:8)
evadidos_rpvs$acumulada <- acumuladas(evadidos_rpvs)

pct_n_rpvs = round( evadidos_rpvs$Freq  / sum(evadidos_rpvs$Freq) * 100, 1)

#gráfico
ggplot(evadidos_rpvs, aes(Reprovacoes,Freq)) +
  geom_bar(stat = "identity") +
  xlab("Número de reprovações em cadeiras de programação por aluno evadido") +
  ylab("Frequência por número de reprovações") +
  geom_text(vjust = -1,
            size = 3,
            aes(label=paste(pct_n_rpvs, "%", sep = ""))
  ) +
  theme(axis.title.x = element_text(face="bold"),
        axis.title.y = element_text(face="bold"),
        axis.text.y  = element_blank(),
        axis.ticks.y = element_blank()
  )

write.xlsx(evadidos_rpvs, file="perguntas.xlsx", sheetName="tres", append=TRUE)




#---
#   Pessoas que desistiram tiveram reprovaram muita vezes cadeiras básicas do DME?
#---

# codigo para CALC I:   1109103
# codigo para CALC II:  1109053
# codigo para VETORIAL: 1109035

by_evadidos_dme  <- historico_evadidos %>% 
  filter( (codigo_disciplina == 1109053 | codigo_disciplina == 1109103 | codigo_disciplina == 1109035),
          (situacao == "Reprovado por Falta" | situacao == "Reprovado" )
  ) %>%
  group_by(matricula)

summarise_rpv_dme <- summarise(by_evadidos_dme,
                           n_reprovacoes = n()) 

evadidos_rpvs_dme <- summarise_rpv_dme %>%
  select(n_reprovacoes) %>%
  table() %>%
  data.frame()

# calculando quantos não reprovaram nenhuma vez cadeiras básicas do DME
total_rpv_dme <-  historico_evadidos %>% 
  filter( codigo_disciplina == 1109053 | codigo_disciplina == 1109103 | codigo_disciplina == 1109035 ) %>%
  group_by(matricula) %>% summarise() %>% NROW()

com_rpv_dme    <- NROW(summarise_rpv_dme)
sem_rpv_dme    <- total_rpv_dme - com_rpv_dme

# organizando evadidos_rpv por ordem
temp <- data.frame(Freq=integer())
temp[1,1] <- sem_rpv_dme
temp[2:15,1] <- evadidos_rpvs_dme[1:14,2]
evadidos_rpvs_dme <- temp
evadidos_rpvs_dme$Reprovacoes <- c(0:14)
evadidos_rpvs_dme$Acumulada <- acumuladas(evadidos_rpvs_dme)

pct_rpvs_dme = round( evadidos_rpvs_dme$Freq  / sum(evadidos_rpvs_dme$Freq) * 100, 1)

#gráfico
ggplot(evadidos_rpvs_dme, aes(Reprovacoes,Freq)) +
  geom_bar(stat = "identity") +
  xlab("Número de reprovações em cadeiras de DME por aluno evadido") +
  ylab("Frequência por número de reprovações") +
  geom_text(vjust = -1,
            size = 3,
            aes(label=paste(pct_rpvs_dme, "%", sep = ""))
  ) +
  theme(axis.title.x = element_text(face="bold"),
        axis.title.y = element_text(face="bold"),
        axis.text.y  = element_blank(),
        axis.ticks.y = element_blank()
  )

write.xlsx(evadidos_rpvs_dme, file="perguntas.xlsx", sheetName="quatro", append=TRUE)




#---
#   Um aluno que reprovou uma quantidade significativa de cadeiras desiste do curso?
#---
by_reprovados <- historico %>%
                 filter(situacao == "Reprovado por Falta" | situacao == "Reprovada") %>%
                 group_by(matricula) %>%
                 summarise( n = n() )

box <- ggplot(data.frame(by_reprovados), aes(matricula,n)) +
        geom_boxplot()

# por meio do boxplot gerado acima, o limite superior considerado deve ser 12
# entao filtraremos em 12 o numero max de reprovacoes a considerar para calcular a media

by_sem_outliers <- by_reprovados %>%
                 filter(n <= 12)

media_reprovacoes <- round( mean(by_sem_outliers$n) ) # -> 4
# quantidade significativa de cadeiras >= 5

by_mais_reprovacoes <- by_reprovados %>%
                       filter(n > media_reprovacoes)

matricula_mais_reprovacoes <- (alunos$matricula %in% by_mais_reprovacoes$matricula)
alunos_mais_reprovados <- alunos[matricula_mais_reprovacoes,]

by_reprovados_evadidos <- alunos_mais_reprovados %>%
  filter(codigo_evasao != 0 & codigo_evasao != 1 & codigo_evasao != 10)

# organizando data.frame para plotar gráfico
data_to_g <- data.frame(N=integer())
data_to_g[1,1] <- NROW(by_reprovados_evadidos)
data_to_g[2,1] <- NROW(alunos_mais_reprovados) - NROW(by_reprovados_evadidos)
data_to_g$Situacao <- c("Evadiram", "Não evadiram")

pct_evadidos = round( data_to_g$N  / sum(data_to_g$N) * 100, 1)

#gráfico
ggplot(data_to_g, aes(Situacao, N)) +
  geom_bar(stat = "identity") +
  xlab("Situação") +
  ylab("Porcentagem de alunos que reprovaram mais cadeiras que a média") +
  geom_text(vjust = -1,
            size = 3,
            aes(label=paste(pct_evadidos, "%", sep = ""))
  ) +
  theme(axis.title.x = element_text(face="bold"),
        axis.title.y = element_text(face="bold"),
        axis.text.y  = element_blank(),
        axis.ticks.y = element_blank()
  )

write.xlsx(data_to_g, file="perguntas.xlsx", sheetName="cinco", append=TRUE)
