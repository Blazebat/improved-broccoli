const stations = [
    { name: "Clubmix", url: "https://stream.zeno.fm/d42hdvx96zhvv", freq: "105.9" },
    { name: "Emotions", url: "https://stream.zeno.fm/03v7z8edgphvv", freq: "Online" },
    { name: "Rage Music Philippines", url: "https://stream.zeno.fm/q1n2wyfs7x8uv", freq: "N/A" },
    { name: "Scream Radio", url: "https://stream.zeno.fm/c3z135w8zxhvv", freq: "N/A" },
    { name: "Vibe Radio", url: "https://stream.zeno.fm/4k8qf4raqy8uv", freq: "N/A" },
    { name: "Hot Hiphop N RnB", url: "https://stream.zeno.fm/qrhuqbnm208uv", freq: "N/A" },
    { name: "iMix Radio", url: "https://stream.zeno.fm/iiigesdzikuvv", freq: "Digital" },
    { name: "Spirit FM Batangas", url: "https://stream.zeno.fm/zb2c835zahruv", freq: "91.9" },
    { name: "Brigada News FM Batangas", url: "https://batangasstream.brigadanews.ph/", freq: "N/A" },
    { name: "Radyo Natin Lemery", url: "https://xcite.radyonatinfm.com:8020/lemery", freq: "N/A" },
    { name: "88.7 DCG FM", url: "https://stream.zeno.fm/7neg6f1hbm0uv", freq: "88.7" },
    { name: "My City Radio", url: "https://stream.zeno.fm/4qmadmb5feruv", freq: "Online" },
    { name: "Radyo Natin Nationwide", url: "https://in-icecast.eradioportal.com:8443/radyo_natin", freq: "N/A" },
    { name: "Green Giant FM", url: "https://stream.greengiantfm.com/stream", freq: "N/A" },
    { name: "MOR Entertainment", url: "https://stream.zeno.fm/0ha8ftewqp8uv", freq: "N/A" },
    { name: "WXB 102", url: "https://edge.mixlr.com/channel/lldmm", freq: "N/A" },
    { name: "IDMZ Sayaw Pinoy", url: "https://cast3.asurahosting.com/proxy/idmzsayawpinoy/stream", freq: "N/A" },
    { name: "Myx Radio", url: "https://das-edge13-live365-dal02.cdnstream.com/a06369", freq: "N/A" },
    { name: "Republika ni Juan 87.5", url: "http://58.97.187.52:5001/fm1", freq: "87.5" },
    { name: "Radyo Katipunan", url: "https://stream.zeno.fm/dlej297l1gtvv", freq: "N/A" },
    { name: "Jam 88.3", url: "https://streaming.brol.tech/rtfmlounge", freq: "88.3" },
    { name: "Adventist World Radio (AWR 89.1)", url: "https://stream11.awr.live/listen/awrmanila/broadcast", freq: "89.1" },
    { name: "Magic 89.9", url: "https://stream.zeno.fm/hcbrvvfd938uv", freq: "89.9" },
    { name: "90.7 Love Radio", url: "https://azura.loveradio.com.ph/listen/love_radio_manila/radio.mp3", freq: "90.7" },
    { name: "91.5 Win Radio", url: "https://stream.zeno.fm/2ss1hgnu6hhvv", freq: "91.5" },
    { name: "FM Radio 92.3", url: "http://us1.amfmph.com:8872/stream?type=.aac", freq: "92.3" },
    { name: "Monster RX 93.1", url: "https://in-icecast.eradioportal.com:8443/monsterrrx", freq: "93.1" },
    { name: "Eagle FM 95.5", url: "http://n08.radiojar.com/yus0r2bghd3vv", freq: "95.5" },
    { name: "96.3 Easy Rock", url: "https://azura.easyrock.com.ph/listen/easy_rock_manila/radio.mp3", freq: "96.3" },
    { name: "Barangay LS 97.1", url: "https://gsattv.akamaized.net/live/media0/radiodwls/Fairplay/radiodwls.m3u8", freq: "97.1" },
    { name: "97.9 Home Radio", url: "https://hrmanila.radioca.st/stream", freq: "97.9" },
    { name: "98.7 DZFE", url: "http://ph-icecast-win.eradioportal.com:8000/febc_dzfe", freq: "98.7" },
    { name: "RJ 100.3", url: "http://111.125.87.226:8000/dzrjam", freq: "100.3" },
    { name: "101.1 Yes FM", url: "https://azura.yesfm.com.ph/listen/yes_fm_manila/radio.mp3", freq: "101.1" },
    { name: "MOR FM 101.9", url: "https://playerservices.streamtheworld.com/api/livestream-redirect/MORFM_S01AAC_SC.acc", freq: "101.9" },
    { name: "102.7 Star FM", url: "https://stream.zeno.fm/n51d54pctrquv", freq: "102.7" },
    { name: "Capital 104.3", url: "http://58.97.187.52:5007/fm2", freq: "104.3" },
    { name: "105.1 Brigada News FM", url: "https://makatistream.brigadanews.ph/", freq: "105.1" },
    { name: "106.7 Energy FM", url: "https://ph-icecast-win.eradioportal.com:8443/energyfm_manila", freq: "106.7" },
    { name: "Wish 107.5", url: "https://radio.wish1075.com/web/stream/wish.m3u8", freq: "107.5" },
    { name: "Bible Radio", url: "https://stream.radio.co/se9de95c10/low", freq: "N/A" },
    { name: "Super Radyo DZBB", url: "https://gsattv.akamaized.net/live/media0/radiodzbb/Fairplay/radiodzbb.m3u8", freq: "N/A" },
    { name: "DZMM Radyo Patrol 630 (International Feed)", url: "https://stream.zeno.fm/yaksrqvb35duv", freq: "N/A" },
    { name: "DZMM Radyo Patrol 630 (Local Feed)", url: "http://us1.amfmph.com:8852/stream", freq: "N/A" },
    { name: "DZRH", url: "https://dzrh-azura.mmg.com.ph/listen/dzrh_manila/radio.mp3", freq: "N/A" },
    { name: "702 DZAS", url: "http://sg-icecast.eradioportal.com:8000/febc_dzas", freq: "N/A" },
    { name: "Radyo Pilipinas - Radyo Publiko", url: "http://58.97.187.52:5001/rp1", freq: "N/A" },
    { name: "DWWW 774", url: "https://stream.zeno.fm/nt60rvqvpy5tv", freq: "N/A" },
    { name: "DZRJ Radyo Bandido", url: "http://111.125.87.226:8000/dzrjam", freq: "N/A" },
    { name: "Veritas 846", url: "http://icecast.eradioportal.com:8000/radyo-veritas-846", freq: "N/A" },
    { name: "DWIZ 882", url: "http://142.44.212.114:9079/stream", freq: "N/A" },
    { name: "Sports Radio", url: "https://ssl.radyoph.com:8000/rp2", freq: "N/A" },
    { name: "INC Radio", url: "https://stream-243529.castr.net/6842a712b68c56f675d988f1/live_b60a96e056fc11f084c05f5d0649296b/index.fmp4.m3u8", freq: "N/A" },
    { name: "Radyo Magasin", url: "http://58.97.187.52:5007/rp3", freq: "N/A" },
    { name: "DWXI 1314", url: "https://in-icecast.eradioportal.com:8443/dwxi-streaming", freq: "N/A" },
    { name: "ESPN Radio", url: "http://live.amperwave.net/direct/espn-network-48?source=v7player", freq: "N/A" },
    { name: "WZEB Power 101.7", url: "https://ice66.securenetsystems.net/WZEB", freq: "101.7" },
    { name: "WMGC-FM 105.1 The Bounce", url: "https://playerservices.streamtheworld.com/api/livestream-redirect/WMGCFMAAC.aac", freq: "105.1" },
    { name: "WQHT 97.1 Hot 97", url: "https://playerservices.streamtheworld.com/api/livestream-redirect/WQHTFMAAC.aac", freq: "97.1" },
    { name: "WYRB Power 106.3", url: "https://ais-sa8.cdnstream1.com/p0zbr98vu6z/ct0ziwywwym", freq: "106.3" },
    { name: "WWRX Jammin 107.7", url: "https://crystalout.surfernetwork.com:8001/WWRX_MP3", freq: "107.7" },
    { name: "W233BF Streetz 945", url: "https://us1.streamingpulse.com/ssl/7045", freq: "N/A" },
    { name: "96.7 KCAL Rocks", url: "https://playerservices.streamtheworld.com/api/livestream-redirect/KCALFMAAC.aac", freq: "96.7" },
    { name: "WUSL Power 99", url: "https://cloud.revma.ihrhls.com/zc2009?rj-org=n36b-e2&rj-ttl=5&rj-tok=AAABl_JPgewAZarEEPLHkZkMuQ", freq: "N/A" },
];

