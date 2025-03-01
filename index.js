"use strict";

/**
########################################################
#                                                      #
#   CODE  : Proxy CF Checker Bot v1.0.0                #
#   NodeJs: v23.6.1                                    #
#   Author: Furqonflynn (cmalf)                        #
#   TG    : https://t.me/furqonflynn                   #
#   GH    : https://github.com/cmalf                   #
#                                                      #
########################################################
*/
/**
 * This code is open-source and welcomes contributions! 
 * 
 * If you'd like to add features or improve this code, please follow these steps:
 * 1. Fork this repository to your own GitHub account.
 * 2. Make your changes in your forked repository.
 * 3. Submit a pull request to the original repository. 
 * 
 * This allows me to review your contributions and ensure the codebase maintains high quality. 
 * 
 * Let's work together to improve this project!
 * 
 * P.S. Remember to always respect the original author's work and avoid plagiarism. 
 * Let's build a community of ethical and collaborative developers.
 */

const express = require('express');
const axios = require('axios');
const https = require('https');
const http = require('http');
const { URL } = require('url');
const { SocksProxyAgent } = require('socks-proxy-agent');
const { HttpsProxyAgent } = require('https-proxy-agent');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const Colors = {
  Gold: "\x1b[38;5;220m",
  Red: "\x1b[31m",
  Teal: "\x1b[38;5;51m",
  Green: "\x1b[32m",
  Neon: "\x1b[38;5;198m",
  Blue: "\x1b[34m",
  Magenta: "\x1b[95m",
  Dim: "\x1b[2m",
  RESET: "\x1b[0m"
};

function CoderMark() {
  console.log(`
╭━━━╮╱╱╱╱╱╱╱╱╱╱╱╱╱╭━━━┳╮
┃╭━━╯╱╱╱╱╱╱╱╱╱╱╱╱╱┃╭━━┫┃${Colors.Green}
┃╰━━┳╮╭┳━┳━━┳━━┳━╮┃╰━━┫┃╭╮╱╭┳━╮╭━╮
┃╭━━┫┃┃┃╭┫╭╮┃╭╮┃╭╮┫╭━━┫┃┃┃╱┃┃╭╮┫╭╮╮${Colors.Blue}
┃┃╱╱┃╰╯┃┃┃╰╯┃╰╯┃┃┃┃┃╱╱┃╰┫╰━╯┃┃┃┃┃┃┃
╰╯╱╱╰━━┻╯╰━╯┣━━┻╯╰┻╯╱╱╰━┻━╮╭┻╯╰┻╯╰╯${Colors.RESET}
╱╱╱╱╱╱╱╱╱╱╱┃┃╱╱╱╱╱╱╱╱╱╱╭━╯┃${Colors.Blue}{${Colors.Neon}cmalf${Colors.Blue}}${Colors.RESET}
╱╱╱╱╱╱╱╱╱╱╱╰╯╱╱╱╱╱╱╱╱╱╱╰━━╯
\n${Colors.RESET}Proxy CF Checker Bot ${Colors.Blue}{ ${Colors.Neon}JS${Colors.Blue} }${Colors.RESET}
    \n${Colors.Green}${'―'.repeat(50)}
    \n${Colors.Gold}[+]${Colors.RESET} DM : ${Colors.Teal}https://t.me/furqonflynn
    \n${Colors.Gold}[+]${Colors.RESET} GH : ${Colors.Teal}https://github.com/cmalf/
    \n${Colors.Green}${'―'.repeat(50)}
    \n${Colors.Gold}]-> ${Colors.Blue}{ ${Colors.RESET}BOT${Colors.Neon} v1.0.0${Colors.Blue} } ${Colors.RESET}
    \n${Colors.Green}${'―'.repeat(50)}
    `);
}


const USER_AGENTS = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Edge/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Edge/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Edge/120.0.0.0",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2.1 Safari/605.1.15",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:133.0) Gecko/20100101 Firefox/133.",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.3",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 OPR/114.0.0.",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.3",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.3",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 AtContent/95.5.5462.5",
];

/**
 * Returns a random User-Agent string from the USER_AGENTS array.
 * @returns {string} A random User-Agent string.
 * @throws {Error} If the USER_AGENTS array is empty.
 */
function getRandomUserAgent() {
    if (USER_AGENTS.length === 0) {
        throw new Error('User agents list is empty.');
    }
    const index = Math.floor(Math.random() * USER_AGENTS.length);
    return USER_AGENTS[index];
}

