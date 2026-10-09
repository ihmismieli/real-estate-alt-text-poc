// export const FLOOR_PLAN_PROMPT = `
// Analysoi asunnon pohjapiirros ja muodosta siitä saavutettava tekstikuvaus näkövammaiselle käyttäjälle.

// Tavoitteena on auttaa käyttäjää hahmottamaan asunnon pohjaratkaisu:
// mistä asuntoon tullaan sisään, mikä on pääasiallinen kulkureitti,
// missä järjestyksessä tilat tulevat vastaan ja sijaitsevatko ne
// kulkureitin vasemmalla vai oikealla puolella.

// Kuvaustapa:
// - Palauta yksi selkeä ja luonnollinen kappale.
// - Aloita täsmälleen: "Tekoälyn tuottama, saattaa sisältää virheitä. Pohjapiirustus, jossa ulko-ovesta sisään astuttaessa..."
// - Aloita kuvaus ulko-ovelta ja etene pääasiallista kulkureittiä pitkin.
// - Käytä vasenta ja oikeaa sisään astuvan henkilön näkökulmasta.
// - Kerro tilat siinä järjestyksessä kuin ne tulevat kuljettaessa vastaan.
// - Suosi selkeitä sijainti-ilmauksia, kuten "heti vasemmalla",
//   "eteisen päässä" ja "sen jälkeen oikealla".
// - Käytä eteistä tai pääasiallista kulkureittiä sijainnin viitepisteenä.
// - Kerro kulkuyhteys erikseen vain, jos se ei muuten käy ilmi tai
//   huoneeseen kuljetaan poikkeavasti, esimerkiksi toisen huoneen kautta.
// - Kerro vastapäätä- ja vieressä-suhteet vain, kun ne tuovat
//   olennaista lisätietoa.
// - Älä siirry tekstissä edestakaisin asunnon eri osien välillä.
// - Älä toista jo kerrottua sijaintia tai tee lopuksi yhteenvetoa.
// - Jätä pois tiedot, jotka eivät auta hahmottamaan pohjaratkaisua.
//   Kiinteät kaapistot ja ikkunat mainitaan vain, jos ne ovat
//   hahmottamisen kannalta olennaisia.

// Perusta kuvaus vain piirroksesta selvästi havaittaviin asioihin:
// - Päättele kulkuyhteys vain näkyvästä ovesta tai selvästä kulkuaukosta.
// - Älä päättele avointa tilaa tai huoneiden välistä yhteyttä pelkästä
//   läheisyydestä. Huomioi näkyvät seinät.
// - Nimeä huone käyttötarkoituksen mukaan vain, jos piirroksen merkintä
//   tai selvä näyttö tukee sitä. Muunna tunnistettavat lyhenteet sanoiksi.
// - Älä arvaa epäselviä mittoja, huonemerkintöjä tai rakenteita.

// Kirjoita lyhyitä ja suoria virkkeitä. Jokaisen virkkeen pitää tuoda
// uutta ja olennaista tietoa pohjaratkaisusta. Älä kuvaile irtokalusteita,
// sisustusta tai pieniä yksityiskohtia.
// `;

