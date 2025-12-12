var admin = require("firebase-admin");
const { getFirestore, Timestamp } = require("firebase-admin/firestore");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

var db = getFirestore();

var categories = [
  {
    id: "cat_001",
    name: "ไม้ผล",
    description: "พืชที่ให้ผลผลิตเป็นผลไม้",
    icon: "🍊",
    color: "#FF9500",
  },
  {
    id: "cat_002",
    name: "ไม้ดอก",
    description: "พืชที่ปลูกเพื่อความสวยงามของดอก",
    icon: "🌸",
    color: "#FF69B4",
  },
  {
    id: "cat_003",
    name: "พืชผัก",
    description: "พืชที่ใช้เป็นอาหาร",
    icon: "🥬",
    color: "#32CD32",
  },
  {
    id: "cat_004",
    name: "สมุนไพร",
    description: "พืชที่ใช้เป็นยาหรือเครื่องปรุง",
    icon: "🌿",
    color: "#228B22",
  },
];

categories.forEach(function (obj) {
  db.collection("categories")
    .doc(obj.id)
    .set({
      name: obj.name,
      description: obj.description,
      icon: obj.icon,
      color: obj.color,
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
