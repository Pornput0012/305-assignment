var admin = require("firebase-admin");
const { getFirestore, Timestamp } = require("firebase-admin/firestore");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

var db = getFirestore();

var plants = [
  {
    id: "plant_001",
    name: "ต้นมะนาว",
    scientificName: "Citrus aurantifolia",
    description:
      "ไม้ผลยืนต้นที่นิยมปลูกในครัวเรือน ผลใช้ประกอบอาหารได้หลากหลาย",
    origin: "เอเชียตะวันออกเฉียงใต้",
    difficulty: "ง่าย",
    imageUrl:
      "https://images.unsplash.com/photo-1711243566540-62fe8c49f53f?w=900&auto=format&fit=crop&q=60",
    maxHeight: 5,
    viewCount: 1250,
    category: { id: "cat_001", name: "ไม้ผล", icon: "🍊" },
    topSymptomIds: ["sym_007", "sym_009"],
    topSymptoms: [
      {
        id: "sym_007",
        name: "โรคกรีนนิ่ง",
        severity: "high",
        isGeneral: false,
        imageUrl:
          "https://th-test-11.slatic.net/p/d9d3fb9a3cc61937ef9d29b8732c1a7d.jpg", // เพิ่ม imageUrl
      },
      {
        id: "sym_009",
        name: "โรคแอนแทรคโนส",
        severity: "high",
        isGeneral: false,
        imageUrl: "https://www.phtnet.org/article/images/a52_1.png", // เพิ่ม imageUrl
      },
    ],
    careInfo: {
      water: "ทุก 2-3 วัน",
      sunlight: "6-8 ชั่วโมง",
      soil: "ดินร่วนซุย",
      temperature: "25-35°C",
    },
  },
  {
    id: "plant_002",
    name: "ต้นมะม่วง",
    scientificName: "Mangifera indica",
    description: "ไม้ผลเขตร้อนที่เป็นที่นิยมมากในประเทศไทย",
    origin: "เอเชียใต้",
    difficulty: "ปานกลาง",
    imageUrl:
      "https://images.unsplash.com/photo-1622955658214-d05c1c6fcf84?w=900&auto=format&fit=crop&q=60",
    maxHeight: 15,
    viewCount: 2100,
    category: { id: "cat_001", name: "ไม้ผล", icon: "🍊" },
    topSymptomIds: ["sym_009", "sym_002"],
    topSymptoms: [
      {
        id: "sym_009",
        name: "โรคแอนแทรคโนส",
        severity: "high",
        isGeneral: false,
        imageUrl: "https://www.phtnet.org/article/images/a52_1.png", // เพิ่ม imageUrl
      },
      {
        id: "sym_002",
        name: "โรคราแป้ง",
        severity: "high",
        isGeneral: true,
        imageUrl:
          "https://www.luckyworm.net/wp-content/uploads/2022/05/%E0%B8%A3%E0%B8%B2%E0%B9%81%E0%B8%9B%E0%B9%89%E0%B8%87.jpg", // เพิ่ม imageUrl
      },
    ],
    careInfo: {
      water: "สัปดาห์ละ 2 ครั้ง",
      sunlight: "8 ชั่วโมง",
      soil: "ดินร่วนปนทราย",
      temperature: "24-30°C",
    },
  },
  {
    id: "plant_003",
    name: "ต้นกล้วย",
    scientificName: "Musa sapientum",
    description: "พืชล้มลุกขนาดใหญ่ ผลเป็นอาหารหลักของคนไทย",
    origin: "เอเชียตะวันออกเฉียงใต้",
    difficulty: "ง่าย",
    imageUrl:
      "https://images.unsplash.com/photo-1604127627335-53b67fb7d8cf?w=900&auto=format&fit=crop&q=60",
    maxHeight: 6,
    viewCount: 1800,
    category: { id: "cat_001", name: "ไม้ผล", icon: "🍊" },
    topSymptomIds: ["sym_008", "sym_004"],
    topSymptoms: [
      {
        id: "sym_008",
        name: "โรคตายพราย",
        severity: "high",
        isGeneral: false,
        imageUrl:
          "https://t.dailynews.co.th/wp-content/uploads/2025/05/lgaeglk.jpg", // เพิ่ม imageUrl
      },
      {
        id: "sym_004",
        name: "โรครากเน่า",
        severity: "high",
        isGeneral: true,
        imageUrl:
          "https://www.dailynews.co.th/wp-content/uploads/2025/05/tje6.jpg", // เพิ่ม imageUrl
      },
    ],
    careInfo: {
      water: "ทุกวัน",
      sunlight: "6-8 ชั่วโมง",
      soil: "ดินร่วนซุย",
      temperature: "26-30°C",
    },
  },
  {
    id: "plant_004",
    name: "ต้นกุหลาบ",
    scientificName: "Rosa hybrida",
    description: "ไม้ดอกยอดนิยม มีหลากหลายสีและกลิ่นหอม",
    origin: "เอเชียและยุโรป",
    difficulty: "ปานกลาง",
    imageUrl:
      "https://images.unsplash.com/photo-1579053778004-3a4d3f0fae19?w=900&auto=format&fit=crop&q=60",
    maxHeight: 2,
    viewCount: 3500,
    category: { id: "cat_002", name: "ไม้ดอก", icon: "🌸" },
    topSymptomIds: ["sym_011", "sym_002"],
    topSymptoms: [
      {
        id: "sym_011",
        name: "โรคดอกร่วง",
        severity: "medium",
        isGeneral: false,
        imageUrl:
          "https://songsangjun.com/wp-content/uploads/2024/04/%E0%B9%82%E0%B8%A3%E0%B8%84%E0%B8%94%E0%B8%AD%E0%B8%81%E0%B8%A3%E0%B9%88%E0%B8%A7%E0%B8%87.jpeg", // เพิ่ม imageUrl
      },
      {
        id: "sym_002",
        name: "โรคราแป้ง",
        severity: "high",
        isGeneral: true,
        imageUrl:
          "https://www.luckyworm.net/wp-content/uploads/2022/05/%E0%B8%A3%E0%B8%B2%E0%B9%81%E0%B8%9B%E0%B9%89%E0%B8%87.jpg", // เพิ่ม imageUrl
      },
    ],
    careInfo: {
      water: "วันเว้นวัน",
      sunlight: "4-6 ชั่วโมง",
      soil: "ดินร่วนผสมปุ๋ยคอก",
      temperature: "20-28°C",
    },
  },
  {
    id: "plant_005",
    name: "ต้นมะลิ",
    scientificName: "Jasminum sambac",
    description: "ไม้ดอกหอมที่ใช้ในพิธีกรรมและทำพวงมาลัย",
    origin: "เอเชียใต้",
    difficulty: "ง่าย",
    imageUrl:
      "https://images.unsplash.com/photo-1726596984710-7075a1250f58?w=900&auto=format&fit=crop&q=60",
    maxHeight: 3,
    viewCount: 2800,
    category: { id: "cat_002", name: "ไม้ดอก", icon: "🌸" },
    topSymptomIds: ["sym_003", "sym_006"],
    topSymptoms: [
      {
        id: "sym_003",
        name: "โรคใบจุด",
        severity: "medium",
        isGeneral: true,
        imageUrl:
          "https://lirp.cdn-website.com/4488033e/dms3rep/multi/opt/Phomopsis+leafspot-02-640w.jpg", // เพิ่ม imageUrl
      },
      {
        id: "sym_006",
        name: "โรคเพลี้ยอ่อน",
        severity: "medium",
        isGeneral: true,
        imageUrl:
          "https://unilife.co.th/wp-content/uploads/2022/05/Slide_%E0%B9%80%E0%B8%9E%E0%B8%A5%E0%B8%B5%E0%B9%89%E0%B8%A2%E0%B8%AD%E0%B9%88%E0%B8%AD%E0%B8%994.jpg", // เพิ่ม imageUrl
      },
    ],
    careInfo: {
      water: "ทุก 2 วัน",
      sunlight: "4-6 ชั่วโมง",
      soil: "ดินร่วน",
      temperature: "25-32°C",
    },
  },
  {
    id: "plant_006",
    name: "ต้นพริก",
    scientificName: "Capsicum annuum",
    description: "พืชผักที่ใช้เป็นเครื่องปรุงรสในอาหารไทย",
    origin: "อเมริกากลางและใต้",
    difficulty: "ง่าย",
    imageUrl:
      "https://images.unsplash.com/photo-1721991805838-a9fcec8245de?w=900&auto=format&fit=crop&q=60",
    maxHeight: 1,
    viewCount: 4200,
    category: { id: "cat_003", name: "พืชผัก", icon: "🥬" },
    topSymptomIds: ["sym_010", "sym_009"],
    topSymptoms: [
      {
        id: "sym_010",
        name: "โรคใบหงิกเหลือง",
        severity: "high",
        isGeneral: false,
        imageUrl:
          "https://www.kasetnews.com/wp-content/uploads/2022/04/Tomato-Leaf-Curl-1600x800-1-1024x512.jpg", // เพิ่ม imageUrl
      },
      {
        id: "sym_009",
        name: "โรคแอนแทรคโนส",
        severity: "high",
        isGeneral: false,
        imageUrl: "https://www.phtnet.org/article/images/a52_1.png", // เพิ่ม imageUrl
      },
    ],
    careInfo: {
      water: "ทุกวัน",
      sunlight: "6-8 ชั่วโมง",
      soil: "ดินร่วนซุย",
      temperature: "25-30°C",
    },
  },
  {
    id: "plant_007",
    name: "ต้นมะเขือเทศ",
    scientificName: "Solanum lycopersicum",
    description: "พืชผักที่ให้ผลสีแดง นิยมใช้ประกอบอาหาร",
    origin: "อเมริกาใต้",
    difficulty: "ปานกลาง",
    imageUrl:
      "https://images.unsplash.com/photo-1684141023233-0b56b95b2af1?w=900&auto=format&fit=crop&q=60",
    maxHeight: 2,
    viewCount: 3100,
    category: { id: "cat_003", name: "พืชผัก", icon: "🥬" },
    topSymptomIds: ["sym_010", "sym_005"],
    topSymptoms: [
      {
        id: "sym_010",
        name: "โรคใบหงิกเหลือง",
        severity: "high",
        isGeneral: false,
        imageUrl:
          "https://www.kasetnews.com/wp-content/uploads/2022/04/Tomato-Leaf-Curl-1600x800-1-1024x512.jpg", // เพิ่ม imageUrl
      },
      {
        id: "sym_005",
        name: "โรคใบไหม้",
        severity: "medium",
        isGeneral: true,
        imageUrl:
          "https://www.packingag.com/images/contents/news/pest-problem/2018/packing-ag/problem/Late-blight/152655.jpg", // เพิ่ม imageUrl
      },
    ],
    careInfo: {
      water: "ทุกวัน",
      sunlight: "6-8 ชั่วโมง",
      soil: "ดินร่วน",
      temperature: "21-29°C",
    },
  },
  {
    id: "plant_008",
    name: "ต้นกะเพรา",
    scientificName: "Ocimum tenuiflorum",
    description: "สมุนไพรหอมที่ใช้ผัดกับเนื้อสัตว์ เป็นอาหารยอดนิยม",
    origin: "อินเดีย",
    difficulty: "ง่าย",
    imageUrl:
      "https://images.unsplash.com/photo-1696152636436-0893a138c6a3?w=900&auto=format&fit=crop&q=60",
    maxHeight: 0.5,
    viewCount: 5600,
    category: { id: "cat_004", name: "สมุนไพร", icon: "🌿" },
    topSymptomIds: ["sym_001", "sym_004"],
    topSymptoms: [
      {
        id: "sym_001",
        name: "โรคใบเหลือง",
        severity: "medium",
        isGeneral: true,
        imageUrl:
          "https://s359.kapook.com/pagebuilder/b598a5b5-c2a0-458d-aab9-e32176652169.jpg", // เพิ่ม imageUrl
      },
      {
        id: "sym_004",
        name: "โรครากเน่า",
        severity: "high",
        isGeneral: true,
        imageUrl:
          "https://www.dailynews.co.th/wp-content/uploads/2025/05/tje6.jpg", // เพิ่ม imageUrl
      },
    ],
    careInfo: {
      water: "ทุกวัน",
      sunlight: "4-6 ชั่วโมง",
      soil: "ดินร่วน",
      temperature: "25-35°C",
    },
  },
  {
    id: "plant_009",
    name: "ต้นตะไคร้",
    scientificName: "Cymbopogon citratus",
    description: "สมุนไพรที่มีกลิ่นหอม ใช้ทำอาหารและไล่ยุง",
    origin: "เอเชียใต้",
    difficulty: "ง่าย",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1673557565552-fe0680eb44a9?w=900&auto=format&fit=crop&q=60",
    maxHeight: 1.5,
    viewCount: 2400,
    category: { id: "cat_004", name: "สมุนไพร", icon: "🌿" },
    topSymptomIds: ["sym_001", "sym_003"],
    topSymptoms: [
      {
        id: "sym_001",
        name: "โรคใบเหลือง",
        severity: "medium",
        isGeneral: true,
        imageUrl:
          "https://s359.kapook.com/pagebuilder/b598a5b5-c2a0-458d-aab9-e32176652169.jpg", // เพิ่ม imageUrl
      },
      {
        id: "sym_003",
        name: "โรคใบจุด",
        severity: "medium",
        isGeneral: true,
        imageUrl:
          "https://lirp.cdn-website.com/4488033e/dms3rep/multi/opt/Phomopsis+leafspot-02-640w.jpg", // เพิ่ม imageUrl
      },
    ],
    careInfo: {
      water: "ทุก 2-3 วัน",
      sunlight: "6 ชั่วโมง",
      soil: "ดินร่วน",
      temperature: "25-30°C",
    },
  },
  {
    id: "plant_010",
    name: "ต้นขิง",
    scientificName: "Zingiber officinale",
    description: "สมุนไพรที่ใช้เหง้าในการปรุงอาหารและทำยา",
    origin: "เอเชียตะวันออกเฉียงใต้",
    difficulty: "ง่าย",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1675364893053-180a3c6e0119?w=900&auto=format&fit=crop&q=60",
    maxHeight: 1,
    viewCount: 1900,
    category: { id: "cat_004", name: "สมุนไพร", icon: "🌿" },
    topSymptomIds: ["sym_012", "sym_003"],
    topSymptoms: [
      {
        id: "sym_012",
        name: "โรคเหง้าเน่า",
        severity: "high",
        isGeneral: false,
        imageUrl:
          "https://lh5.googleusercontent.com/proxy/QJFCTUr0_Un1w4QzvNvjTrRCOGLvNwu4pGzEvlESnmu_DbOH9AXFYgxWp4w-XFt1VCIGi_6fkm7ZQiXtcJFMy0beyfDUnR8cloM-hwIJmzoJmfvNv30vqDf6", // เพิ่ม imageUrl
      },
      {
        id: "sym_003",
        name: "โรคใบจุด",
        severity: "medium",
        isGeneral: true,
        imageUrl:
          "https://lirp.cdn-website.com/4488033e/dms3rep/multi/opt/Phomopsis+leafspot-02-640w.jpg", // เพิ่ม imageUrl
      },
    ],
    careInfo: {
      water: "ทุก 2 วัน",
      sunlight: "4-5 ชั่วโมง",
      soil: "ดินร่วนซุย",
      temperature: "25-30°C",
    },
  },
  {
    id: "plant_011",
    name: "ต้นผักบุ้ง",
    scientificName: "Ipomoea aquatica",
    description: "ผักน้ำที่นิยมรับประทานในประเทศไทย ปลูกง่าย โตเร็ว",
    origin: "เอเชียตะวันออกเฉียงใต้",
    difficulty: "ง่ายมาก",
    imageUrl:
      "https://www.gardeningaustraliamag.com.au/wp-content/uploads/2024/12/iStock-1732465488-1.jpg",
    maxHeight: 0.5,
    viewCount: 3800,
    category: { id: "cat_003", name: "พืชผัก", icon: "🥬" },
    topSymptomIds: ["sym_001", "sym_006"],
    topSymptoms: [
      {
        id: "sym_001",
        name: "โรคใบเหลือง",
        severity: "medium",
        isGeneral: true,
        imageUrl:
          "https://s359.kapook.com/pagebuilder/b598a5b5-c2a0-458d-aab9-e32176652169.jpg", // เพิ่ม imageUrl
      },
      {
        id: "sym_006",
        name: "โรคเพลี้ยอ่อน",
        severity: "medium",
        isGeneral: true,
        imageUrl:
          "https://unilife.co.th/wp-content/uploads/2022/05/Slide_%E0%B9%80%E0%B8%9E%E0%B8%A5%E0%B8%B5%E0%B9%89%E0%B8%A2%E0%B8%AD%E0%B9%88%E0%B8%AD%E0%B8%994.jpg", // เพิ่ม imageUrl
      },
    ],
    careInfo: {
      water: "ทุกวัน (ชอบน้ำมาก)",
      sunlight: "4-6 ชั่วโมง",
      soil: "ดินเหนียวหรือน้ำ",
      temperature: "25-32°C",
    },
  },
  {
    id: "plant_012",
    name: "ต้นกล้วยไม้",
    scientificName: "Orchidaceae",
    description: "ไม้ดอกประดับที่มีความหลากหลาย ดอกสวยงามและทนทาน",
    origin: "เขตร้อนทั่วโลก",
    difficulty: "ยาก",
    imageUrl:
      "https://www.royalparkrajapruek.org/img/upload/20160610-575a80b5d1f4a.jpg",
    maxHeight: 1,
    viewCount: 4500,
    category: { id: "cat_002", name: "ไม้ดอก", icon: "🌸" },
    topSymptomIds: ["sym_011", "sym_004"],
    topSymptoms: [
      {
        id: "sym_011",
        name: "โรคดอกร่วง",
        severity: "medium",
        isGeneral: false,
        imageUrl:
          "https://songsangjun.com/wp-content/uploads/2024/04/%E0%B9%82%E0%B8%A3%E0%B8%84%E0%B8%94%E0%B8%AD%E0%B8%81%E0%B8%A3%E0%B9%88%E0%B8%A7%E0%B8%87.jpeg", // เพิ่ม imageUrl
      },
      {
        id: "sym_004",
        name: "โรครากเน่า",
        severity: "high",
        isGeneral: true,
        imageUrl:
          "https://www.dailynews.co.th/wp-content/uploads/2025/05/tje6.jpg", // เพิ่ม imageUrl
      },
    ],
    careInfo: {
      water: "สัปดาห์ละ 1-2 ครั้ง",
      sunlight: "แสงรำไร",
      soil: "เครื่องปลูกกล้วยไม้",
      temperature: "20-30°C",
    },
  },
];

plants.forEach(function (obj) {
  db.collection("plants")
    .doc(obj.id)
    .set({
      name: obj.name,
      scientificName: obj.scientificName,
      description: obj.description,
      origin: obj.origin,
      difficulty: obj.difficulty,
      imageUrl: obj.imageUrl,
      maxHeight: obj.maxHeight,
      viewCount: obj.viewCount,
      category: obj.category,
      topSymptomIds: obj.topSymptomIds,
      topSymptoms: obj.topSymptoms,
      careInfo: obj.careInfo,
      isActive: true,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    })
    .then(function () {
      console.log("Document written with ID: " + obj.id);
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
});
