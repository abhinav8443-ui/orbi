import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const OUT_FILE = path.join(ROOT_DIR, 'src', 'data', 'initialLibrary.js');

// Complete Seedhe Maut Discography & Features
const SEEDHE_MAUT_TRACKS = [
  // ==========================================
  // NAYAAB (2022) - Full Album with Sez on the Beat
  // ==========================================
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
    lyrics: `[00:08.00] Nayaab hai safar, nayaab hai kahani\n[00:15.50] Likhte hain lafz jaise behta hua paani\n[00:23.00] Calm aur Encore, do bhaiyon ka josh\n[00:30.50] Gaane sunte hi sabhi khote hain hosh\n[00:38.00] Sez on the beat aur dilli ka ye shor\n[00:45.00] Desi hip-hop mein hum machate hain roar`
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
    lyrics: `[00:06.00] Toh kya hua agar hum thode alag hain\n[00:12.50] Sapnon ki raahon mein hum chalte bejhadak hain\n[00:19.00] Nafrat ko chhod ke banate hain sangeet\n[00:25.50] Har ek mushkil pe paate hain jeet`
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
    lyrics: `[00:05.00] Choti soch walon se hum rehte hain door\n[00:11.00] Mehnat ke bal pe hi hote hain mashhoor\n[00:17.00] Kalam mein jaan hai aur lafzon mein sach\n[00:23.00] Zindagi ki seekh se seekha har ek pakh`
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
    lyrics: `[00:04.50] Godkod flow, circuit pe load\n[00:09.50] Todte hain rules har ek naye mod\n[00:15.00] Encore aur Calm, double the speed\n[00:20.50] Desi hip-hop ki yahi hai need`
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
    lyrics: `[00:07.00] Khoj mein nikle the hum apne wajood ki\n[00:14.00] Pa li kahani humne dilli ke dhoop ki\n[00:21.00] Raste the tedhe par manzil thi saaf\n[00:28.00] Mehnat se kiya har galti ko maaf`
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
    lyrics: `[00:08.00] Dum ghutte yahan is shahar ke dhuein mein\n[00:16.00] Yaadein hain dabi jaise gehre se kuein mein\n[00:24.00] Kode, Encore aur Calm ki pukaar\n[00:32.00] Asli hip-hop ka sachha vyapaar`
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
    lyrics: `[00:09.00] Marne ke baad bhi zinda rahenge ye bol\n[00:18.00] Shabdon ka hamare koi nahi hai mol\n[00:27.00] Itihaas likhenge hum apne hi khoon se\n[00:36.00] Desi rap chamkega dilli ke junoon se`
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
    lyrics: `[00:07.00] Maina gaati hai surila sa gaana\n[00:14.00] Bhool nahi paate wo beeta zamaana\n[00:21.00] Nayaab hai ye lamha, ise na gawaana\n[00:28.00] Dil ke kone mein bas tu hi samaana`
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
    lyrics: `[00:06.00] Batti bujha ke ab hoga yahan tandav\n[00:12.50] Delhi ke raste aur shor sharaba\n[00:19.00] Sez ke music pe Encore ka vaar\n[00:25.50] Calm ne mic pe baandhi raftaar`
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
    lyrics: `[00:05.50] Ghar pe aao, baitho, baat karenge\n[00:12.00] Purane dino ki yaad karenge\n[00:18.50] Chaaye ki chuski aur beat pe beat\n[00:25.00] Doston ke sang hi hoti hai jeet`
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
    lyrics: `[00:05.00] Hoshiyaar raho is duniya ke daav se\n[00:11.00] Bach ke nikalte hain har ek bahaav se\n[00:17.00] Aankhein hain khuli aur kaan hain tez\n[00:23.00] Asli hip-hop ka sajaya ye mej`
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
    lyrics: `[00:06.00] Rajdhani ki speed se daudti hai beat\n[00:12.50] Dilli ke ladkon ki pakki hai jeet\n[00:19.00] Sez, Calm, Encore ka lethal combo\n[00:25.50] Desi rap scene ka baje yahan congo`
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
    lyrics: `[00:07.00] Pehle the anaadi, ab bane khiladi\n[00:14.50] Desi hip-hop ki chala di gaadi\n[00:22.00] Raaton ki neend gawa ke paya mukaam\n[00:29.50] Seedhe Maut shahar mein ban gaya naam`
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
    lyrics: `[00:05.00] Chiri udd, kaa udd, ud gaye saare hosh\n[00:11.50] Beat bajti jab, badhta hai josh\n[00:18.00] Calm aur Encore ka unmatchable vibe\n[00:24.50] Asli DHH ki banayi nayi tribe`
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
    lyrics: `[00:08.00] Khatta ye flow jaise nimbu ka paani\n[00:14.00] Likhte hain gaane jo bane ek kahani\n[00:20.00] KR$NA aur SM jab aate hain mic pe\n[00:26.00] Bars ki baarish hoti har ek strike pe\n[00:32.00] Kalam mein dhaar hai, shabdon mein aag\n[00:38.00] Subah se shaam tak ek hi dimaag`
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
    lyrics: `[00:06.00] Luka chuppi bohot hui, saamne aa ja na\n[00:12.50] Kahan chup ke baitha hai, zara batla ja na\n[00:19.00] Calm aur Encore, Delhi se leke seedha dil tak\n[00:25.50] Kalam chale tezi se, likhte hain hum milkar\n[00:32.00] Zindagi ek khel hai, chhupte hain jazbaat\n[00:38.50] Raaton ko jagte hain, hoti hai khud se baat`
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
    lyrics: `[00:05.00] Gandi soch ko peechhe chhod ke aaye\n[00:11.00] Sez ke beats pe naye rang jamaye\n[00:17.00] Dilli ke galiyon se unche aakash\n[00:23.00] Seedhe Maut ka sangeet hai khaas`
  },

  // ==========================================
  // LUNCH BREAK (2023) - 30-Track Masterpiece Mixtape
  // ==========================================
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
    lyrics: `[00:04.50] Gyarah hazaar volt ka jhatka\n[00:09.50] Jo bhi raste mein aaya vo atka\n[00:14.50] Lunch break leke hum baithe hain stage pe\n[00:19.50] Gusse ki aag likhi har ek page pe\n[00:24.50] 11K flow, circuit hai high\n[00:29.50] Delhi shahar mein Seedhe Maut chhayi`
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
    lyrics: `[00:06.00] Brand new drip, brand new flow\n[00:12.50] Kahlon aur SM, let the engine go\n[00:19.00] Mohali se Delhi, connect hai real\n[00:25.50] Hardcore rap ki signed hai deal`
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
    lyrics: `[00:05.00] Champion mentality, trophy in the hand\n[00:11.00] Lil Bhavi, Calm, Encore take the stand\n[00:17.00] Bass in the trunk, shaking up the city\n[00:23.00] Living in the fast lane, zero time for pity`
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
    lyrics: `[00:04.00] Off beat pe bhi on beat flow\n[00:09.50] Desi rap scene mein hum spread karte glow\n[00:15.00] Calm ki delivery aur Encore ki rhyme\n[00:20.50] Hamesha rehte hum ahead of time`
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
    lyrics: `[00:06.00] Kavi kehna chahte hain dukh aur dard\n[00:12.50] Par hip-hop ne banaya humko mard\n[00:19.00] Shayaron ki basti se utha ye toofaan\n[00:25.50] Delhi shahar mein banaya naya nishaan`
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
    lyrics: `[00:05.00] Dikkat kya hai, seedha aake bol\n[00:10.50] Chhupa ke na rakh apne andar ke jhol\n[00:16.00] Mic pe hum aate jab chhat jati bheed\n[00:21.50] DHH mein aag lagane ki hai speed`
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
    lyrics: `[00:05.50] First place pe hain, second pe na aate\n[00:11.50] Mehnat se hum apna jhanda lehrate\n[00:17.50] Dilli se leke poore desh tak raj\n[00:23.50] Sir pe sajate hain asli hip-hop ka taaj`
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
    lyrics: `[00:05.00] Peace of mind dhundhte hain is shor mein\n[00:11.00] Zindagi chalti hai ek naye mod pe\n[00:17.00] Gaane banate hain sukoon ke liye\n[00:23.00] Apne parivaar aur junoon ke liye`
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
    lyrics: `[00:06.00] Taakat kalam mein, taakat hai aawaaz mein\n[00:12.50] Koyi kami nahi hai hamare andaaz mein\n[00:19.00] Sonny aur SM ka solid balance\n[00:25.50] Asli rap artists ko dete hum challenge`
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
    lyrics: `[00:07.00] Swah! Kiya sabko humne yahan raakh\n[00:13.50] Badshah aur SM, banayi nayi saakh\n[00:20.00] Industry hiladi jab mic kiya on\n[00:26.50] Hamare saamne ab khada hoga kaun`
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
    lyrics: `[00:06.50] Fann dilli ke ladkon ka, street pe control\n[00:13.00] Raga aur SM jab ghoomte hain roll\n[00:19.50] Galiyon ki boli aur asle ka wazan\n[00:26.00] Hip-hop ke naam kiya poora ye jeevan`
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
    lyrics: `[00:08.00] Asal G kaun hai, pehchano to sahi\n[00:16.00] Faris aur SM ki chemistry hai wahi\n[00:24.00] Border ke paar bhi goonjti awaaz\n[00:32.00] Shabdon ke jadugar karte hain naaz`
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
    lyrics: `[00:05.50] Naam hai SM, kaam hai hip-hop\n[00:11.50] Sheher hamara Dilli, top to the top\n[00:17.50] Ab 17 sath mein, energy insane\n[00:23.50] Seedhe Maut empire, unbreakable chain`
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
    lyrics: `[00:06.50] Joint in the booth, baatein dhuandhaar\n[00:13.00] Rawal, Bharg aur SM ka pyaar\n[00:19.50] Studio sessions aur midnight vibe\n[00:26.00] Asli doston ki banayi nayi tribe`
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
    lyrics: `[00:05.00] Zindagi ek jua hai, har baazi lagadi\n[00:10.50] Apne junoon mein saari neend gawa di\n[00:16.00] Jeet ki aas mein chalte rahe aage\n[00:21.50] Jo darte the humse vo saare bhage`
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
    lyrics: `[00:05.50] Pain ko banaya humne apna hathiyar\n[00:11.50] Gusse aur dard se likhi raftaar\n[00:17.50] Aansuon ko badla humne sangeet mein\n[00:23.50] Har haar ko badla humne jeet mein`
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
    lyrics: `[00:04.50] IDK kya sochte hain log hamare baare\n[00:09.50] Hum to chamak rahe jaise aasmaan ke taare\n[00:14.50] Calm aur Encore, nonstop flow\n[00:19.50] Desi rap scene ka badhaya show`
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
    lyrics: `[00:05.50] Khoon pasina ek kiya is mukaam ke liye\n[00:11.50] Seedhe Maut ke unche naam ke liye\n[00:17.50] Hardcore bars aur sub-woofer blast\n[00:23.50] Stage pe aate hi machate hain cast`
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
    lyrics: `[00:07.00] Chidiya udd, khule aasmaan mein jao\n[00:15.00] Ritviz aur SM ka jashn manao\n[00:23.00] Classical notes aur desi hip-hop\n[00:31.00] Never stopping, straight to the top`
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
    lyrics: `[00:06.00] Akatsuki robes, clouds on the cloak\n[00:12.50] Rebel 7 and SM, don't take it for a joke\n[00:19.00] Jutsu in the bars, sharingan focus\n[00:25.50] Dominating Delhi like a hocus pocus`
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
    lyrics: `[00:04.50] Dimag mein tha keeda hip-hop ka shuru se\n[00:09.50] Seekha humne dilli ke har ek guru se\n[00:14.50] Kalam chali aisi jo rukti nahi hai\n[00:19.50] Asli kala kisi ke aage jhukti nahi hai`
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
    lyrics: `[00:05.00] Focus rakha humne bas apne lakshya pe\n[00:10.50] Kadam rakhe humne sahi raaste pe\n[00:16.00] Duniya jo kehti thi wo humne na suna\n[00:21.50] Apna rasta humne khud hi chuna`
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
    lyrics: `[00:05.50] Baat aisi hai ke hum rukte nahi\n[00:11.00] Mushkilon ke aage kabhi jhukte nahi\n[00:16.50] Dilli se leke Bangalore tak shor\n[00:22.00] Seedhe Maut tera bhai, Calm aur Encore`
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
    lyrics: `[00:05.00] Ye gaana ek tofa hai dilli ke naam\n[00:11.00] Jin logon ne diya humein itna samman\n[00:17.00] Sangeet hamara dil se nikalta\n[00:23.00] Har ek lafz yahan sach se pighalta`
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
    lyrics: `[00:04.50] Big W, hamesha jeet hamari\n[00:09.50] Desi hip-hop pe hai chhavi hamari\n[00:14.50] Bars pe bars, continuous win\n[00:19.50] DHH kingpins stepping in`
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
    lyrics: `[00:05.50] Pushpak vimaan jaise udte hawa mein\n[00:11.50] Koyi kami nahi hamari adaa mein\n[00:17.50] Unche aakashon pe lehraate jhanda\n[00:23.50] Seedhe Maut shahar ka asli phanda`
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
    lyrics: `[00:06.00] Lunch break leke hum aate hain mic pe\n[00:12.50] Desi rap lovers ko dete hain hype ye\n[00:19.00] 30 track mixtape, pure domination\n[00:25.50] SM tera bhai, across the nation`
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
    lyrics: `[00:05.00] Fall off kabhi nahi hoga hamara\n[00:10.50] Dilli ki galiyon ka mila hai sahara\n[00:16.00] Mehnat se banayi ye unchi imarat\n[00:21.50] Hip-hop ke naam ki poori tijaarat`
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
    lyrics: `[00:04.00] Poora shahar kiya humne shutdown\n[00:09.50] Delhi ke ladke ab nahi honge down\n[00:15.00] Hardcore beat pe aag lagadi\n[00:20.50] Nayi peedhi ko sahi raah dikhadi`
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
    lyrics: `[00:05.50] Kavi ke shabdon mein kitna asar hai\n[00:11.50] Har ek lafz yahan teer-o-tabar hai\n[00:17.50] Zindagi ka sach likhte hain hum\n[00:23.50] Seedhe Maut hai jo na ho kam`
  },

  // ==========================================
  // BAYAAN (2018) - Cult Classic Album with Sez on the Beat
  // ==========================================
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
    lyrics: `[00:10.00] Pankh laga ke udna chahte the hum\n[00:20.00] Bayaan kiya humne apna har ek gham\n[00:30.00] Sez on the beat aur do ladke dilli ke\n[00:40.00] Desi rap badla shor sharaabe se`
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
    lyrics: `[00:08.00] Gehraiyaan baaton ki samjho to maanein\n[00:16.50] Asli dard to wahi jo dil hi pehchaane\n[00:25.00] Bayaan ka ye daur tha kitna haseen\n[00:33.50] Pairon ke neeche se sarki zameen`
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
    lyrics: `[00:06.00] Meri baggi mera ghodha jo na naache\n[00:12.50] Sez ke beats pe saara shahar naache\n[00:19.00] Calm aur Encore ka historic drop\n[00:25.50] Bayaan se shuru hua ye hip-hop`
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
    lyrics: `[00:07.00] Shaktimaan jaise ghoomte the bachpan mein\n[00:15.00] Kitna sukoon tha us bhole se aangan mein\n[00:23.00] Bayaan kiya humne beeta zamaana\n[00:31.00] Desi hip-hop ka amar fasana`
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
    lyrics: `[00:06.00] Dehshat phaili har gali har chaurahe pe\n[00:12.50] Seedhe Maut aa gaye sahi raaste pe\n[00:19.00] Sez ke dark synths aur bars ka vaar\n[00:25.50] DHH mein aisi na dekhi raftaar`
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
    lyrics: `[00:05.50] Edan ki khoj mein chalte rahe hum\n[00:11.50] Mushkilon se kabhi na hue hum kam\n[00:17.50] Bayaan ka ye gaana hai sabse azeez\n[00:23.50] Dil ke kareeb hai ye sangeet`
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
    lyrics: `[00:06.00] Keh chuka jo kehna tha, ab suno dhyan se\n[00:13.00] Nikalte hain shabd jaise teer kamaan se\n[00:20.00] Calm aur Encore ki sacchi kahani\n[00:27.00] Bayaan ki ye daastan hai suhani`
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
    lyrics: `[00:05.00] Mazzak nahi hai ye hip-hop ka safar\n[00:10.50] Har ek kadam pe lagta hai darr\n[00:16.00] Par hausla humne kabhi na khoya\n[00:21.50] Mehnat ka beej dilli mein boya`
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
    lyrics: `[00:06.50] Uss din ki baat hai jab shuru hua safar\n[00:13.50] Sez ke kamre mein banti thi khabar\n[00:20.50] Microphone ek aur baatein hazaar\n[00:27.50] Bayaan ne badal diya poora sansaar`
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
    lyrics: `[00:05.50] Kyu re kyu tu itna pareshan hai\n[00:11.50] Zindagi ki mushkilon se kyu anjaan hai\n[00:17.50] Bayaan sun aur pa le tu sukoon\n[00:23.50] Seedhe Maut ka yehi hai junoon`
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
    lyrics: `[00:07.00] Gandi aulaad kehke pukare zamana\n[00:15.00] Humne to seekha tha bas gaana banana\n[00:23.00] Bayaan se kiya humne sabko khamosh\n[00:31.00] Asli hip-hop ka dilli mein josh`
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
    lyrics: `[00:05.00] Namastute! Karte hain sabko pranaam\n[00:10.50] Asli hip-hop ka failaya paighaam\n[00:16.00] Sez on the beat aur do ladke mic pe\n[00:21.50] Aag lagayi har gali har site pe\n[00:27.00] Bayaan kiya humne apna har ek dard\n[00:32.50] Dilli ki sardi mein likhe hain ye sabz\n[00:38.00] Namastute, bolo sabhi hath jod ke\n[00:43.50] Aaye hain aage saari zanjeerein tod ke`
  },

  // ==========================================
  // KSHMA (2024 EP)
  // ==========================================
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
    lyrics: `[00:05.00] Kshma karo agar sach bol diya\n[00:11.00] Dil ke taale ko humne khol diya\n[00:17.00] Kshma EP pe Encore aur Calm\n[00:23.00] DHH mein uncha kiya apna naam`
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
    lyrics: `[00:05.50] Bajenge speaker poore shahar ke\n[00:11.50] Nikalte hain gaane dilli ke pehar ke\n[00:17.50] Bass drops and the crowd goes wild\n[00:23.50] SM tera bhai, never running mild`
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
    lyrics: `[00:05.00] Nazarbattu baandh ke ghoomte hain hum\n[00:10.50] Burii nazar walon ka nikalte hain dam\n[00:16.00] Kshma ka ye flow hai sabse nirala\n[00:21.50] Desi rap scene mein dala naya ujaala`
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
    lyrics: `[00:06.00] Bandana Gang, sir pe bandha rumaal\n[00:12.50] Delhi ke ladkon ne kiya kamaal\n[00:19.00] Drill beat pe Calm ka double-time rap\n[00:25.50] Encore ke bars put DHH on the map`
  },

  // ==========================================
  // 2 KA PAHADA & 'न' (NA EP)
  // ==========================================
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
    lyrics: `[00:04.50] Ball jaise court mein, slam dunk shots\n[00:09.50] 2 Ka Pahada era, connecting the dots\n[00:14.50] Shuruwat dilli ki underground gali se\n[00:19.50] Khila ye sangeet jaise phool kali se`
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
    lyrics: `[00:05.00] Seedhe Maut anthem, goonjegi aawaaz\n[00:11.00] Yahan se shuru hua hamara ye raaj\n[00:17.00] Calm aur Encore, do dilli ke sher\n[00:23.00] Hip-hop ke raste mein na karenge der`
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
    lyrics: `[00:05.50] Do guna speed, do guna bars\n[00:11.50] Aiming for the moon and hitting the stars\n[00:17.50] Na EP pe bajte hain tezi se gaane\n[00:23.50] Seedhe Maut ko sara zamaana maane`
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
    lyrics: `[00:06.00] Kranti leke aaye hain hum desi rap mein\n[00:13.00] Na fasenge kisi ke banaye trap mein\n[00:20.00] Kalam se kranti, aawaaz se aag\n[00:27.00] Desi hip-hop ka badla dimaag`
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
    lyrics: `[00:05.50] Nawazuddin jaise raw performance hamari\n[00:11.50] Desi hip-hop scene pe chhayi khumari\n[00:17.50] Acting nahi, asli hai hamara ye flow\n[00:23.50] Har ek gaane mein dikhate hain show`
  },

  // ==========================================
  // ICONIC FEATURES & CULT CLASSIC SINGLES
  // ==========================================
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
    lyrics: `[00:06.00] Hola Amigo! Kaisa hai bhai?\n[00:11.50] Tere shahar mein humne dhoom machayi\n[00:17.00] SM aur $ sign, double the pressure\n[00:22.50] Beats pe nikalta hai pure desi treasure\n[00:28.00] Gaadi bhage tezi se highway pe raat ko\n[00:33.50] Samajh tu paayega na hamari baat ko\n[00:39.00] Hola Amigo, salute to the team\n[00:44.50] Jeete hain hum bas apna hi dream`
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
    lyrics: `[00:04.00] Flow jaise nanchaku, haath mein hathoda\n[00:09.50] Jo bhi saamne aaya, usko humne toda\n[00:15.00] Delhi se Pune tak, connection hai zordaar\n[00:20.50] Beat pe Calm ka punch, Encore ka vaar\n[00:26.00] Seedhe Maut tera bhai, sunte hain log\n[00:31.50] Asli hip-hop ka lag chuka hai rog\n[00:37.00] Nanchaku ghoome hawa mein tezi se\n[00:42.50] Jeete hain hum sab apni hi marzi se`
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
    lyrics: `[00:05.00] TT pe ball jaise table tennis\n[00:11.00] Seedhe Maut shahar mein ban chuki menace\n[00:17.00] Calm aur Encore ka ruthless rap\n[00:23.00] Desi hip-hop ka badal diya map\n[00:29.00] Aaye hain aage bina kisi shaq ke\n[00:35.00] Kholte hain taale hum har ek dar ke`
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
    lyrics: `[00:05.00] 101 lessons in the hip-hop class\n[00:11.00] Sub-woofers rattling and breaking the glass\n[00:17.00] Calm and Encore firing up the engine\n[00:23.00] No competition that is worth of the mention`
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
    lyrics: `[00:08.00] Class-Sikh Maut! Sez on the historic beat\n[00:16.00] Prabh Deep aur Seedhe Maut takeover the street\n[00:24.00] Tilak Nagar se leke poore dilli tak\n[00:32.00] DHH pioneers, na rakh koyi shak`
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
    lyrics: `[00:05.50] Dum pishaach nikalte hain raat ke andhere mein\n[00:11.50] Karan Kanchan aur SM is savere mein\n[00:17.50] Bass heavy sound shaking up the underground\n[00:23.50] Seedhe Maut music spreads all around`
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
    lyrics: `[00:07.00] Scalp dem, fight the system with the rhyme\n[00:14.00] Delhi Sultanate and SM on time\n[00:21.00] Sound system culture meets desi hip-hop\n[00:28.00] Truth in the message that will never stop`
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
    lyrics: `[00:04.50] Mmm, dekho zara kaisa hai ye daur\n[00:09.50] Dilli ke galiyon mein macha diya shor\n[00:14.50] Calm ki speed aur Encore ka verse\n[00:19.50] Desi rap lovers fill up the universe`
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
    lyrics: `[00:05.50] Tour sequence on, venue packed to the gate\n[00:11.50] Selling out every city, no debate\n[00:17.50] SM tera bhai holding the torch\n[00:23.50] High octane energy burns like a scorch`
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
    lyrics: `[00:04.50] Nalla freestyle, seedha from the booth\n[00:09.50] Spitting pure fire, living with the truth\n[00:14.50] No written scripts, just raw delivery\n[00:19.50] Making DHH golden history`
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
    lyrics: `[00:06.00] Hausla na khona kabhi kisi mod pe\n[00:12.50] Sapne sajaye hain dilli ke chhor pe\n[00:19.00] Seedhe Maut sangeet se dete hain taakat\n[00:25.50] Desi hip-hop ki sachhi virasat`
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
    lyrics: `[00:07.50] Bhoomi par utra ye naya sangeet\n[00:15.00] Ritviz aur SM ki pyari si preet\n[00:22.50] Surile taar aur dilchasp rhyme\n[00:30.00] Evergreen music for all of time`
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
    lyrics: `[00:05.50] Besabar the hum is din ke intezaar mein\n[00:11.50] Doob gaye hain hum hip-hop ke pyaar mein\n[00:17.50] Calm aur Encore ka melodic wave\n[00:23.50] Music that takes us from stage to the cave`
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
    lyrics: `[00:06.00] Panaah maangi thi humne sangeet ke aagosh mein\n[00:13.00] Aaj dekho poora dilli shahar hai hosh mein\n[00:20.00] Desi rap bars that touch the soul\n[00:27.00] Seedhe Maut keeping the culture whole`
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
    lyrics: `[00:05.00] Mazza aaya bohot is lambe safar mein\n[00:11.00] Desi hip-hop bajta har ek ghar mein\n[00:17.00] Encore aur Calm celebrate the grind\n[00:23.00] Leaving all the negativity far behind`
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
    lyrics: `[00:05.50] Nevermind, chalte raho aage\n[00:11.50] Jo soye the sapne wo sabhi hain jaage\n[00:17.50] Seedhe Maut music shines bright\n[00:23.50] Leading us safely into the night`
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
    lyrics: `[00:07.00] Kaanch ke ghar mein baith ke pathar na phenko\n[00:14.50] Mehnat ka natija zara aankhein khol ke dekho\n[00:22.00] Dilli ke ladkon ne banayi nayi league\n[00:29.50] SM tera bhai never gets fatigue`
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
    lyrics: `[00:06.00] Kohra chhaya dilli ki sardi mein\n[00:12.50] Aag bhari hai humne is zardi mein\n[00:19.00] Calm aur Encore ka classic tone\n[00:25.50] Desi rap champions sitting on the throne`
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
    lyrics: `[00:04.50] Natkhat andaz, par flow deadly serious\n[00:09.50] Listeners get hooked, getting all curious\n[00:14.50] Seedhe Maut delivery so clean and sharp\n[00:19.50] Plucking our strings like a golden harp`
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
    lyrics: `[00:04.00] Chini jaisi meethi baatein nahi karte hum\n[00:09.50] Kadwa sach bolte, na kisi se darte hum\n[00:15.00] Desi hip-hop ka asli standard yahan\n[00:20.50] Seedhe Maut goonje across the jahan`
  }
];

