const fs = require('fs');
const fetch = require('node-fetch');

// Tu arte ASCII
const asciiArt = `
  ##########                         
##################                       
###-             .+##                       
####                                           
###+-                                           
####-.    +++####+.                               
###+.   .---..-----. .+###+                       
##+-    .--###+#++   .-.  .--                     
+..--     ..-++++-.   -###  .-                     
- - #         ...       -+--.                       
 ++ +.       ....                                   
  .##       ..-- #+--.                             
 -+##+-.    ---+###+-       -                      
   ####+. .+##########.    #                       
   ######-#############- -#                        
   -#######+--++-....-####                         
     ###############+####                          
      -#################                           
##.     .-###############                            
####-      ...-+#############                           
######+.     ....--+--..   ########                       
########+###+--..........        ##########                     
#################+-----..  ...        ###########                    
####################.....           .##################              
#######################+-.   .-#########################-++          
`;

const aboutMe = `
About Me
- 👁️‍🗨️ I'm currently working at Zoega LTD. as FrontEnd Developer making a SPA Progressive Web Application with ReactJS, Typescript, API REST, Context, Router, Yup, VideoJS, Webcam recording, Payment Processors like Paxum, PXP, Stripe or SEPA/SWIFT, graphic stats with ChartJS, Drag and Drop, optimistic asynchronous, Biometrical verification with Veriff, CSS/SASS/Tailwind, Vite, MJML, AWS, Cognito and Lambda, Figma, AGILE with Sprints on JIRA, and Bitbucket, CI/CD workflow. Defining tasks and coordinating Frontend team and requirements with Backend.
- 🔍 Open to interesting job offers.
- ℹ️ Most of my repositories are hidden or in other platforms like Bitbucket.
- 🔭 I’m currently using HTML, CSS/SASS, JS ES6+, Typescript, ReactJS, NextJS.
- 🌱 I’m currently playing with Rust, LLM, GAN, Gaussian Splatting...
- 💬 You can ask me also about Graphic Design: UI/UX, 2D, 3D, MoGraph, Video Filming and Edit, VFX, Photography or any other kind.
- 📫 Reach me on Discord: Nebe#8185
- ⚡ Fun fact: I make music sometimes.

Check my other works at https://www.nebeworks.com
Check my other links at https://nebe.bio.link/
`;

async function fetchGithubStats(username) {
  const url = `https://api.github.com/users/${username}`;
  console.log(`Fetching GitHub stats from: ${url}`);

  try {
    const response = await fetch(url);
    const data = await response.json();

    const publicRepos = data.public_repos || 0;
    const followers = data.followers || 0;

    const reposUrl = data.repos_url;
    const reposResponse = await fetch(reposUrl);
    const reposData = await reposResponse.json();

    const stars = reposData.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0);

    console.log(`Fetched stats - Repos: ${publicRepos}, Stars: ${stars}, Followers: ${followers}`);
    return { publicRepos, followers, stars };
  } catch (error) {
    console.error("Error fetching GitHub stats:", error);
    return { publicRepos: 0, followers: 0, stars: 0 };
  }
}

async function generateSvg() {
  try {
    const username = 'N3BB3Z4R';
    const stats = await fetchGithubStats(username);
    const currentDateTime = new Date().toLocaleString();

    const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1600">
  <rect width="100%" height="100%" fill="#151515"/>
  
  <!-- Arte ASCII -->
  <text x="30" y="50" style="font-family: monospace; white-space: pre;" fill="#00FF00">
${asciiArt}
  </text>
  
  <!-- Información y estadísticas -->
  <text x="600" y="50" fill="#FFD700" style="font-size: 22px; font-family: Arial, sans-serif;">
    ${aboutMe}
  </text>
  <text x="600" y="450" fill="#FFD700" style="font-size: 18px; font-family: Arial, sans-serif;">
    GitHub Stats:
  </text>
  <text x="600" y="480" fill="#FFFFFF" style="font-size: 16px; font-family: Arial, sans-serif;">
    Repos: ${stats.publicRepos} | Stars: ${stats.stars} | Followers: ${stats.followers}
  </text>
  <text x="600" y="510" fill="#FFFFFF" style="font-size: 12px; font-family: Arial, sans-serif;">
    Generated on: ${currentDateTime}
  </text>
</svg>`;

    console.log("Contenido del SVG:", svgContent);

    fs.writeFileSync('profile-stats.svg', svgContent);
    console.log("Archivo SVG generado correctamente.");
  } catch (error) {
    console.error("Error generando el SVG:", error);
  }
}

generateSvg();
