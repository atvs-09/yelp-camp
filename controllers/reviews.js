const Review = require("../models/review");
const Campground = require("../models/campground");


module.exports.createReview = async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    campground.review.push(review);
    review.author = req.user._id;
    await campground.save();
    await review.save();
    req.flash("success", "Successfully added review!")
    res.redirect(`/campgrounds/${req.params.id}`);
}

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { $pull: { review: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Successfully deleted review!")
    res.redirect(`/campgrounds/${id}`);

}