// Read existing file to extract other artists
const existingContent = fs.readFileSync(OUT_FILE, 'utf-8');

// Extract Yeat up to end of tracks
const yeatStart = existingContent.indexOf('// 2. YEAT COMPLETE ANTHEMS');
const tracksEnd = existingContent.indexOf('];', yeatStart);

let otherTracksStr = '';
if (yeatStart !== -1 && tracksEnd !== -1) {
  otherTracksStr = existingContent.substring(yeatStart, tracksEnd).trim();
}

// Generate Playlists
const nayaabIds = SEEDHE_MAUT_TRACKS.filter(t => t.album === 'Nayaab').map(t => t.id);
const lunchBreakIds = SEEDHE_MAUT_TRACKS.filter(t => t.album === 'Lunch Break').map(t => t.id);
const bayaanIds = SEEDHE_MAUT_TRACKS.filter(t => t.album === 'Bayaan').map(t => t.id);
const kshmaIds = SEEDHE_MAUT_TRACKS.filter(t => t.album === 'Kshma').map(t => t.id);
const featuresIds = SEEDHE_MAUT_TRACKS.filter(t => t.album !== 'Nayaab' && t.album !== 'Lunch Break' && t.album !== 'Bayaan' && t.album !== 'Kshma').map(t => t.id);
const allSmIds = SEEDHE_MAUT_TRACKS.map(t => t.id);

