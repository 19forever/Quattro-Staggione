import { SeasonInfo, ClothingItem } from '../types';

export const seasonsData: SeasonInfo[] = [
  {
    id: 'jaro',
    name: 'Jaro',
    icon: 'Flower',
    colorClass: 'bg-emerald-50 border-emerald-200 hover:border-emerald-400 text-emerald-800',
    bgClass: 'bg-emerald-50',
    accentColor: '#34d399', // Emerald-400
    textColor: 'text-emerald-900',
    borderColor: 'border-emerald-300',
    description: 'Jaro je čas, kdy se celá příroda probouzí ze zimního spánku! Sníh taje, vykukuje první teplé sluníčko a louky se začínají zelenat.',
    nature: {
      title: 'Příroda a plodiny',
      description: 'Země se probouzí a všechno začíná krásně růst!',
      items: [
        {
          name: 'Sněženky a petrklíče',
          description: 'První kytičky, které vystrkují hlavičky ze sněhu. Jsou to poslové jara!',
          icon: 'Sprout',
          fact: 'Sněženka dokáže vyrůst, i když je kolem ještě troška sněhu!'
        },
        {
          name: 'Kvetoucí stromy',
          description: 'Třešně, jabloně a meruňky se zahalí do růžových a bílých květů, které voní sladce po medu.',
          icon: 'TreeDeciduous',
          fact: 'Včelky se radují a hned letí sbírat první sladký nektar z květů.'
        },
        {
          name: 'Zvířecí miminka',
          description: 'Rodí se spousta mláďátek: jehňátka, zajíčci, ptáčci si staví hnízda a líhnou se jim malá ptáčata.',
          icon: 'Bird',
          fact: 'Mladí ptáčci se v hnízdě ozývají hlasitým pípáním, protože mají pořád hlad!'
        }
      ]
    },
    activities: {
      title: 'Hry a práce na zahradě',
      description: 'Už můžeme jít ven bez tlustých zimních bund!',
      items: [
        {
          name: 'Sázení semínek',
          description: 'Hrabeme hlínu a sázíme mrkvičku, ředkvičky nebo krásné květiny.',
          icon: 'Shovel'
        },
        {
          name: 'Jízda na kole a koloběžce',
          description: 'Cesty už nezábnou a nekloužou! Můžeme vyrazit na první jarní výlet.',
          icon: 'Bike'
        },
        {
          name: 'Pletení pomlázky',
          description: 'Z mladého vrbového proutí kluci pletou pomlázky ozdobené barevnými pentlemi.',
          icon: 'Layers'
        }
      ]
    },
    traditions: {
      title: 'Tradice a svátky u nás',
      description: 'Slavíme jaro a loučíme se se zimou!',
      items: [
        {
          name: 'Vynášení Morany',
          description: 'Děti vyrobí slaměnou postavu Morany (symbol zimy) a hodí ji do potoka, aby zima konečně odešla.',
          icon: 'Waves'
        },
        {
          name: 'Velikonoce',
          description: 'Barvíme vajíčka (kraslice), pečeme sladkého beránka a kluci chodí na koledu pro malovaná vajíčka.',
          icon: 'Egg'
        },
        {
          name: 'Pálení čarodějnic',
          description: 'Poslední dubnovou noc zapalujeme velké ohně, opékáme špekáčky a vítáme teplé jarní dny.',
          icon: 'Flame'
        }
      ]
    },
    clothing: {
      title: 'Co si vezmu na sebe?',
      description: 'Počasí se na jaře rychle mění! Ráno je chladno, odpoledne svítí teplé sluníčko.',
      recommended: ['plastenka', 'mikina', 'jarni_bunda', 'botasky', 'cepice_tenka']
    }
  },
  {
    id: 'leto',
    name: 'Léto',
    icon: 'Sun',
    colorClass: 'bg-amber-50 border-amber-200 hover:border-amber-400 text-amber-800',
    bgClass: 'bg-amber-50',
    accentColor: '#fbbf24', // Amber-400
    textColor: 'text-amber-900',
    borderColor: 'border-amber-300',
    description: 'Léto přináší nejdelší dny plné sluníčka, teplého počasí a hlavně velké prázdniny plné dobrodružství!',
    nature: {
      title: 'Příroda a plodiny',
      description: 'Příroda nám dává spoustu sladkých plodů.',
      items: [
        {
          name: 'Sladké jahody a třešně',
          description: 'Všude dozrávají slaďoučké plody - jahody, maliny, borůvky a červené třešně přímo ze stromu.',
          icon: 'Cherry',
          fact: 'Červené jahody jsou plné vitamínů a chutnají nejlépe čerstvě utržené ze zahrádky.'
        },
        {
          name: 'Zlaté obilí a žně',
          description: 'Pole jsou žlutá jako zlato. Velké kombajny sklízí pšenici a ječmen, abychom měli mouku na chleba.',
          icon: 'Wheat',
          fact: 'Z obilí se v mlýně namele mouka a pekaři z ní pak upečou voňavé rohlíky.'
        },
        {
          name: 'Letní bouřky',
          description: 'Když je moc velké horko, na nebi se objeví tmavé mraky, zablýská se a přijde osvěžující teplý déšť.',
          icon: 'CloudLightning',
          fact: 'Po letní bouřce se na obloze často objeví nádherná barevná duha!'
        }
      ]
    },
    activities: {
      title: 'Hry a letní radovánky',
      description: 'Hurá ven za vodou a sluníčkem!',
      items: [
        {
          name: 'Koupání v rybníce',
          description: 'Cachtáme se ve vodě, plaveme, stavíme hrady z písku a lížeme studenou zmrzlinu.',
          icon: 'Waves'
        },
        {
          name: 'Spaní pod stanem',
          description: 'V noci pozorujeme hvězdy na obloze, svítíme si baterkou a posloucháme cvrčky v trávě.',
          icon: 'Tent'
        },
        {
          name: 'Stavění domečků v lese',
          description: 'Z kůry, klacíků a voňavého mechu stavíme tajná obydlí pro lesní skřítky.',
          icon: 'TreePine'
        }
      ]
    },
    traditions: {
      title: 'Tradice a svátky u nás',
      description: 'Čas oslav léta a radosti!',
      items: [
        {
          name: 'Hurá, prázdniny!',
          description: 'Prvního července začínají dva měsíce bez školy a školky, čas na výlety za babičkou a za dobrodružstvím.',
          icon: 'Sparkles'
        },
        {
          name: 'Dožínky',
          description: 'Tradiční slavnost na konci žní. Lidé děkují za dobrou úrodu a pletou velký věnec z klasů obilí.',
          icon: 'Award'
        },
        {
          name: 'Sbírání léčivých bylin',
          description: 'O letním slunovratu lidé sbírají bylinky (třeba třezalku nebo heřmánek), které mají v létě největší sílu.',
          icon: 'Leaf'
        }
      ]
    },
    clothing: {
      title: 'Co si vezmu na sebe?',
      description: 'Je horko! Potřebujeme oblečení, které větrá, a hlavně si musíme chránit hlavu před sluníčkem.',
      recommended: ['tricko', 'sortky', 'ksiltovka', 'sandaly', 'slunecni_bryle', 'plavky']
    }
  },
  {
    id: 'podzim',
    name: 'Podzim',
    icon: 'Wind',
    colorClass: 'bg-orange-50 border-orange-200 hover:border-orange-400 text-orange-800',
    bgClass: 'bg-orange-50',
    accentColor: '#f97316', // Orange-500
    textColor: 'text-orange-900',
    borderColor: 'border-orange-300',
    description: 'Podzim zbarví celou přírodu do nádherných barev: červené, žluté a oranžové. Ze stromů padá listí a fouká silný vítr.',
    nature: {
      title: 'Příroda a plodiny',
      description: 'Sklízíme plody podzimu a příroda se chystá k odpočinku.',
      items: [
        {
          name: 'Padající barevné listí',
          description: 'Stromy se převlékají do barevného kabátu. Listy opadávají a tvoří měkoučkou šustivou peřinu na zemi.',
          icon: 'Leaf',
          fact: 'Stromy shazují listy, aby v zimě ušetřily sílu a nezmrzly jim větve.'
        },
        {
          name: 'Sběr jablek a hrušek',
          description: 'V sadech češeme kulatá sladká jablka, šťavnaté hrušky a sbíráme hnědé kaštany.',
          icon: 'Apple',
          fact: 'Z kaštanů a žaludů s pomocí špejlí můžeme vyrobit roztomilá zvířátka!'
        },
        {
          name: 'Houbaření v lese',
          description: 'Český les na podzim voní jehličím a houbami. S košíkem hledáme hřiby, křemenáče a bedly.',
          icon: 'FlameKindling', // approximate for mushroom / fun icon
          fact: 'V lese sbíráme jen ty houby, které bezpečně známe, aby nás nebolelo bříško!'
        }
      ]
    },
    activities: {
      title: 'Hry a podzimní zábava',
      description: 'Když fouká vítr, je to ta největší zábava!',
      items: [
        {
          name: 'Pouštění draků',
          description: 'Běháme po louce a sledujeme, jak náš papírový drak letí vysoko mezi mraky.',
          icon: 'Wind'
        },
        {
          name: 'Skákání do listí',
          description: 'Hrabeme velké hromady spadaného listí a pak do nich s radostí skáčeme. To to krásně šustí!',
          icon: 'Sparkles'
        },
        {
          name: 'Dlabání dýní',
          description: 'Vydlabeme oranžovou dýni, vyřežeme jí legrační obličej a večer do ní zapálíme svíčku.',
          icon: 'Smile'
        }
      ]
    },
    traditions: {
      title: 'Tradice a svátky u nás',
      description: 'Vzpomínáme na blízké a vítáme první mrazíky.',
      items: [
        {
          name: 'Dušičky',
          description: 'Začátkem listopadu chodíme na hřbitov, zapalujeme svíčky a vzpomínáme na naše dědečky a babičky.',
          icon: 'Flame'
        },
        {
          name: 'Svatý Martin na bílém koni',
          description: 'Slaví se 11. listopadu. Podle legendy přiváží Martin první sníh a pečou se svatomartinské rohlíčky.',
          icon: 'CheckCircle2' // will use customized look or clean icon
        },
        {
          name: 'Svatováclavské posvícení',
          description: 'Oslava konce sklizně koncem září, kdy se peče posvícenská husa a sladké koláče.',
          icon: 'Cake'
        }
      ]
    },
    clothing: {
      title: 'Co si vezmu na sebe?',
      description: 'Fouká studený vítr a občas prší. Musíme se tepleji obléknout, abychom neprochladli!',
      recommended: ['teply_svetr', 'jarni_bunda', 'holinky', 'dlouhe_kalhoty', 'cepice_tenka', 'plastenka']
    }
  },
  {
    id: 'zima',
    name: 'Zima',
    icon: 'Snowflake',
    colorClass: 'bg-sky-50 border-sky-200 hover:border-sky-400 text-sky-800',
    bgClass: 'bg-sky-50',
    accentColor: '#38bdf8', // Sky-400
    textColor: 'text-sky-900',
    borderColor: 'border-sky-300',
    description: 'Zima přikrývá celou krajinu bílou sněhovou peřinou. Rybníky zamrzají, mrzne a těšíme se na Ježíška!',
    nature: {
      title: 'Příroda a plodiny',
      description: 'Země odpočívá pod sněhem a zvířátka potřebují naši pomoc.',
      items: [
        {
          name: 'Ledové vločky a sníh',
          description: 'Z mraků padají miliony sněhových vloček. Každá vločka má tvar nádherné ledové hvězdičky.',
          icon: 'Snowflake',
          fact: 'Každá sněhová vločka je úplně originální - na světě neexistují dvě úplně stejné!'
        },
        {
          name: 'Krmení ptáčků a zvěře',
          description: 'Sypeme semínka do krmítka pro sýkorky a nosíme kaštany a seno do lesního krmelce pro srnečky.',
          icon: 'Heart',
          fact: 'Ptáčkům v zimě nejvíc chutnají slunečnicová semínka a lojové koule.'
        },
        {
          name: 'Spící příroda',
          description: 'Stromy spí hlubokým spánkem a některá zvířátka (třeba ježci nebo medvědi) celou zimu prospí v pelíšku.',
          icon: 'Moon',
          fact: 'Tomuto zimnímu spánku zvířátek se odborně říká hibernace.'
        }
      ]
    },
    activities: {
      title: 'Hry a zimní sporty',
      description: 'Hurá na sníh, stavět a jezdit!',
      items: [
        {
          name: 'Stavění sněhuláka',
          description: 'Koulíme velké koule ze sněhu, postavíme je na sebe, přidáme mrkev místo nosu a hrnec na hlavu.',
          icon: 'User'
        },
        {
          name: 'Sáňkování a bobování',
          description: 'Vezmeme sáňky nebo boby a jezdíme z největšího kopce dolů. Vítr nám barví tváře do červena!',
          icon: 'ChevronsDown'
        },
        {
          name: 'Bruslení na ledě',
          description: 'Obujeme si teplé brusle a jezdíme po lesklém kluzkém ledě na rybníku nebo na stadionu.',
          icon: 'Activity'
        }
      ]
    },
    traditions: {
      title: 'Tradice a svátky u nás',
      description: 'Nejkrásnější svátky v roce plné kouzel a dárků!',
      items: [
        {
          name: 'Svatý Mikuláš',
          description: 'Na začátku prosince chodí Mikuláš s čertem a andělem. Hodným dětem dávají mandarinky, oříšky a sladkosti.',
          icon: 'Gift'
        },
        {
          name: 'Štědrý den a Vánoce',
          description: 'Zdobíme stromeček, zpíváme koledy, jíme kapra s bramborovým salátem a rozbalujeme dárky pod stromečkem.',
          icon: 'Sparkles'
        },
        {
          name: 'Tři králové',
          description: 'V lednu chodí děti převlečené za tři krále (Kašpar, Melichar a Baltazar), zpívají koledu a píší křídou na dveře K+M+B+.',
          icon: 'Crown'
        }
      ]
    },
    clothing: {
      title: 'Co si vezmu na sebe?',
      description: 'Venku pořádně mrzne! Musíme se zachumlat do tlustých teplých věcí, abychom byli jako v peřince.',
      recommended: ['zimni_bunda', 'oteplovaky', 'zimni_boty', 'rukavice', 'sal', 'kulich']
    }
  }
];

