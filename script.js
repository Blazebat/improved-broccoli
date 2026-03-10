let audioCtx, analyser, source;
const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");
const title = document.getElementById("title");
const volume = document.getElementById("volume");
const canvas = document.getElementById("eq");
const ctx = canvas.getContext("2d");
const onAirBox = document.getElementById("onAirBox");

const playlist = [
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
   { title: "Forevermore", src: "https://dn720305.ca.archive.org/0/items/opm-wedding-songs-vol.-2-album/08%20Forevermore.mp3" },
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
  { title: "Patuloy Ang Pangarap - Angeline Quinto", src: "https://archive.org/details/3rsradio/5.+LOVE+SONGS+ENGLISH+-+TAGALOG%EF%BC%88121songs%EF%BC%89/Patuloy+Ang+Pangarap+-+Angeline+Quinto+(Music+Video).mp3" },
  { title: "Gusto Ko Nang Bumitaw - from The Broken Marriage Vow", src: "https://archive.org/details/3rsradio/31_Gusto+Ko+Nang+Bumitaw+-+from+The+Broken+Marriage+Vow.mp3" },
  { title: "Maybe This Time", src: "https://archive.org/details/3rsradio/42_Maybe+This+Time+-+From+Maybe+This+Time.mp3" },
  { title: "Kapag Ako Ay Nagmahal - From Write About Love", src: "https://archive.org/details/3rsradio/5.+LOVE+SONGS+ENGLISH+-+TAGALOG%EF%BC%88121songs%EF%BC%89/19_Kapag+Ako+Ay+Nagmahal+-+From+Write+About+Love.mp3" },
  { title: "One Last Song", src: "https://archive.org/details/3rsradio/5.+LOVE+SONGS+ENGLISH+-+TAGALOG%EF%BC%88121songs%EF%BC%89/ENGLISH+LOVESONG+%EF%BC%8820songs%EF%BC%89/03_One+Last+Song.mp3" },
  { title: "Like a Rose", src: "https://archive.org/details/3rsradio/5.+LOVE+SONGS+ENGLISH+-+TAGALOG%EF%BC%88121songs%EF%BC%89/ENGLISH+LOVESONG+%EF%BC%8820songs%EF%BC%89/01_Like+a+Rose.mp3" },
  { title: "Kung Pwede Lang Sana - Bugoy Drilon", src: "https://archive.org/details/3rsradio/5.+LOVE+SONGS+ENGLISH+-+TAGALOG%EF%BC%88121songs%EF%BC%89/Bugoy+Drilon+-+Kung+Pwede+Lang+Sana+(Audio)+++Paano+Na+Kaya.mp3" },
  { title: "Exchange of Hearts - David Slater", src: "https://archive.org/details/3rsradio/5.+LOVE+SONGS+ENGLISH+-+TAGALOG%EF%BC%88121songs%EF%BC%89/ENGLISH+LOVESONG+%EF%BC%8820songs%EF%BC%89/David++Slater+-+Exchange+of+Hearts+(+Lyrics+).mp3" },
  { title: "King And Queen of Heart - David Pomeranz", src: "https://archive.org/details/3rsradio/5.+LOVE+SONGS+ENGLISH+-+TAGALOG%EF%BC%88121songs%EF%BC%89/ENGLISH+LOVESONG+%EF%BC%8820songs%EF%BC%89/David+Pomeranz+-+King+And+Queen+Of+Heart+(Lyrics).mp3" },
  { title: "If I Ever Fall In Love Again - Kenny Rogers & Anne Murray", src: "https://archive.org/details/3rsradio/5.+LOVE+SONGS+ENGLISH+-+TAGALOG%EF%BC%88121songs%EF%BC%89/ENGLISH+LOVESONG+%EF%BC%8820songs%EF%BC%89/IF+I+EVER+FALL+IN+LOVE+AGAIN+-+Kenny+Rogers+duet+Anne+Murray+(Lyrics+Video).mp3" },
  { title: "My Valentine - Jim Brickman, Martina McBride", src: "https://archive.org/details/3rsradio/5.+LOVE+SONGS+ENGLISH+-+TAGALOG%EF%BC%88121songs%EF%BC%89/ENGLISH+LOVESONG+%EF%BC%8820songs%EF%BC%89/Jim+Brickman%2C+Martina+McBride+-+My+Valentine+(Lyrics).mp3" },
  { title: "Borrowed Time - Cueshe", src: "https://archive.org/details/3rsradio/5.+LOVE+SONGS+ENGLISH+-+TAGALOG%EF%BC%88121songs%EF%BC%89/ENGLISH+LOVESONG+%EF%BC%8820songs%EF%BC%89/Cueshe+-+Borrowed+Time+(Lyrics).mp3" },
  { title: "Sorry - Cuesh", src: "https://archive.org/details/3rsradio/5.+LOVE+SONGS+ENGLISH+-+TAGALOG%EF%BC%88121songs%EF%BC%89/ENGLISH+LOVESONG+%EF%BC%8820songs%EF%BC%89/Cuesh%C3%A9+-+Sorry+Lyrics+%F0%9F%8E%B6.mp3" },
  { title: "Swear It Again - Westlife", src: "https://archive.org/details/3rsradio/5.+LOVE+SONGS+ENGLISH+-+TAGALOG%EF%BC%88121songs%EF%BC%89/ENGLISH+LOVESONG+%EF%BC%8820songs%EF%BC%89/Swear+It+Again+-+Westlife+(Lyrics).mp3" },
  { title: "Take Me to Your Heart - Michael Learns to Rock", src: "https://archive.org/details/3rsradio/5.+LOVE+SONGS+ENGLISH+-+TAGALOG%EF%BC%88121songs%EF%BC%89/ENGLISH+LOVESONG+%EF%BC%8820songs%EF%BC%89/Take+Me+to+Your+Heart+-+Michael+Learns+To+Rock+(+Video+Lyrics+Official).mp3" },
  { title: "You and I - Kenny Rogers", src: "https://archive.org/details/3rsradio/5.+LOVE+SONGS+ENGLISH+-+TAGALOG%EF%BC%88121songs%EF%BC%89/ENGLISH+LOVESONG+%EF%BC%8820songs%EF%BC%89/YOU+AND+I+-++KENNY+ROGERS+lyrics+(HD).mp3" },
  { title: "Everything I Own - Michael Pangilinan", src: "https://archive.org/details/3rsradio/5.+LOVE+SONGS+ENGLISH+-+TAGALOG%EF%BC%88121songs%EF%BC%89/Everything+I+Own+-+Michael+Pangilinan+(Lyrics).mp3" },
  { title: "Gusto Kita - Angeline Quinto", src: "https://archive.org/details/3rsradio/5.+LOVE+SONGS+ENGLISH+-+TAGALOG%EF%BC%88121songs%EF%BC%89/Gusto+Kita+-+Angeline+Quinto+(Lyrics).mp3" },
  { title: "Hanggang Kailan - Michael Pangilinan", src: "https://archive.org/details/3rsradio/5.+LOVE+SONGS+ENGLISH+-+TAGALOG%EF%BC%88121songs%EF%BC%89/Hanggang+Kailan+-+Michael+Pangilinan+(Lyrics).mp3" },
  { title: "Hindi Na Bale - Bugoy Drilon", src: "https://archive.org/details/3rsradio/5.+LOVE+SONGS+ENGLISH+-+TAGALOG%EF%BC%88121songs%EF%BC%89/Hindi+Na+Bale+-+Bugoy+Drilon+(Lyrics).mp3" },
  { title: "Huwag Ka Lang Mawawala - Bugoy Drilon x Liezel Garcia", src: "https://archive.org/details/3rsradio/5.+LOVE+SONGS+ENGLISH+-+TAGALOG%EF%BC%88121songs%EF%BC%89/Huwag+Ka+Lang+Mawawala+-+Bugoy+Drilon+x+Liezel+Garcia+(Lyrics).mp3" },
  { title: "Ikaw At Ako - Moira Dela Torre x Jason Marvin", src: "https://archive.org/details/3rsradio/5.+LOVE+SONGS+ENGLISH+-+TAGALOG%EF%BC%88121songs%EF%BC%89/Ikaw+At+Ako+-+Moira+Dela+Torre+x+Jason+Marvin+(Lyrics)++Hello%2C+Love%2C+Goodbye+OST.mp3" },
  { title: "Ikaw Lang Ang Mamahalin - Erik Santos (cover)", src: "https://archive.org/details/3rsradio/5.+LOVE+SONGS+ENGLISH+-+TAGALOG%EF%BC%88121songs%EF%BC%89/Ikaw+Lang+Ang+Mamahalin+(cover)+by+Erik+Santos.mp3" },
  { title: "Ikaw Pa Rin - Moira Dela Torre ft. Erik Santos", src: "https://archive.org/details/3rsradio/5.+LOVE+SONGS+ENGLISH+-+TAGALOG%EF%BC%88121songs%EF%BC%89/Ikaw+Pa+Rin+-+Moira+Dela+Torre+ft.+Erik+Santos+(Lyrics).mp3" },
  { title: "Kung Sakali - Michael Pangilinan", src: "https://archive.org/details/3rsradio/5.+LOVE+SONGS+ENGLISH+-+TAGALOG%EF%BC%88121songs%EF%BC%89/Kung+Sakali+-+Michael+Pangilinan+(Lyrics).mp3" },
  { title: "Paano Na Kaya - Bugoy Drilon", src: "https://archive.org/details/3rsradio/5.+LOVE+SONGS+ENGLISH+-+TAGALOG%EF%BC%88121songs%EF%BC%89/Paano+Na+Kaya+-+Bugoy+Drilon++(Lyrics).mp3" },
  { title: "Ikaw Lamang", src: "https://dn710702.ca.archive.org/0/items/OPMWeddingSongsVol1/06.%20Ikaw%20Lamang.mp3" }
];

