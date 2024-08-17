const admin = require("firebase-admin");

exports.createUser = async (req, res) => {
  const { uid, email } = req.body;

  try {
    const userRef = admin.firestore().collection("users").doc(uid);

    await userRef.set({
      email: email,
      profile: null,
      cart: null,
      orders: null,
    });

    res.status(200).send({ message: "User document created successfully" });
  } catch (error) {
    console.error("Error creating user document:", error);
    res.status(500).send({ error: "Failed to create user document" });
  }
};

exports.verifyToken = async (req, res, next) => {
  const idToken = req.headers.authorization?.split("Bearer ")[1];

  if (!idToken) {
    return res.status(403).send("No token provided.");
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(401).send("Unauthorized");
  }
};