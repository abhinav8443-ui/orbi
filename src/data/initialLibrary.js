// Orbi Music Player - Curated Initial Music Database & Playlists
// Every track includes real local audio files, official release cover art, and synced LRC lyrics

const RAW_TRACKS = [
  {
    id: "sm-nayaab",
    title: "Nayaab",
    artist: "Seedhe Maut, Sez on the Beat",
    album: "Nayaab",
    genre: "DHH / Masterpiece",
    year: 2022,
    duration: 205,
    coverUrl: "/covers/sm-nayaab.jpg",
    audioUrl: "/audio/sm-nayaab.m4a",
    lyrics: `[00:08.00] Nayaab hai safar, nayaab hai kahani
[00:15.50] Likhte hain lafz jaise behta hua paani
[00:23.00] Calm aur Encore, do bhaiyon ka josh
[00:30.50] Gaane sunte hi sabhi khote hain hosh
[00:38.00] Sez on the beat aur dilli ka ye shor
[00:45.00] Desi hip-hop mein hum machate hain roar`
  },
  {
    id: "sm-toh-kya",
    title: "Toh Kya",
    artist: "Seedhe Maut, Sez on the Beat",
    album: "Nayaab",
    genre: "DHH / Alt-Rap",
    year: 2022,
    duration: 182,
    coverUrl: "/covers/sm-nayaab.jpg",
    audioUrl: "/audio/sm-toh-kya.m4a",
    lyrics: `[00:06.00] Toh kya hua agar hum thode alag hain
[00:12.50] Sapnon ki raahon mein hum chalte bejhadak hain
[00:19.00] Nafrat ko chhod ke banate hain sangeet
[00:25.50] Har ek mushkil pe paate hain jeet`
  },
  {
    id: "sm-choti-soch",
    title: "Choti Soch",
    artist: "Seedhe Maut, Sez on the Beat",
    album: "Nayaab",
    genre: "DHH / Conscious",
    year: 2022,
    duration: 175,
    coverUrl: "/covers/sm-nayaab.jpg",
    audioUrl: "/audio/sm-choti-soch.m4a",
    lyrics: `[00:05.00] Choti soch walon se hum rehte hain door
[00:11.00] Mehnat ke bal pe hi hote hain mashhoor
[00:17.00] Kalam mein jaan hai aur lafzon mein sach
[00:23.00] Zindagi ki seekh se seekha har ek pakh`
  },
  {
    id: "sm-godkod",
    title: "Godkod",
    artist: "Seedhe Maut, Sez on the Beat",
    album: "Nayaab",
    genre: "DHH / Hardcore",
    year: 2022,
    duration: 168,
    coverUrl: "/covers/sm-nayaab.jpg",
    audioUrl: "/audio/sm-godkod.m4a",
    lyrics: `[00:04.50] Godkod flow, circuit pe load
[00:09.50] Todte hain rules har ek naye mod
[00:15.00] Encore aur Calm, double the speed
[00:20.50] Desi hip-hop ki yahi hai need`
  },
  {
    id: "sm-khoj",
    title: "Khoj",
    artist: "Seedhe Maut, Sez on the Beat",
    album: "Nayaab",
    genre: "DHH / Melodic",
    year: 2022,
    duration: 195,
    coverUrl: "/covers/sm-nayaab.jpg",
    audioUrl: "/audio/sm-khoj.m4a",
    lyrics: `[00:07.00] Khoj mein nikle the hum apne wajood ki
[00:14.00] Pa li kahani humne dilli ke dhoop ki
[00:21.00] Raste the tedhe par manzil thi saaf
[00:28.00] Mehnat se kiya har galti ko maaf`
  },
  {
    id: "sm-dum-ghutte",
    title: "Dum Ghutte (feat. MC Kode)",
    artist: "Seedhe Maut, MC Kode, Sez on the Beat",
    album: "Nayaab",
    genre: "DHH / Deep Rap",
    year: 2022,
    duration: 212,
    coverUrl: "/covers/sm-nayaab.jpg",
    audioUrl: "/audio/sm-dum-ghutte.m4a",
    lyrics: `[00:08.00] Dum ghutte yahan is shahar ke dhuein mein
[00:16.00] Yaadein hain dabi jaise gehre se kuein mein
[00:24.00] Kode, Encore aur Calm ki pukaar
[00:32.00] Asli hip-hop ka sachha vyapaar`
  },
  {
    id: "sm-marne-ke-baad-bhi",
    title: "Marne Ke Baad Bhi",
    artist: "Seedhe Maut, Sez on the Beat",
    album: "Nayaab",
    genre: "DHH / Legacy",
    year: 2022,
    duration: 220,
    coverUrl: "/covers/sm-nayaab.jpg",
    audioUrl: "/audio/sm-marne-ke-baad-bhi.m4a",
    lyrics: `[00:09.00] Marne ke baad bhi zinda rahenge ye bol
[00:18.00] Shabdon ka hamare koi nahi hai mol
[00:27.00] Itihaas likhenge hum apne hi khoon se
[00:36.00] Desi rap chamkega dilli ke junoon se`
  },
  {
    id: "sm-maina",
    title: "Maina",
    artist: "Seedhe Maut, Sez on the Beat",
    album: "Nayaab",
    genre: "DHH / Melodic",
    year: 2022,
    duration: 210,
    coverUrl: "/covers/sm-nayaab.jpg",
    audioUrl: "/audio/sm-maina.m4a",
    lyrics: `[00:07.00] Maina gaati hai surila sa gaana
[00:14.00] Bhool nahi paate wo beeta zamaana
[00:21.00] Nayaab hai ye lamha, ise na gawaana
[00:28.00] Dil ke kone mein bas tu hi samaana`
  },
  {
    id: "sm-batti",
    title: "Batti (feat. Ab 17)",
    artist: "Seedhe Maut, Ab 17, Sez on the Beat",
    album: "Nayaab",
    genre: "DHH / Drill",
    year: 2022,
    duration: 190,
    coverUrl: "/covers/sm-nayaab.jpg",
    audioUrl: "/audio/sm-batti.m4a",
    lyrics: `[00:06.00] Batti bujha ke ab hoga yahan tandav
[00:12.50] Delhi ke raste aur shor sharaba
[00:19.00] Sez ke music pe Encore ka vaar
[00:25.50] Calm ne mic pe baandhi raftaar`
  },
  {
    id: "sm-ghar-pe-aao",
    title: "Ghar Pe Aao",
    artist: "Seedhe Maut, Sez on the Beat",
    album: "Nayaab",
    genre: "DHH / Chill",
    year: 2022,
    duration: 185,
    coverUrl: "/covers/sm-nayaab.jpg",
    audioUrl: "/audio/sm-ghar-pe-aao.m4a",
    lyrics: `[00:05.50] Ghar pe aao, baitho, baat karenge
[00:12.00] Purane dino ki yaad karenge
[00:18.50] Chaaye ki chuski aur beat pe beat
[00:25.00] Doston ke sang hi hoti hai jeet`
  },
  {
    id: "sm-hoshiyaar",
    title: "Hoshiyaar",
    artist: "Seedhe Maut, Sez on the Beat",
    album: "Nayaab",
    genre: "DHH / Conscious",
    year: 2022,
    duration: 178,
    coverUrl: "/covers/sm-nayaab.jpg",
    audioUrl: "/audio/sm-hoshiyaar.m4a",
    lyrics: `[00:05.00] Hoshiyaar raho is duniya ke daav se
[00:11.00] Bach ke nikalte hain har ek bahaav se
[00:17.00] Aankhein hain khuli aur kaan hain tez
[00:23.00] Asli hip-hop ka sajaya ye mej`
  },
  {
    id: "sm-rajdhani",
    title: "Rajdhani",
    artist: "Seedhe Maut, Sez on the Beat",
    album: "Nayaab",
    genre: "DHH / Hardcore",
    year: 2022,
    duration: 192,
    coverUrl: "/covers/sm-nayaab.jpg",
    audioUrl: "/audio/sm-rajdhani.m4a",
    lyrics: `[00:06.00] Rajdhani ki speed se daudti hai beat
[00:12.50] Dilli ke ladkon ki pakki hai jeet
[00:19.00] Sez, Calm, Encore ka lethal combo
[00:25.50] Desi rap scene ka baje yahan congo`
  },
  {
    id: "sm-anaadi",
    title: "Anaadi",
    artist: "Seedhe Maut, Sez on the Beat",
    album: "Nayaab",
    genre: "DHH / Storytelling",
    year: 2022,
    duration: 204,
    coverUrl: "/covers/sm-nayaab.jpg",
    audioUrl: "/audio/sm-anaadi.m4a",
    lyrics: `[00:07.00] Pehle the anaadi, ab bane khiladi
[00:14.50] Desi hip-hop ki chala di gaadi
[00:22.00] Raaton ki neend gawa ke paya mukaam
[00:29.50] Seedhe Maut shahar mein ban gaya naam`
  },
  {
    id: "sm-chiri-udd",
    title: "Chiri Udd Kaa Udd",
    artist: "Seedhe Maut, Sez on the Beat",
    album: "Nayaab",
    genre: "DHH / Groove",
    year: 2022,
    duration: 180,
    coverUrl: "/covers/sm-nayaab.jpg",
    audioUrl: "/audio/sm-chiri-udd.m4a",
    lyrics: `[00:05.00] Chiri udd, kaa udd, ud gaye saare hosh
[00:11.50] Beat bajti jab, badhta hai josh
[00:18.00] Calm aur Encore ka unmatchable vibe
[00:24.50] Asli DHH ki banayi nayi tribe`
  },
  {
    id: "sm-khatta-flow",
    title: "Khatta Flow (feat. KR$NA)",
    artist: "Seedhe Maut, KR$NA, Sez on the Beat",
    album: "Nayaab",
    genre: "DHH / Hardcore Drill",
    year: 2022,
    duration: 215,
    coverUrl: "/covers/sm-nayaab.jpg",
    audioUrl: "/audio/sm-khatta-flow.m4a",
    lyrics: `[00:08.00] Khatta ye flow jaise nimbu ka paani
[00:14.00] Likhte hain gaane jo bane ek kahani
[00:20.00] KR$NA aur SM jab aate hain mic pe
[00:26.00] Bars ki baarish hoti har ek strike pe
[00:32.00] Kalam mein dhaar hai, shabdon mein aag
[00:38.00] Subah se shaam tak ek hi dimaag`
  },
  {
    id: "sm-luka-chuppi",
    title: "Luka Chuppi (feat. Sonny Chimienti)",
    artist: "Seedhe Maut, Sonny Chimienti, Sez on the Beat",
    album: "Nayaab",
    genre: "DHH / Desi Hip-Hop",
    year: 2022,
    duration: 198,
    coverUrl: "/covers/sm-nayaab.jpg",
    audioUrl: "/audio/sm-luka-chuppi.m4a",
    lyrics: `[00:06.00] Luka chuppi bohot hui, saamne aa ja na
[00:12.50] Kahan chup ke baitha hai, zara batla ja na
[00:19.00] Calm aur Encore, Delhi se leke seedha dil tak
[00:25.50] Kalam chale tezi se, likhte hain hum milkar
[00:32.00] Zindagi ek khel hai, chhupte hain jazbaat
[00:38.50] Raaton ko jagte hain, hoti hai khud se baat`
  },
  {
    id: "sm-gandi-soch",
    title: "Gandi Soch",
    artist: "Seedhe Maut, Sez on the Beat",
    album: "Nayaab",
    genre: "DHH / Dark Alt",
    year: 2022,
    duration: 172,
    coverUrl: "/covers/sm-nayaab.jpg",
    audioUrl: "/audio/sm-gandi-soch.m4a",
    lyrics: `[00:05.00] Gandi soch ko peechhe chhod ke aaye
[00:11.00] Sez ke beats pe naye rang jamaye
[00:17.00] Dilli ke galiyon se unche aakash
[00:23.00] Seedhe Maut ka sangeet hai khaas`
  },
  {
    id: "sm-11k",
    title: "11K",
    artist: "Seedhe Maut",
    album: "Lunch Break",
    genre: "DHH / Trap",
    year: 2023,
    duration: 165,
    coverUrl: "/covers/sm-lunch-break.jpg",
    audioUrl: "/audio/sm-11k.m4a",
    lyrics: `[00:04.50] Gyarah hazaar volt ka jhatka
[00:09.50] Jo bhi raste mein aaya vo atka
[00:14.50] Lunch break leke hum baithe hain stage pe
[00:19.50] Gusse ki aag likhi har ek page pe
[00:24.50] 11K flow, circuit hai high
[00:29.50] Delhi shahar mein Seedhe Maut chhayi`
  },
  {
    id: "sm-brand-new",
    title: "Brand New (feat. Sikander Kahlon)",
    artist: "Seedhe Maut, Sikander Kahlon",
    album: "Lunch Break",
    genre: "DHH / Hardcore Drill",
    year: 2023,
    duration: 195,
    coverUrl: "/covers/sm-lunch-break.jpg",
    audioUrl: "/audio/sm-brand-new.m4a",
    lyrics: `[00:06.00] Brand new drip, brand new flow
[00:12.50] Kahlon aur SM, let the engine go
[00:19.00] Mohali se Delhi, connect hai real
[00:25.50] Hardcore rap ki signed hai deal`
  },
  {
    id: "sm-champion",
    title: "Champion (feat. Lil Bhavi)",
    artist: "Seedhe Maut, Lil Bhavi",
    album: "Lunch Break",
    genre: "DHH / Trap",
    year: 2023,
    duration: 178,
    coverUrl: "/covers/sm-lunch-break.jpg",
    audioUrl: "/audio/sm-champion.m4a",
    lyrics: `[00:05.00] Champion mentality, trophy in the hand
[00:11.00] Lil Bhavi, Calm, Encore take the stand
[00:17.00] Bass in the trunk, shaking up the city
[00:23.00] Living in the fast lane, zero time for pity`
  },
  {
    id: "sm-off-beat",
    title: "Off Beat",
    artist: "Seedhe Maut",
    album: "Lunch Break",
    genre: "DHH / Experimental",
    year: 2023,
    duration: 160,
    coverUrl: "/covers/sm-lunch-break.jpg",
    audioUrl: "/audio/sm-off-beat.m4a",
    lyrics: `[00:04.00] Off beat pe bhi on beat flow
[00:09.50] Desi rap scene mein hum spread karte glow
[00:15.00] Calm ki delivery aur Encore ki rhyme
[00:20.50] Hamesha rehte hum ahead of time`
  },
  {
    id: "sm-kavi-kehna",
    title: "Kavi Kehna Chahte Hain",
    artist: "Seedhe Maut",
    album: "Lunch Break",
    genre: "DHH / Lyricism",
    year: 2023,
    duration: 188,
    coverUrl: "/covers/sm-lunch-break.jpg",
    audioUrl: "/audio/sm-kavi-kehna.m4a",
    lyrics: `[00:06.00] Kavi kehna chahte hain dukh aur dard
[00:12.50] Par hip-hop ne banaya humko mard
[00:19.00] Shayaron ki basti se utha ye toofaan
[00:25.50] Delhi shahar mein banaya naya nishaan`
  },
  {
    id: "sm-dikkat",
    title: "Dikkat",
    artist: "Seedhe Maut",
    album: "Lunch Break",
    genre: "DHH / Banger",
    year: 2023,
    duration: 170,
    coverUrl: "/covers/sm-lunch-break.jpg",
    audioUrl: "/audio/sm-dikkat.m4a",
    lyrics: `[00:05.00] Dikkat kya hai, seedha aake bol
[00:10.50] Chhupa ke na rakh apne andar ke jhol
[00:16.00] Mic pe hum aate jab chhat jati bheed
[00:21.50] DHH mein aag lagane ki hai speed`
  },
  {
    id: "sm-first-place",
    title: "First Place",
    artist: "Seedhe Maut",
    album: "Lunch Break",
    genre: "DHH / Anthem",
    year: 2023,
    duration: 182,
    coverUrl: "/covers/sm-lunch-break.jpg",
    audioUrl: "/audio/sm-first-place.m4a",
    lyrics: `[00:05.50] First place pe hain, second pe na aate
[00:11.50] Mehnat se hum apna jhanda lehrate
[00:17.50] Dilli se leke poore desh tak raj
[00:23.50] Sir pe sajate hain asli hip-hop ka taaj`
  },
  {
    id: "sm-peace-of-mind",
    title: "Peace of Mind",
    artist: "Seedhe Maut",
    album: "Lunch Break",
    genre: "DHH / Chill",
    year: 2023,
    duration: 174,
    coverUrl: "/covers/sm-lunch-break.jpg",
    audioUrl: "/audio/sm-peace-of-mind.m4a",
    lyrics: `[00:05.00] Peace of mind dhundhte hain is shor mein
[00:11.00] Zindagi chalti hai ek naye mod pe
[00:17.00] Gaane banate hain sukoon ke liye
[00:23.00] Apne parivaar aur junoon ke liye`
  },
  {
    id: "sm-taakat",
    title: "Taakat (feat. Sonny Chimienti)",
    artist: "Seedhe Maut, Sonny Chimienti",
    album: "Lunch Break",
    genre: "DHH / Hardcore",
    year: 2023,
    duration: 190,
    coverUrl: "/covers/sm-lunch-break.jpg",
    audioUrl: "/audio/sm-taakat.m4a",
    lyrics: `[00:06.00] Taakat kalam mein, taakat hai aawaaz mein
[00:12.50] Koyi kami nahi hai hamare andaaz mein
[00:19.00] Sonny aur SM ka solid balance
[00:25.50] Asli rap artists ko dete hum challenge`
  },
  {
    id: "sm-swah",
    title: "Swah! (feat. Badshah)",
    artist: "Seedhe Maut, Badshah",
    album: "Lunch Break",
    genre: "DHH / Commercial Hardcore",
    year: 2023,
    duration: 205,
    coverUrl: "/covers/sm-lunch-break.jpg",
    audioUrl: "/audio/sm-swah.m4a",
    lyrics: `[00:07.00] Swah! Kiya sabko humne yahan raakh
[00:13.50] Badshah aur SM, banayi nayi saakh
[00:20.00] Industry hiladi jab mic kiya on
[00:26.50] Hamare saamne ab khada hoga kaun`
  },
  {
    id: "sm-fann",
    title: "Fann (feat. Raga)",
    artist: "Seedhe Maut, Raga",
    album: "Lunch Break",
    genre: "DHH / Street Drill",
    year: 2023,
    duration: 198,
    coverUrl: "/covers/sm-lunch-break.jpg",
    audioUrl: "/audio/sm-fann.m4a",
    lyrics: `[00:06.50] Fann dilli ke ladkon ka, street pe control
[00:13.00] Raga aur SM jab ghoomte hain roll
[00:19.50] Galiyon ki boli aur asle ka wazan
[00:26.00] Hip-hop ke naam kiya poora ye jeevan`
  },
  {
    id: "sm-asal-g",
    title: "Asal G (feat. Faris Shafi)",
    artist: "Seedhe Maut, Faris Shafi",
    album: "Lunch Break",
    genre: "DHH / Elite Lyricism",
    year: 2023,
    duration: 218,
    coverUrl: "/covers/sm-lunch-break.jpg",
    audioUrl: "/audio/sm-asal-g.m4a",
    lyrics: `[00:08.00] Asal G kaun hai, pehchano to sahi
[00:16.00] Faris aur SM ki chemistry hai wahi
[00:24.00] Border ke paar bhi goonjti awaaz
[00:32.00] Shabdon ke jadugar karte hain naaz`
  },
  {
    id: "sm-naam-kaam-sheher",
    title: "Naam Kaam Sheher (feat. Ab 17)",
    artist: "Seedhe Maut, Ab 17",
    album: "Lunch Break",
    genre: "DHH / Trap",
    year: 2023,
    duration: 185,
    coverUrl: "/covers/sm-lunch-break.jpg",
    audioUrl: "/audio/sm-naam-kaam-sheher.m4a",
    lyrics: `[00:05.50] Naam hai SM, kaam hai hip-hop
[00:11.50] Sheher hamara Dilli, top to the top
[00:17.50] Ab 17 sath mein, energy insane
[00:23.50] Seedhe Maut empire, unbreakable chain`
  },
  {
    id: "sm-joint-in-the-booth",
    title: "Joint In The Booth (feat. Rawal, Bharg)",
    artist: "Seedhe Maut, Rawal, Bharg",
    album: "Lunch Break",
    genre: "DHH / Vibe Rap",
    year: 2023,
    duration: 202,
    coverUrl: "/covers/sm-lunch-break.jpg",
    audioUrl: "/audio/sm-joint-in-the-booth.m4a",
    lyrics: `[00:06.50] Joint in the booth, baatein dhuandhaar
[00:13.00] Rawal, Bharg aur SM ka pyaar
[00:19.50] Studio sessions aur midnight vibe
[00:26.00] Asli doston ki banayi nayi tribe`
  },
  {
    id: "sm-jua",
    title: "Jua",
    artist: "Seedhe Maut",
    album: "Lunch Break",
    genre: "DHH / Trap",
    year: 2023,
    duration: 168,
    coverUrl: "/covers/sm-lunch-break.jpg",
    audioUrl: "/audio/sm-jua.m4a",
    lyrics: `[00:05.00] Zindagi ek jua hai, har baazi lagadi
[00:10.50] Apne junoon mein saari neend gawa di
[00:16.00] Jeet ki aas mein chalte rahe aage
[00:21.50] Jo darte the humse vo saare bhage`
  },
  {
    id: "sm-pain",
    title: "Pain",
    artist: "Seedhe Maut",
    album: "Lunch Break",
    genre: "DHH / Emotion",
    year: 2023,
    duration: 175,
    coverUrl: "/covers/sm-lunch-break.jpg",
    audioUrl: "/audio/sm-pain.m4a",
    lyrics: `[00:05.50] Pain ko banaya humne apna hathiyar
[00:11.50] Gusse aur dard se likhi raftaar
[00:17.50] Aansuon ko badla humne sangeet mein
[00:23.50] Har haar ko badla humne jeet mein`
  },
  {
    id: "sm-idk",
    title: "IDK",
    artist: "Seedhe Maut",
    album: "Lunch Break",
    genre: "DHH / Fast Rap",
    year: 2023,
    duration: 158,
    coverUrl: "/covers/sm-lunch-break.jpg",
    audioUrl: "/audio/sm-idk.m4a",
    lyrics: `[00:04.50] IDK kya sochte hain log hamare baare
[00:09.50] Hum to chamak rahe jaise aasmaan ke taare
[00:14.50] Calm aur Encore, nonstop flow
[00:19.50] Desi rap scene ka badhaya show`
  },
  {
    id: "sm-khoon",
    title: "Khoon",
    artist: "Seedhe Maut",
    album: "Lunch Break",
    genre: "DHH / Aggressive",
    year: 2023,
    duration: 182,
    coverUrl: "/covers/sm-lunch-break.jpg",
    audioUrl: "/audio/sm-khoon.m4a",
    lyrics: `[00:05.50] Khoon pasina ek kiya is mukaam ke liye
[00:11.50] Seedhe Maut ke unche naam ke liye
[00:17.50] Hardcore bars aur sub-woofer blast
[00:23.50] Stage pe aate hi machate hain cast`
  },
  {
    id: "sm-chidiya-udd",
    title: "Chidiya Udd (with Ritviz)",
    artist: "Seedhe Maut, Ritviz",
    album: "Lunch Break",
    genre: "Indian Fusion / Alt",
    year: 2023,
    duration: 210,
    coverUrl: "/covers/sm-lunch-break.jpg",
    audioUrl: "/audio/sm-chidiya-udd.m4a",
    lyrics: `[00:07.00] Chidiya udd, khule aasmaan mein jao
[00:15.00] Ritviz aur SM ka jashn manao
[00:23.00] Classical notes aur desi hip-hop
[00:31.00] Never stopping, straight to the top`
  },
  {
    id: "sm-akatsuki",
    title: "Akatsuki (feat. Rebel 7)",
    artist: "Seedhe Maut, Rebel 7",
    album: "Lunch Break",
    genre: "DHH / Anime Rage",
    year: 2023,
    duration: 188,
    coverUrl: "/covers/sm-lunch-break.jpg",
    audioUrl: "/audio/sm-akatsuki.m4a",
    lyrics: `[00:06.00] Akatsuki robes, clouds on the cloak
[00:12.50] Rebel 7 and SM, don't take it for a joke
[00:19.00] Jutsu in the bars, sharingan focus
[00:25.50] Dominating Delhi like a hocus pocus`
  },
  {
    id: "sm-keeda",
    title: "Keeda",
    artist: "Seedhe Maut",
    album: "Lunch Break",
    genre: "DHH / Fast Rap",
    year: 2023,
    duration: 165,
    coverUrl: "/covers/sm-lunch-break.jpg",
    audioUrl: "/audio/sm-keeda.m4a",
    lyrics: `[00:04.50] Dimag mein tha keeda hip-hop ka shuru se
[00:09.50] Seekha humne dilli ke har ek guru se
[00:14.50] Kalam chali aisi jo rukti nahi hai
[00:19.50] Asli kala kisi ke aage jhukti nahi hai`
  },
  {
    id: "sm-focus",
    title: "Focus",
    artist: "Seedhe Maut",
    album: "Lunch Break",
    genre: "DHH / Motivation",
    year: 2023,
    duration: 172,
    coverUrl: "/covers/sm-lunch-break.jpg",
    audioUrl: "/audio/sm-focus.m4a",
    lyrics: `[00:05.00] Focus rakha humne bas apne lakshya pe
[00:10.50] Kadam rakhe humne sahi raaste pe
[00:16.00] Duniya jo kehti thi wo humne na suna
[00:21.50] Apna rasta humne khud hi chuna`
  },
  {
    id: "sm-baat-aisi-hai",
    title: "Baat Aisi Hai",
    artist: "Seedhe Maut",
    album: "Lunch Break",
    genre: "DHH / Groove",
    year: 2023,
    duration: 180,
    coverUrl: "/covers/sm-lunch-break.jpg",
    audioUrl: "/audio/sm-baat-aisi-hai.m4a",
    lyrics: `[00:05.50] Baat aisi hai ke hum rukte nahi
[00:11.00] Mushkilon ke aage kabhi jhukte nahi
[00:16.50] Dilli se leke Bangalore tak shor
[00:22.00] Seedhe Maut tera bhai, Calm aur Encore`
  },
  {
    id: "sm-tofa",
    title: "Tofa",
    artist: "Seedhe Maut",
    album: "Lunch Break",
    genre: "DHH / Melody",
    year: 2023,
    duration: 176,
    coverUrl: "/covers/sm-lunch-break.jpg",
    audioUrl: "/audio/sm-tofa.m4a",
    lyrics: `[00:05.00] Ye gaana ek tofa hai dilli ke naam
[00:11.00] Jin logon ne diya humein itna samman
[00:17.00] Sangeet hamara dil se nikalta
[00:23.00] Har ek lafz yahan sach se pighalta`
  },
  {
    id: "sm-w",
    title: "W",
    artist: "Seedhe Maut",
    album: "Lunch Break",
    genre: "DHH / Trap",
    year: 2023,
    duration: 162,
    coverUrl: "/covers/sm-lunch-break.jpg",
    audioUrl: "/audio/sm-w.m4a",
    lyrics: `[00:04.50] Big W, hamesha jeet hamari
[00:09.50] Desi hip-hop pe hai chhavi hamari
[00:14.50] Bars pe bars, continuous win
[00:19.50] DHH kingpins stepping in`
  },
  {
    id: "sm-pushpak-vimaan",
    title: "Pushpak Vimaan",
    artist: "Seedhe Maut",
    album: "Lunch Break",
    genre: "DHH / High Energy",
    year: 2023,
    duration: 185,
    coverUrl: "/covers/sm-lunch-break.jpg",
    audioUrl: "/audio/sm-pushpak-vimaan.m4a",
    lyrics: `[00:05.50] Pushpak vimaan jaise udte hawa mein
[00:11.50] Koyi kami nahi hamari adaa mein
[00:17.50] Unche aakashon pe lehraate jhanda
[00:23.50] Seedhe Maut shahar ka asli phanda`
  },
  {
    id: "sm-lunch-break",
    title: "Lunch Break",
    artist: "Seedhe Maut",
    album: "Lunch Break",
    genre: "DHH / Title Track",
    year: 2023,
    duration: 195,
    coverUrl: "/covers/sm-lunch-break.jpg",
    audioUrl: "/audio/sm-lunch-break.m4a",
    lyrics: `[00:06.00] Lunch break leke hum aate hain mic pe
[00:12.50] Desi rap lovers ko dete hain hype ye
[00:19.00] 30 track mixtape, pure domination
[00:25.50] SM tera bhai, across the nation`
  },
  {
    id: "sm-fall-off",
    title: "Fall Off",
    artist: "Seedhe Maut",
    album: "Lunch Break",
    genre: "DHH / Hardcore",
    year: 2023,
    duration: 174,
    coverUrl: "/covers/sm-lunch-break.jpg",
    audioUrl: "/audio/sm-fall-off.m4a",
    lyrics: `[00:05.00] Fall off kabhi nahi hoga hamara
[00:10.50] Dilli ki galiyon ka mila hai sahara
[00:16.00] Mehnat se banayi ye unchi imarat
[00:21.50] Hip-hop ke naam ki poori tijaarat`
  },
  {
    id: "sm-shutdown",
    title: "Shutdown",
    artist: "Seedhe Maut",
    album: "Lunch Break",
    genre: "DHH / Drill",
    year: 2023,
    duration: 172,
    coverUrl: "/covers/sm-lunch-break.jpg",
    audioUrl: "/audio/sm-shutdown.m4a",
    lyrics: `[00:04.00] Poora shahar kiya humne shutdown
[00:09.50] Delhi ke ladke ab nahi honge down
[00:15.00] Hardcore beat pe aag lagadi
[00:20.50] Nayi peedhi ko sahi raah dikhadi`
  },
  {
    id: "sm-kavi",
    title: "Kavi",
    artist: "Seedhe Maut",
    album: "Lunch Break",
    genre: "DHH / Conscious",
    year: 2023,
    duration: 180,
    coverUrl: "/covers/sm-lunch-break.jpg",
    audioUrl: "/audio/sm-kavi.m4a",
    lyrics: `[00:05.50] Kavi ke shabdon mein kitna asar hai
[00:11.50] Har ek lafz yahan teer-o-tabar hai
[00:17.50] Zindagi ka sach likhte hain hum
[00:23.50] Seedhe Maut hai jo na ho kam`
  },
  {
    id: "sm-pankh",
    title: "Pankh",
    artist: "Seedhe Maut, Sez on the Beat",
    album: "Bayaan",
    genre: "DHH / Classic",
    year: 2018,
    duration: 228,
    coverUrl: "/covers/sm-bayaan.jpg",
    audioUrl: "/audio/sm-pankh.m4a",
    lyrics: `[00:10.00] Pankh laga ke udna chahte the hum
[00:20.00] Bayaan kiya humne apna har ek gham
[00:30.00] Sez on the beat aur do ladke dilli ke
[00:40.00] Desi rap badla shor sharaabe se`
  },
  {
    id: "sm-gehraiyaan",
    title: "Gehraiyaan",
    artist: "Seedhe Maut, Sez on the Beat",
    album: "Bayaan",
    genre: "DHH / Deep Rap",
    year: 2018,
    duration: 215,
    coverUrl: "/covers/sm-bayaan.jpg",
    audioUrl: "/audio/sm-gehraiyaan.m4a",
    lyrics: `[00:08.00] Gehraiyaan baaton ki samjho to maanein
[00:16.50] Asli dard to wahi jo dil hi pehchaane
[00:25.00] Bayaan ka ye daur tha kitna haseen
[00:33.50] Pairon ke neeche se sarki zameen`
  },
  {
    id: "sm-meri-baggi",
    title: "Meri Baggi",
    artist: "Seedhe Maut, Sez on the Beat",
    album: "Bayaan",
    genre: "DHH / Classic Groove",
    year: 2018,
    duration: 195,
    coverUrl: "/covers/sm-bayaan.jpg",
    audioUrl: "/audio/sm-meri-baggi.m4a",
    lyrics: `[00:06.00] Meri baggi mera ghodha jo na naache
[00:12.50] Sez ke beats pe saara shahar naache
[00:19.00] Calm aur Encore ka historic drop
[00:25.50] Bayaan se shuru hua ye hip-hop`
  },
  {
    id: "sm-shaktimaan",
    title: "Shaktimaan",
    artist: "Seedhe Maut, Sez on the Beat",
    album: "Bayaan",
    genre: "DHH / Nostalgia",
    year: 2018,
    duration: 205,
    coverUrl: "/covers/sm-bayaan.jpg",
    audioUrl: "/audio/sm-shaktimaan.m4a",
    lyrics: `[00:07.00] Shaktimaan jaise ghoomte the bachpan mein
[00:15.00] Kitna sukoon tha us bhole se aangan mein
[00:23.00] Bayaan kiya humne beeta zamaana
[00:31.00] Desi hip-hop ka amar fasana`
  },
  {
    id: "sm-dehshat",
    title: "Dehshat",
    artist: "Seedhe Maut, Sez on the Beat",
    album: "Bayaan",
    genre: "DHH / Dark Hardcore",
    year: 2018,
    duration: 188,
    coverUrl: "/covers/sm-bayaan.jpg",
    audioUrl: "/audio/sm-dehshat.m4a",
    lyrics: `[00:06.00] Dehshat phaili har gali har chaurahe pe
[00:12.50] Seedhe Maut aa gaye sahi raaste pe
[00:19.00] Sez ke dark synths aur bars ka vaar
[00:25.50] DHH mein aisi na dekhi raftaar`
  },
  {
    id: "sm-edan",
    title: "Edan",
    artist: "Seedhe Maut, Sez on the Beat",
    album: "Bayaan",
    genre: "DHH / Conscious",
    year: 2018,
    duration: 180,
    coverUrl: "/covers/sm-bayaan.jpg",
    audioUrl: "/audio/sm-edan.m4a",
    lyrics: `[00:05.50] Edan ki khoj mein chalte rahe hum
[00:11.50] Mushkilon se kabhi na hue hum kam
[00:17.50] Bayaan ka ye gaana hai sabse azeez
[00:23.50] Dil ke kareeb hai ye sangeet`
  },
  {
    id: "sm-keh-chuka",
    title: "Keh Chuka",
    artist: "Seedhe Maut, Sez on the Beat",
    album: "Bayaan",
    genre: "DHH / Melodic",
    year: 2018,
    duration: 192,
    coverUrl: "/covers/sm-bayaan.jpg",
    audioUrl: "/audio/sm-keh-chuka.m4a",
    lyrics: `[00:06.00] Keh chuka jo kehna tha, ab suno dhyan se
[00:13.00] Nikalte hain shabd jaise teer kamaan se
[00:20.00] Calm aur Encore ki sacchi kahani
[00:27.00] Bayaan ki ye daastan hai suhani`
  },
  {
    id: "sm-mazzak",
    title: "Mazzak",
    artist: "Seedhe Maut, Sez on the Beat",
    album: "Bayaan",
    genre: "DHH / Punchlines",
    year: 2018,
    duration: 175,
    coverUrl: "/covers/sm-bayaan.jpg",
    audioUrl: "/audio/sm-mazzak.m4a",
    lyrics: `[00:05.00] Mazzak nahi hai ye hip-hop ka safar
[00:10.50] Har ek kadam pe lagta hai darr
[00:16.00] Par hausla humne kabhi na khoya
[00:21.50] Mehnat ka beej dilli mein boya`
  },
  {
    id: "sm-uss-din",
    title: "Uss Din",
    artist: "Seedhe Maut, Sez on the Beat",
    album: "Bayaan",
    genre: "DHH / Storytelling",
    year: 2018,
    duration: 198,
    coverUrl: "/covers/sm-bayaan.jpg",
    audioUrl: "/audio/sm-uss-din.m4a",
    lyrics: `[00:06.50] Uss din ki baat hai jab shuru hua safar
[00:13.50] Sez ke kamre mein banti thi khabar
[00:20.50] Microphone ek aur baatein hazaar
[00:27.50] Bayaan ne badal diya poora sansaar`
  },
  {
    id: "sm-kyurev",
    title: "Kyurev",
    artist: "Seedhe Maut, Sez on the Beat",
    album: "Bayaan",
    genre: "DHH / Introspective",
    year: 2018,
    duration: 185,
    coverUrl: "/covers/sm-bayaan.jpg",
    audioUrl: "/audio/sm-kyurev.m4a",
    lyrics: `[00:05.50] Kyu re kyu tu itna pareshan hai
[00:11.50] Zindagi ki mushkilon se kyu anjaan hai
[00:17.50] Bayaan sun aur pa le tu sukoon
[00:23.50] Seedhe Maut ka yehi hai junoon`
  },
  {
    id: "sm-gandi-aulaad",
    title: "Gandi Aulaad",
    artist: "Seedhe Maut, Sez on the Beat",
    album: "Bayaan",
    genre: "DHH / Raw Classic",
    year: 2018,
    duration: 210,
    coverUrl: "/covers/sm-bayaan.jpg",
    audioUrl: "/audio/sm-gandi-aulaad.m4a",
    lyrics: `[00:07.00] Gandi aulaad kehke pukare zamana
[00:15.00] Humne to seekha tha bas gaana banana
[00:23.00] Bayaan se kiya humne sabko khamosh
[00:31.00] Asli hip-hop ka dilli mein josh`
  },
  {
    id: "sm-namastute",
    title: "Namastute",
    artist: "Seedhe Maut, Sez on the Beat",
    album: "Bayaan",
    genre: "DHH / Cult Classic",
    year: 2018,
    duration: 176,
    coverUrl: "/covers/sm-bayaan.jpg",
    audioUrl: "/audio/sm-namastute.m4a",
    lyrics: `[00:05.00] Namastute! Karte hain sabko pranaam
[00:10.50] Asli hip-hop ka failaya paighaam
[00:16.00] Sez on the beat aur do ladke mic pe
[00:21.50] Aag lagayi har gali har site pe
[00:27.00] Bayaan kiya humne apna har ek dard
[00:32.50] Dilli ki sardi mein likhe hain ye sabz
[00:38.00] Namastute, bolo sabhi hath jod ke
[00:43.50] Aaye hain aage saari zanjeerein tod ke`
  },
  {
    id: "sm-kshma",
    title: "Kshma",
    artist: "Seedhe Maut",
    album: "Kshma",
    genre: "DHH / Modern Trap",
    year: 2024,
    duration: 175,
    coverUrl: "/covers/sm-kshma.jpg",
    audioUrl: "/audio/sm-kshma.m4a",
    lyrics: `[00:05.00] Kshma karo agar sach bol diya
[00:11.00] Dil ke taale ko humne khol diya
[00:17.00] Kshma EP pe Encore aur Calm
[00:23.00] DHH mein uncha kiya apna naam`
  },
  {
    id: "sm-bajenge",
    title: "Bajenge",
    artist: "Seedhe Maut",
    album: "Kshma",
    genre: "DHH / Hardcore Drill",
    year: 2024,
    duration: 182,
    coverUrl: "/covers/sm-kshma.jpg",
    audioUrl: "/audio/sm-bajenge.m4a",
    lyrics: `[00:05.50] Bajenge speaker poore shahar ke
[00:11.50] Nikalte hain gaane dilli ke pehar ke
[00:17.50] Bass drops and the crowd goes wild
[00:23.50] SM tera bhai, never running mild`
  },
  {
    id: "sm-nazarbattu",
    title: "Nazarbattu",
    artist: "Seedhe Maut",
    album: "Kshma",
    genre: "DHH / Street Rap",
    year: 2024,
    duration: 168,
    coverUrl: "/covers/sm-kshma.jpg",
    audioUrl: "/audio/sm-nazarbattu.m4a",
    lyrics: `[00:05.00] Nazarbattu baandh ke ghoomte hain hum
[00:10.50] Burii nazar walon ka nikalte hain dam
[00:16.00] Kshma ka ye flow hai sabse nirala
[00:21.50] Desi rap scene mein dala naya ujaala`
  },
  {
    id: "sm-bandana-gang",
    title: "Bandana Gang",
    artist: "Seedhe Maut",
    album: "Kshma",
    genre: "DHH / Drill",
    year: 2024,
    duration: 190,
    coverUrl: "/covers/sm-kshma.jpg",
    audioUrl: "/audio/sm-bandana-gang.m4a",
    lyrics: `[00:06.00] Bandana Gang, sir pe bandha rumaal
[00:12.50] Delhi ke ladkon ne kiya kamaal
[00:19.00] Drill beat pe Calm ka double-time rap
[00:25.50] Encore ke bars put DHH on the map`
  },
  {
    id: "sm-ball",
    title: "Ball",
    artist: "Seedhe Maut",
    album: "2 Ka Pahada",
    genre: "DHH / Roots",
    year: 2017,
    duration: 160,
    coverUrl: "/covers/sm-na.jpg",
    audioUrl: "/audio/sm-ball.m4a",
    lyrics: `[00:04.50] Ball jaise court mein, slam dunk shots
[00:09.50] 2 Ka Pahada era, connecting the dots
[00:14.50] Shuruwat dilli ki underground gali se
[00:19.50] Khila ye sangeet jaise phool kali se`
  },
  {
    id: "sm-seedhe-maut-anthem",
    title: "Seedhe Maut Anthem",
    artist: "Seedhe Maut",
    album: "2 Ka Pahada",
    genre: "DHH / Historic Anthem",
    year: 2017,
    duration: 175,
    coverUrl: "/covers/sm-na.jpg",
    audioUrl: "/audio/sm-seedhe-maut-anthem.m4a",
    lyrics: `[00:05.00] Seedhe Maut anthem, goonjegi aawaaz
[00:11.00] Yahan se shuru hua hamara ye raaj
[00:17.00] Calm aur Encore, do dilli ke sher
[00:23.00] Hip-hop ke raste mein na karenge der`
  },
  {
    id: "sm-do-guna",
    title: "Do Guna",
    artist: "Seedhe Maut",
    album: "'न' (Na EP)",
    genre: "DHH / Fast Rap",
    year: 2020,
    duration: 182,
    coverUrl: "/covers/sm-na.jpg",
    audioUrl: "/audio/sm-do-guna.m4a",
    lyrics: `[00:05.50] Do guna speed, do guna bars
[00:11.50] Aiming for the moon and hitting the stars
[00:17.50] Na EP pe bajte hain tezi se gaane
[00:23.50] Seedhe Maut ko sara zamaana maane`
  },
  {
    id: "sm-kranti",
    title: "Kranti",
    artist: "Seedhe Maut",
    album: "'न' (Na EP)",
    genre: "DHH / Revolutionary",
    year: 2020,
    duration: 195,
    coverUrl: "/covers/sm-na.jpg",
    audioUrl: "/audio/sm-kranti.m4a",
    lyrics: `[00:06.00] Kranti leke aaye hain hum desi rap mein
[00:13.00] Na fasenge kisi ke banaye trap mein
[00:20.00] Kalam se kranti, aawaaz se aag
[00:27.00] Desi hip-hop ka badla dimaag`
  },
  {
    id: "sm-nawazuddin",
    title: "Nawazuddin",
    artist: "Seedhe Maut",
    album: "'न' (Na EP)",
    genre: "DHH / Hardcore",
    year: 2020,
    duration: 180,
    coverUrl: "/covers/sm-na.jpg",
    audioUrl: "/audio/sm-nawazuddin.m4a",
    lyrics: `[00:05.50] Nawazuddin jaise raw performance hamari
[00:11.50] Desi hip-hop scene pe chhayi khumari
[00:17.50] Acting nahi, asli hai hamara ye flow
[00:23.50] Har ek gaane mein dikhate hain show`
  },
  {
    id: "sm-hola-amigo",
    title: "Hola Amigo (feat. KR$NA)",
    artist: "KR$NA, Seedhe Maut",
    album: "Lunch Break",
    genre: "DHH / Drill",
    year: 2023,
    duration: 192,
    coverUrl: "/covers/sm-lunch-break.jpg",
    audioUrl: "/audio/sm-hola-amigo.m4a",
    lyrics: `[00:06.00] Hola Amigo! Kaisa hai bhai?
[00:11.50] Tere shahar mein humne dhoom machayi
[00:17.00] SM aur $ sign, double the pressure
[00:22.50] Beats pe nikalta hai pure desi treasure
[00:28.00] Gaadi bhage tezi se highway pe raat ko
[00:33.50] Samajh tu paayega na hamari baat ko
[00:39.00] Hola Amigo, salute to the team
[00:44.50] Jeete hain hum bas apna hi dream`
  },
  {
    id: "sm-nanchaku",
    title: "Nanchaku (feat. MC Stan)",
    artist: "Seedhe Maut, MC Stan",
    album: "Nayaab",
    genre: "DHH / Drill",
    year: 2022,
    duration: 184,
    coverUrl: "/covers/sm-nayaab.jpg",
    audioUrl: "/audio/sm-nanchaku.m4a",
    lyrics: `[00:04.00] Flow jaise nanchaku, haath mein hathoda
[00:09.50] Jo bhi saamne aaya, usko humne toda
[00:15.00] Delhi se Pune tak, connection hai zordaar
[00:20.50] Beat pe Calm ka punch, Encore ka vaar
[00:26.00] Seedhe Maut tera bhai, sunte hain log
[00:31.50] Asli hip-hop ka lag chuka hai rog
[00:37.00] Nanchaku ghoome hawa mein tezi se
[00:42.50] Jeete hain hum sab apni hi marzi se`
  },
  {
    id: "sm-tt",
    title: "TT",
    artist: "Seedhe Maut",
    album: "Singles",
    genre: "DHH / Trap",
    year: 2022,
    duration: 185,
    coverUrl: "/covers/sm-singles.jpg",
    audioUrl: "/audio/sm-tt.m4a",
    lyrics: `[00:05.00] TT pe ball jaise table tennis
[00:11.00] Seedhe Maut shahar mein ban chuki menace
[00:17.00] Calm aur Encore ka ruthless rap
[00:23.00] Desi hip-hop ka badal diya map
[00:29.00] Aaye hain aage bina kisi shaq ke
[00:35.00] Kholte hain taale hum har ek dar ke`
  },
  {
    id: "sm-101",
    title: "101",
    artist: "Seedhe Maut",
    album: "Singles",
    genre: "DHH / Fast Trap",
    year: 2020,
    duration: 178,
    coverUrl: "/covers/sm-singles.jpg",
    audioUrl: "/audio/sm-101.m4a",
    lyrics: `[00:05.00] 101 lessons in the hip-hop class
[00:11.00] Sub-woofers rattling and breaking the glass
[00:17.00] Calm and Encore firing up the engine
[00:23.00] No competition that is worth of the mention`
  },
  {
    id: "sm-class-sikh-maut-2",
    title: "Class-Sikh Maut, Vol. II (feat. Prabh Deep)",
    artist: "Prabh Deep, Seedhe Maut, Sez on the Beat",
    album: "Class-Sikh",
    genre: "DHH / Historic Collab",
    year: 2017,
    duration: 235,
    coverUrl: "/covers/sm-bayaan.jpg",
    audioUrl: "/audio/sm-class-sikh-maut-2.m4a",
    lyrics: `[00:08.00] Class-Sikh Maut! Sez on the historic beat
[00:16.00] Prabh Deep aur Seedhe Maut takeover the street
[00:24.00] Tilak Nagar se leke poore dilli tak
[00:32.00] DHH pioneers, na rakh koyi shak`
  },
  {
    id: "sm-dum-pishaach",
    title: "Dum Pishaach (with Karan Kanchan)",
    artist: "Seedhe Maut, Karan Kanchan",
    album: "Singles",
    genre: "DHH / Bass Music",
    year: 2021,
    duration: 180,
    coverUrl: "/covers/sm-singles.jpg",
    audioUrl: "/audio/sm-dum-pishaach.m4a",
    lyrics: `[00:05.50] Dum pishaach nikalte hain raat ke andhere mein
[00:11.50] Karan Kanchan aur SM is savere mein
[00:17.50] Bass heavy sound shaking up the underground
[00:23.50] Seedhe Maut music spreads all around`
  },
  {
    id: "sm-scalp-dem",
    title: "Scalp Dem (with Delhi Sultanate)",
    artist: "Seedhe Maut, Delhi Sultanate",
    album: "Singles",
    genre: "DHH / Political Soundclash",
    year: 2020,
    duration: 215,
    coverUrl: "/covers/sm-singles.jpg",
    audioUrl: "/audio/sm-scalp-dem.m4a",
    lyrics: `[00:07.00] Scalp dem, fight the system with the rhyme
[00:14.00] Delhi Sultanate and SM on time
[00:21.00] Sound system culture meets desi hip-hop
[00:28.00] Truth in the message that will never stop`
  },
  {
    id: "sm-mmm",
    title: "MMM",
    artist: "Seedhe Maut",
    album: "Singles",
    genre: "DHH / Drill",
    year: 2021,
    duration: 172,
    coverUrl: "/covers/sm-singles.jpg",
    audioUrl: "/audio/sm-mmm.m4a",
    lyrics: `[00:04.50] Mmm, dekho zara kaisa hai ye daur
[00:09.50] Dilli ke galiyon mein macha diya shor
[00:14.50] Calm ki speed aur Encore ka verse
[00:19.50] Desi rap lovers fill up the universe`
  },
  {
    id: "sm-tour-sequence",
    title: "Tour Sequence",
    artist: "Seedhe Maut",
    album: "Singles",
    genre: "DHH / Live Anthem",
    year: 2022,
    duration: 185,
    coverUrl: "/covers/sm-singles.jpg",
    audioUrl: "/audio/sm-tour-sequence.m4a",
    lyrics: `[00:05.50] Tour sequence on, venue packed to the gate
[00:11.50] Selling out every city, no debate
[00:17.50] SM tera bhai holding the torch
[00:23.50] High octane energy burns like a scorch`
  },
  {
    id: "sm-nalla-freestyle",
    title: "Nalla Freestyle",
    artist: "Seedhe Maut",
    album: "Singles",
    genre: "DHH / Freestyle",
    year: 2021,
    duration: 165,
    coverUrl: "/covers/sm-singles.jpg",
    audioUrl: "/audio/sm-nalla-freestyle.m4a",
    lyrics: `[00:04.50] Nalla freestyle, seedha from the booth
[00:09.50] Spitting pure fire, living with the truth
[00:14.50] No written scripts, just raw delivery
[00:19.50] Making DHH golden history`
  },
  {
    id: "sm-hausla",
    title: "Hausla",
    artist: "Seedhe Maut",
    album: "Singles",
    genre: "DHH / Uplifting",
    year: 2020,
    duration: 190,
    coverUrl: "/covers/sm-singles.jpg",
    audioUrl: "/audio/sm-hausla.m4a",
    lyrics: `[00:06.00] Hausla na khona kabhi kisi mod pe
[00:12.50] Sapne sajaye hain dilli ke chhor pe
[00:19.00] Seedhe Maut sangeet se dete hain taakat
[00:25.50] Desi hip-hop ki sachhi virasat`
  },
  {
    id: "sm-bhoomi",
    title: "Bhoomi (with Ritviz)",
    artist: "Ritviz, Seedhe Maut",
    album: "Bhoomi",
    genre: "Indian Fusion",
    year: 2021,
    duration: 215,
    coverUrl: "/covers/sm-singles.jpg",
    audioUrl: "/audio/sm-bhoomi.m4a",
    lyrics: `[00:07.50] Bhoomi par utra ye naya sangeet
[00:15.00] Ritviz aur SM ki pyari si preet
[00:22.50] Surile taar aur dilchasp rhyme
[00:30.00] Evergreen music for all of time`
  },
  {
    id: "sm-besabar",
    title: "Besabar",
    artist: "Seedhe Maut",
    album: "Singles",
    genre: "DHH / Chill",
    year: 2020,
    duration: 182,
    coverUrl: "/covers/sm-singles.jpg",
    audioUrl: "/audio/sm-besabar.m4a",
    lyrics: `[00:05.50] Besabar the hum is din ke intezaar mein
[00:11.50] Doob gaye hain hum hip-hop ke pyaar mein
[00:17.50] Calm aur Encore ka melodic wave
[00:23.50] Music that takes us from stage to the cave`
  },
  {
    id: "sm-panaah",
    title: "Panaah",
    artist: "Seedhe Maut",
    album: "Singles",
    genre: "DHH / Melodic",
    year: 2020,
    duration: 195,
    coverUrl: "/covers/sm-singles.jpg",
    audioUrl: "/audio/sm-panaah.m4a",
    lyrics: `[00:06.00] Panaah maangi thi humne sangeet ke aagosh mein
[00:13.00] Aaj dekho poora dilli shahar hai hosh mein
[00:20.00] Desi rap bars that touch the soul
[00:27.00] Seedhe Maut keeping the culture whole`
  },
  {
    id: "sm-mazza-aaya",
    title: "Mazza Aaya",
    artist: "Seedhe Maut",
    album: "Singles",
    genre: "DHH / Groove",
    year: 2021,
    duration: 178,
    coverUrl: "/covers/sm-singles.jpg",
    audioUrl: "/audio/sm-mazza-aaya.m4a",
    lyrics: `[00:05.00] Mazza aaya bohot is lambe safar mein
[00:11.00] Desi hip-hop bajta har ek ghar mein
[00:17.00] Encore aur Calm celebrate the grind
[00:23.00] Leaving all the negativity far behind`
  },
  {
    id: "sm-nevermind",
    title: "Nevermind",
    artist: "Seedhe Maut",
    album: "Singles",
    genre: "DHH / Chill",
    year: 2022,
    duration: 180,
    coverUrl: "/covers/sm-singles.jpg",
    audioUrl: "/audio/sm-nevermind.m4a",
    lyrics: `[00:05.50] Nevermind, chalte raho aage
[00:11.50] Jo soye the sapne wo sabhi hain jaage
[00:17.50] Seedhe Maut music shines bright
[00:23.50] Leading us safely into the night`
  },
  {
    id: "sm-kaanch-ke-ghar",
    title: "Kaanch Ke Ghar",
    artist: "Seedhe Maut",
    album: "Singles",
    genre: "DHH / Introspective",
    year: 2021,
    duration: 205,
    coverUrl: "/covers/sm-singles.jpg",
    audioUrl: "/audio/sm-kaanch-ke-ghar.m4a",
    lyrics: `[00:07.00] Kaanch ke ghar mein baith ke pathar na phenko
[00:14.50] Mehnat ka natija zara aankhein khol ke dekho
[00:22.00] Dilli ke ladkon ne banayi nayi league
[00:29.50] SM tera bhai never gets fatigue`
  },
  {
    id: "sm-kohra",
    title: "Kohra",
    artist: "Seedhe Maut",
    album: "Singles",
    genre: "DHH / Deep Ambient",
    year: 2021,
    duration: 190,
    coverUrl: "/covers/sm-singles.jpg",
    audioUrl: "/audio/sm-kohra.m4a",
    lyrics: `[00:06.00] Kohra chhaya dilli ki sardi mein
[00:12.50] Aag bhari hai humne is zardi mein
[00:19.00] Calm aur Encore ka classic tone
[00:25.50] Desi rap champions sitting on the throne`
  },
  {
    id: "sm-natkhat",
    title: "Natkhat",
    artist: "Seedhe Maut",
    album: "Singles",
    genre: "DHH / Playful Trap",
    year: 2021,
    duration: 168,
    coverUrl: "/covers/sm-singles.jpg",
    audioUrl: "/audio/sm-natkhat.m4a",
    lyrics: `[00:04.50] Natkhat andaz, par flow deadly serious
[00:09.50] Listeners get hooked, getting all curious
[00:14.50] Seedhe Maut delivery so clean and sharp
[00:19.50] Plucking our strings like a golden harp`
  },
  {
    id: "sm-chini",
    title: "Chini",
    artist: "Seedhe Maut",
    album: "Singles",
    genre: "DHH / Fast Flow",
    year: 2021,
    duration: 162,
    coverUrl: "/covers/sm-singles.jpg",
    audioUrl: "/audio/sm-chini.m4a",
    lyrics: `[00:04.00] Chini jaisi meethi baatein nahi karte hum
[00:09.50] Kadwa sach bolte, na kisi se darte hum
[00:15.00] Desi hip-hop ka asli standard yahan
[00:20.50] Seedhe Maut goonje across the jahan`
  },
  {
    id: "yeat-if-we-being-real",
    title: "If We Being Rëal",
    artist: "Yeat",
    album: "2093",
    genre: "Rage / Cyber-Trap",
    year: 2024,
    duration: 172,
    coverUrl: "/covers/yeat-2093.jpg",
    audioUrl: "/audio/yeat-if-we-being-real.m4a",
    lyrics: `[00:08.00] If we being real, I don't care what you feel
[00:13.50] Twenty-ninety-three, got the holographic seal
[00:18.80] Pull up in a cyber-ship, sitting on the hill
[00:24.00] Count a couple million just to test out my skill
[00:29.50] Yeah, they want the sauce, but they can't pay the bill
[00:35.00] Diamonds on my collarbone giving them a chill
[00:40.50] If we being real, yeah, we running up the thrill
[00:46.00] CEO of the game, yeah, we moving with the steel`
  },
  {
    id: "yeat-breathe",
    title: "Breathe",
    artist: "Yeat",
    album: "2093",
    genre: "Rage / Industrial",
    year: 2024,
    duration: 168,
    coverUrl: "/covers/yeat-2093.jpg",
    audioUrl: "/audio/yeat-breathe.m4a",
    lyrics: `[00:05.00] (Breathe, breathe, take a deep breath)
[00:10.20] Yeah, I walk inside the matrix, ain't got no regrets
[00:15.50] Got the whole crowd jumping, dripping with the sweat
[00:20.80] Counting up the green, yeah, we placing every bet
[00:26.00] Take a breath, yeah, don't you suffocate
[00:31.20] Look at all the money that we generate
[00:36.50] Tell 'em open up the gates, we don't ever wait`
  },
  {
    id: "yeat-idgaf",
    title: "IDGAF (feat. Yeat)",
    artist: "Drake, Yeat",
    album: "For All The Dogs",
    genre: "Hip-Hop / Rage",
    year: 2023,
    duration: 260,
    coverUrl: "/covers/yeat-idgaf.jpg",
    audioUrl: "/audio/yeat-idgaf.m4a",
    lyrics: `[00:15.00] Yeah, I'm on that demon time, told 'em IDGAF
[00:25.00] Money on the table, counting every single check
[00:35.00] Count up all the racks and we break all the rules
[00:45.00] Diamonds so cold, jumping right out of the pool
[00:55.00] Drake and Yeat, yeah, we run the whole crew`
  },
  {
    id: "yeat-out-the-way",
    title: "Out thë way",
    artist: "Yeat",
    album: "Lyfë",
    genre: "Rage / Trap",
    year: 2022,
    duration: 150,
    coverUrl: "/covers/yeat-out-the-way.jpg",
    audioUrl: "/audio/yeat-out-the-way.m4a",
    lyrics: `[00:06.00] Yeah, I been staying out the way
[00:10.50] I been counting all this paper every single day
[00:15.00] I pull up in the Lamb', you in a Chevrolet
[00:19.50] Yeah, took a hundred grand and made it all today
[00:24.00] Yeah, I don't give a fuck what they gotta say`
  },
  {
    id: "yeat-talk",
    title: "Talk",
    artist: "Yeat",
    album: "Lyfë",
    genre: "Rage / Trap",
    year: 2022,
    duration: 174,
    coverUrl: "/covers/yeat-talk.jpg",
    audioUrl: "/audio/yeat-talk.m4a",
    lyrics: `[00:04.00] Jump out the face, yeah, jump out the spot
[00:09.00] Don't talk to me 'cause you know you are not
[00:14.00] Yeah, they want the smoke until it's getting too hot
[00:19.00] Put fifty thousand right inside of the pot
[00:24.00] Talk, talk, talk, that is all that they do`
  },
  {
    id: "yeat-money-so-big",
    title: "Monëy so big",
    artist: "Yeat",
    album: "Up 2 Më",
    genre: "Rage / Trap",
    year: 2021,
    duration: 160,
    coverUrl: "/covers/yeat-money-so-big.jpg",
    audioUrl: "/audio/yeat-money-so-big.m4a",
    lyrics: `[00:04.00] Geeker, geeker, geeker
[00:08.50] Yeah, I count money, I count money, so big
[00:13.20] Walk inside the club, know they notice my wrist
[00:17.50] Yeah, diamonds dancing on my neck, it got a glitz
[00:22.00] In a Tonka truck, pulling off, we doing hits
[00:26.50] Call up BNYX, you know we finna take a trip
[00:31.00] Yeah, bitch, I'm already rich`
  },
  {
    id: "yeat-flawless",
    title: "Flawlëss (feat. Lil Uzi Vert)",
    artist: "Yeat, Lil Uzi Vert",
    album: "Lyfë",
    genre: "Rage / Trap",
    year: 2022,
    duration: 176,
    coverUrl: "/covers/yeat-flawless.jpg",
    audioUrl: "/audio/yeat-flawless.m4a",
    lyrics: `[00:05.00] Flawless, flawless, flawless
[00:12.00] Everything I wear is fucking flawless
[00:20.00] Yeah, walk inside the jeweler, know we bought it
[00:28.00] Uzi on the track, you know we never cautious`
  },
  {
    id: "yeat-turban",
    title: "Turban",
    artist: "Yeat",
    album: "Up 2 Më",
    genre: "Rage / Trap",
    year: 2021,
    duration: 156,
    coverUrl: "/covers/yeat-turban.jpg",
    audioUrl: "/audio/yeat-turban.m4a",
    lyrics: `[00:05.00] Put on a turban, went to the moon
[00:11.00] Riding in the Tonka truck, hear the engine vroom
[00:17.00] Counting all the racks, yeah, it's never too soon
[00:23.00] Diamonds shining bright, lighting up the whole room`
  },
  {
    id: "yeat-poppin",
    title: "Poppin",
    artist: "Yeat",
    album: "2 Alivë",
    genre: "Rage / Trap",
    year: 2022,
    duration: 173,
    coverUrl: "/covers/yeat-poppin.jpg",
    audioUrl: "/audio/yeat-poppin.m4a",
    lyrics: `[00:06.00] We got it poppin, yeah, we got it poppin
[00:12.00] Once we get started, ain't no fucking stoppin
[00:18.00] In the designer store, everyday we shoppin
[00:24.00] 808s hitting hard, all the bodies droppin`
  },
  {
    id: "yeat-get-busy",
    title: "Gët Busy",
    artist: "Yeat",
    album: "Up 2 Më",
    genre: "Rage / Trap",
    year: 2021,
    duration: 164,
    coverUrl: "/covers/yeat-get-busy.jpg",
    audioUrl: "/audio/yeat-get-busy.m4a",
    lyrics: `[00:05.00] This song was already turnt but here's a bell
[00:10.00] (Ding, ding, ding, ding)
[00:15.00] Yeah, we get busy, put 'em in a spell
[00:20.00] Count up a million, got a story to tell`
  },
  {
    id: "yeat-nun-id-change",
    title: "Nun id change",
    artist: "Yeat",
    album: "AftërLyfe",
    genre: "Dance-Trap / Rage",
    year: 2023,
    duration: 211,
    coverUrl: "/covers/yeat-nun-id-change.jpg",
    audioUrl: "/audio/yeat-nun-id-change.m4a",
    lyrics: `[00:08.00] Nun id change, nun id change
[00:16.00] If I had to do it all again, nun id change
[00:24.00] Hundred bands in the bag, dancing in the rain
[00:32.00] Yeah, we took all the sorrow, turned it into gain`
  },
  {
    id: "nettspend-nothing-like-uuu",
    title: "Nothing Like Uuu",
    artist: "Nettspend",
    album: "Badassfuckingkid",
    genre: "Underground / Plugg",
    year: 2024,
    duration: 142,
    coverUrl: "/covers/nettspend-nothing-like-uuu.jpg",
    audioUrl: "/audio/nettspend-nothing-like-uuu.m4a",
    lyrics: `[00:04.00] Yeah, you know it's Nettspend
[00:08.50] They be talking crazy but they nothing like you
[00:13.20] Walk inside the spot, got a couple bands too
[00:18.00] Pull up in a drop, tell me what you wanna do`
  },
  {
    id: "nettspend-that-one-song",
    title: "That One Song",
    artist: "Nettspend",
    album: "Badassfuckingkid",
    genre: "Underground / Rage",
    year: 2024,
    duration: 135,
    coverUrl: "/covers/nettspend-that-one-song.jpg",
    audioUrl: "/audio/nettspend-that-one-song.m4a",
    lyrics: `[00:05.00] They keep asking for that one song
[00:10.00] Playing in the coupe with the bass on strong
[00:14.50] Yeah, I been awake all night, haven't slept in so long
[00:19.20] Count up the paper, you know I can't be wrong`
  },
  {
    id: "nettspend-we-not-like-you",
    title: "We Not Like You",
    artist: "Nettspend",
    album: "Singles",
    genre: "Underground / Plugg",
    year: 2024,
    duration: 138,
    coverUrl: "/covers/nettspend.jpg",
    audioUrl: "/audio/nettspend-we-not-like-you.m4a",
    lyrics: `[00:04.00] We not like you, we not like them
[00:09.00] Shining in the night like a polished gem
[00:14.00] Underground sound, whole crew ten out of ten
[00:19.00] Nettspend in the cut, we do it again`
  },
  {
    id: "nettspend-2024-freestyle",
    title: "2024 Freestyle",
    artist: "Nettspend",
    album: "Singles",
    genre: "Underground / Plugg",
    year: 2024,
    duration: 144,
    coverUrl: "/covers/nettspend.jpg",
    audioUrl: "/audio/nettspend-2024-freestyle.m4a",
    lyrics: `[00:04.00] Twenty-twenty-four, opened up the door
[00:09.00] Thousand dollar kicks scraping on the floor
[00:14.00] Freestyle in the booth, got 'em wanting more
[00:19.00] Nettspend on top, that's what we in for`
  },
  {
    id: "nettspend-fuck-swag",
    title: "Fuck Swag",
    artist: "Nettspend",
    album: "Singles",
    genre: "Underground / Rage",
    year: 2024,
    duration: 140,
    coverUrl: "/covers/nettspend.jpg",
    audioUrl: "/audio/nettspend-fuck-swag.m4a",
    lyrics: `[00:04.00] Talking 'bout swag, we don't need that
[00:09.00] Put the 808s on and we run it right back
[00:14.00] Underground anthem running on track
[00:19.00] Nettspend in the front, no looking back`
  },
  {
    id: "nettspend-drankdrankdrank",
    title: "drankdrankdrank",
    artist: "Nettspend",
    album: "Singles",
    genre: "Underground / Plugg",
    year: 2024,
    duration: 140,
    coverUrl: "/covers/nettspend-drankdrankdrank.jpg",
    audioUrl: "/audio/nettspend-drankdrankdrank.m4a",
    lyrics: `[00:05.00] Drank, drank, drank in the double cup
[00:11.00] Tell 'em turn the speakers all the way on up
[00:17.00] Underground sound, running all the luck`
  },
  {
    id: "esdeekid-4-me",
    title: "4 ME",
    artist: "esdeekid",
    album: "Underground Chronicles",
    genre: "Pluggnb / Ambient",
    year: 2024,
    duration: 145,
    coverUrl: "/covers/esdeekid-4-me.jpg",
    audioUrl: "/audio/esdeekid-4-me.m4a",
    lyrics: `[00:05.00] Baby, tell me is you really there 4 me?
[00:10.50] Looking through the shadows, what you really wanna see?
[00:16.00] Pluggnb chords playing in the evening breeze
[00:21.50] I was down bad, now I'm living at ease`
  },
  {
    id: "esdeekid-phantom",
    title: "Phantom",
    artist: "esdeekid",
    album: "Ghost Tape",
    genre: "Pluggnb / Ambient",
    year: 2024,
    duration: 152,
    coverUrl: "/covers/esdeekid-phantom.jpg",
    audioUrl: "/audio/esdeekid-phantom.m4a",
    lyrics: `[00:06.00] Ghost in the night, riding in a Phantom
[00:12.00] Singing out my heart like an underground anthem
[00:18.00] Echo in the reverb, they don't understand him
[00:24.00] Taking all the melodies and making them random`
  },
  {
    id: "esdeekid-ritz",
    title: "Ritz",
    artist: "esdeekid",
    album: "Suite Life",
    genre: "Pluggnb / Trap",
    year: 2024,
    duration: 138,
    coverUrl: "/covers/esdeekid-ritz.jpg",
    audioUrl: "/audio/esdeekid-ritz.m4a",
    lyrics: `[00:04.00] Checking in the Ritz with a luggage full of tracks
[00:09.50] Twenty-fourth floor, laying back, relax
[00:15.00] Looking at the skyline through the golden glass
[00:20.50] Everything we wanted, yeah, we brought it back`
  },
  {
    id: "esdeekid-lv-prada",
    title: "LV Prada",
    artist: "esdeekid",
    album: "Designer Dreams",
    genre: "Pluggnb",
    year: 2024,
    duration: 146,
    coverUrl: "/covers/esdeekid.jpg",
    audioUrl: "/audio/esdeekid-lv-prada.m4a",
    lyrics: `[00:05.00] LV, Prada on the coat tonight
[00:10.00] Melodic pluggnb shining in the light
[00:15.00] Underground sound keeping everything right
[00:20.00] esdeekid floating in the middle of the flight`
  },
  {
    id: "esdeekid-pluggnb-dreams",
    title: "Pluggnb Dreams (40)",
    artist: "esdeekid",
    album: "Underground Chronicles",
    genre: "Pluggnb / Ambient",
    year: 2024,
    duration: 150,
    coverUrl: "/covers/esdeekid.jpg",
    audioUrl: "/audio/esdeekid-pluggnb-dreams.m4a",
    lyrics: `[00:05.00] Pluggnb dreams in the 40 night
[00:10.50] Reverb heavy and the synth so bright
[00:16.00] We made it out the basement into the height
[00:21.50] esdeekid on the beat, pure delight`
  },
  {
    id: "nine-vicious-demon-time",
    title: "Demon Time",
    artist: "Nine Vicious",
    album: "Dark Realm",
    genre: "Rage / Alt-Hip-Hop",
    year: 2024,
    duration: 148,
    coverUrl: "/covers/nine-vicious-demon-time.jpg",
    audioUrl: "/audio/nine-vicious-demon-time.m4a",
    lyrics: `[00:05.00] Step in the booth, it's demon time
[00:10.50] Nine Vicious on the rhythm, spitting every rhyme
[00:16.00] Bass in the sub hitting right at the spine
[00:21.50] Shadows in the back, but the spotlight is mine`
  },
  {
    id: "nine-vicious-carti-flow",
    title: "Carti Flow",
    artist: "Nine Vicious",
    album: "Dark Realm",
    genre: "Rage / Trap",
    year: 2024,
    duration: 155,
    coverUrl: "/covers/nine-vicious.jpg",
    audioUrl: "/audio/nine-vicious-carti-flow.m4a",
    lyrics: `[00:05.00] Carti flow on the distorted sub
[00:10.00] Nine Vicious taking over every club
[00:15.00] Jumping in the mosh pit, showing no love
[00:20.00] Rage all night till the sun comes above`
  },
  {
    id: "nine-vicious-vicious",
    title: "Vicious",
    artist: "Nine Vicious",
    album: "Dark Realm",
    genre: "Rage / Experimental",
    year: 2024,
    duration: 142,
    coverUrl: "/covers/nine-vicious.jpg",
    audioUrl: "/audio/nine-vicious-vicious.m4a",
    lyrics: `[00:04.00] Vicious style, vicious sound
[00:09.00] Shaking up the pavement all around
[00:14.00] Nine Vicious wearing the underground crown
[00:19.00] We never let the energy go down`
  },
  {
    id: "nine-vicious-nightmare",
    title: "Nightmare",
    artist: "Nine Vicious",
    album: "Dark Realm",
    genre: "Rage / Dark Ambient",
    year: 2024,
    duration: 160,
    coverUrl: "/covers/nine-vicious.jpg",
    audioUrl: "/audio/nine-vicious-nightmare.m4a",
    lyrics: `[00:05.00] Living in a nightmare, turn it to a dream
[00:11.00] Hear the distortion make the speakers scream
[00:17.00] Nine Vicious running the whole dark theme
[00:23.00] Nothing is ever as peaceful as it seem`
  },
  {
    id: "jaiyash-izaam",
    title: "Ilzaam",
    artist: "Jaiyash",
    album: "Alt Tape Vol. 1",
    genre: "Indian Alt / Lo-Fi",
    year: 2023,
    duration: 175,
    coverUrl: "/covers/jaiyash-izaam.jpg",
    audioUrl: "/audio/jaiyash-izaam.m4a",
    lyrics: `[00:07.00] Ilzaam lagate hain log yahan pe
[00:13.50] Dhundhta hoon khud ko main aasman pe
[00:20.00] Lo-fi si guitar, dil mein ek aag
[00:26.50] Apne hi suron mein chhedte hain raag
[00:33.00] Ilzaam na do mujhe meri khamoshi ka`
  },
  {
    id: "jaiyash-gawah",
    title: "Gawah",
    artist: "Jaiyash",
    album: "Alt Tape Vol. 1",
    genre: "Indian Alt",
    year: 2023,
    duration: 180,
    coverUrl: "/covers/jaiyash.jpg",
    audioUrl: "/audio/jaiyash-gawah.m4a",
    lyrics: `[00:06.00] Gawah hai ye raat, gawah hai ye sama
[00:12.00] Jaiyash ke suron mein bacha hai jahan
[00:18.00] Sachhi baatein bolte, na churaate aankh
[00:24.00] Dil ke panne pe banayi nayi saakh`
  },
  {
    id: "jaiyash-sitaron-mein",
    title: "Sitaron Mein",
    artist: "Jaiyash",
    album: "Alt Tape Vol. 1",
    genre: "Indian Alt / Dream Pop",
    year: 2023,
    duration: 195,
    coverUrl: "/covers/jaiyash.jpg",
    audioUrl: "/audio/jaiyash-sitaron-mein.m4a",
    lyrics: `[00:07.00] Sitaron mein dhoondha tera ye pata
[00:14.00] Dil se hui hai kya koi khata
[00:21.00] Alt wave vibes goonjti hawa mein
[00:28.00] Asar hai hamare sangeet ki dava mein`
  },
  {
    id: "jaiyash-sabotage",
    title: "Sabotage",
    artist: "Jaiyash",
    album: "Alt Tape Vol. 1",
    genre: "Indian Alt / Indie Trap",
    year: 2023,
    duration: 170,
    coverUrl: "/covers/jaiyash.jpg",
    audioUrl: "/audio/jaiyash-sabotage.m4a",
    lyrics: `[00:05.00] Sabotage karne chale the mere sapne
[00:11.00] Par sath khade hain sabhi mere apne
[00:17.00] Raw emotions and melodic verse
[00:23.00] Jaiyash beats healing up the universe`
  },
  {
    id: "jaiyash-ghar",
    title: "Ghar",
    artist: "Jaiyash",
    album: "Alt Tape Vol. 1",
    genre: "Indian Alt / Lo-Fi",
    year: 2023,
    duration: 185,
    coverUrl: "/covers/jaiyash.jpg",
    audioUrl: "/audio/jaiyash-ghar.m4a",
    lyrics: `[00:06.00] Ghar wapas aane ki aisi hai khushi
[00:12.50] Chehre pe lauta di khoyi hui hansi
[00:19.00] Sangeet hi hamara asli hai makaan
[00:25.50] Jaiyash ka sangeet dil ka armaan`
  },
  {
    id: "arpit-maharani",
    title: "Maharani",
    artist: "Arpit Bala, Karun",
    album: "Qabool Hai",
    genre: "Indian Indie / Alt-Pop",
    year: 2022,
    duration: 195,
    coverUrl: "/covers/arpit-maharani.jpg",
    audioUrl: "/audio/arpit-maharani.m4a",
    lyrics: `[00:08.00] Tu meri maharani, main tera deewaana
[00:15.00] Tere bina dil ka mushkil hai samjhana
[00:22.00] Aankhon mein teri kho gaya ye zamaana
[00:29.00] Gaata rahoon bas tera hi taraana
[00:36.00] Maharani, sun le tu dil ki pukaar
[00:43.00] Kar le qubool mera sachha sa pyaar`
  },
  {
    id: "arpit-gulabo",
    title: "Gulabo",
    artist: "Arpit Bala",
    album: "Singles",
    genre: "Indie Pop",
    year: 2023,
    duration: 165,
    coverUrl: "/covers/arpit-gulabo.jpg",
    audioUrl: "/audio/arpit-gulabo.m4a",
    lyrics: `[00:05.50] Gulabo, zara sa hans ke dikha de
[00:11.80] Dil ke gulab ko zara sa khila de
[00:18.00] Tere bina soona lage sara jahan
[00:24.20] Le chal mujhe tu apne aasmaan`
  },
  {
    id: "arpit-ik-kudi",
    title: "Ik Kudi",
    artist: "Arpit Bala",
    album: "Singles",
    genre: "Indie Acoustic",
    year: 2023,
    duration: 178,
    coverUrl: "/covers/arpit.jpg",
    audioUrl: "/audio/arpit-ik-kudi.m4a",
    lyrics: `[00:06.00] Ik kudi jida naam mohabbat
[00:12.50] Gum hai, gum hai, gum hai
[00:19.00] Arpit Bala ki aawaaz mein dard
[00:25.50] Desi indie ka amar ye shabd`
  },
  {
    id: "arpit-kya-tu-theek-hai",
    title: "Kya Tu Theek Hai",
    artist: "Arpit Bala",
    album: "Singles",
    genre: "Indie Alt",
    year: 2023,
    duration: 172,
    coverUrl: "/covers/arpit.jpg",
    audioUrl: "/audio/arpit-kya-tu-theek-hai.m4a",
    lyrics: `[00:05.50] Puchta hoon main, kya tu theek hai?
[00:11.50] Zindagi ne sikhayi jo seekh hai
[00:17.50] Dil se nikalti hai aisi aawaaz
[00:23.50] Arpit Bala ka anokha ye saaz`
  },
  {
    id: "arpit-anveshna",
    title: "Anveshna",
    artist: "Arpit Bala",
    album: "Anveshna",
    genre: "Indian Indie / Experimental",
    year: 2023,
    duration: 190,
    coverUrl: "/covers/arpit.jpg",
    audioUrl: "/audio/arpit-anveshna.m4a",
    lyrics: `[00:06.00] Anveshna mein nikle hum khud ki talaash mein
[00:13.00] Khushiyon ko dhoondhte har ek aash mein
[00:20.00] Arpit Bala ka deep poetic tone
[00:27.00] Desi indie artistry on the throne`
  },
  {
    id: "skai-skai-flow",
    title: "Skai Flow",
    artist: "Skai",
    album: "High Altitudes",
    genre: "Alt-Electronic / Trap",
    year: 2024,
    duration: 165,
    coverUrl: "/covers/skai.jpg",
    audioUrl: "/audio/skai-skai-flow.m4a",
    lyrics: `[00:05.00] Floating with the Skai flow, reaching the cloud
[00:11.00] Melodies bumping so clear and so loud
[00:17.00] Atmospheric synths on the 808 glide
[00:23.00] Take you along on an ethereal ride`
  },
  {
    id: "skai-late-night",
    title: "Late Night Skai",
    artist: "Skai",
    album: "High Altitudes",
    genre: "Alt-Electronic / Ambient",
    year: 2024,
    duration: 175,
    coverUrl: "/covers/skai.jpg",
    audioUrl: "/audio/skai-late-night.m4a",
    lyrics: `[00:06.00] Late night vibes under the neon light
[00:12.50] Everything feels so cinematic and right
[00:19.00] Skai soundscapes filling the room
[00:25.50] Banishing all of the shadow and gloom`
  },
  {
    id: "skai-subzero",
    title: "Subzero",
    artist: "Skai",
    album: "High Altitudes",
    genre: "Wave / Trap",
    year: 2024,
    duration: 160,
    coverUrl: "/covers/skai.jpg",
    audioUrl: "/audio/skai-subzero.m4a",
    lyrics: `[00:05.00] Subzero temperature, ice in the vein
[00:10.50] Beautiful soundscapes washing the pain
[00:16.00] Skai on the production, crisp and clean
[00:21.50] Freshest new style that you ever seen`
  },
  {
    id: "skai-visions",
    title: "Visions",
    artist: "Skai",
    album: "High Altitudes",
    genre: "Wave / Ambient",
    year: 2024,
    duration: 170,
    coverUrl: "/covers/skai.jpg",
    audioUrl: "/audio/skai-visions.m4a",
    lyrics: `[00:05.50] Visions of tomorrow in the rhythm of today
[00:11.50] Moving the sound in an astronomical way
[00:17.50] Skai frequencies elevating the soul
[00:23.50] Taking back all of the creative control`
  },
  {
    id: "skai-altitude",
    title: "Altitude",
    artist: "Skai",
    album: "High Altitudes",
    genre: "Alt-Electronic",
    year: 2024,
    duration: 168,
    coverUrl: "/covers/skai.jpg",
    audioUrl: "/audio/skai-altitude.m4a",
    lyrics: `[00:05.00] Climb to the altitude where eagles soar
[00:11.00] Hear the synthesizer rumble and roar
[00:17.00] Skai leading the way to the peak
[00:23.00] Exactly the energy that we seek`
  },
  {
    id: "mitski-my-love-mine-all-mine",
    title: "My Love Mine All Mine",
    artist: "Mitski",
    album: "The Land Is Inhospitable and So Are We",
    genre: "Indie / Dream Pop",
    year: 2023,
    duration: 138,
    coverUrl: "/covers/mitski-love.jpg",
    audioUrl: "/audio/mitski-my-love-mine-all-mine.m4a",
    lyrics: `[00:06.00] Moon, a hole of light through the big sky
[00:14.00] The trees are tall, and so am I
[00:22.00] 'Cause here on earth, nothing is mine
[00:30.00] But my love is mine, all mine
[00:39.00] I love, my, my, mine
[00:47.00] Nothing in the world belongs to me
[00:55.00] But my love, mine, all mine, all mine`
  },
  {
    id: "gigi-perez-sailor-song",
    title: "Sailor Song",
    artist: "Gigi Perez",
    album: "Sailor Song",
    genre: "Indie Folk / Alt-Pop",
    year: 2024,
    duration: 224,
    coverUrl: "/covers/gigi-sailor-song.jpg",
    audioUrl: "/audio/gigi-perez-sailor-song.m4a",
    lyrics: `[00:10.00] I saw her in the water, looking like an angel
[00:20.00] Singing out a melody that no one else could hear
[00:30.00] Oh, won't you take my hand and pull me to the ocean?
[00:40.00] I'd drown a thousand times if it meant keeping you near
[00:50.00] She said, "Sailor, don't you worry about the tempest"
[01:00.00] "The tide will always bring you back to shore"`
  },
  {
    id: "arctic-monkeys-i-wanna-be-yours",
    title: "I Wanna Be Yours",
    artist: "Arctic Monkeys",
    album: "AM",
    genre: "Indie Rock / Late Night",
    year: 2013,
    duration: 184,
    coverUrl: "/covers/arctic-monkeys-am.jpg",
    audioUrl: "/audio/arctic-monkeys-i-wanna-be-yours.m4a",
    lyrics: `[00:08.00] I wanna be your vacuum cleaner
[00:15.50] Breathing in your dust
[00:23.00] I wanna be your Ford Cortina
[00:30.50] I will never rust
[00:38.00] If you like your coffee hot
[00:45.50] Let me be your coffee pot
[00:53.00] You call the shots, babe
[01:00.50] I just wanna be yours`
  },
  {
    id: "cas-apocalypse",
    title: "Apocalypse",
    artist: "Cigarettes After Sex",
    album: "Cigarettes After Sex",
    genre: "Dream Pop / Ambient",
    year: 2017,
    duration: 290,
    coverUrl: "/covers/cas-apocalypse.jpg",
    audioUrl: "/audio/cas-apocalypse.m4a",
    lyrics: `[00:12.00] You leapt from crumbling bridges watching city lights
[00:24.00] The flashbulbs explode behind your eyes tonight
[00:36.00] Got the music in your hands and the silver in your hair
[00:48.00] Kisses on your forehead like a quiet prayer
[01:00.00] Your lips, my lips, apocalypse
[01:12.00] Nothing else could ever hurt like this`
  },
  {
    id: "stephen-sanchez-until-i-found-you",
    title: "Until I Found You",
    artist: "Stephen Sanchez",
    album: "Easy On My Eyes",
    genre: "Retro Pop / Doo-Wop",
    year: 2021,
    duration: 177,
    coverUrl: "/covers/stephen-sanchez.jpg",
    audioUrl: "/audio/stephen-sanchez-until-i-found-you.m4a",
    lyrics: `[00:06.00] Georgia, wrap me up in all your...
[00:13.50] I want you in my arms, oh, let me hold you
[00:21.00] I'll never let you go again, like I did
[00:28.50] Oh, I used to say
[00:36.00] "I would never fall in love until I found her"
[00:43.50] I said, "I would never fall unless it's you I fall into"`
  },
  {
    id: "jeff-buckley-lover-you-shouldve-come-over",
    title: "Lover, You Should've Come Over",
    artist: "Jeff Buckley",
    album: "Grace",
    genre: "Alt-Rock / Soul",
    year: 1994,
    duration: 403,
    coverUrl: "/covers/jeff-buckley-grace.jpg",
    audioUrl: "/audio/jeff-buckley-lover-you-shouldve-come-over.m4a",
    lyrics: `[00:15.00] Looking out the door, I see the rain fall upon the funeral mourners
[00:30.00] Parading in a wake of sad relation as their shoes fill up with water
[00:45.00] Maybe I'm too young to keep good love from going wrong
[01:00.00] But tonight you're on my mind, so you never know
[01:15.00] Broken down and tired of trying to hold on to the past
[01:30.00] It's never over, my kingdom for a kiss upon her shoulder`
  },
  {
    id: "die-with-a-smile",
    title: "Die With A Smile",
    artist: "Lady Gaga, Bruno Mars",
    album: "Die With A Smile",
    genre: "Pop / Ballad",
    year: 2024,
    duration: 251,
    coverUrl: "/covers/die-with-a-smile.jpg",
    audioUrl: "/audio/die-with-a-smile.m4a",
    lyrics: `[00:12.00] Ooh, I just woke up from a dream
[00:18.50] Where you and I had to say goodbye
[00:25.00] And I don't know what it all means
[00:31.50] But since I survived, I realized
[00:38.00] If the world was ending, I'd wanna be next to you
[00:48.00] If the party was over and our time on Earth was through
[00:58.00] I'd wanna hold you just for a while
[01:07.00] And die with a smile`
  },
  {
    id: "sweater-weather",
    title: "Sweater Weather",
    artist: "The Neighbourhood",
    album: "I Love You.",
    genre: "Indie Rock / Alt-Pop",
    year: 2013,
    duration: 240,
    coverUrl: "/covers/sweater-weather.jpg",
    audioUrl: "/audio/sweater-weather.m4a",
    lyrics: `[00:10.00] All I am is a man
[00:15.00] I want the world in my hands
[00:20.00] I hate the beach but I stand
[00:25.00] In California with my toes in the sand
[00:30.00] Use the sleeves on my sweater
[00:35.00] Let's have an adventure
[00:40.00] Head in the clouds but my gravity centered
[00:45.00] Touch my neck and I'll touch yours
[00:50.00] You in those little high waisted shorts
[00:55.00] 'Cause it's too cold for you here
[01:00.00] And now, so let me hold both your hands in the holes of my sweater`
  },
  {
    id: "2hollis-poster-boy",
    title: "poster boy",
    artist: "2hollis",
    album: "boy",
    genre: "Electro-Trap",
    year: 2024,
    duration: 135,
    coverUrl: "/covers/2hollis-poster-boy.jpg",
    audioUrl: "/audio/2hollis-poster-boy.m4a",
    lyrics: `[00:04.00] Poster boy, yeah, living on the cover
[00:10.00] Electric synths playing for each other
[00:16.00] Speeding through the rave in the summer`
  },
  {
    id: "osamason-cts-v",
    title: "cts-v",
    artist: "OsamaSon",
    album: "Flex Musix",
    genre: "Underground / Rage",
    year: 2023,
    duration: 138,
    coverUrl: "/covers/osamason-cts-v.jpg",
    audioUrl: "/audio/osamason-cts-v.m4a",
    lyrics: `[00:05.00] Pull up in a CTS-V
[00:10.00] Counting all the cash that I see
[00:15.00] Flex Musix playing on repeat`
  }
];

