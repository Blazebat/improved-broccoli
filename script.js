let audioCtx, analyser, source;
let currentAudio = new Audio();
let nextAudio = new Audio();
let fadeDuration = 10; 
let songsPlayedCount = 0;
let lastIndex = -1;

const playlist = [
{ title: "Chinita Girl - Lil Vinceyy,Guel", src: "https://dn711104.ca.archive.org/0/items/3rsradio/36_Chinita%20Girl.mp3" },
 { title: "Salamat - Yeng Constantino", src: "https://dn711104.ca.archive.org/0/items/3rsradio/37_Salamat.mp3" },
 { title: "Let Me Be the One - Julie Anne San Jose and Jimmy Bondoc", src: "https://dn711104.ca.archive.org/0/items/3rsradio/39_Let%20Me%20Be%20the%20One.mp3" },
 { title: "Buko - Jireh Lim", src: "https://dn711104.ca.archive.org/0/items/3rsradio/40_Buko.mp3" },
 { title: "Paraluman ft. Kean Cipriano - Tabi", src: "https://ia801702.us.archive.org/34/items/ParalumanFt.KeanCipriano-Tabi/Tabi.mp3" },
 { title: "Ikaw Ang Aking Pangarap", src: "https://ia600602.us.archive.org/27/items/opm-wedding-songs-vol.-2-album/01%20Ikaw%20Ang%20Aking%20Pangarap.mp3" },
  { title: "Now That I Have You", src: "https://dn720305.ca.archive.org/0/items/opm-wedding-songs-vol.-2-album/03%20Now%20That%20I%20Have%20You.mp3" },
  { title: "Good Bye, Air Supply", src: "https://dn710007.ca.archive.org/0/items/good-bye-air-supply/Good%20Bye%20-%20Air%20Supply.mp3" },
  { title: "Nothing's Gonna Change My Love For You Air Supply", src: "https://dn721905.ca.archive.org/0/items/nothings-gonna-change-my-love-for-you-air-supply/Nothing%27s%20Gonna%20Change%20My%20Love%20For%20You%20-%20Air%20Supply.mp3" },
  { title: "Bureau of Broken Sounds - Air supply", src: "https://dn710002.ca.archive.org/0/items/jamendo-100243/01.mp3" },
  { title: "Hearts In Motion by Air Supply", src: "https://dn720700.ca.archive.org/0/items/air-supply-hearts-in-motion/02%20Lonely%20Is%20The%20Night.mp3" },
  { title: "Beautiful Girl", src: "https://dn721806.ca.archive.org/0/items/jose-mari-chan-with-his-diamond-hits-1996-320kbps/Jose%20Mari%20Chan%20With%20His%20Diamond%20Hits%20%281996%29%20%28320Kbps%29%2F01.%20Jose%20Mari%20Chan%20-%20Beautiful%20Girl.mp3" },
  { title: "Deep In My Heart", src: "https://dn721806.ca.archive.org/0/items/jose-mari-chan-with-his-diamond-hits-1996-320kbps/Jose%20Mari%20Chan%20With%20His%20Diamond%20Hits%20%281996%29%20%28320Kbps%29%2F02.%20Jose%20Mari%20Chan%20-%20Deep%20In%20My%20Heart.mp3" },
  { title: "Please Be Careful With My Heart", src: "https://dn721806.ca.archive.org/0/items/jose-mari-chan-with-his-diamond-hits-1996-320kbps/Jose%20Mari%20Chan%20With%20His%20Diamond%20Hits%20%281996%29%20%28320Kbps%29%2F03.%20Jose%20Mari%20Chan%20-%20Please%20Be%20Careful%20With%20My%20Heart%20%28Duet%20With%20Regine%20Velasquez%29.mp3" },
  { title: "Tell Me Your Name", src: "https://dn721806.ca.archive.org/0/items/jose-mari-chan-with-his-diamond-hits-1996-320kbps/Jose%20Mari%20Chan%20With%20His%20Diamond%20Hits%20%281996%29%20%28320Kbps%29%2F04.%20Jose%20Mari%20Chan%20-%20Tell%20Me%20Your%20Name.mp3" },
  { title: "Can We Just Stop And Talk Awhile", src: "https://dn721806.ca.archive.org/0/items/jose-mari-chan-with-his-diamond-hits-1996-320kbps/Jose%20Mari%20Chan%20With%20His%20Diamond%20Hits%20%281996%29%20%28320Kbps%29%2F05.%20Jose%20Mari%20Chan%20-%20Can%20We%20Just%20Stop%20And%20Talk%20Awhile.mp3" },
  { title: "My Girl, My Woman, My Friend", src: "https://dn721806.ca.archive.org/0/items/jose-mari-chan-with-his-diamond-hits-1996-320kbps/Jose%20Mari%20Chan%20With%20His%20Diamond%20Hits%20%281996%29%20%28320Kbps%29%2F06.%20Jose%20Mari%20Chan%20-%20My%20Girl%2C%20My%20Woman%2C%20My%20Friend%20%28Duet%20With%20Janet%20Basco%29.mp3" },
  { title: "Refrain", src: "https://dn721806.ca.archive.org/0/items/jose-mari-chan-with-his-diamond-hits-1996-320kbps/Jose%20Mari%20Chan%20With%20His%20Diamond%20Hits%20%281996%29%20%28320Kbps%29%2F07.%20Jose%20Mari%20Chan%20-%20Refrain.mp3" },
  { title: "After Glow", src: "https://dn721806.ca.archive.org/0/items/jose-mari-chan-with-his-diamond-hits-1996-320kbps/Jose%20Mari%20Chan%20With%20His%20Diamond%20Hits%20%281996%29%20%28320Kbps%29%2F08.%20Jose%20Mari%20Chan%20-%20After%20Glow.mp3" },
  { title: "Can't We Start Over Again", src: "https://ia800500.us.archive.org/6/items/jose-mari-chan-with-his-diamond-hits-1996-320kbps/Jose%20Mari%20Chan%20With%20His%20Diamond%20Hits%20%281996%29%20%28320Kbps%29%2F09.%20Jose%20Mari%20Chan%20-%20Can%27t%20We%20Start%20Over%20Again.mp3" },
   { title: "Forevermore - Juris", src: "https://dn711104.ca.archive.org/0/items/3rsradio/22_Forevermore.mp3" },
  { title: "Sana'y Wala Nang Wakas", src: "https://dn720305.ca.archive.org/0/items/opm-wedding-songs-vol.-2-album/07%20Sana%27y%20Wala%20Nang%20Wakas.mp3" },
  { title: "Magpakailanpaman", src: "https://dn720305.ca.archive.org/0/items/opm-wedding-songs-vol.-2-album/06%20Magpakailanpaman.mp3" },
  { title: "Pangako Sa 'Yo", src: "https://dn720305.ca.archive.org/0/items/opm-wedding-songs-vol.-2-album/05%20Pangako%20Sa%20%27Yo.mp3" },
  { title: "Beginning Today", src: "https://dn720305.ca.archive.org/0/items/opm-wedding-songs-vol.-2-album/04%20Beginning%20Today.mp3" },
  { title: "Gaano Ko Ikaw Kamahal", src: "https://dn720305.ca.archive.org/0/items/opm-wedding-songs-vol.-2-album/02%20Gaano%20KO%20Ikaw%20Kamahal.mp3" },
  { title: "Ang Lahat Ng Ito'y Para Sa 'Yo", src: "https://ia800602.us.archive.org/27/items/opm-wedding-songs-vol.-2-album/09%20Ang%20Lahat%20Ng%20Ito%27y%20Para%20Sa%20%27Yo.mp3" },
  { title: "Hanggang Sa Dulo Ng Walang Hanggan", src: "https://dn720305.ca.archive.org/0/items/opm-wedding-songs-vol.-2-album/10%20Hanggang%20Sa%20Dulo%20Ng%20Walang%20Hanggan.mp3" },
  { title: "Araw-Gabi", src: "https://dn720305.ca.archive.org/0/items/opm-wedding-songs-vol.-2-album/11%20Araw-Gabi.mp3" },
  { title: "Paano Kita Mapasasalamatan", src: "https://ia600602.us.archive.org/27/items/opm-wedding-songs-vol.-2-album/12%20Paano%20Kita%20Mapasasalamatan.mp3" },
  { title: "Ikaw", src: "https://ia801300.us.archive.org/20/items/OPMWeddingSongsVol1/01.%20Ikaw.mp3?cnt=0" },
  { title: "Hanggang", src: "https://dn710702.ca.archive.org/0/items/OPMWeddingSongsVol1/02.%20Hanggang.mp3" },
  { title: "Kahit Kailan", src: "https://dn710702.ca.archive.org/0/items/OPMWeddingSongsVol1/03.%20Kahit%20Kailan.mp3" },
  { title: "Magmula Ngayon", src: "https://dn710702.ca.archive.org/0/items/OPMWeddingSongsVol1/04.%20Magmula%20Ngayon.mp3" },
  { title: "Forever's Not Enough", src: "https://ia601300.us.archive.org/20/items/OPMWeddingSongsVol1/05.%20Forever%27s%20Not%20Enough.mp3" },
   { title: "Hanggang Kailan", src: "https://dn721609.ca.archive.org/0/items/michael-pangilinan-michael-2016/02%20-%20Michael%20Pangilinan%20-%20Hanggang%20Kailan-0bc81f46.mp3" },
  { title: "Bakit Ba Ikaw", src: "https://dn721609.ca.archive.org/0/items/michael-pangilinan-michael-2016/09%20-%20Michael%20Pangilinan%20-%20Bakit%20Ba%20Ikaw-99a61f78.mp3" },
  { title: "Kung Sakali", src: "https://dn721609.ca.archive.org/0/items/michael-pangilinan-michael-2016/10%20-%20Michael%20Pangilinan%20-%20Kung%20Sakali-ad2bd3bb.mp3" },
  { title: "Musika - Dionela", src: "https://dn711104.ca.archive.org/0/items/3rsradio/02_Musika.mp3" },
  { title: "panaginip - iluna", src: "https://dn711104.ca.archive.org/0/items/3rsradio/03_panaginip.mp3" },
  { title: "A Love to Last a Lifetime - Juris", src: "https://dn711104.ca.archive.org/0/items/3rsradio/04_A%20Love%20to%20Last%20a%20Lifetime.mp3" },
  { title: "Pusong Bato - Jovit Baldomino", src: "https://dn711104.ca.archive.org/0/items/3rsradio/05_Pusong%20Bato.mp3" },
  { title: "One Last Song", src: "https://archive.org/details/3rsradio/5.+LOVE+SONGS+ENGLISH+-+TAGALOG%EF%BC%88121songs%EF%BC%89/ENGLISH+LOVESONG+%EF%BC%8820songs%EF%BC%89/03_One+Last+Song.mp3" },
  { title: "On the Wings of Love - James Reid,Nadine Lustre", src: "https://dn711104.ca.archive.org/0/items/3rsradio/07_On%20the%20Wings%20of%20Love.mp3" },
  { title: " Dahil Sa'Yo - Inigo Pascual", src: "https://dn711104.ca.archive.org/0/items/3rsradio/08_Dahil%20Sa%27Yo.mp3" },
  { title: "Dying Inside To Hold You - From ' All Of You' Official Soundtrack - Darren Espanto", src: "https://ia803107.us.archive.org/32/items/3rsradio/12_Dying%20Inside%20To%20Hold%20You%20-%20From%20%20All%20Of%20You%20Official%20Soundtrack.mp3" },
  { title: "On the Wings of Love - Kyla", src: "https://dn711104.ca.archive.org/0/items/3rsradio/13_On%20the%20Wings%20of%20Love.mp3" },
  { title: "Starting over Again - Toni Gonzaga", src: "https://dn711104.ca.archive.org/0/items/3rsradio/14_Starting%20over%20Again.mp3" },
  { title: "Kunin Mo Na Ang Lahat Sa Akin - Angeline Quinto", src: "https://dn711104.ca.archive.org/0/items/3rsradio/17_Kunin%20Mo%20Na%20Ang%20Lahat%20Sa%20Akin.mp3" },
  { title: "To Love Again - Daryl Ong", src: "https://dn711104.ca.archive.org/0/items/3rsradio/18_To%20Love%20Again.mp3" },
  { title: "Nothing's Gonna Stop Us Now - From 'Crazy Beautiful You' - Morissette,Daniel Padilla", src: "https://dn711104.ca.archive.org/0/items/3rsradio/21_Nothing%27s%20Gonna%20Stop%20Us%20Now%20-%20From%20Crazy%20Beautiful%20You.mp3" },
  { title: "Nahuhulog Na Sa'yo - Noah Alejandre", src: "https://ia903107.us.archive.org/32/items/3rsradio/01_Nahuhulog%20Na%20Sa%27yo.mp3" },
  { title: "Till I Met You - Angeline Quinto", src: "https://dn711104.ca.archive.org/0/items/3rsradio/26_Till%20I%20Met%20You.mp3" },
  { title: "Dahil Ikaw - True Faith", src: "https://dn711104.ca.archive.org/0/items/3rsradio/29_Dahil%20Ikaw.mp3" },
  { title: "Ikaw - Yeng Constantino", src: "https://dn711104.ca.archive.org/0/items/3rsradio/30_Ikaw.mp3" },
  { title: "Gusto Ko Nang Bumitaw - from 'The Broken Marriage Vow' - Morissette", src: "https://dn711104.ca.archive.org/0/items/3rsradio/31_Gusto%20Ko%20Nang%20Bumitaw%20-%20from%20The%20Broken%20Marriage%20Vow.mp3" },
  { title: "Ikot - Sarah Geronimo", src: "https://dn711104.ca.archive.org/0/items/3rsradio/32_Ikot-Ikot.mp3" },
  { title: "Mahal Ko O Mahal Ako - KZ Tandingan", src: "https://ia803107.us.archive.org/32/items/3rsradio/33_Mahal%20Ko%20O%20Mahal%20Ako.mp3" },
  { title: "Isang Araw - Kaye Cal", src: "https://dn711104.ca.archive.org/0/items/3rsradio/35_Isang%20Araw.mp3" },
  { title: "Ikaw Lamang", src: "https://dn710702.ca.archive.org/0/items/OPMWeddingSongsVol1/06.%20Ikaw%20Lamang.mp3" }
];

