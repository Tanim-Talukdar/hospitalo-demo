
"use client";

import { useState } from "react";
import {
  FiArrowUpRight,
  FiChevronLeft,
  FiChevronRight,
  FiX,
  FiMaximize2,
  FiImage,
} from "react-icons/fi";

const categories = ["All Photos", "Hospital", "Facilities", "Medical Care", "Events"];

const galleryImages = [
  {
    id: 1,
    title: "Modern Hospital Exterior",
    category: "Hospital",
    image:
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1100&q=85",
    size: "large",
  },
  {
    id: 2,
    title: "Advanced Diagnostic Equipment",
    category: "Facilities",
    image:
      "https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=900&q=85",
    size: "normal",
  },
  {
    id: 3,
    title: "Patient Consultation",
    category: "Medical Care",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=85",
    size: "normal",
  },
  {
    id: 4,
    title: "Comfortable Patient Room",
    category: "Facilities",
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1100&q=85",
    size: "large",
  },
  {
    id: 5,
    title: "Healthcare Professionals",
    category: "Medical Care",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=900&q=85",
    size: "normal",
  },
  {
    id: 6,
    title: "Modern Medical Laboratory",
    category: "Facilities",
    image:
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=900&q=85",
    size: "normal",
  },
  {
    id: 7,
    title: "Healthcare Team",
    category: "Events",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1100&q=85",
    size: "large",
  },
  {
    id: 8,
    title: "Patient Care Environment",
    category: "Hospital",
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=900&q=85",
    size: "normal",
  },
  {
    id: 9,
    title: "Medical Team at Work",
    category: "Medical Care",
    image:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=85",
    size: "normal",
  },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All Photos");
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredImages =
    activeCategory === "All Photos"
      ? galleryImages
      : galleryImages.filter(
          (item) => item.category === activeCategory
        );

  const selectedIndex = filteredImages.findIndex(
    (item) => item.id === selectedImage?.id
  );

  const showPrevious = () => {
    const previousIndex =
      (selectedIndex - 1 + filteredImages.length) %
      filteredImages.length;

    setSelectedImage(filteredImages[previousIndex]);
  };

  const showNext = () => {
    const nextIndex =
      (selectedIndex + 1) % filteredImages.length;

    setSelectedImage(filteredImages[nextIndex]);
  };

  return (
    <main className="min-h-screen bg-[#f5f8fc]">
      {/* Page heading */}
      <section className="container-main pt-10 md:pt-14 pb-7">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#0d9488]">
              <FiImage size={15} />
              Our Gallery
            </div>

            <h1 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight text-[#172b45]">
              A closer look at our hospital
            </h1>

            <p className="mt-3 max-w-2xl text-sm md:text-base leading-7 text-[#64748b]">
              Explore our facilities, healthcare environment, and the
              people dedicated to caring for our patients.
            </p>
          </div>

          <div className="flex items-center gap-3 text-sm text-[#64748b]">
            <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-white border border-[#e5edf5] text-[#1268b3]">
              <FiImage size={19} />
            </span>
            <div>
              <p className="font-semibold text-[#172b45]">
                {filteredImages.length} Photos
              </p>
              <p className="text-xs mt-0.5">Explore our gallery</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery filters */}
      <section className="container-main pb-7">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => {
                setActiveCategory(category);
                setSelectedImage(null);
              }}
              className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                activeCategory === category
                  ? "bg-[#1268b3] text-white shadow-md shadow-blue-900/10"
                  : "bg-white border border-[#e5edf5] text-[#64748b] hover:border-[#1268b3] hover:text-[#1268b3]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery grid */}
      <section className="container-main pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredImages.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedImage(item)}
              className={`group relative overflow-hidden rounded-2xl bg-white border border-[#e5edf5] text-left shadow-sm hover:shadow-xl hover:shadow-blue-900/10 transition-all duration-300 ${
                item.size === "large" && index % 3 === 0
                  ? "sm:row-span-2"
                  : ""
              }`}
            >
              <div className="relative h-[260px] sm:h-full sm:min-h-[260px] min-h-[260px] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#071a32]/85 via-[#071a32]/10 to-transparent opacity-90" />

                <div className="absolute top-4 left-4">
                  <span className="rounded-full border border-white/25 bg-[#071a32]/35 backdrop-blur-md px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                    {item.category}
                  </span>
                </div>

                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition">
                  <FiMaximize2 size={16} />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold text-white">
                      {item.title}
                    </h2>
                    <p className="mt-1 text-xs text-white/70">
                      View photograph
                    </p>
                  </div>

                  <span className="w-9 h-9 shrink-0 rounded-full bg-white text-[#1268b3] flex items-center justify-center transition-transform group-hover:translate-x-1">
                    <FiArrowUpRight size={18} />
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="py-20 text-center rounded-2xl bg-white border border-[#e5edf5]">
            <FiImage className="mx-auto text-3xl text-slate-300" />
            <h3 className="mt-4 text-lg font-semibold text-[#172b45]">
              No photos found
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Try selecting another category.
            </p>
          </div>
        )}
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] bg-[#061426]/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
          onClick={() => setSelectedImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Gallery image preview"
        >
          <button
            type="button"
            onClick={() => setSelectedImage(null)}
            aria-label="Close preview"
            className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
          >
            <FiX size={22} />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showPrevious();
            }}
            aria-label="Previous image"
            className="absolute left-3 md:left-7 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
          >
            <FiChevronLeft size={25} />
          </button>

          <div
            className="w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative flex items-center justify-center">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="max-h-[75vh] max-w-full rounded-xl object-contain shadow-2xl"
              />
            </div>

            <div className="flex items-center justify-between gap-4 mt-5 text-white">
              <div>
                <p className="text-xs text-teal-300 uppercase tracking-widest font-semibold">
                  {selectedImage.category}
                </p>
                <h3 className="text-lg md:text-xl font-semibold mt-1">
                  {selectedImage.title}
                </h3>
              </div>

              <span className="text-sm text-white/60 shrink-0">
                {selectedIndex + 1} / {filteredImages.length}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            aria-label="Next image"
            className="absolute right-3 md:right-7 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
          >
            <FiChevronRight size={25} />
          </button>
        </div>
      )}
    </main>
  );
}