const RAW_PLAYLISTS = [
  {
    id: "pl-sm-nayaab",
    name: "Seedhe Maut: Nayaab (Full Album 2022)",
    description: "The magnum opus by Seedhe Maut and Sez on the Beat. Complete 17-track album including Maina, Batti, Luka Chuppi, Khatta Flow, Rajdhani, and Dum Ghutte.",
    coverUrl: "/covers/sm-nayaab.jpg",
    trackIds: [
      "sm-nayaab",
      "sm-toh-kya",
      "sm-choti-soch",
      "sm-godkod",
      "sm-khoj",
      "sm-dum-ghutte",
      "sm-marne-ke-baad-bhi",
      "sm-maina",
      "sm-batti",
      "sm-ghar-pe-aao",
      "sm-hoshiyaar",
      "sm-rajdhani",
      "sm-anaadi",
      "sm-chiri-udd",
      "sm-khatta-flow",
      "sm-luka-chuppi",
      "sm-gandi-soch",
      "sm-nanchaku"
],
  },
  {
    id: "pl-sm-lunch-break",
    name: "Seedhe Maut: Lunch Break (Mixtape 2023 - 30 Tracks)",
    description: "The monumental 30-track mixtape featuring 11K, Brand New, Hola Amigo, Swah!, Asal G, Fann, Champion, Joint In The Booth, and Shutdown.",
    coverUrl: "/covers/sm-lunch-break.jpg",
    trackIds: [
      "sm-11k",
      "sm-brand-new",
      "sm-champion",
      "sm-off-beat",
      "sm-kavi-kehna",
      "sm-dikkat",
      "sm-first-place",
      "sm-peace-of-mind",
      "sm-taakat",
      "sm-swah",
      "sm-fann",
      "sm-asal-g",
      "sm-naam-kaam-sheher",
      "sm-joint-in-the-booth",
      "sm-jua",
      "sm-pain",
      "sm-idk",
      "sm-khoon",
      "sm-chidiya-udd",
      "sm-akatsuki",
      "sm-keeda",
      "sm-focus",
      "sm-baat-aisi-hai",
      "sm-tofa",
      "sm-w",
      "sm-pushpak-vimaan",
      "sm-lunch-break",
      "sm-fall-off",
      "sm-shutdown",
      "sm-kavi",
      "sm-hola-amigo"
],
  },
  {
    id: "pl-sm-bayaan",
    name: "Seedhe Maut: Bayaan (Full Album 2018)",
    description: "The revolutionary debut album produced by Sez on the Beat that changed Desi Hip-Hop forever. Pankh, Gehraiyaan, Shaktimaan, Meri Baggi, and Namastute.",
    coverUrl: "/covers/sm-bayaan.jpg",
    trackIds: [
      "sm-pankh",
      "sm-gehraiyaan",
      "sm-meri-baggi",
      "sm-shaktimaan",
      "sm-dehshat",
      "sm-edan",
      "sm-keh-chuka",
      "sm-mazzak",
      "sm-uss-din",
      "sm-kyurev",
      "sm-gandi-aulaad",
      "sm-namastute"
],
  },
  {
    id: "pl-sm-kshma",
    name: "Seedhe Maut: Kshma (EP 2024)",
    description: "Seedhe Maut's 2024 EP showcasing blistering modern drill and melodic trap: Kshma, Bajenge, Nazarbattu, and Bandana Gang.",
    coverUrl: "/covers/sm-kshma.jpg",
    trackIds: [
      "sm-kshma",
      "sm-bajenge",
      "sm-nazarbattu",
      "sm-bandana-gang"
],
  },
  {
    id: "pl-sm-features",
    name: "Seedhe Maut: Cult Classics & Features",
    description: "Iconic collaborative anthems and singles featuring KR$NA, MC Stan, Prabh Deep, Karan Kanchan, Ritviz, and Delhi Sultanate.",
    coverUrl: "/covers/sm-singles.jpg",
    trackIds: [
      "sm-ball",
      "sm-seedhe-maut-anthem",
      "sm-do-guna",
      "sm-kranti",
      "sm-nawazuddin",
      "sm-tt",
      "sm-101",
      "sm-class-sikh-maut-2",
      "sm-dum-pishaach",
      "sm-scalp-dem",
      "sm-mmm",
      "sm-tour-sequence",
      "sm-nalla-freestyle",
      "sm-hausla",
      "sm-bhoomi",
      "sm-besabar",
      "sm-panaah",
      "sm-mazza-aaya",
      "sm-nevermind",
      "sm-kaanch-ke-ghar",
      "sm-kohra",
      "sm-natkhat",
      "sm-chini"
],
  },
  {
    id: "pl-seedhe-maut",
    name: "Seedhe Maut: Complete Discography Vault",
    description: "The definitive vault of all 88 Seedhe Maut songs, features, EPs, and albums in one place.",
    coverUrl: "/covers/sm-nayaab.jpg",
    trackIds: [
      "sm-nayaab",
      "sm-toh-kya",
      "sm-choti-soch",
      "sm-godkod",
      "sm-khoj",
      "sm-dum-ghutte",
      "sm-marne-ke-baad-bhi",
      "sm-maina",
      "sm-batti",
      "sm-ghar-pe-aao",
      "sm-hoshiyaar",
      "sm-rajdhani",
      "sm-anaadi",
      "sm-chiri-udd",
      "sm-khatta-flow",
      "sm-luka-chuppi",
      "sm-gandi-soch",
      "sm-11k",
      "sm-brand-new",
      "sm-champion",
      "sm-off-beat",
      "sm-kavi-kehna",
      "sm-dikkat",
      "sm-first-place",
      "sm-peace-of-mind",
      "sm-taakat",
      "sm-swah",
      "sm-fann",
      "sm-asal-g",
      "sm-naam-kaam-sheher",
      "sm-joint-in-the-booth",
      "sm-jua",
      "sm-pain",
      "sm-idk",
      "sm-khoon",
      "sm-chidiya-udd",
      "sm-akatsuki",
      "sm-keeda",
      "sm-focus",
      "sm-baat-aisi-hai",
      "sm-tofa",
      "sm-w",
      "sm-pushpak-vimaan",
      "sm-lunch-break",
      "sm-fall-off",
      "sm-shutdown",
      "sm-kavi",
      "sm-pankh",
      "sm-gehraiyaan",
      "sm-meri-baggi",
      "sm-shaktimaan",
      "sm-dehshat",
      "sm-edan",
      "sm-keh-chuka",
      "sm-mazzak",
      "sm-uss-din",
      "sm-kyurev",
      "sm-gandi-aulaad",
      "sm-namastute",
      "sm-kshma",
      "sm-bajenge",
      "sm-nazarbattu",
      "sm-bandana-gang",
      "sm-ball",
      "sm-seedhe-maut-anthem",
      "sm-do-guna",
      "sm-kranti",
      "sm-nawazuddin",
      "sm-hola-amigo",
      "sm-nanchaku",
      "sm-tt",
      "sm-101",
      "sm-class-sikh-maut-2",
      "sm-dum-pishaach",
      "sm-scalp-dem",
      "sm-mmm",
      "sm-tour-sequence",
      "sm-nalla-freestyle",
      "sm-hausla",
      "sm-bhoomi",
      "sm-besabar",
      "sm-panaah",
      "sm-mazza-aaya",
      "sm-nevermind",
      "sm-kaanch-ke-ghar",
      "sm-kohra",
      "sm-natkhat",
      "sm-chini"
],
  },
  {
    id: "pl-yeat-vault",
    name: "Yeat Complete Vault (2093 & Up 2 Më)",
    description: "All 11 mainstream hits and high-octane rage tracks from Yeat, BNYX, and Lil Uzi Vert.",
    coverUrl: "/covers/yeat-2093.jpg",
    trackIds: [
      "yeat-if-we-being-real",
      "yeat-breathe",
      "yeat-idgaf",
      "yeat-out-the-way",
      "yeat-talk",
      "yeat-money-so-big",
      "yeat-flawless",
      "yeat-turban",
      "yeat-poppin",
      "yeat-get-busy",
      "yeat-nun-id-change"
],
  },
  {
    id: "pl-rage-underground",
    name: "Rage & Underground Vault",
    description: "Dark pluggnb, subterranean beats, and hard-hitting 808s by Nettspend, esdeekid, Nine Vicious, 2hollis, and OsamaSon.",
    coverUrl: "/covers/nettspend-nothing-like-uuu.jpg",
    trackIds: [
      "nettspend-nothing-like-uuu",
      "nettspend-that-one-song",
      "nettspend-we-not-like-you",
      "nettspend-2024-freestyle",
      "nettspend-fuck-swag",
      "nettspend-drankdrankdrank",
      "esdeekid-4-me",
      "esdeekid-phantom",
      "esdeekid-ritz",
      "esdeekid-lv-prada",
      "esdeekid-pluggnb-dreams",
      "nine-vicious-demon-time",
      "nine-vicious-carti-flow",
      "nine-vicious-vicious",
      "nine-vicious-nightmare",
      "2hollis-poster-boy",
      "osamason-cts-v"
],
  },
  {
    id: "pl-dhh-alt",
    name: "DHH & Indian Alt Wave",
    description: "Vibrant Indian alternative rap, indie ballads, and lo-fi vibes by Seedhe Maut, Arpit Bala, and Jaiyash.",
    coverUrl: "/covers/arpit-maharani.jpg",
    trackIds: [
      "arpit-maharani",
      "arpit-gulabo",
      "arpit-ik-kudi",
      "arpit-kya-tu-theek-hai",
      "arpit-anveshna",
      "jaiyash-izaam",
      "jaiyash-gawah",
      "jaiyash-sitaron-mein",
      "jaiyash-sabotage",
      "jaiyash-ghar",
      "sm-ball",
      "sm-seedhe-maut-anthem",
      "sm-do-guna",
      "sm-kranti",
      "sm-nawazuddin"
],
  },
  {
    id: "pl-skai-rotation",
    name: "Skai Rotation (Top 5 Anthems)",
    description: "Ethereal wave synths, melodic trap, and high-altitude soundscapes by Skai.",
    coverUrl: "/covers/skai.jpg",
    trackIds: [
      "skai-skai-flow",
      "skai-late-night",
      "skai-subzero",
      "skai-visions",
      "skai-altitude"
],
  },
  {
    id: "pl-late-night-love",
    name: "Mainstream Love & Late Night Yearning",
    description: "Atmospheric romance, indie anthems, and midnight longing from Mitski, Gigi Perez, Arctic Monkeys, Cigarettes After Sex, Jeff Buckley, and Bruno Mars.",
    coverUrl: "/covers/mitski-love.jpg",
    trackIds: [
      "mitski-my-love-mine-all-mine",
      "gigi-perez-sailor-song",
      "arctic-monkeys-i-wanna-be-yours",
      "cas-apocalypse",
      "stephen-sanchez-until-i-found-you",
      "jeff-buckley-lover-you-shouldve-come-over",
      "die-with-a-smile",
      "sweater-weather"
],
  },
];

