// api/connaissances.js — base d'informations de l'assistant RoseRelais
// Construite à partir de l'enquête RoseRelais (29 réponses, surtout 18-24 ans, Borgou).
// Mettez à jour ce fichier quand une information change.

export const CONNAISSANCES = `
PUBLIC VISÉ : surtout des jeunes (18-24 ans) au Borgou et dans d'autres départements, sur téléphone, avec peu de données Internet. Réponses courtes, mots simples, une idée à la fois. L'assistant répond en français uniquement.

PRINCIPES DE CONFIANCE
- Dire d'où vient une information (OMS, PNLMNT, ministère). Si deux sources semblent se contredire, expliquer simplement pourquoi (âge, antécédents, pays) et renvoyer vers un professionnel de santé.
- Dire clairement « je ne sais pas » pour tout ce qui n'est pas dans cette base (prix, horaires, adresses, téléphones, aides).
- Ne jamais juger la personne. Les professionnels de santé sont tenus au secret professionnel.

1. L'ESSENTIEL
- Le cancer du sein : des cellules du sein se multiplient de façon anormale. Il touche surtout les femmes, rarement les hommes.
- Au Bénin, c'est le cancer le plus fréquent chez la femme. Pris tôt, il se soigne beaucoup mieux. Le danger vient surtout de la découverte tardive.
- Chez les jeunes femmes, il est moins fréquent mais possible : toute anomalie doit être examinée, quel que soit l'âge.
- La plupart des boules sont bénignes, mais seul un professionnel de santé peut le confirmer.

2. SIGNES QUI DOIVENT FAIRE CONSULTER (nouveau ou qui dure)
- Une boule ou une zone dure dans un sein ou sous l'aisselle.
- Changement de taille ou de forme d'un sein.
- Peau qui change : rougeur, creux, aspect « peau d'orange ».
- Mamelon qui rentre ou qui change, écoulement inhabituel (surtout avec du sang).
- Douleur qui dure dans un seul sein.
- Conseil : consulter rapidement, sans attendre que ça fasse mal. Avoir peur est normal, mais ne pas attendre.

3. FACTEURS DE RISQUE
- Cela augmente le risque, ce n'est pas une certitude. Beaucoup de femmes malades n'ont aucun facteur connu.
- Âge qui avance ; cancer du sein ou de l'ovaire chez une proche parente (mère, sœur) ; avoir déjà eu un cancer du sein.
- Surpoids, manque d'activité physique, alcool, tabac.
- Premières règles très tôt, ménopause tardive, ne pas avoir allaité, traitement hormonal long après la ménopause.

4. PRÉVENTION (ce que chacune peut faire)
- Bouger régulièrement, garder un poids sain, limiter l'alcool, ne pas fumer.
- L'allaitement maternel est associé à un risque plus faible.
- Connaître ses seins : regarder et palper de temps en temps pour repérer un changement. Cela ne remplace pas l'examen par un professionnel.
- Aucune méthode ne supprime tout le risque : l'important est de repérer tôt.

5. DÉPISTAGE, EXAMENS ET PARCOURS
- Dépistage = chercher la maladie AVANT qu'il y ait des signes. Diagnostic = examens quand il y a déjà un signe. Dans les deux cas, on commence par la même porte d'entrée.
- Étape 1 : examen clinique des seins par un médecin, une sage-femme ou un agent de santé, au centre de santé le plus proche. C'est l'étape la plus accessible.
- Étape 2 si besoin : échographie (souvent chez les jeunes femmes) et/ou mammographie (radiographie des seins).
- Étape 3 si besoin : biopsie (petit prélèvement analysé au laboratoire). C'est le seul examen qui confirme un cancer.
- Le début et la fréquence du dépistage dépendent de chaque personne (âge, antécédents) : demander à un professionnel de santé.
- Utilité du dépistage : trouver tôt, quand les traitements sont plus simples et plus efficaces.

6. APRÈS UN RÉSULTAT SUSPECT
- Un examen anormal ne veut pas dire cancer, mais il faut faire les examens suivants sans traîner.
- Se faire accompagner par un proche de confiance si possible.
- Les traitements possibles (chirurgie, chimiothérapie, radiothérapie, traitement hormonal) sont choisis par l'équipe médicale. L'assistant ne conseille jamais de traitement.
- Si l'argent est un frein, le dire au médecin ou à l'assistant social de l'hôpital plutôt que d'arrêter les soins.

7. MYTHES ET IDÉES REÇUES
- « Le cancer du sein est contagieux. » Faux, on ne l'attrape pas à côté d'une personne malade.
- « Seules les femmes âgées sont touchées. » Faux : le risque augmente avec l'âge, mais des femmes jeunes en ont aussi.
- « Une boule qui ne fait pas mal n'est pas grave. » Faux : une boule de cancer est souvent sans douleur, donc il faut quand même la faire examiner.
- « Avoir une boule veut dire avoir un cancer. » Faux : beaucoup sont bénignes, mais il faut le vérifier.
- « La biopsie ou l'opération fait se propager le cancer. » Faux : ce sont des examens et soins sûrs, et attendre est plus dangereux.
- « C'est une malédiction ou un mauvais sort. » Faux : c'est une maladie comme les autres, avec des causes médicales. Ne pas en avoir honte.
- « Le cancer du sein c'est toujours la mort. » Faux : quand il est trouvé tôt, les chances de guérison sont bien meilleures.
- Si quelqu'un parle de remèdes traditionnels : ne pas se moquer. Dire avec respect que la médecine doit passer en premier et qu'il ne faut jamais retarder un examen médical.

8. SOUTIEN ET ACCOMPAGNEMENT
- Avoir peur, honte ou se sentir seule est normal. On n'est pas seule.
- En parler à une personne de confiance (proche, ami, agent de santé).
- PNLMNT : chat anonyme avec des experts, https://pnlmnt.bj/chat
- L'assistant ne connaît pas d'association de patientes précise : ne pas en citer. Conseiller de demander au centre de santé ou à l'hôpital s'il existe un soutien psychologique.

9. OÙ ALLER (infos vérifiées ; l'assistant ne connaît pas toutes les structures)
- Dans tous les cas, commencer par le centre de santé ou l'hôpital de zone le plus proche : examen clinique, conseils, orientation vers un spécialiste. Cela limite le coût et la distance.
- Borgou / Parakou : le CHUD-Borgou (hôpital universitaire départemental de Parakou) est l'hôpital de référence de la région. La disponibilité de la mammographie y est à confirmer par téléphone. Au Borgou aussi, l'Hôpital Évangélique de Bembéréké a déjà participé à des campagnes de dépistage des cancers du sein et du col.
- Cotonou : CNHU-HKM et CHU-MEL (diagnostic, chirurgie). Polyclinique Les Cocotiers : mammographie en clinique privée.
- Porto-Novo : CHUD Ouémé-Plateau, qui avait la seule mammographie fonctionnelle des hôpitaux publics lors d'une étude de 2018-2019.
- Abomey-Calavi : Centre Hospitalier International de Calavi (CHIC), oncologie complète avec radiothérapie depuis avril 2026.
- Autres départements : demander l'hôpital départemental (CHUD) ou l'hôpital de zone le plus proche. L'assistant ne connaît pas les détails.
- Les examens les plus avancés sont surtout dans le Sud. Depuis le Nord, l'hôpital de zone ou le CHUD peut orienter et organiser la référence.

10. AVANT DE SE DÉPLACER (l'assistant n'a pas les horaires, tarifs ni conditions)
- Appeler ou passer d'abord, et demander : quels jours et heures ? faut-il un rendez-vous ou une ordonnance ? quels examens des seins sont faits ici ? combien coûte la consultation, l'échographie, la mammographie ? existe-t-il une aide ou une période de dépistage gratuit ?
- Contacts officiels : PNLMNT https://pnlmnt.bj/ ; Ministère de la Santé https://sante.gouv.bj/
- Petit conseil : y aller accompagnée, regrouper les examens le même jour pour limiter les frais de transport.

11. COÛTS (indicatifs ; les vrais prix sont à confirmer sur place)
- Étude hospitalière de 2018-2019 (donc possiblement dépassée) : mammographie environ 18 000 FCFA ; échographie des seins entre 7 500 et 18 000 FCFA ; scanner environ 80 000 FCFA.
- L'assistant ne connaît pas les prix actuels des cliniques privées, de la biopsie, de la chirurgie, de la chimiothérapie ni de la radiothérapie : ne jamais donner de chiffre pour ces soins.
- Ne jamais promettre une gratuité ou un remboursement. Les aides et la couverture par l'assurance maladie : l'assistant ne sait pas, renvoyer vers le PNLMNT et le service social de l'hôpital.
- Le coût ne doit pas empêcher de faire le premier pas : l'examen clinique au centre de santé est la porte d'entrée la moins coûteuse.

12. CANCER DU COL DE L'UTÉRUS (le site a une page : /prevention/col-uterus)
- Vaccin contre le HPV : recommandé par le PNLMNT pour les filles de 9 à 14 ans. Il ne remplace pas le dépistage à l'âge adulte.
- Selon le PNLMNT (projet SUCCESS), dépistage gratuit du col de l'utérus pour les femmes à partir de 25 ans dans les centres concernés. Conditions et centres à confirmer auprès du PNLMNT ou du centre de santé.

13. OCTOBRE ROSE
- Chaque année en octobre, le PNLMNT relaie une campagne sur les cancers du sein et du col (du 1er au 31 octobre en 2026), avec des activités de sensibilisation et de dépistage. Lieux, dates et gratuité varient : renvoyer vers le PNLMNT.

14. CE QUE L'ASSISTANT NE SAIT PAS
- Adresses, téléphones, horaires, tarifs actuels, dates de campagnes, services d'une structure précise, remboursements et aides financières.
- Dans ces cas : le dire honnêtement, donner les questions à poser (partie 10) et renvoyer vers le PNLMNT, le ministère ou le centre de santé le plus proche.
`