const audio = document.getElementById('audio');
const dialSfx = document.getElementById('dialSfx');
const stationSelect = document.getElementById('stationSelect');
const currentFreqDisplay = document.getElementById('currentFreq');
const titleDisplay = document.getElementById('title');
const onAirBox = document.getElementById('onAirBox');
const playBtn = document.getElementById('playBtn');

// Populate Tuner
stations.forEach((s, index) => {
    const opt = document.createElement('option');
    opt.value = index;
    opt.innerHTML = `${s.freq} MHz - ${s.name}`;
    stationSelect.appendChild(opt);
});

// Tuning Logic
stationSelect.addEventListener('change', () => {
    const station = stations[stationSelect.value];
    
    // Play Dial Sound
    dialSfx.currentTime = 0;
    dialSfx.play();
    
    // Update Display
    currentFreqDisplay.innerText = station.freq;
    titleDisplay.innerText = `TUNING: ${station.name}...`;
    onAirBox.classList.remove('active');
    onAirBox.innerText = "TUNING";

    // Small delay to simulate finding the signal
    setTimeout(() => {
        audio.src = station.url;
        audio.play();
    }, 500);
});

audio.onplaying = () => {
    onAirBox.classList.add('active');
    onAirBox.innerText = "ON AIR";
    titleDisplay.innerText = stations[stationSelect.value].name;
};

playBtn.onclick = () => audio.play();
document.getElementById('pauseBtn').onclick = () => {
    audio.pause();
    onAirBox.classList.remove('active');
    onAirBox.innerText = "OFF AIR";
};

// Simple Visualizer Logic (Contextual Canvas)
const canvas = document.getElementById('eq');
const ctx = canvas.getContext('2d');
function drawStatic() {
    ctx.fillStyle = '#051510';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for(let i=0; i<canvas.width; i+=5) {
        let h = Math.random() * 20;
        ctx.fillStyle = '#00ffcc';
        ctx.fillRect(i, canvas.height - h, 3, h);
    }
    requestAnimationFrame(drawStatic);
}
drawStatic();