let lastIndex = -1;
let index = Math.floor(Math.random() * playlist.length);

function loadSong(i) {
    audio.src = playlist[i].src;
    title.textContent = "NOW PLAYING: " + playlist[i].title;
}

function nextSong() {
    let newIndex;
    do { newIndex = Math.floor(Math.random() * playlist.length); } while (newIndex === lastIndex);
    lastIndex = newIndex;
    loadSong(newIndex);
    audio.play();
}

audio.addEventListener("ended", nextSong);
audio.onerror = () => nextSong();

playBtn.onclick = async () => {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        source = audioCtx.createMediaElementSource(audio);
        analyser = audioCtx.createAnalyser();
        source.connect(analyser);
        analyser.connect(audioCtx.destination);
        analyser.fftSize = 64;
        drawEQ();
    }
    if (audioCtx.state === "suspended") await audioCtx.resume();
    audio.play();
    onAirBox.classList.add("active");
    onAirBox.textContent = "ON AIR";
};

pauseBtn.onclick = () => {
    audio.pause();
    onAirBox.classList.remove("active");
    onAirBox.textContent = "OFF AIR";
};

volume.oninput = () => { audio.volume = volume.value; };

function drawEQ() {
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    function draw() {
        requestAnimationFrame(draw);
        analyser.getByteFrequencyData(dataArray);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const barWidth = canvas.width / bufferLength;
        for (let i = 0; i < bufferLength; i++) {
            const height = (dataArray[i] / 255) * canvas.height;
            ctx.fillStyle = `hsl(${i * 12}, 100%, 50%)`;
            ctx.fillRect(i * barWidth, canvas.height - height, barWidth - 1, height);
        }
    }
    draw();
}

// Request Modal Logic
const modal = document.getElementById("requestModal");
const requestBtn = document.getElementById("requestBtn");
const closeBtn = document.querySelector(".close-btn");
const sendBtn = document.getElementById("sendRequest");
const requestInput = document.getElementById("requestInput");

requestBtn.onclick = () => { modal.style.display = "block"; };
closeBtn.onclick = () => { modal.style.display = "none"; };
window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; };

sendBtn.onclick = () => {
    const song = requestInput.value;
    if (song.trim()) {
        const msg = encodeURIComponent(`Request for Rage Radio: ${song}`);
        window.open(`https://m.me/ragemusicph?text=${msg}`, '_blank');
        modal.style.display = "none";
        requestInput.value = "";
    }
};

loadSong(index);
