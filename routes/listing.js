const express = require("express");
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const Listing = require('../models/listing.js');
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage});

router.route("/")
.get( wrapAsync(listingController.index))
.post(
    isLoggedIn,
    upload.single('listing[image]'),
    validateListing,
    wrapAsync(listingController.createListing)
);


//New route
router.get('/new', isLoggedIn,listingController.renderNewForm );

router.route('/:id')
.get( wrapAsync(listingController.showListing))
.put( isLoggedIn, isOwner,
    upload.single('listing[image]'),
    validateListing,
    wrapAsync(listingController.updateListing))
.delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

//Edit route
router.get('/:id/edit', isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));


module.exports = router;





// const express = require("express");
// const router = express.Router();
// const methodOverride = require("method-override");
// const listings = require("../data.js");

// router.use(methodOverride("_method"));

// router.get("/", (req, res) => {
//   res.render("index.ejs", { listings });
// });

// router.get("/new", (req, res) => {
//   res.render("new.ejs");
// });

// router.post("/", (req, res) => {
//   const { listing } = req.body;
//   listing.id = Date.now().toString();
//   listings.push(listing);
//   res.redirect("/listings");
// });

// router.get("/:id", (req, res) => {
//   const { id } = req.params;
//   const listing = listings.find((l) => l.id === id);
//   res.render("show.ejs", { listing });
// });

// router.get("/:id/edit", (req, res) => {
//   const { id } = req.params;
//   const listing = listings.find((l) => l.id === id);
//   res.render("edit.ejs", { listing });
// });

// router.put("/:id", (req, res) => {
//   const { id } = req.params;
//   const updatedListing = req.body.listing;
//   const index = listings.findIndex((l) => l.id === id);
//   if (index !== -1) {
//     listings[index] = { ...listings[index], ...updatedListing };
//   }
//   res.redirect(`/listings/${id}`);
// });

// router.delete("/:id", (req, res) => {
//   const { id } = req.params;
//   const index = listings.findIndex((l) => l.id === id);
//   if (index !== -1) {
//     listings.splice(index, 1);
//   }
//   res.redirect("/listings");
// });

// module.exports = router;