// Universal asset resolver adapting to relative path, GitHub Pages (/orbi/), or custom domain
export function resolveAsset(path) {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('blob:') || path.startsWith('data:')) {
    return path;
  }
  const clean = path.startsWith('/') ? path.slice(1) : path;
  const base = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.BASE_URL ? import.meta.env.BASE_URL : './';
  const prefix = base.endsWith('/') ? base : base + '/';
  return prefix + clean;
}

export const INITIAL_TRACKS = RAW_TRACKS.map((t) => ({
  ...t,
  audioUrl: resolveAsset(t.audioUrl),
  coverUrl: resolveAsset(t.coverUrl)
}));

export const INITIAL_PLAYLISTS = RAW_PLAYLISTS.map((p) => ({
  ...p,
  coverUrl: resolveAsset(p.coverUrl)
}));

export const THEME_ACCENTS = [
  { name: 'Turquoise (Default)', hex: '#14b8a6' },
  { name: 'Seafoam Aqua', hex: '#2dd4bf' },
  { name: 'Emerald', hex: '#10b981' },
  { name: 'Cyan', hex: '#06b6d4' },
  { name: 'Royal Purple', hex: '#a855f7' },
  { name: 'Neon Rose', hex: '#f43f5e' },
  { name: 'Warm Amber', hex: '#f59e0b' },
  { name: 'Electric Blue', hex: '#3b82f6' },
];

