"use strict";
const { Review, User, Spot } = require("../models");

//
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      const u5 = await User.findOne({ where: { email: "honeydew@user.io" } });
      const u4 = await User.findOne({ where: { email: "sixlegs@user.io" } });
      const u3 = await User.findOne({ where: { email: "colony@user.io" } });

      const spt1 = await Spot.findOne({
        where: { address: "1 Barkwood Court" },
      });
      const spt2 = await Spot.findOne({
        where: { address: "2 Crumb Avenue" },
      });
      const spt3 = await Spot.findOne({
        where: { address: "3 Chocolate Drive" },
      });
      const spt4 = await Spot.findOne({
        where: { address: "4 Pebble Path" },
      });
      const spt5 = await Spot.findOne({
        where: { address: "5 Dewdrop Blvd" },
      });
      const spt6 = await Spot.findOne({
        where: { address: "6 Underground Way" },
      });
      const spt7 = await Spot.findOne({
        where: { address: "7 Trashcan Road" },
      });
      const spt8 = await Spot.findOne({
        where: { address: "8 Silk Street" },
      });
      const spt9 = await Spot.findOne({
        where: { address: "9 Leaf Lane" },
      });
      await Review.bulkCreate(
        [
          {
            spotId: spt1.id,
            userId: u5.id,
            review:
              "Unfortunately, my experience at The Great Oak Condo was less than stellar. While the location at 1 Barkwood Court offered a stunning park view, the amenities did not meet my expectations, which was quite disappointing for the price.",
            stars: 2,
          },
          {
            spotId: spt2.id,
            userId: u5.id,
            review:
              "Sandwich Manor at 2 Crumb Avenue is delightfully whimsical! It's spacious and truly unique, being set in a gourmet sandwich. The fresh ingredient aroma added a novel twist to our stay. Definitely worth a visit for those looking for something different.",
            stars: 4,
          },
          {
            spotId: spt3.id,
            userId: u5.id,
            review:
              "I was excited about Candy Bar Castle at 3 Chocolate Drive, but the stay was a letdown. The sweet allure could not make up for the lack of essential comforts, making it hard to enjoy the otherwise enchanting chocolate walls.",
            stars: 1,
          },
          {
            spotId: spt4.id,
            userId: u5.id,
            review:
              "Granite Towers at 4 Pebble Path has a certain majestic charm with its pebble-strewn facade, but the overall comfort was average, making my stay fairly ordinary compared to the grand exterior promised.",
            stars: 3,
          },
          {
            spotId: spt5.id,
            userId: u5.id,
            review:
              "Dewdrop Inn at 5 Dewdrop Blvd was an absolute dream! The moist ambiance of the morning dew and the lush grass made it a refreshing getaway from the usual ant hustle. Every part of the inn is perfectly designed for relaxation.",
            stars: 5,
          },
          {
            spotId: spt6.id,
            userId: u5.id,
            review:
              "The Subterranean Suite at 6 Underground Way offers an intriguing underground experience, but the dampness and limited light made it less comfortable than expected, proving that not all novel ideas translate well in reality.",
            stars: 2,
          },
          {
            spotId: spt7.id,
            userId: u5.id,
            review:
              "Recycle Bin Retreat at 7 Trashcan Road provides a unique eco-friendly concept, but the cramped space and the lingering scent of recycling materials made the stay less enjoyable.",
            stars: 2,
          },
          {
            spotId: spt8.id,
            userId: u5.id,
            review:
              "Silk Road Residence at 8 Silk Street promises a secure, silk-wrapped haven, but it felt more restrictive than luxurious, lacking the comfort expected at such a high price point.",
            stars: 2,
          },
          {
            spotId: spt9.id,
            userId: u5.id,
            review:
              "Leaf Loft at 9 Leaf Lane, while charming with its integration into the forest floor, lacked the privacy and amenities needed for a truly comfortable stay, making it more of a novelty than a restful retreat.",
            stars: 2,
          },
          {
            spotId: spt1.id,
            userId: u4.id,
            review:
              "The Great Oak Condo was quite cozy, with each room beautifully crafted from oak. However, some modern amenities were missing, which made our stay less comfortable than anticipated.",
            stars: 3,
          },
          {
            spotId: spt2.id,
            userId: u4.id,
            review:
              "Absolutely loved Sandwich Manor! The culinary architecture is something out of a fairy tale. Each corner is well-crafted, providing both comfort and a unique aesthetic appeal.",
            stars: 5,
          },
          {
            spotId: spt3.id,
            userId: u4.id,
            review:
              "Candy Bar Castle was a sweet paradise! The blend of nougat layers and caramel not only delighted the eyes but also provided a comforting stay.",
            stars: 5,
          },
          {
            spotId: spt4.id,
            userId: u4.id,
            review:
              "Granite Towers stood out with its luxurious pebble design and majestic views, offering a royal experience that far exceeded my expectations.",
            stars: 5,
          },
          {
            spotId: spt5.id,
            userId: u4.id,
            review:
              "Dewdrop Inn provided the perfect serene getaway. The dew-covered grass and cooling ambiance made it an invigorating stay.",
            stars: 5,
          },
          {
            spotId: spt5.id,
            userId: u4.id,
            review:
              "Dewdrop Inn's second visit didn't quite match the charm of the first. While still pleasant, some of the magic seemed to have faded.",
            stars: 3,
          },
          {
            spotId: spt6.id,
            userId: u4.id,
            review:
              "The Subterranean Suite proved too damp this time around, and the novelty of underground living wore off quickly, leading to a rather uncomfortable stay.",
            stars: 1,
          },
          {
            spotId: spt7.id,
            userId: u4.id,
            review:
              "Recycle Bin Retreat was a surprising delight with its creative use of recycled materials, offering a comfortable stay while being environmentally conscious.",
            stars: 5,
          },
          {
            spotId: spt1.id,
            userId: u3.id,
            review:
              "The Great Oak Condo is a perfect blend of nature and luxury. Its tranquil setting and high-end amenities ensured a memorable and relaxing stay.",
            stars: 5,
          },
          {
            spotId: spt2.id,
            userId: u3.id,
            review:
              "Sandwich Manor continues to impress with its innovative design and comfortable living space crafted from actual food items, making every visit delightful.",
            stars: 5,
          },
          {
            spotId: spt3.id,
            userId: u3.id,
            review:
              "Candy Bar Castle is truly a feast for the senses. The luxurious candy-themed decor provided an unforgettable experience.",
            stars: 5,
          },
          {
            spotId: spt4.id,
            userId: u3.id,
            review:
              "Granite Towers is the epitome of luxury. The sophisticated design and stunning views provided an unparalleled living experience.",
            stars: 5,
          },
        ],
        { validate: true }
      );
    } catch (e) {
      console.log("reviews seed error: ", e);
    }
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Reviews";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        review: {
          [Op.in]: [
            "Unfortunately, my experience at The Great Oak Condo was less than stellar. While the location at 1 Barkwood Court offered a stunning park view, the amenities did not meet my expectations, which was quite disappointing for the price.",
            "Sandwich Manor at 2 Crumb Avenue is delightfully whimsical! It's spacious and truly unique, being set in a gourmet sandwich. The fresh ingredient aroma added a novel twist to our stay. Definitely worth a visit for those looking for something different.",
            "I was excited about Candy Bar Castle at 3 Chocolate Drive, but the stay was a letdown. The sweet allure could not make up for the lack of essential comforts, making it hard to enjoy the otherwise enchanting chocolate walls.",
            "Granite Towers at 4 Pebble Path has a certain majestic charm with its pebble-strewn facade, but the overall comfort was average, making my stay fairly ordinary compared to the grand exterior promised.",
            "Dewdrop Inn at 5 Dewdrop Blvd was an absolute dream! The moist ambiance of the morning dew and the lush grass made it a refreshing getaway from the usual ant hustle. Every part of the inn is perfectly designed for relaxation.",
            "The Subterranean Suite at 6 Underground Way offers an intriguing underground experience, but the dampness and limited light made it less comfortable than expected, proving that not all novel ideas translate well in reality.",
            "Recycle Bin Retreat at 7 Trashcan Road provides a unique eco-friendly concept, but the cramped space and the lingering scent of recycling materials made the stay less enjoyable.",
            "Silk Road Residence at 8 Silk Street promises a secure, silk-wrapped haven, but it felt more restrictive than luxurious, lacking the comfort expected at such a high price point.",
            "Leaf Loft at 9 Leaf Lane, while charming with its integration into the forest floor, lacked the privacy and amenities needed for a truly comfortable stay, making it more of a novelty than a restful retreat.",
            "The Great Oak Condo was quite cozy, with each room beautifully crafted from oak. However, some modern amenities were missing, which made our stay less comfortable than anticipated.",
            "Absolutely loved Sandwich Manor! The culinary architecture is something out of a fairy tale. Each corner is well-crafted, providing both comfort and a unique aesthetic appeal.",
            "Candy Bar Castle was a sweet paradise! The blend of nougat layers and caramel not only delighted the eyes but also provided a comforting stay.",
            "Granite Towers stood out with its luxurious pebble design and majestic views, offering a royal experience that far exceeded my expectations.",
            "Dewdrop Inn provided the perfect serene getaway. The dew-covered grass and cooling ambiance made it an invigorating stay.",
            "Dewdrop Inn's second visit didn't quite match the charm of the first. While still pleasant, some of the magic seemed to have faded.",
            "The Subterranean Suite proved too damp this time around, and the novelty of underground living wore off quickly, leading to a rather uncomfortable stay.",
            "Recycle Bin Retreat was a surprising delight with its creative use of recycled materials, offering a comfortable stay while being environmentally conscious.",
            "The Great Oak Condo is a perfect blend of nature and luxury. Its tranquil setting and high-end amenities ensured a memorable and relaxing stay.",
            "Sandwich Manor continues to impress with its innovative design and comfortable living space crafted from actual food items, making every visit delightful.",
            "Candy Bar Castle is truly a feast for the senses. The luxurious candy-themed decor provided an unforgettable experience.",
            "Granite Towers is the epitome of luxury. The sophisticated design and stunning views provided an unparalleled living experience.",
          ],
        },
      },
      {}
    );
  },
};
