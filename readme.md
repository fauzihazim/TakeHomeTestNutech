# Take Home Test Nutech

![Node.js](https://logos-download.com/wp-content/uploads/2016/09/Node_logo_NodeJS.png)

## Disclaimer
**Proyek ini dibuat khusus untuk keperluan take home test dalam proses rekrutmen kerja sesuai dengan requirement proyek yang diminta beserta tambahan agar aplikasi berjalan dengan lebih baik.**

Saya harap proyek ini menjadi gambaran terhadap kemampuan saya. Besar harapan saya untuk diterima di perusahaan ini. Selain itu, saya mohon kritik, saran, dan masukan terhadap proyek yang saya kerjakan ini melalui email saya [fauzihazim28@gmail.com](mailto:fauzihazim28@gmail.com) sehingga saya bisa terus berkembang.

Terimakasih 

## Fitur Utama
✅ Autentikasi JWT  
✅ Manajemen Profil Pengguna  
✅ Transaksi Top-Up & Pembayaran  
✅ Upload Gambar Profil  
✅ Docker Support  
✅ Load Balancing dengan Nginx  

## Teknologi
- **Backend**: Node.js (Express)
- **Database**: MySQL
- **Containerization**: Docker
- **Load Balancer**: Nginx

**Alasan MySQL cocok untuk proyek ini**:  
- Mengelola data keuangan dengan terstruktur dan relasi yang jelas (ACID) sehingga cocok untuk transaksi keuangan
- Menawarkan konsistensi data lebih baik dibanding NoSQL

## Prasyarat
- Docker

## Instalasi
1. Clone repository:
   ```bash
   git clone https://github.com/fauzihazim/TakeHomeTestNutech.git ```

2. Menuju ke folder tersebut
    ```bash
   cd TakeHomeTestNutech ```
3. Menjalankan project dengan Docker
    ```bash
   docker-compose up -d --build ```

