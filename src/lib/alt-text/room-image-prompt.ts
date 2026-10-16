// export const ROOM_IMAGE_PROMPT = `
// Kuvaile asunnon huonetta selkeästi ja helposti hahmotettavasti
// näkövammaiselle käyttäjälle kiinteistönvälityksen näkökulmasta.

// Tavoitteena on kuvata huoneen rakennetta ja pintamateriaaleja,
// ei sen sisustusta.

// Aloita täsmälleen:
// "Tekoälyn tuottama, saattaa sisältää virheitä."

// Kirjoita enintään neljä virkettä. Kuvaile riittävän tarkasti:
// - huoneen tyyppi, jos sen voi tunnistaa varmasti
// - selvästi havaittavat lattia-, seinä- ja kattopinnat ja materiaalit
// - näkyvät ikkunat ja ovet
// - rakennukseen kuuluvat kiinteät rakenteet ja kalusteet
// - kiinteät säilytys- ja pesutilaratkaisut
// - keittiössä selvästi näkyvät kiinteät kalusteet ja integroidut
//   kodinkoneet, kuten liesi, uuni, astianpesukone ja allas
// - pesutilassa esimerkiksi suihku, lasiseinä tai -ovi, sauna,
//   wc-istuin, allas, kiinteä allaskaappi ja pesukonepaikka
// - rakenteiden sijainti silloin, kun se auttaa hahmottamaan huonetta.

// Kuvaile kiinteä kaluste sellaiseksi vain, jos kuvasta näkyy sen olevan
// rakennukseen kuuluva tai rakenteisiin integroitu. Pelkkä sijainti
// seinän vieressä ei tee kalusteesta kiinteää.

// Älä kuvaile huonekaluja, sisustusta, viihde-elektroniikkaa tai
// irrallisia sähkölaitteita. Älä mainitse esimerkiksi sohvia, sänkyjä,
// pöytiä, tuoleja, irrallisia kaappeja, televisioita, koristeita,
// viherkasveja tai valaisimia sisustuselementteinä. Kiinteän valaistuksen,
// kuten upotetut kattovalot tai kattospotit, saa mainita, jos se näkyy
// selvästi osana rakennetta.

// Kuvaile vain kuvasta konkreettisesti havaittavia ominaisuuksia:
// - Älä päättele huoneen käyttötarkoitusta epäselvistä tai osittain
//   näkyvistä alueista.
// - Älä tulkitse heijastuksia uusiksi huoneiksi tai rakenteiksi.
// - Älä päättele lasin, peilin, oven tai aukon takana näkyvän alueen
//   käyttötarkoitusta.
// - Älä arvaa materiaaleja tai rakenteiden muotoa.
// - Älä kerro, että jokin asia puuttuu tai ei näy.
// - Älä kuvaile kamerakulmaa, sommittelua tai epäolennaisia teknisiä
//   yksityiskohtia.

// Kuvaile materiaaleja niiden näkyvien värien ja kuvioiden perusteella.
// Älä arvioi tyyliä, laatua, tunnelmaa, käytännöllisyyttä tai tilan kokoa.
// Vältä esimerkiksi sanoja "moderni", "ylellinen", "viihtyisä",
// "avara", "pieni" ja "ahdas".
// Älä kuvaile materiaalien tai värien välisiä kontrasteja.

// Älä lisää yhteenvetoa. Palauta vain valmis tekstivastine suomeksi.
// `;

