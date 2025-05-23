<?php

namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\Equipment;
use Illuminate\Support\Str;

class EquipmentSeeder extends Seeder
{
    public function run(): void
    {
        $equipments = [
            // Kamera
            [
                'name' => 'Canon G7X Mark II',
                'category_id' => 4,
                'description' => 'Kamera compact dengan sensor 1 inci dan video Full HD.',
                'price' => 150000,
                'image' => 'https://picsum.photos/seed/canon-g7x/800/600',
                'slug' => Str::slug('Canon G7X Mark II'),
                'status' => 'active',
            ],
            [
                'name' => 'Sony A7 III',
                'category_id' => 4,
                'description' => 'Mirrorless full-frame dengan performa luar biasa dan video 4K.',
                'price' => 250000,
                'image' => 'https://picsum.photos/seed/sony-a7iii/800/600',
                'slug' => Str::slug('Sony A7 III'),
                'status' => 'active',
            ],
            [
                'name' => 'Fujifilm X-T4',
                'category_id' => 4,
                'description' => 'Kamera mirrorless dengan sensor X-Trans dan stabilisasi internal.',
                'price' => 200000,
                'image' => 'https://picsum.photos/seed/fujifilm-xt4/800/600',
                'slug' => Str::slug('Fujifilm X-T4'),
                'status' => 'active',
            ],
            [
                'name' => 'Canon EOS R5',
                'category_id' => 4,
                'description' => 'Mirrorless profesional dengan 45MP dan perekaman 8K.',
                'price' => 350000,
                'image' => 'https://picsum.photos/seed/canon-r5/800/600',
                'slug' => Str::slug('Canon EOS R5'),
                'status' => 'active',
            ],
            [
                'name' => 'Nikon Z6 II',
                'category_id' => 4,
                'description' => 'Kamera mirrorless dengan sensor full-frame dan dual EXPEED 6.',
                'price' => 230000,
                'image' => 'https://picsum.photos/seed/nikon-z6ii/800/600',
                'slug' => Str::slug('Nikon Z6 II'),
                'status' => 'active',
            ],

            // Lensa
            [
                'name' => 'Canon EF 50mm f/1.8 STM',
                'category_id' => 5,
                'description' => 'Lensa prime terjangkau dengan bokeh yang halus.',
                'price' => 50000,
                'image' => 'https://picsum.photos/seed/canon-50mm/800/600',
                'slug' => Str::slug('Canon EF 50mm f/1.8 STM'),
                'status' => 'active',
            ],
            [
                'name' => 'Sony FE 24-70mm f/2.8 GM',
                'category_id' => 5,
                'description' => 'Lensa zoom premium untuk kamera full-frame Sony.',
                'price' => 200000,
                'image' => 'https://picsum.photos/seed/sony-2470gm/800/600',
                'slug' => Str::slug('Sony FE 24-70mm f/2.8 GM'),
                'status' => 'active',
            ],
            [
                'name' => 'Sigma 35mm f/1.4 DG HSM Art',
                'category_id' => 5,
                'description' => 'Lensa wide-angle dengan kualitas optik tinggi.',
                'price' => 125000,
                'image' => 'https://picsum.photos/seed/sigma-35mm/800/600',
                'slug' => Str::slug('Sigma 35mm f/1.4 DG HSM Art'),
                'status' => 'active',
            ],
            [
                'name' => 'Tamron 28-75mm f/2.8',
                'category_id' => 5,
                'description' => 'Lensa ringan dan tajam untuk kamera Sony E-mount.',
                'price' => 100000,
                'image' => 'https://picsum.photos/seed/tamron-2875/800/600',
                'slug' => Str::slug('Tamron 28-75mm f/2.8'),
                'status' => 'active',
            ],
            [
                'name' => 'Nikon AF-S 85mm f/1.8G',
                'category_id' => 5,
                'description' => 'Lensa portrait dengan bokeh indah dan ketajaman tinggi.',
                'price' => 80000,
                'image' => 'https://picsum.photos/seed/nikon-85mm/800/600',
                'slug' => Str::slug('Nikon AF-S 85mm f/1.8G'),
                'status' => 'active',
            ],

            // Lighting
            [
                'name' => 'Godox SL60W',
                'category_id' => 6,
                'description' => 'Lampu video LED dengan output tinggi dan suhu warna tetap.',
                'price' => 100000,
                'image' => 'https://picsum.photos/seed/godox-sl60w/800/600',
                'slug' => Str::slug('Godox SL60W'),
                'status' => 'active',
            ],
            [
                'name' => 'Aputure Amaran 200d',
                'category_id' => 6,
                'description' => 'Pencahayaan LED dengan CRI tinggi dan kontrol aplikasi.',
                'price' => 180000,
                'image' => 'https://picsum.photos/seed/amaran-200d/800/600',
                'slug' => Str::slug('Aputure Amaran 200d'),
                'status' => 'active',
            ],
            [
                'name' => 'Neewer 660 LED Panel',
                'category_id' => 6,
                'description' => 'Lampu panel dua warna untuk foto dan video.',
                'price' => 90000,
                'image' => 'https://picsum.photos/seed/neewer-660/800/600',
                'slug' => Str::slug('Neewer 660 LED Panel'),
                'status' => 'active',
            ],
            [
                'name' => 'Godox AD200Pro',
                'category_id' => 6,
                'description' => 'Flash portabel dengan TTL dan HSS.',
                'price' => 130000,
                'image' => 'https://picsum.photos/seed/godox-ad200pro/800/600',
                'slug' => Str::slug('Godox AD200Pro'),
                'status' => 'active',
            ],
            [
                'name' => 'Aputure MC RGB Light',
                'category_id' => 6,
                'description' => 'Lampu LED RGB kecil dengan efek kreatif.',
                'price' => 70000,
                'image' => 'https://picsum.photos/seed/aputure-mc/800/600',
                'slug' => Str::slug('Aputure MC RGB Light'),
                'status' => 'active',
            ],

            // Audio
            [
                'name' => 'Rode VideoMic Pro+',
                'category_id' => 7,
                'description' => 'Microphone shotgun untuk kamera DSLR dan mirrorless.',
                'price' => 100000,
                'image' => 'https://picsum.photos/seed/rodevideomicpro/800/600',
                'slug' => Str::slug('Rode VideoMic Pro+'),
                'status' => 'active',
            ],
            [
                'name' => 'Zoom H5',
                'category_id' => 7,
                'description' => 'Perekam audio portabel dengan kualitas profesional.',
                'price' => 150000,
                'image' => 'https://picsum.photos/seed/zoom-h5/800/600',
                'slug' => Str::slug('Zoom H5'),
                'status' => 'active',
            ],
            [
                'name' => 'Tascam DR-10L',
                'category_id' => 7,
                'description' => 'Perekam mikrofon lavalier yang ringkas dan praktis.',
                'price' => 120000,
                'image' => 'https://picsum.photos/seed/tascam-dr10l/800/600',
                'slug' => Str::slug('Tascam DR-10L'),
                'status' => 'active',
            ],
            [
                'name' => 'Sennheiser EW 112P G4',
                'category_id' => 7,
                'description' => 'Sistem mic wireless untuk videografi profesional.',
                'price' => 250000,
                'image' => 'https://picsum.photos/seed/sennheiser-g4/800/600',
                'slug' => Str::slug('Sennheiser EW 112P G4'),
                'status' => 'active',
            ],
            [
                'name' => 'Boya BY-M1',
                'category_id' => 7,
                'description' => 'Mic lavalier murah meriah dengan hasil yang baik.',
                'price' => 40000,
                'image' => 'https://picsum.photos/seed/boya-bym1/800/600',
                'slug' => Str::slug('Boya BY-M1'),
                'status' => 'active',
            ],

            // Aksesoris
            [
                'name' => 'Manfrotto Compact Tripod',
                'category_id' => 8,
                'description' => 'Tripod ringan dan kokoh untuk kamera ringan.',
                'price' => 50000,
                'image' => 'https://picsum.photos/seed/manfrotto-tripod/800/600',
                'slug' => Str::slug('Manfrotto Compact Tripod'),
                'status' => 'active',
            ],
            [
                'name' => 'DJI Ronin-SC',
                'category_id' => 8,
                'description' => 'Gimbal 3-axis untuk kamera mirrorless.',
                'price' => 200000,
                'image' => 'https://picsum.photos/seed/ronin-sc/800/600',
                'slug' => Str::slug('DJI Ronin-SC'),
                'status' => 'active',
            ],
            [
                'name' => 'Sandisk Extreme Pro 128GB',
                'category_id' => 8,
                'description' => 'SD Card kecepatan tinggi untuk perekaman video 4K.',
                'price' => 30000,
                'image' => 'https://picsum.photos/seed/sandisk-128gb/800/600',
                'slug' => Str::slug('Sandisk Extreme Pro 128GB'),
                'status' => 'active',
            ],
            [
                'name' => 'SmallRig Cage for Sony A7 III',
                'category_id' => 8,
                'description' => 'Rig untuk mounting aksesori tambahan.',
                'price' => 70000,
                'image' => 'https://picsum.photos/seed/smallrig-a7iii/800/600',
                'slug' => Str::slug('SmallRig Cage for Sony A7 III'),
                'status' => 'active',
            ],
            [
                'name' => 'Rode Wireless GO II Clip Mount',
                'category_id' => 8,
                'description' => 'Mount clip tambahan untuk sistem Rode Wireless GO.',
                'price' => 20000,
                'image' => 'https://picsum.photos/seed/rode-mount/800/600',
                'slug' => Str::slug('Rode Wireless GO II Clip Mount'),
                'status' => 'active',
            ],
        ];

        Equipment::insert($equipments);
    }
}
