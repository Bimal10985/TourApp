import mongoose from "mongoose";
import TourModel from "../models/tour.js";
export const createTour = async (req, res, imageName) => {
  // const tour = req.body;
  console.log(req.body, "first");
  const newTour = new TourModel({
    title: req.body.title,
    description: req.body.description,
    name: req.body.name,
    image: imageName,
    createdAt: new Date().toISOString(),
    user: req.body.user,
  });
  console.log(newTour, "second");
  try {
    await newTour.save();
    res.status(201).json(newTour);
  } catch (error) {
    res.status(401).json({ message: "Something went wrong" });
  }
};

// export const getAllTours = async (req, res) => {
//   try {
//     const allTours = await TourModel.find();
//     res.status(201).json(allTours);
//   } catch (error) {
//     res.status(401).json({ message: "Something went wrong" });
//   }
// };
export const getAllTours = async (req, res) => {
  const { page } = req.query;
  try {
    // const allTours = await TourModel.find();
    // res.status(201).json(allTours);
    const limit = 6;
    const startIndex = (Number(page) - 1) * limit;
    const total = await TourModel.countDocuments({});
    const tours = await TourModel.find().limit(limit).skip(startIndex);
    res.json({
      data: tours,
      currentPage: Number(page),
      totalTours: total,
      numberOfPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(401).json({ message: "Something went wrong" });
  }
};

export const getTourById = async (req, res) => {
  const { id } = req.params;
  try {
    const tour = await TourModel.findById(id);
    if (tour) {
      return res.status(200).json(tour);
    }
  } catch (error) {
    res.status(401).json({ message: "Something went wrong" });
  }
};
export const getToursByUser = async (req, res) => {
  const { userID } = req.params;
  if (!mongoose.Types.ObjectId.isValid(userID)) {
    return res.status(404).json({ message: "User doesnot exist" });
  }
  const tours = await TourModel.find({ user: userID });
  res.status(200).json({ tours });
};
export const deleteTour = async (req, res) => {
  const { id } = req.params;
  try {
    if (id) {
      await TourModel.findByIdAndDelete(id);
      res.status(200).json({ message: "Tour deleted successfully" });
    }
  } catch (error) {
    res.status(401).json({ message: "Something went wrong" });
  }
};

export const searchTour = async (req, res) => {
  const { searchQuery } = req.query;
  console.log(searchQuery);
  try {
    const tours = await TourModel.find({
      title: { $regex: req.query.searchQuery, $options: "i" },
    });
    res.json(tours);
  } catch (error) {
    res.status(401).json({ message: "Something went wrong" });
  }
};

export const updateTourById = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  const tour = await TourModel.findById(id);
  if (tour) {
    tour.title = req.body.title || tour.title;
    tour.description = req.body.description || tour.description;
    // tour.image = req.body.image || tour.image;
    // tour.user = tour.user;
    await tour.save();
    res.status(201).json(tour);
  } else {
    return res
      .status(400)
      .json({ success: false, message: "Tour Update failed" });
  }
};

// domain:dev-2up7zc8s7t8p8mmm.us.auth0.com

// EDfd3wPVTNnrRmTJRDYYkqvYbMPNwAir

//client secret:jPL02VigiifMRfd15xtsYhXQ5AdE7ZSsLcApVPqlSDAJfLY13v63QjjrvXo9wSp1
