<div id="top"></div>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->




<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Backend With NodeJS And ExpressJS</h3>

  <p align="center">
    By Pengembang IT Regarsport
    <br />
    <a href="https://github.com/ap699285/backend_nodejs"><strong>Explore the docs »</strong></a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

Reposiroty ini dipersiapkan oleh Pengembang IT Regarsport untuk menyiapkan Backend dari Project Regarfriends agar mudah di pelajari Oleh Seluruh IT Regarsport.

Here's why:
* Menggunakan Bahasa Pemrograman Javascript (NodeJS ExpressJs)
* Struktur Folder Kami Buat Sesederhana Mungkin Agar Mudah Di Pelajari
* Metode Yang Diguanakan Hampir Seperti MVC :smile:

<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

* [Node.js](https://nodejs.org/)
* [Express.js](https://expressjs.com/)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

Berikut Panduan Yang Kami Berikan

### Prerequisites

Install Npm Versi Terbaru
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Pastikan Sudah Di Undang Menjadi Kontributor Di Repository Ini
2. Clone the repo
   ```sh
   git clone https://github.com/ap699285/backend_nodejs.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Rubah .env.example Menjadi .env dan Isi Sesua Config Anda

5. Lakukan Migrasi Ke Database Anda
   ```sh
   npm run migration
   ```


<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

<details>
  <summary>Daftar Penggunaan</summary>
  <ol>
    <li>
      <a href="#penggunaan-dasar-express-js">Penggunaan Dasar ExpressJs</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
  </ol>
</details>

# Penggunaan Dasar Express Js

1. Perhatikan Pada File 'app.js' Dibawah ini, Default project ini adalah 'type:module', Maka tidak bisa menggunakan 'Require()' untuk memanggil file lain.
   ```js
    import express from 'express'
    import dotenv from 'dotenv'
    import cors from 'cors'
    import https from 'https'
    //import fs from 'fs'
    dotenv.config()

    const app = express()

    const PORT = process.env.PORT

    import api from './routes/api.js'
    app.use(cors())
    app.use(express.json())

    // app.use('/api', api)

    app.use('/api', api, function (req, res, next) {
        console.log('Request Type:', req.method)
        next()
    })
    app.listen(PORT, () => {
        console.log('Server running on port : http://127.0.0.1:' + PORT)
    })
   ```

<p align="right">(<a href="#top">back to top</a>)</p>