/**
 * Creates a new axios instance with proxy and custom configuration.
 * @param {string|null} proxy - Proxy URL string. If null, no proxy is set.
 * @returns {Promise<import('axios').AxiosInstance>}
 */
async function createAxiosInstance(proxy = null) {
  const config = {
    timeout: 30000, // default timeout in ms for instance config
    headers: {
      'User-Agent': getRandomUserAgent()
    }
  };

  if (proxy) {
    try {
      const proxyUrl = new URL(proxy);
      config.httpsAgent = proxyUrl.protocol.includes('socks')
        ? new SocksProxyAgent(proxy)
        : new HttpsProxyAgent(proxy);
    } catch (error) {
      throw new Error(`Invalid proxy URL format: ${error.message}`);
    }
  } else {
    config.httpsAgent = new https.Agent({ rejectUnauthorized: false });
  }

  return axios.create(config);
}

// Serve static files from the current directory
app.use(express.static(__dirname));

// Serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Default timeout value in seconds; can be updated by clients
let timeout = 10;

// Handle socket connections
io.on('connection', (socket) => {
  // Update timeout value on client request, with validation
  socket.on('timeout', (value) => {
    const parsedValue = parseInt(value, 10);
    if (!isNaN(parsedValue) && parsedValue > 0) {
      timeout = parsedValue;
      socket.emit('info', `Timeout updated to ${parsedValue} seconds.`);
    } else {
      socket.emit('error', 'Invalid timeout value.');
    }
  });

  // Process proxy-checking requests
  socket.on('check', (text) => {
    // Split proxy list by newline and filter empty lines
    const proxies = text.split('\n').map(p => p.trim()).filter(proxy => proxy !== '');

    // If the proxy list is blank, use local connection to perform the check.
    if (proxies.length === 0) {
      (async () => {
        let axiosInstance;
        try {
          axiosInstance = await createAxiosInstance(null);
        } catch (err) {
          socket.emit('error', `Local connection error: ${err.message}`);
          return;
        }
        const requestHeaders = {
          'access-control-allow-credentials':'true',
          'accept': '*/*',
          'accept-language': 'en-US,en;q=0.6'
        };

        try {
          const response = await axiosInstance.get('https://bless.network/', {
            timeout: timeout * 1000, // use client-specified timeout
            headers: requestHeaders,
            proxy: false,
            validateStatus: (status) => status >= 200 && status < 300
          });
          
          // Emit the response snippet along with status info
          const snippet = response.data;
          socket.emit('work', `Local connection successful. Status: ${response.status} ${response.statusText}. Response snippet: ${snippet}`);
          console.log(`Local connection check completed on localhost:8701`);
        } catch (error) {
          socket.emit('error', `Local connection error: ${error.message}`);
        }
      })();
      return;
    }

    // If proxy list provided, iterate each proxy for the check
    proxies.forEach((proxy) => {
      (async () => {
        let axiosInstance;
        try {
          axiosInstance = await createAxiosInstance(proxy);
        } catch (err) {
          // Send error details to the client.
          socket.emit('error', `Error with proxy ${proxy}: ${err.message}`);
          return;
        }
        
        const requestHeaders = {
          'access-control-allow-credentials':'true',
          'accept': '*/*',
          'accept-language': 'en-US,en;q=0.6'
        };

        try {
          const response = await axiosInstance.get('https://bless.network/', {
            timeout: timeout * 1000, // use client-specified timeout
            headers: requestHeaders,
            proxy: false,
            validateStatus: (status) => status >= 200 && status < 300
          });
          
          // Check if the response contains the 'VPS' keyword
          //if (response.data && response.data.includes('VPS')) {
          if (response.data && response.data) {
            socket.emit('work', proxy);
            console.log(`${Colors.Neon}\n]> ${Colors.RESET}Proxy ${Colors.Gold}${proxy} ${Colors.Green}is working. ${Colors.Teal}(Listening on localhost:8701)${Colors.RESET}\n`);
          }
        } catch (error) {
          // Send error to the client.
          socket.emit('error', `Error with proxy ${proxy}: ${error.message}`);
        }
      })();
    });
  });
});

// Start the server on port 8701
server.listen(8701, () => {
  console.clear();
  CoderMark();
  console.log(`${Colors.Neon}\n]> ${Colors.RESET}Listening on localhost:8701${Colors.RESET}`);
  console.log(`${Colors.Neon}]> ${Colors.RESET}Copy, Open in your browser: ${Colors.Teal}http://localhost:8701/${Colors.RESET}\n`);
});