export const clothingItems: ClothingItem[] = [
  { id: 'kulich', name: 'Zimní teplý kulich', icon: 'Construction', category: 'head', seasons: ['zima'] }, // icon approximate
  { id: 'cepice_tenka', name: 'Tenká jarní čepice', icon: 'Award', category: 'head', seasons: ['jaro', 'podzim'] },
  { id: 'ksiltovka', name: 'Kšiltovka proti slunci', icon: 'Smile', category: 'head', seasons: ['leto'] },
  
  { id: 'zimni_bunda', name: 'Tlustá zimní bunda', icon: 'Shirt', category: 'body', seasons: ['zima'] },
  { id: 'jarni_bunda', name: 'Lehká bunda / větrovka', icon: 'Layers', category: 'body', seasons: ['jaro', 'podzim'] },
  { id: 'plastenka', name: 'Pláštěnka do deště', icon: 'CloudRain', category: 'body', seasons: ['jaro', 'podzim'] },
  { id: 'teply_svetr', name: 'Teplý svetr', icon: 'Pocket', category: 'body', seasons: ['podzim', 'jaro'] },
  { id: 'mikina', name: 'Pohodlná mikina', icon: 'Shirt', category: 'body', seasons: ['jaro', 'leto', 'podzim'] },
  { id: 'tricko', name: 'Letní tričko s krátkým rukávem', icon: 'Activity', category: 'body', seasons: ['leto'] },
  
  { id: 'oteplovaky', name: 'Lyžařské oteplováky', icon: 'Grid', category: 'legs', seasons: ['zima'] },
  { id: 'dlouhe_kalhoty', name: 'Dlouhé kalhoty / džíny', icon: 'FolderClosed', category: 'legs', seasons: ['jaro', 'podzim', 'zima'] },
  { id: 'sortky', name: 'Letní kraťasy', icon: 'Scissors', category: 'legs', seasons: ['leto'] },
  { id: 'plavky', name: 'Plavky do vody', icon: 'Waves', category: 'legs', seasons: ['leto'] },
  
  { id: 'zimni_boty', name: 'Teplé zimní boty / sněhule', icon: 'Footprints', category: 'shoes', seasons: ['zima'] },
  { id: 'holinky', name: 'Gumáky do kaluží', icon: 'Navigation', category: 'shoes', seasons: ['podzim', 'jaro'] },
  { id: 'botasky', name: 'Pohodlné tenisky', icon: 'Footprints', category: 'shoes', seasons: ['jaro', 'leto', 'podzim'] },
  { id: 'sandaly', name: 'Vzdušné sandály', icon: 'Sun', category: 'shoes', seasons: ['leto'] },
  
  { id: 'rukavice', name: 'Teplé rukavice', icon: 'Hand', category: 'accessory', seasons: ['zima'] },
  { id: 'sal', name: 'Měkká šála', icon: 'Shuffle', category: 'accessory', seasons: ['zima'] },
  { id: 'slunecni_bryle', name: 'Sluneční brýle', icon: 'Eye', category: 'accessory', seasons: ['leto'] }
];
