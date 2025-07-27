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

| Feature         | Description |
|---------------|------------|
| Register | User dapat melakukan registrasi `/registration` selanjutnya user akan menerima notifikasi hasil pendaftaran. |
| login | User dapat melakukan login melalui `/login`. Pada req.body user menambahkan email dan password, setelah itu user akan menerima access token untuk validasi |
| Profile | User dapat mengakses melalui `/profile`. Pada halaman ini user akan mendapatkan detail profilnya, tetapi user harus menambahkan `Bearer Token` yang didapat setelah Login. |
| Edit Profil | User dapat mengakses melalui `/profile/update`. Pada halaman ini user dapat mengedit profilenya, tetapi user harus menambahkan `Bearer Token` yang didapat setelah Login. |
| Upload Profile Image | User dapat mengakses melalui `/profile/image`. Pada halaman ini user dapat meng-upload image, tetapi user harus menambahkan `Bearer Token` yang didapat setelah Login. |
| Banner | User dapat mengakses melalui `/banner`. Pada halaman ini user akan mendapatkan list banner |
| Services | User dapat mengakses melalui `/services`. Pada halaman ini user akan mendapatkan list service, tetapi user harus menambahkan `Bearer Token` yang didapat setelah Login. |
| Get Balance | User dapat mengakses melalui `/balance`. Pada halaman ini user akan mendapatkan informasi balance/saldo terakhir, tetapi user harus menambahkan `Bearer Token` yang didapat setelah Login. |
| Top Up | User dapat mengakses melalui `/topup`. Pada halaman ini user dapat melakukan TopUp atau menambah saldo, tetapi user harus menambahkan `Bearer Token` yang didapat setelah Login. |
| Transaction | User dapat mengakses melalui `/transaction`. Pada halaman ini user dapat melakukan transaction berupa pembayaran/payment dan saldo/balance akan berkurang, tetapi user harus menambahkan `Bearer Token` yang didapat setelah Login. |
| Transaction History | User dapat mengakses melalui `/transaction/history`. Pada halaman ini user dapat mendapatkan history transaksi baik TopUp maupun pembayaran/payment, tetapi user harus menambahkan `Bearer Token` yang didapat setelah Login. |

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

