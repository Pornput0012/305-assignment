var admin = require("firebase-admin");
const { getFirestore, Timestamp } = require("firebase-admin/firestore");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

var db = getFirestore();

var symptoms = [
  // ==================== โรคทั่วไป ====================
  {
    id: "sym_001",
    name: "โรคใบเหลือง",
    description: "ใบไม้เปลี่ยนเป็นสีเหลืองซีด",
    cause: "ขาดธาตุไนโตรเจน ธาตุเหล็ก หรือรดน้ำมากเกินไป",
    solution: "ใส่ปุ๋ยไนโตรเจน ปุ๋ยธาตุเหล็ก ลดการรดน้ำ",
    severity: "medium",
    isGeneral: true,
    specificPlantIds: [],
    images: [
      "https://s359.kapook.com/pagebuilder/b598a5b5-c2a0-458d-aab9-e32176652169.jpg",
    ],
  },
  {
    id: "sym_002",
    name: "โรคราแป้ง",
    description: "มีผงสีขาวคล้ายแป้งเกาะบนใบ",
    cause: "เชื้อราในสภาพอากาศชื้น อุณหภูมิต่ำ",
    solution: "ฉีดพ่นสารกำจัดเชื้อรา ตัดใบที่ติดเชื้อทิ้ง",
    severity: "high",
    isGeneral: true,
    specificPlantIds: [],
    images: [
      "https://www.luckyworm.net/wp-content/uploads/2022/05/%E0%B8%A3%E0%B8%B2%E0%B9%81%E0%B8%9B%E0%B9%89%E0%B8%87.jpg",
    ],
  },
  {
    id: "sym_003",
    name: "โรคใบจุด",
    description: "มีจุดสีน้ำตาลหรือดำบนใบ",
    cause: "เชื้อราหรือแบคทีเรีย ความชื้นสูง",
    solution: "ตัดใบที่เป็นโรคทิ้ง ฉีดพ่นสารป้องกันเชื้อรา",
    severity: "medium",
    isGeneral: true,
    specificPlantIds: [],
    images: [
      "https://lirp.cdn-website.com/4488033e/dms3rep/multi/opt/Phomopsis+leafspot-02-640w.jpg",
    ],
  },
  {
    id: "sym_004",
    name: "โรครากเน่า",
    description: "รากเปลี่ยนเป็นสีน้ำตาลดำ เน่าเละ",
    cause: "รดน้ำมากเกินไป ดินระบายน้ำไม่ดี",
    solution: "ลดการรดน้ำ ปรับปรุงดินให้ระบายน้ำดี",
    severity: "high",
    isGeneral: true,
    specificPlantIds: [],
    images: ["https://www.dailynews.co.th/wp-content/uploads/2025/05/tje6.jpg"],
  },
  {
    id: "sym_005",
    name: "โรคใบไหม้",
    description: "ขอบใบหรือปลายใบเปลี่ยนเป็นสีน้ำตาลแห้ง",
    cause: "แสงแดดจัดเกินไป ขาดน้ำ หรือปุ๋ยมากเกินไป",
    solution: "ย้ายไปที่ร่ม รดน้ำให้เพียงพอ ลดปริมาณปุ๋ย",
    severity: "medium",
    isGeneral: true,
    specificPlantIds: [],
    images: [
      "https://www.packingag.com/images/contents/news/pest-problem/2018/packing-ag/problem/Late-blight/152655.jpg",
    ],
  },
  {
    id: "sym_006",
    name: "โรคเพลี้ยอ่อน",
    description: "มีแมลงขนาดเล็กสีเขียวหรือดำเกาะตามใบอ่อน",
    cause: "แมลงศัตรูพืช ดูดกินน้ำเลี้ยง",
    solution: "ฉีดพ่นน้ำสบู่ สารสกัดสะเดา หรือยาฆ่าแมลง",
    severity: "medium",
    isGeneral: true,
    specificPlantIds: [],
    images: [
      "https://unilife.co.th/wp-content/uploads/2022/05/Slide_%E0%B9%80%E0%B8%9E%E0%B8%A5%E0%B8%B5%E0%B9%89%E0%B8%A2%E0%B8%AD%E0%B9%88%E0%B8%AD%E0%B8%994.jpg",
    ],
  },

  // ==================== โรคเฉพาะพืช ====================
  {
    id: "sym_007",
    name: "โรคกรีนนิ่ง",
    description: "ใบด่างเหลือง ผลบิดเบี้ยว รสขม ต้นโทรม",
    cause: "เชื้อแบคทีเรียที่แพร่โดยเพลี้ยกระโดด",
    solution: "ไม่มีทางรักษา ต้องถอนทำลายต้น ป้องกันเพลี้ย",
    severity: "high",
    isGeneral: false,
    specificPlantIds: ["plant_001"], // มะนาว, ส้ม
    images: [
      "https://th-test-11.slatic.net/p/d9d3fb9a3cc61937ef9d29b8732c1a7d.jpg",
    ],
  },
  {
    id: "sym_008",
    name: "โรคตายพราย",
    description: "ใบเหลืองจากขอบใบ ลำต้นแตก มีเมือกไหล",
    cause: "เชื้อราฟิวซาเรียมในดิน",
    solution: "ไม่มีทางรักษา ถอนทำลาย ปลูกพันธุ์ต้านทาน",
    severity: "high",
    isGeneral: false,
    specificPlantIds: ["plant_003"], // กล้วย
    images: [
      "https://t.dailynews.co.th/wp-content/uploads/2025/05/lgaeglk.jpg",
    ],
  },
  {
    id: "sym_009",
    name: "โรคแอนแทรคโนส",
    description: "มีแผลสีน้ำตาลบุ๋มบนผลหรือใบ ผลเน่า",
    cause: "เชื้อราในสภาพอากาศร้อนชื้น",
    solution: "ตัดส่วนที่เป็นโรคทิ้ง ฉีดพ่นสารป้องกันเชื้อรา",
    severity: "high",
    isGeneral: false,
    specificPlantIds: ["plant_001", "plant_002", "plant_006"], // มะนาว, มะม่วง, พริก
    images: ["https://www.phtnet.org/article/images/a52_1.png"],
  },
  {
    id: "sym_010",
    name: "โรคใบหงิกเหลือง",
    description: "ใบบิดงอ หงิก เหลืองซีด ต้นแคระแกร็น",
    cause: "เชื้อไวรัสที่แพร่โดยแมลงหวี่ขาว",
    solution: "ถอนต้นที่เป็นโรค กำจัดแมลงหวี่ขาว",
    severity: "high",
    isGeneral: false,
    specificPlantIds: ["plant_006", "plant_007"], // พริก, มะเขือเทศ
    images: [
      "https://www.kasetnews.com/wp-content/uploads/2022/04/Tomato-Leaf-Curl-1600x800-1-1024x512.jpg",
    ],
  },
  {
    id: "sym_011",
    name: "โรคดอกร่วง",
    description: "ดอกร่วงก่อนบาน กลีบดอกมีจุดน้ำตาล",
    cause: "เชื้อราโบทริทิส ความชื้นสูงเกินไป",
    solution: "ลดความชื้น ตัดดอกที่เป็นโรค ฉีดยากันรา",
    severity: "medium",
    isGeneral: false,
    specificPlantIds: ["plant_004", "plant_012"], // กุหลาบ, กล้วยไม้
    images: [
      "https://songsangjun.com/wp-content/uploads/2024/04/%E0%B9%82%E0%B8%A3%E0%B8%84%E0%B8%94%E0%B8%AD%E0%B8%81%E0%B8%A3%E0%B9%88%E0%B8%A7%E0%B8%87.jpeg",
    ],
  },
  {
    id: "sym_012",
    name: "โรคเหง้าเน่า",
    description: "เหง้าเปลี่ยนสีน้ำตาล เน่าเละ มีกลิ่นเหม็น",
    cause: "เชื้อราไพเทียมในดินที่แฉะ",
    solution: "ขุดเหง้าที่เน่าทิ้ง ปรับดินให้ระบายน้ำดี",
    severity: "high",
    isGeneral: false,
    specificPlantIds: ["plant_010"], // ขิง
    images: [
      "https://lh5.googleusercontent.com/proxy/QJFCTUr0_Un1w4QzvNvjTrRCOGLvNwu4pGzEvlESnmu_DbOH9AXFYgxWp4w-XFt1VCIGi_6fkm7ZQiXtcJFMy0beyfDUnR8cloM-hwIJmzoJmfvNv30vqDf6",
    ],
  },
];

symptoms.forEach(function (obj) {
  db.collection("symptoms")
    .doc(obj.id)
    .set({
      name: obj.name,
      description: obj.description,
      cause: obj.cause,
      solution: obj.solution,
      severity: obj.severity,
      isGeneral: obj.isGeneral,
      specificPlantIds: obj.specificPlantIds,
      images: obj.images,
      isActive: true,
      createdAt: Timestamp.now(),
    })
    .then(function () {
      console.log("Document written with ID: " + obj.id);
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
});
