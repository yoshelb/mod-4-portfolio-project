"use strict";

const { Spot, User } = require("../models");
//
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      const u1 = await User.findOne({ where: { email: "antenna@user.io" } });
      const u2 = await User.findOne({ where: { email: "mandible@user.io" } });
      const u3 = await User.findOne({ where: { email: "colony@user.io" } });
      const u4 = await User.findOne({ where: { email: "sixlegs@user.io" } });

      console.log("SEEDING DEMO SPOTS TYPE OF ID", typeof u1.id);

      await Spot.bulkCreate(
        [
          {
            ownerId: u1.id,
            address: "1 Barkwood Court",
            city: "Tinytown",
            state: "Leafyville",
            country: "Antland",
            lat: 34.052235,
            lng: -118.243683,
            name: "The Great Oak Condo",
            description:
              "Welcome to \"The Great Oak Condo,\" a luxurious tree trunk retreat nestled in the heart of Tinytown, Leafyville. Perfectly situated at 1 Barkwood Court, this unique rental offers a stunning view of the local park, providing a serene backdrop for your stay. Designed specifically for ants, this condo maximizes comfort and elegance within its natural oak surroundings, blending rustic charm with modern amenities.\n\nEach room in this cozy abode is finely crafted from the rich, warm wood of an ancient oak, offering both comfort and a whisper of the wild outdoors. For just 10 units per night, you can unwind in a space that celebrates the grandeur of nature while providing all the comforts you'd expect from a high-end rental. Whether you're visiting for leisure or a touch of adventure, The Great Oak Condo promises a memorable stay, enveloped by the tranquil beauty of Leafyville's most prized landscapes.",
            price: 10,
          },
          {
            ownerId: u1.id,
            address: "2 Crumb Avenue",
            city: "Crumbville",
            state: "Bread State",
            country: "Antland",
            lat: 40.712776,
            lng: -74.005974,
            name: "Sandwich Manor",
            description:
              "Discover the unique charm of \"Sandwich Manor,\" an extraordinary living space ingeniously crafted within a gourmet sandwich left over from a lavish picnic. Located at 2 Crumb Avenue in the bustling heart of Crumbville, Bread State, this delightful rental offers a one-of-a-kind experience for ants seeking adventure and comfort in a food-inspired dwelling. Priced at just 15 units per night, this spacious manor provides ample room and an ambience that’s both whimsical and cozy.\n\nInside Sandwich Manor, you'll find yourself surrounded by layers of artisan breads, fresh greens, and an assortment of fine meats and cheeses, all blending to create not only a visual feast but a literal one. The scent of fresh ingredients fills the air, enhancing the surreal experience of living inside a sandwich. Each corner of this abode is tailored to ensure comfort while celebrating the novelty of its culinary architecture. Whether you're here to relax or explore, Sandwich Manor offers an unforgettable stay in the flavorful world of Crumbville.",
            price: 15,
          },
          {
            ownerId: u1.id,
            address: "3 Chocolate Drive",
            city: "Candy City",
            state: "Sweet State",
            country: "Antland",
            lat: 37.774929,
            lng: -122.419418,
            name: "Candy Bar Castle",
            description:
              'Step into a sugary paradise at "Candy Bar Castle," a unique getaway nestled in a half-eaten candy bar. Located at 3 Chocolate Drive in the vibrant Candy City, Sweet State, this enchanting rental provides a dreamy escape with all the trappings of a sweet retreat. For just 20 units per night, experience living in a space where every corner offers a hint of chocolate bliss, making it the perfect spot for ants with a sweet tooth looking for luxury in every bite.\n\nCandy Bar Castle boasts an interior that tastefully combines comfort with the whimsy of candy-inspired architecture. Enjoy the lush layers of nougat, the richness of caramel, and the crunch of chocolate, all fused to create a cozy yet luxurious living space. From the chocolate-draped walls to the candy-coated ceilings, every detail at Candy Bar Castle is designed to enchant and delight. Whether seeking a peaceful retreat or an adventurous stay, this sweet escape is sure to provide an unforgettable experience in the heart of Candy City.',
            price: 20,
          },
          {
            ownerId: u2.id,
            address: "4 Pebble Path",
            city: "Rockville",
            state: "Granite State",
            country: "Antland",
            lat: 34.052235,
            lng: -118.243683,
            name: "Granite Towers",
            description:
              'Welcome to "Granite Towers," an exclusive residence crafted from the finest pebbles, designed specifically for ant royalty. Situated at 4 Pebble Path in the prestigious Rockville, Granite State, this majestic property offers a luxurious escape priced at just 12 units per night. With its unique pebble-strewn exterior and regal, rock-solid structure, Granite Towers provides an unmatched level of sophistication and privacy in the heart of Antland.\n\nInside, the opulent decor of Granite Towers reflects its stony surroundings with an elegant, yet rugged aesthetic. Each room is meticulously assembled from thousands of tiny, smooth pebbles, creating a serene and majestic ambiance that caters to the most discerning ants. The property’s majestic towers and expansive views ensure that every stay is not just a visit, but a royal experience. Whether you\'re seeking a tranquil retreat or a grand adventure, Granite Towers stands as a pillar of luxury in the vibrant world of Rockville.',
            price: 12,
          },
          {
            ownerId: u2.id,
            address: "5 Dewdrop Blvd",
            city: "Morning Dew",
            state: "Fresh State",
            country: "Antland",
            lat: 40.712776,
            lng: -74.005974,
            name: "Dewdrop Inn",
            description:
              'Discover the refreshing charm of "Dewdrop Inn," where luxury meets nature at its most serene. Located at 5 Dewdrop Blvd in the lush Morning Dew, Fresh State, this exquisite inn offers a unique stay for just 8 units per night. Nestled in the heart of vibrant morning dew-covered grass, Dewdrop Inn provides a cool and moist ambiance that ensures a rejuvenating retreat for ant visitors seeking comfort in the freshness of nature.\n\nThe inn’s design seamlessly integrates with the wet blades of grass, creating an environment that is both naturally cooling and visually stunning. Each room at Dewdrop Inn is a haven of tranquility, offering plush accommodations amid the gentle morning dew. The combination of high-end amenities and the inn’s distinctive location makes every stay an invigorating experience, perfect for those looking to relax, refresh, and revive. Whether you\'re an early riser or a lover of nature’s delicate beauty, Dewdrop Inn is the ideal spot to enjoy the peacefulness of Morning Dew.',
            price: 8,
          },
          {
            ownerId: u2.id,
            address: "6 Underground Way",
            city: "Soil City",
            state: "Earth State",
            country: "Antland",
            lat: 37.774929,
            lng: -122.419418,
            name: "The Subterranean Suite",
            description:
              'Step into the earthy embrace of "The Subterranean Suite," a modern twist on the classic ant hill, crafted for those who appreciate the allure of underground living. Located at 6 Underground Way in Soil City, Earth State, this distinctive rental is set at an inviting price of just 5 units per night. Revamped into a chic, modern getaway, The Subterranean Suite offers a unique lodging experience, combining rustic charm with contemporary comfort deep within the serene depths of Antland.\n\nBeneath the surface, you will find a cozy, elegantly designed space that redefines the concept of an ant hill. Every aspect of The Subterranean Suite has been thoughtfully updated to provide all the modern amenities while maintaining a connection to the earthy environment. The cool, soil-wrapped walls not only create a naturally insulated setting but also a tranquil ambiance that is perfect for relaxation and rejuvenation. Whether you\'re looking to escape the hustle and bustle of the surface world or immerse yourself in a peaceful subterranean retreat, The Subterranean Suite promises a memorable stay in the heart of Soil City.',
            price: 5,
          },
          {
            ownerId: u3.id,
            address: "7 Trashcan Road",
            city: "Garbageville",
            state: "Waste State",
            country: "Antland",
            lat: 34.052235,
            lng: -118.243683,
            name: "Recycle Bin Retreat",
            description:
              "Embrace sustainability with a stay at \"Recycle Bin Retreat,\" an eco-friendly sanctuary tucked away in a creatively repurposed trash can. Located at 7 Trashcan Road in the innovative city of Garbageville, Waste State, this unique retreat offers an exceptional experience for just 9 units per night. It's a perfect spot for environmentally conscious ants seeking a quaint and quirky escape that combines comfort with a commitment to recycling.\n\nRecycle Bin Retreat is not only a testament to sustainable living but also a cozy haven that proves eco-friendliness doesn't compromise on style or comfort. The interior of this recycled can has been ingeniously transformed to provide all the modern amenities while promoting environmental values. From the moment you climb in, you'll be enveloped by the innovative use of materials and space, ensuring every aspect of your stay is both comfortable and impactful. Whether you're in town for relaxation or adventure, Recycle Bin Retreat offers a unique way to experience Garbageville, celebrating the spirit of recycling in every corner of its compact, charming space.",
            price: 9,
          },
          {
            ownerId: u3.id,
            address: "8 Silk Street",
            city: "Webtown",
            state: "Spider State",
            country: "Antland",
            lat: 40.712776,
            lng: -74.005974,
            name: "Silk Road Residence",
            description:
              'Experience the unique comfort of "Silk Road Residence," a secure haven nestled in the heart of Webtown, Spider State. This luxurious residence, located at 8 Silk Street, offers a serene retreat for just 18 units per night, wrapped in the finest silk provided by our friendly spider neighbors. It\'s the perfect choice for ants seeking a safe and exquisite stay, with every corner of the home meticulously woven to ensure both security and elegance.\n\nAt Silk Road Residence, guests can enjoy the soft, lustrous surroundings that silk aficionados dream of. The interior features beautifully crafted silk walls and furnishings that radiate a calming, opulent atmosphere, making it ideal for those looking to unwind in style. Whether you’re here to relax or explore the vibrant city of Webtown, Silk Road Residence provides a remarkable experience, combining the artistry of spider silk with the comforts of upscale living.',
            price: 18,
          },
          {
            ownerId: u4.id,
            address: "9 Leaf Lane",
            city: "Foliage Fort",
            state: "Green State",
            country: "Antland",
            lat: 37.774929,
            lng: -122.419418,
            name: "Leaf Loft",
            description:
              "Discover the enchanting charm of \"Leaf Loft,\" a picturesque retreat nestled at 9 Leaf Lane in the lush surroundings of Foliage Fort, Green State. Priced affordably at just 7 units per night, this leafy loft offers a unique stay that harmoniously blends with the forest floor, providing a seamless natural experience. Ideal for ants who appreciate the beauty of nature, Leaf Loft serves as a perfect base for exploring the verdant wonders of Antland.\n\nAs you step inside Leaf Loft, you're greeted by an interior that is entirely integrated with its environment, using the natural materials and colors of the forest to furnish and decorate the space. The loft's design is thoughtful and eco-friendly, featuring walls and floors crafted from fallen leaves and branches, all arranged to create a cozy, inviting atmosphere. Whether seeking a peaceful retreat or an adventurous exploration, Leaf Loft promises a memorable and immersive experience in the heart of nature's tranquility.",
            price: 7,
          },
        ],
        { validate: true }
      );
    } catch (e) {
      console.log("spots-seed-error", e);
    }
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Spots";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        address: {
          [Op.in]: [
            "7 Trashcan Road",
            "8 Silk Street",
            "9 Leaf Lane",
            "6 Underground Way",
            "5 Dewdrop Blvd",
            "4 Pebble Path",
            "3 Chocolate Drive",
            "2 Crumb Avenue",
            "1 Barkwood Court",
          ],
        },
      },
      {}
    );
  },
};
