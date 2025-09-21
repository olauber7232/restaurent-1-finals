import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import type { GalleryImage } from "@shared/schema";

const fadeIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 }
  }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const Gallery: React.FC = () => {
  const { data: galleryImages, isLoading } = useQuery<GalleryImage[]>({
    queryKey: ["/api/gallery-images"],
  });

  return (
    <>
      <section className="pt-28 pb-8 bg-cream">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-dancing text-gold text-4xl mb-2">Experience</h1>
            <h2 className="font-playfair font-bold text-4xl md:text-5xl mb-6">
              Our Gallery
            </h2>
            <p className="text-gray-600 mb-8">
              Take a visual tour through our restaurant and delicious cuisine
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-maroon border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Loading gallery images...</p>
              </div>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              initial="hidden"
              animate="visible"
              variants={stagger}
            >
              {galleryImages?.map((image) => (
                <motion.div
                  key={image.id}
                  className="gallery-item overflow-hidden rounded-lg shadow-md"
                  variants={fadeIn}
                >
                  <img
                    src={image.imageUrl}
                    alt={image.altText || image.title}
                    className="w-full h-64 object-cover hover:scale-110 transition-transform duration-500"
                  />
                </motion.div>
              ))}
            </motion.div>
          )}

          {!isLoading && (!galleryImages || galleryImages.length === 0) && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No gallery images available.</p>
            </div>
          )}
        </div>
      </section>

      {/* Restaurant Experience */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="font-dancing text-gold text-3xl mb-2">Our Promise</h3>
            <h4 className="font-playfair font-bold text-3xl mb-6">
              The Daily Food House Experience
            </h4>
            <p className="text-gray-600">
              At Daily Food House, we promise more than just a meal – we offer an 
              unforgettable culinary journey through the rich tapestry of Indian flavors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              className="bg-white p-8 rounded-lg shadow-lg"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h5 className="font-playfair font-bold text-xl mb-4 text-maroon">
                Authentic Flavors
              </h5>
              <p className="text-gray-600 mb-4">
                Our dishes are prepared using traditional recipes passed down through 
                generations, ensuring an authentic taste experience that transports 
                you to the heart of India.
              </p>
              <p className="text-gray-600">
                We use only the finest ingredients, freshest produce, and aromatic 
                spices to create dishes that are both visually stunning and incredibly 
                flavorful.
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-8 rounded-lg shadow-lg"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h5 className="font-playfair font-bold text-xl mb-4 text-maroon">
                Warm Hospitality
              </h5>
              <p className="text-gray-600 mb-4">
                In true Indian tradition, we believe in "Atithi Devo Bhava" – 
                the guest is God. Our attentive staff provides impeccable service 
                to make your dining experience truly special.
              </p>
              <p className="text-gray-600">
                Whether you're celebrating a special occasion or simply enjoying 
                a casual meal, we strive to create a warm and welcoming atmosphere 
                that makes you feel right at home.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Gallery;
