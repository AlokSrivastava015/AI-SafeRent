const fs = require('fs');
let css = fs.readFileSync('src/styles.css', 'utf8');

const newCss = `
/* VR Student Letter Avatar */
.vr-student-avatar-letter {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: #ffffff;
  font-size: 24px;
  font-weight: 800;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  letter-spacing: -0.5px;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}
`;

if (!css.includes('vr-student-avatar-letter')) {
  css += newCss;
  fs.writeFileSync('src/styles.css', css, 'utf8');
  console.log('Letter avatar CSS added');
} else {
  console.log('Already exists');
}

// Also clean up the temp fix file
fs.unlinkSync('fix_student_avatar.cjs');
