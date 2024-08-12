// Importar los módulos necesarios
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

// Función para obtener estadísticas de GitHub
async function fetchGithubStats(username) {
    const url = `https://api.github.com/users/${username}`;
    const response = await fetch(url);
    const data = await response.json();

    const publicRepos = data.public_repos;
    const followers = data.followers;

    const reposUrl = data.repos_url;
    const reposResponse = await fetch(reposUrl);
    const reposData = await reposResponse.json();

    const stars = reposData.reduce((acc, repo) => acc + repo.stargazers_count, 0);

    return { publicRepos, followers, stars };
}

// Función para generar SVG
async function generateSvg() {
    const username = 'tu-usuario-de-github'; // Cambia esto por tu nombre de usuario
    const stats = await fetchGithubStats(username);

    const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="400">
  <rect width="100%" height="100%" fill="#151515"/>
  <text x="10" y="20" style="font-family: monospace;" fill="#FFFFFF">
${asciiArt}
  </text>
  <text x="10" y="350" fill="#FFFFFF" style="font-size: 16px; font-family: Arial, sans-serif;">
    Repos: ${stats.publicRepos} | Stars: ${stats.stars} | Followers: ${stats.followers}
  </text>
</svg>`;

    fs.writeFileSync('profile-stats.svg', svgContent);
}

// Ejecutar la función para generar el SVG
generateSvg();