// --- CORE ENGINE ---
function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioCtx.createAnalyser();
        analyser.fftSize = 64;
        
        // Connect the current player to the visualizer
        source = audioCtx.createMediaElementSource(currentAudio);
        source.connect(analyser);
        analyser.connect(audioCtx.destination);
        drawEQ();
    }
}

function drawEQ() {
    const canvas = document.getElementById("eq");
    const ctx = canvas.getContext("2d");
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    function draw() {
        requestAnimationFrame(draw);
        analyser.getByteFrequencyData(dataArray);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < bufferLength; i++) {
            const h = (dataArray[i] / 255) * canvas.height;
            ctx.fillStyle = `hsl(${i * 12}, 100%, 50%)`;
            ctx.fillRect(i * (canvas.width / bufferLength), canvas.height - h, 3, h);
        }
    }
    draw();
}

// --- DJ VOICE & CROSSFADE ---
function radioMessage() {
    const msgs = ["You're listening to Rage Radio.", "Keep it locked to the best OPM hits.", "Rage Radio, feel the energy."];
    const msg = new SpeechSynthesisUtterance(msgs[Math.floor(Math.random() * msgs.length)]);
    speechSynthesis.speak(msg);
}

function fade(audioEl, targetVol, duration) {
    let steps = 50;
    let increment = (targetVol - audioEl.volume) / steps;
    let interval = (duration * 1000) / steps;
    let vol = audioEl.volume;
    let timer = setInterval(() => {
        vol += increment;
        audioEl.volume = Math.max(0, Math.min(1, vol));
        if ((increment > 0 && vol >= targetVol) || (increment < 0 && vol <= targetVol)) clearInterval(timer);
    }, interval);
}

