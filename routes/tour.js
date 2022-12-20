import express from "express";
import {
  createTour,
  deleteTour,
  getAllTours,
  getTourById,
  getToursByUser,
  searchTour,
  updateTourById,
} from "../controllers/tour.js";
import multer from "multer";
const router = express.Router();
let imageName;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    imageName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      "-" +
      file.originalname.trim();
    cb(null, imageName);
  },
});
const upload = multer({ storage });

router.post("/createtour", upload.single("image"), (req, res) => {
  createTour(req, res, imageName);
});
router.get("/", getAllTours);

router.get("/usertours/:userID", getToursByUser);
router.get("/tour/:id", getTourById);
router.delete("/deletetour/:id", deleteTour);
router.get("/search", searchTour);
router.put("/updatetour/:id", updateTourById);
export default router;
