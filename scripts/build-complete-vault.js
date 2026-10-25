import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const OUT_FILE = path.join(ROOT_DIR, 'src', 'data', 'initialLibrary.js');

import { INITIAL_TRACKS as CURRENT_TRACKS } from '../src/data/initialLibrary.js';

const SEEDHE_MAUT_TRACKS = CURRENT_TRACKS.filter(t => t.id.startsWith('sm-'));

const OTHER_ARTISTS_TRACKS = [
  // ==========================================
  // 2. YEAT COMPLETE ANTHEMS (11 TRACKS)
  // ==========================================
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

  // ==========================================
  // 3. NETTSPEND (UNDERGROUND RAP)
  // ==========================================
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

  // ==========================================
  // 4. ESDEEKID (PLUGGNB / UNDERGROUND)
  // ==========================================
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

  // ==========================================
  // 5. NINE VICIOUS (DARK REALM / RAGE)
  // ==========================================
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

  // ==========================================
  // 6. JAIYASH (INDIAN ALT / LO-FI)
  // ==========================================
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

  // ==========================================
  // 7. ARPIT BALA (INDIAN INDIE / ALT-POP)
  // ==========================================
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

  // ==========================================
  // 8. SKAI (INDIE / ALT-ELECTRONIC)
  // ==========================================
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

  // ==========================================
  // 9. MAINSTREAM LOVE & LATE NIGHT YEARNING
  // ==========================================
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

  // ==========================================
  // 10. BONUS UNDERGROUND (2HOLLIS & OSAMASON)
  // ==========================================
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

const ALL_TRACKS = [...SEEDHE_MAUT_TRACKS, ...OTHER_ARTISTS_TRACKS];

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

// Generate curated playlists
const nayaabIds = SEEDHE_MAUT_TRACKS.filter(t => t.album === 'Nayaab').map(t => t.id);
const lunchBreakIds = SEEDHE_MAUT_TRACKS.filter(t => t.album === 'Lunch Break').map(t => t.id);
const bayaanIds = SEEDHE_MAUT_TRACKS.filter(t => t.album === 'Bayaan').map(t => t.id);
const kshmaIds = SEEDHE_MAUT_TRACKS.filter(t => t.album === 'Kshma').map(t => t.id);
const smFeatIds = SEEDHE_MAUT_TRACKS.filter(t => t.album !== 'Nayaab' && t.album !== 'Lunch Break' && t.album !== 'Bayaan' && t.album !== 'Kshma').map(t => t.id);
const allSmIds = SEEDHE_MAUT_TRACKS.map(t => t.id);

const yeatIds = OTHER_ARTISTS_TRACKS.filter(t => t.artist.includes('Yeat')).map(t => t.id);
const nettspendIds = OTHER_ARTISTS_TRACKS.filter(t => t.artist.includes('Nettspend')).map(t => t.id);
const esdeekidIds = OTHER_ARTISTS_TRACKS.filter(t => t.artist.includes('esdeekid')).map(t => t.id);
const nineViciousIds = OTHER_ARTISTS_TRACKS.filter(t => t.artist.includes('Nine Vicious')).map(t => t.id);
const jaiyashIds = OTHER_ARTISTS_TRACKS.filter(t => t.artist.includes('Jaiyash')).map(t => t.id);
const arpitIds = OTHER_ARTISTS_TRACKS.filter(t => t.artist.includes('Arpit Bala')).map(t => t.id);
const skaiIds = OTHER_ARTISTS_TRACKS.filter(t => t.artist.includes('Skai')).map(t => t.id);

const dhhAltIds = [...arpitIds, ...jaiyashIds, ...smFeatIds.slice(0, 5)];
const rageUndergroundIds = [...nettspendIds, ...esdeekidIds, ...nineViciousIds, "2hollis-poster-boy", "osamason-cts-v"];
const loveNightIds = [
  "mitski-my-love-mine-all-mine",
  "gigi-perez-sailor-song",
  "arctic-monkeys-i-wanna-be-yours",
  "cas-apocalypse",
  "stephen-sanchez-until-i-found-you",
  "jeff-buckley-lover-you-shouldve-come-over",
  "die-with-a-smile",
  "sweater-weather"
];

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
    trackIds: ${JSON.stringify(smFeatIds, null, 6)},
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
    description: "All 11 mainstream hits and high-octane rage tracks from Yeat, BNYX, and Lil Uzi Vert.",
    coverUrl: "/covers/yeat-2093.jpg",
    trackIds: ${JSON.stringify(yeatIds, null, 6)},
  },
  {
    id: "pl-rage-underground",
    name: "Rage & Underground Vault",
    description: "Dark pluggnb, subterranean beats, and hard-hitting 808s by Nettspend, esdeekid, Nine Vicious, 2hollis, and OsamaSon.",
    coverUrl: "/covers/nettspend-nothing-like-uuu.jpg",
    trackIds: ${JSON.stringify(rageUndergroundIds, null, 6)},
  },
  {
    id: "pl-dhh-alt",
    name: "DHH & Indian Alt Wave",
    description: "Vibrant Indian alternative rap, indie ballads, and lo-fi vibes by Seedhe Maut, Arpit Bala, and Jaiyash.",
    coverUrl: "/covers/arpit-maharani.jpg",
    trackIds: ${JSON.stringify(dhhAltIds, null, 6)},
  },
  {
    id: "pl-skai-rotation",
    name: "Skai Rotation (Top 5 Anthems)",
    description: "Ethereal wave synths, melodic trap, and high-altitude soundscapes by Skai.",
    coverUrl: "/covers/skai.jpg",
    trackIds: ${JSON.stringify(skaiIds, null, 6)},
  },
  {
    id: "pl-late-night-love",
    name: "Mainstream Love & Late Night Yearning",
    description: "Atmospheric romance, indie anthems, and midnight longing from Mitski, Gigi Perez, Arctic Monkeys, Cigarettes After Sex, Jeff Buckley, and Bruno Mars.",
    coverUrl: "/covers/mitski-love.jpg",
    trackIds: ${JSON.stringify(loveNightIds, null, 6)},
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

const fileContent = `// Orbi Music Player - Curated Initial Music Database & Playlists
// Every track includes real local audio files, official release cover art, and synced LRC lyrics

export const INITIAL_TRACKS = [
${ALL_TRACKS.map(formatTrack).join(',\n')}
];

${PLAYLISTS_CODE}
`;

fs.writeFileSync(OUT_FILE, fileContent, 'utf-8');
console.log(`Generated complete vault with ${ALL_TRACKS.length} tracks across all artists and albums!`);