const PLAYLISTS_CODE = `export const INITIAL_PLAYLISTS = [
  {
    id: "pl-sm-nayaab",
    name: "Seedhe Maut: Nayaab (Full Album 2022)",
    description: "The magnum opus by Seedhe Maut and Sez on the Beat. Complete 17-track album including Maina, Batti, Luka Chuppi, Khatta Flow, Rajdhani, and Dum Ghutte.",
    coverUrl: "/covers/sm-nayaab.jpg",
    trackIds: ${JSON.stringify(nayaabIds, null, 6)},
  },
  {
    id: "pl-sm-lunch-break",
    name: "Seedhe Maut: Lunch Break (Mixtape 2023 - 30 Tracks)",
    description: "The monumental 30-track mixtape featuring 11K, Brand New, Hola Amigo, Swah!, Asal G, Fann, Champion, Joint In The Booth, and Shutdown.",
    coverUrl: "/covers/sm-lunch-break.jpg",
    trackIds: ${JSON.stringify(lunchBreakIds, null, 6)},
  },
  {
    id: "pl-sm-bayaan",
    name: "Seedhe Maut: Bayaan (Full Album 2018)",
    description: "The revolutionary debut album produced by Sez on the Beat that changed Desi Hip-Hop forever. Pankh, Gehraiyaan, Shaktimaan, Meri Baggi, and Namastute.",
    coverUrl: "/covers/sm-bayaan.jpg",
    trackIds: ${JSON.stringify(bayaanIds, null, 6)},
  },
  {
    id: "pl-sm-kshma",
    name: "Seedhe Maut: Kshma (EP 2024)",
    description: "Seedhe Maut's 2024 EP showcasing blistering modern drill and melodic trap: Kshma, Bajenge, Nazarbattu, and Bandana Gang.",
    coverUrl: "/covers/sm-kshma.jpg",
    trackIds: ${JSON.stringify(kshmaIds, null, 6)},
  },
  {
    id: "pl-sm-features",
    name: "Seedhe Maut: Cult Classics & Features",
    description: "Iconic collaborative anthems and singles featuring KR$NA, MC Stan, Prabh Deep, Karan Kanchan, Ritviz, and Delhi Sultanate.",
    coverUrl: "/covers/sm-singles.jpg",
    trackIds: ${JSON.stringify(featuresIds, null, 6)},
  },
  {
    id: "pl-seedhe-maut",
    name: "Seedhe Maut: Complete Discography Vault",
    description: "The definitive vault of all ${allSmIds.length} Seedhe Maut songs, features, EPs, and albums in one place.",
    coverUrl: "/covers/sm-nayaab.jpg",
    trackIds: ${JSON.stringify(allSmIds, null, 6)},
  },
  {
    id: "pl-yeat-vault",
    name: "Yeat Complete Vault (2093 & Up 2 Më)",
    description: "All mainstream hits and high-octane rage tracks from Yeat, BNYX, and Lil Uzi Vert.",
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
      "sweater-weather",
    ],
  },
  {
    id: "pl-rage-underground",
    name: "Rage & Underground Vault",
    description: "Dark pluggnb, subterranean beats, and hard-hitting 808s by Nettspend, esdeekid, Nine Vicious, 2hollis, and OsamaSon.",
    coverUrl: "/covers/nettspend-drankdrankdrank.jpg",
    trackIds: [
      "esdeekid-4-me",
      "esdeekid-phantom",
      "esdeekid-ritz",
      "nettspend-nothing-like-uuu",
      "nettspend-that-one-song",
      "nettspend-drankdrankdrank",
      "nine-vicious-demon-time",
      "2hollis-poster-boy",
      "osamason-cts-v",
      "arpit-maharani",
      "arpit-gulabo",
      "jaiyash-izaam",
    ],
  },
];

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
`;

