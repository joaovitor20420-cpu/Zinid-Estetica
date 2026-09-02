const { spawn } = require('child_process');
const ffmpeg = require('ffmpeg-static');
const fs = require('fs');
const path = require('path');

const videoPath = path.join(__dirname, 'public', 'Blue_sports_sedan_detailing_process_202609020009.mp4');
const outputDir = path.join(__dirname, 'public', 'hero-sequence');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log('Extracting frames using ffmpeg:', ffmpeg);

const args = [
  '-i', videoPath,
  '-vf', 'fps=30,scale=1920:-1', // 30 FPS, width 1920
  '-q:v', '5', // Quality (2 is best, 31 is worst)
  path.join(outputDir, 'frame_%04d.jpg')
];

const proc = spawn(ffmpeg, args);

proc.stdout.on('data', data => console.log(data.toString()));
proc.stderr.on('data', data => {
  const str = data.toString();
  if (str.includes('frame=')) {
    process.stdout.write('\r' + str.trim());
  }
});

proc.on('close', code => {
  console.log('\nFinished with code ' + code);
});