function nextSong() {
    songsPlayedCount++;
    let newIndex;
    do { newIndex = Math.floor(Math.random() * playlist.length); } while (newIndex === lastIndex);
    lastIndex = newIndex;

    nextAudio.src = playlist[newIndex].src;
    nextAudio.volume = 0;
    nextAudio.play().catch(e => console.log("Buffering..."));

    fade(currentAudio, 0, fadeDuration);
    fade(nextAudio, 1, fadeDuration);

    setTimeout(() => {
        currentAudio.pause();
        currentAudio.src = nextAudio.src;
        currentAudio.volume = 1;
        currentAudio.play();
        document.getElementById("title").textContent = "NOW PLAYING: " + playlist[newIndex].title;
    }, fadeDuration * 1000);

    if (songsPlayedCount >= 2) {
        songsPlayedCount = 0;
        setTimeout(radioMessage, (fadeDuration * 1000) + 2000);
    }
}

// --- CONTROLS ---
currentAudio.addEventListener("ended", nextSong);

document.getElementById("playBtn").onclick = async () => {
    initAudio();
    if (audioCtx.state === 'suspended') await audioCtx.resume();
    
    if (currentAudio.paused) {
        let startIdx = Math.floor(Math.random() * playlist.length);
        currentAudio.src = playlist[startIdx].src;
        document.getElementById("title").textContent = "NOW PLAYING: " + playlist[startIdx].title;
        currentAudio.play();
        document.getElementById("onAirBox").classList.add("active");
        document.getElementById("onAirBox").textContent = "ON AIR";
    }
};

document.getElementById("pauseBtn").onclick = () => { 
    currentAudio.pause(); 
    document.getElementById("onAirBox").classList.remove("active"); 
    document.getElementById("onAirBox").textContent = "OFF AIR"; 
};

// --- REQUESTS ---
document.getElementById("requestBtn").onclick = () => { document.getElementById("requestModal").style.display = "block"; };
document.querySelector(".close-btn").onclick = () => { document.getElementById("requestModal").style.display = "none"; };
document.getElementById("sendRequest").onclick = () => {
    const song = document.getElementById("requestInput").value;
    if (song.trim()) {
        window.open(`https://m.me/ragemusicph?text=${encodeURIComponent('Request: ' + song)}`, '_blank');
        document.getElementById("requestModal").style.display = "none";
    }
};
