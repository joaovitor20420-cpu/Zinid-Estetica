const { spawn } = require('child_process');
const ffmpeg = require('ffmpeg-static');
const fs = require('fs');
const path = require('path');

const videoPath = path.join(__dirname, 'public', 'Automotive_commercial_detailing_…_1080p_202609021841.mp4');
const outputDir = path.join(__dirname, 'public', 'hero-sequence-mobile');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log('Extracting mobile frames using ffmpeg:', ffmpeg);

const args = [
  '-i', videoPath,
  '-vf', 'fps=30,scale=1080:-1', 
  '-q:v', '5', 
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