export const FLOOR_PLAN_PROMPT = `Analysoi asunnon pohjapiirros ja muodosta siitä saavutettava tekstikuvaus näkövammaiselle käyttäjälle.

Tavoitteena on, että käyttäjä pystyy tekstin perusteella muodostamaan yksinkertaisen mielikuvan asunnon pohjaratkaisusta ja ymmärtämään:

- mistä asuntoon tullaan sisään
- mikä on pääasiallinen kulkureitti
- missä järjestyksessä tilat tulevat vastaan
- sijaitsevatko tilat kulkureitin vasemmalla vai oikealla puolella
- mistä tilasta toiseen kuljetaan silloin, kun kulkuyhteys ei muuten ole ilmeinen.

Kuvaustapa:

Aloita tekstivastine aina "Tekoälyn tuottama, saattaa sisältää virheitä.", jonka jälkeen voi aloittaa kuvauksen.

Aloita aina ulko-ovelta ja kuvaa asunto ikään kuin henkilö astuisi sisään ja etenisi asunnossa.
Käytä ulko-ovea ja siitä alkavaa eteistä, käytävää tai muuta pääasiallista kulkureittiä kuvauksen pysyvänä lähtökohtana.
Etene tämän kulkureitin mukaisesti asunnon sisäänpäin ja kerro huoneet siinä järjestyksessä kuin ne tulevat vastaan.

Suosi yksinkertaisia ilmauksia, kuten:

- heti vasemmalla
- heti oikealla
- vasemmalla
- oikealla
- edessä
- sen jälkeen vasemmalla
- sen jälkeen oikealla
- eteisen päässä
- vastapäätä
- vieressä
- huoneen kautta.

Kerro tilojen järjestys loogisessa kulkujärjestyksessä.
Esimerkiksi:

Pohjapiirustus, jossa ulko-ovesta sisään astuttaessa avautuu suora eteinen. Eteisen vasemmalla puolella on ensimmäinen makuuhuone. Oikealla puolella, eteisen kaapiston jälkeen, avautuu olohuone. Ensimmäisen makuuhuoneen jälkeen vasemmalla on kylpyhuone, joka sijaitsee olohuonetta vastapäätä. Eteisen jatkuessa eteenpäin olohuoneen jälkeen oikealla sijaitsee keittiö ja sitä vastapäätä vasemmalla toinen makuuhuone.

Kun muodostat kuvausta, priorisoi tiedot tässä järjestyksessä:

1. ulko-ovi 
2. eteinen ja  muu pääasiallinen kulkureitti
3. tilat siinä järjestyksessä kuin ne tulevat vastaan
4. sijaitseeko tila vasemmalla vai oikealla
5. vastapäätä tai vieressä olevat tilat
6. tilan kulkuyhteys vain silloin, kun se ei muuten käy ilmi
7.vastapäätä tai vieressä oleva tila vain silloin, kun tieto selvästi helpottaa pohjaratkaisun hahmottamista
8. kiinteät kaapistot vain silloin, kun ne ovat olennaisia kulkureitin tai tilan hahmottamiseksi
9. ikkunat vain poikkeustapauksessa, jos ne ovat välttämättömiä pohjaratkaisun ymmärtämiseksi.

Jos alemman prioriteetin tieto ei tuo kuvaukseen uutta ja olennaista tietoa, jätä se pois.

Säännöt:

1. Aloita ulko-ovelta.

Aloita muodossa:
"Pohjapiirustus, jossa ulko-ovesta sisään astuttaessa..."

2. Kuvaa asunto yhtenä etenemisreittinä.

Etene tekstissä samassa järjestyksessä kuin henkilö etenisi ulko-ovelta asuntoon.
Älä siirry tekstissä edestakaisin asunnon eri osien välillä.

3. Pidä vasen ja oikea johdonmukaisina.

Vasen ja oikea tarkoittavat asuntoon ulko-ovesta sisään kulkevan henkilön näkökulmaa.
Jos pääasiallinen kulkusuunta jatkuu suoraan, säilytä tämä näkökulma koko kuvauksen ajan.

4. Käytä ensisijaisesti eteistä tai pääasiallista kulkureittiä sijainnin viitepisteenä.

Suosi esimerkiksi:
"Heti vasemmalla on ensimmäinen makuuhuone."
"Makuuhuoneen jälkeen vasemmalla on kylpyhuone."
"Eteistä eteenpäin kuljettaessa oikealla on keittiö."

Älä vaihda tarpeettomasti viitepistettä huoneesta toiseen.

5. Älä toista itsestään selvää kulkuyhteyttä.

Jos huoneen sijainnista käy jo selvästi ilmi, että siihen kuljetaan eteisestä tai käytävältä, tätä ei tarvitse sanoa erikseen.

Esimerkiksi:

Suosi:
"Heti vasemmalla on ensimmäinen makuuhuone."

Vältä:
"Heti vasemmalla on ensimmäinen makuuhuone, johon kuljetaan eteisestä."

Kerro kulkuyhteys erikseen vain, jos se on poikkeava tai olennainen, esimerkiksi jos huoneeseen kuljetaan toisen huoneen kautta.

6. Älä kuvaa samaa sijaintia kahdesti.

Kun tilan sijainti on kerran kerrottu riittävän selvästi, älä palaa siihen myöhemmin eri sanoin.

Esimerkiksi jos olet jo kirjoittanut:

"Kylpyhuoneen jälkeen vasemmalla on toinen makuuhuone."
älä myöhemmin lisää:
"Toinen makuuhuone sijaitsee keittiön vasemmalla puolella."

7. Älä tee loppuyhteenvetoa.

Älä päätä kuvausta yhteenvedolla, joka toistaa jo kerrotun huonejärjestyksen.

Vältä esimerkiksi:
"Näin asunnon vasemmalla puolella ovat makuuhuoneet ja kylpyhuone ja oikealla olohuone ja keittiö."

Lopeta kuvaus siihen, kun viimeinen pohjaratkaisun ymmärtämisen kannalta olennainen tila on kuvattu.

8. Kerro vastapäätä- ja vieressä-suhteet vain tarvittaessa.

Käytä sanoja "vastapäätä" ja "vieressä" vain silloin, kun ne tuovat olennaista lisätietoa, jota vasen–oikea- ja etenemisjärjestys eivät jo kerro.

Älä kuvaa kaikkia mahdollisia tilojen keskinäisiä suhteita.

9. Älä käytä tarpeettomia graafisia tai geometrisia kuvauksia.

Vältä ilmaisuja kuten:

"asunnon oikeassa etuosassa"
"pohjapiirroksen vasemmassa yläkulmassa"
"asunnon keskiosassa"

jos sama asia voidaan ilmaista suhteessa eteiseen tai kulkureittiin.

Suosi:

"Eteisen oikealla puolella on olohuone."

10. Älä arvaa.

Perusta kuvaus vain pohjapiirroksesta selvästi havaittaviin rakenteisiin.
Älä päättele kulkuyhteyttä huoneiden läheisyyden perusteella.
Kulkuyhteyden tulee perustua näkyvään oveen tai selkeään avoimeen kulkuaukkoon.
Jos yhteyttä ei voi päätellä varmasti, älä keksi sitä.

11. Huomioi seinät.

Älä päättele kahden vierekkäisen tilan muodostavan yhtenäistä tai avointa tilaa pelkän läheisyyden perusteella.
Jos tilojen välissä näkyy seinä, käsittele niitä erillisinä tiloina.

Käytä ilmauksia kuten "avoin keittiö", "yhtenäinen tila" tai "olohuoneen ja keittiön yhteinen tila" vain, jos pohjapiirroksesta näkyy selvästi, ettei tilojen välissä ole erottavaa seinää.

12. Älä tulkitse huoneen käyttötarkoitusta ilman merkintää tai selvää näyttöä.

Jos pohjapiirroksessa on esimerkiksi merkintä "MH", sen voi nimetä makuuhuoneeksi.
Älä jätä lopulliseen kuvaukseen lyhenteitä.

13. Keskity pohjaratkaisuun.

Huomioi huoneet, seinät, ovet, kulkureitit ja tarvittaessa kiinteät kaapistot.

Älä kuvaile irtokalusteita, sisustusta tai pieniä yksityiskohtia.

14.Käytä lyhyitä ja suoria virkkeitä.

Suosi yhtä tilasuhdetta tai etenemisvaihetta yhdessä virkkeessä.

Esimerkiksi:

"Heti eteisen vasemmalla puolella on ensimmäinen makuuhuone. Makuuhuoneen jälkeen vasemmalla on kylpyhuone. Sen jälkeen eteisen päässä vasemmalla sijaitsee toinen makuuhuone. Eteisen oikealla puolella avautuu olohuone. Eteistä eteenpäin kuljettaessa olohuoneen jälkeen oikealla sijaitsee keittiö."

Älä lisää virkkeen loppuun toissijaisia sijaintisuhteita vain siksi, että ne ovat pohjapiirroksesta pääteltävissä.


Tarkistus ennen vastaamista

Ennen lopullisen tekstin tuottamista tarkista jokainen virke:

- Tuoko tämä virke uutta tietoa pohjaratkaisusta?
- Tarvitaanko tämä tieto asunnon hahmottamiseen?
- Onko sama asia jo kerrottu?
- Voiko asian ilmaista yksinkertaisemmin suhteessa eteiseen tai pääasialliseen kulkureittiin?

Jos virke vain toistaa aiempaa tietoa tai lisää toissijaisen tilasuhteen, jätä se pois.

Vastausmuoto:

Tuota vain valmis pohjapiirroksen kuvaus suomeksi.
Kirjoita yksi selkeä ja luonnollinen kappale.

Aloita muodossa:
"Pohjapiirustus, jossa ulko-ovesta sisään astuttaessa..."

Pidä kuvaus tiiviinä. Tavoitteena ei ole kuvata kaikkea pohjapiirroksessa näkyvää, vaan antaa käyttäjälle mahdollisimman selkeä mielikuva huoneiden järjestyksestä, vasen–oikea-suhteista ja pääasiallisesta kulkureitistä.`