export const ROOM_IMAGE_PROMPT = `Kuvaile asunnon huone mahdollisimman selkeästi ja helposti hahmotettavasti sokealle henkilölle kiinteistönvälityksen näkökulmasta.

Tärkein tavoite on kuvata itse tilaa, sen rakennetta ja pintamateriaaleja, ei sitä miten tila on sisustettu.

Aloita tekstivastine aina "Tekoälyn tuottama, saattaa sisältää virheitä.", jonka jälkeen voi aloittaa kuvauksen.

Kerro tilasta maksimissaan neljällä virkkeellä.

Kuvaile ensisijaisesti:

- tilan tyyppi, jos se voidaan tunnistaa varmasti kuvasta
- suuret pinnat
- lattia-, seinä- ja kattomateriaalit
- ikkunat ja ovet, jos ne näkyvät
- rakennukseen kuuluvat kiinteät rakenteet
- kiinteät säilytys- ja pesutilaratkaisut yleisellä tasolla


Älä lisää tavallisten pintojen itsestään selviä ominaisuuksia vain tekstin pidentämiseksi.

Älä yleensä kuvaile:
- sileitä seiniä
- tasaista kattoa
- tavallisia listoja

elleivät ne ole tilan kannalta poikkeuksellinen tai selvästi erottuva ominaisuus.

Kiinteäksi kalusteeksi lasketaan vain selvästi rakennukseen kuuluva tai rakenteisiin integroitu kaluste.

Kuvaile kiinteät kaapistot, jos niissä näkyy selviä tunnusmerkkejä kuten:
- lattiasta kattoon ulottuva rakenne
- seinästä seinään jatkuva rakenne
- yhtenäinen ovipinta
- liukuovet
- kaapiston runko osana seinärakennetta

Esimerkiksi:
- keittiökaapistot
- seinästä seinään ulottuvat vaatekaapistot
- sisäänrakennetut kaapistot
- kylpyhuoneen allaskaapit

Älä kuitenkaan tulkitse tavallisia irtokalusteita kiinteiksi.

Esimerkiksi:
- lipasto ei ole kiinteä vaatekaappi
- matala taso ei ole kiinteä säilytyskaluste
- seinän vieressä oleva yksittäinen kaappi ei ole automaattisesti kiinteä kaluste

Älä tulkitse seinän vieressä olevia kalusteita kiinteiksi vain niiden sijainnin perusteella.

Kuvaile keittiöissä näkyvät kiinteät kalusteet ja integroidut kodinkoneet niiden omilla nimillä.

Keittiössä saa mainita esimerkiksi:
- liesi
- uuni
- mikroaaltouuni
- jääkaappi tai kylmäsäilytyskaluste
- astianpesukone
- allas
- hana
- keittiösaareke

Älä kuvaile pieniä teknisiä rakennusosia tai yksityiskohtia, elleivät ne vaikuta olennaisesti tilan hahmottamiseen.

Älä yleensä mainitse esimerkiksi:
- ilmanvaihtoventtiilejä
- ilmanvaihtosäleikköjä
- pistorasioita
- katkaisijoita
- johtoja
- pieniä kiinnikkeitä

Kuvaile pesutiloissa näkyvät kiinteät kalusteet ja rakenteet riittävällä tarkkuudella.

Kuvaile esimerkiksi:
- suihkun sijainti
- lasiseinät ja lasiovet
- sauna
- wc-istuin
- allas ja kiinteä allaskaappi
- peili
- pyyhekuivain
- pesukonepaikka

Kerro elementtien sijainti, jos se auttaa hahmottamaan tilaa.

Älä kuvaile pieniä teknisiä yksityiskohtia kuten:
- lattiakaivoja
- putkia
- kiinnikkeitä
- suihkulaitteiston pieniä osia

Älä kuvaile huonekaluja, sisustusta, viihde-elektroniikkaa tai irrallisia sähkölaitteita. Tämä koskee myös suuria, selvästi näkyviä tai seinään kiinnitettyjä esineitä.

Älä mainitse esimerkiksi sohvia, irrallisia tai seinälle kiinnitettyjä peilejä muualla kuin pesutiloissa, sänkyjä, pöytiä, tuoleja, lipastoja, mattoja, verhoja sisustuselementteinä, televisioita, televisiotasoja, seinähyllyjä, koristeita, viherkasveja tai valaisimia sisustuselementteinä.

Kiinteä valaistus kuuluu rakennuksen ominaisuuksiin ja sen saa kuvata.

Mainitse esimerkiksi:
- upotetut kattovalaisimet
- kattospotit
- kiinteät valolistat

jos ne ovat selvästi osa katto- tai seinärakennetta.

Poikkeus: sisustusesineen saa mainita vain, jos tilan käyttötarkoitusta ei muuten voi tunnistaa. Silloinkin mainitse se mahdollisimman lyhyesti.

Verhot saa mainita vain silloin, kun ne liittyvät ikkunapinnan hahmottamiseen, esimerkiksi “ikkunoissa on vaaleat verhot”. Älä kuvaile verhoja sisustuksena.

Kuvaile vain konkreettisesti havaittavia rakenteita ja pintoja.

Älä erikseen kerro, että jotakin ei näy. Jos tilassa ei näy ikkunaa, älä mainitse ikkunoita lainkaan.

Älä aloita kuvausta yleisillä tai ympäripyöreillä tilamääritelmillä kuten avoin tila, suorakaiteen muotoinen tila, yhtenäinen tila, avara tila, oleskelutila tai saunaosasto, elleivät ne ole tilan hahmottamisen kannalta selvästi olennaisia.

Siirry mahdollisimman nopeasti kuvaamaan pintoja, rakenteita ja kiinteitä ominaisuuksia.

Vältä kamerakulman tai kuvakomposition kuvaamista. Keskity itse huoneeseen ja sen rakenteeseen.

Mainitse rakenteelliset muodot vain, jos ne ovat selvästi havaittavia.

Älä käytä esimerkiksi:
- viisto katto
- vino seinä
- kalteva pinta
- erikoismuotoinen rakenne

ellei rakenne ole selvästi osa rakennusta.

Jos katon muodosta ei ole varmuutta, kuvaile vain näkyvä pinta, esimerkiksi:
"vaalea katto".

Älä tee päätelmiä, joita kuvasta ei voi varmasti varmistaa.
Älä tunnista tai nimeä osittain näkyviä viereisiä tiloja.

Jos lasin, oven, peilin tai aukon takana näkyy toinen alue, älä päättele sen käyttötarkoitusta.

Älä käytä esimerkiksi:
- kylpyhuone
- vaatehuone
- parveke
- käytävä
- toinen huone

ellei tilan käyttötarkoitus ole täysin varma selvästi näkyvien kiinteiden rakenteiden perusteella.

Kuvaile vain näkyvä rakenne.

Esimerkiksi:
väärin:
"lasiseinä, jonka takana näkyy kylpyhuonetila"

oikein:
"oikealla on lattiasta kattoon ulottuva tumma lasipintainen rakenne tai kaapisto"

Älä tulkitse heijastuksia uusiksi tiloiksi tai rakenteiksi.
Älä lisää oletuksia tai toiminnallisia yhteenvetoja, kuten “tila muodostaa yhtenäisen märkätilan” tai “peseytymis-, wc-, sauna- ja pyykinhuoltotoiminnot sijaitsevat samassa huonekokonaisuudessa”.

Älä arvioi tilan tyyliä, laatua, tunnelmaa tai käytännöllisyyttä.
Vältä esimerkiksi ilmauksia kuten moderni, tyylikäs, viihtyisä, hotellimainen, ylellinen, selkeälinjainen, käytännöllinen, kompakti ja viimeistelty.
Älä käytä tilaa arvioivia tai mahdollisesti negatiivisesti tulkittavia kokomääritelmiä kuten kapea, ahdas, pieni, matala tai sokkeloinen.

Tieto pintamateriaaleista on tärkeämpää kuin yksittäiset esineet.
Kuvaile pintamateriaalien selvästi havaittavat ominaisuudet.
Älä korvaa tarkempaa näkyvää pintakuvausta liian yleisellä ilmauksella kuten "vaalea pinta", jos väri tai kuviointi on selvästi havaittavissa.

Alt-tekstin tulee sisältää riittävästi yksityiskohtia tilan hahmottamiseen.

Älä lyhennä kuvausta poistamalla olennaisia sijainteja tai rakenteiden välisiä suhteita.

Kuvaile esimerkiksi:
- millä seinällä kiinteä kaluste sijaitsee
- miten tilat liittyvät toisiinsa. Älä kuvaile avoimia näkymiä viereisiin huoneisiin tai kuvan reunassa näkyviä tiloja, elleivät ne ole olennaisia huoneen rakenteen ymmärtämiseksi.
- missä ikkunat ja ovet sijaitsevat
- miten suuret pinnat ja materiaalit sijoittuvat

Tavoitteena ei ole mahdollisimman lyhyt teksti, vaan hyödyllinen tilakuvaus.


Vältä liian tarkkaa objektikohtaista kuvausta, joka ei auta hahmottamaan tilaa tai asunnon rakennetta.

Pidä kuvaus:
- neutraalina
- selkeänä
- helposti hahmotettavana

Kuvaus saa päättyä viimeiseen havaittuun rakenteeseen tai pintaan.
Älä lisää loppuun yhteenvetoa tai kokoavaa päätöslausetta.
Älä kuvaile rakenteiden, materiaalien tai värien keskinäisiä kontrasteja tai suhteita.
Kuvaile vain yksittäiset näkyvät rakenteet, pinnat ja kiinteät ominaisuudet.
Vältä turhaa luettelomaisuutta.

Jos käyttäjä lähettää kuvan ilman lisäohjeita, analysoi kuva suoraan ja palauta valmis alt-teksti ilman lisäkysymyksiä.`