function formatTrack(t) {
  return `  {
    id: ${JSON.stringify(t.id)},
    title: ${JSON.stringify(t.title)},
    artist: ${JSON.stringify(t.artist)},
    album: ${JSON.stringify(t.album)},
    genre: ${JSON.stringify(t.genre)},
    year: ${t.year},
    duration: ${t.duration},
    coverUrl: ${JSON.stringify(t.coverUrl)},
    audioUrl: ${JSON.stringify(t.audioUrl)},
    lyrics: \`${t.lyrics}\`
  }`;
}

const finalFileContent = `// Orbi Music Player - Curated Initial Music Database & Playlists
// Every track includes real local audio files, official release cover art, and synced LRC lyrics

export const INITIAL_TRACKS = [
  // ==========================================
  // 1. SEEDHE MAUT COMPLETE DISCOGRAPHY & FEATURES
  // ==========================================
${SEEDHE_MAUT_TRACKS.map(formatTrack).join(',\n')},

  // ==========================================
  ${otherTracksStr}
];

${PLAYLISTS_CODE}
`;

fs.writeFileSync(OUT_FILE, finalFileContent, 'utf-8');
console.log(`Generated initialLibrary.js with ${SEEDHE_MAUT_TRACKS.length} Seedhe Maut tracks + features + all albums!`);
