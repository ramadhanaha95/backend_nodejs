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
  <a href="https://github.com/ap699285/backend_nodejs">
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
    <li><a href="#penggunaan-dasar">Penggunaan Dasar</a>
    </li>
    <li><a href="#penggunaan-route-api">Penggunaan Route Api</a>
    </li>
    <li><a href="#usage">Usage</a></li>
  </ol>
</details>

# Penggunaan Dasar

1. Perhatikan Pada Contoh Dibawah ini, Default project ini adalah 'type:module', Maka tidak bisa menggunakan 'Require()' Tetapi Harus Menggunakan 'Import From' untuk memanggil/mengimport file lain.
   ```js
    import express from 'express'
    import dotenv from 'dotenv'
    import cors from 'cors'
    import https from 'https'

    import {
        xxx1,
        xxx2
    } from '../xxx.js'
   ```

# Penggunaan Route Api

1. Import file 'api.js' di file 'app.js' untuk membaca routing.
   ```js
    import api from './routes/api.js'
   ```

2. Default routing kami gunakan prefix '/api' code dibawah berada di file 'app.js' contoh 'http://alamat.com:port/api/xxxx'.
   ```js
    app.use('/api', api, function (req, res, next) {
        console.log('Request Type:', req.method)
        next()
    })
   ```

3. Penggunaan port untuk Backend bisa disesuaikan pada file .env .
   ```sh
    PORT=9090
   ```
   ```js
    app.use('/api', api, function (req, res, next) {
        console.log('Request Type:', req.method)
        next()
    })

    app.listen(PORT, () => {
        console.log('Server running on port : http://127.0.0.1:' + PORT)
    })
   ```


4. Dibawah ini adalah basic pennggunaan route di file '/routes/app.js' dengan memanggil Controller 'AuthController' yang berada di dalam file '/controllers/AuthController.js'.
   ```js
    import * as AuthController from '../controllers/AuthController.js'

    router.post('/login', AuthController.login)
    router.get('/getDataUser', AuthController.getDataUser)
   ```

4. Masih seperti point nomor 4, tetapi route dibawah menggunakan Grouping Middleware yang sudah kami siapkan dengan prefix 'http://alamat.com:port/api/auth/xxx'.
   ```js
    import * as AuthController from '../controllers/AuthController.js'

    router.prefix('/auth', VerifyToken, async function (user) {
        user.get('/getDataUser', AuthController.getDataUser)
        user.post('/Upload', UploadController.Upload);
    });
   ```

<p align="right">(<a href="#top">back to top</a>)</p>
