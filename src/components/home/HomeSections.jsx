
import Link from "next/link";
import {
  FiArrowRight,
  FiArrowUpRight,
  FiActivity,
  FiHeart,
  FiEye,
  FiGitBranch,
  FiWind,
  FiMonitor,
  FiShield,
  FiUsers,
  FiAward,
  FiClock,
  FiCheckCircle,
  FiPhone,
  FiCalendar,
  FiChevronRight,
  FiMapPin,
  FiStar,
} from "react-icons/fi";

const image = (id, width = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;


const departments = [
  {
    name: "Cardiology",
    subtitle: "Heart & cardiovascular care",
    description:
      "Heart health consultations, ECG testing, and cardiovascular care.",
    image:
      "https://p8zbhpr9dc6nh9c2.public.blob.vercel-storage.com/prevencia/generated/article-banners/optimized/analize-cardiologice-cas-ce-este-decontat-in-bucuresti-aspect16x9-p97brfjpy9dtqt5cdrgjwjmqws83bscb.webp",
    icon: FiHeart,
    color: "bg-rose-50 text-rose-600",
    alt: "Cardiologist preparing a patient for an ECG examination",
  },
  {
    name: "Neurology",
    subtitle: "Brain & nervous system",
    description:
      "Professional consultations for brain, nerve, and neurological health.",
    image:
      "https://images.pexels.com/photos/4266936/pexels-photo-4266936.jpeg?auto=compress&cs=tinysrgb&w=1000",
    icon: FiGitBranch,
    color: "bg-violet-50 text-violet-600",
    alt: "Doctor discussing a patient's health during a calm consultation",
  },
  {
    name: "Orthopedics",
    subtitle: "Bone, joint & mobility care",
    description:
      "Care for bone, joint, muscle, and mobility-related conditions.",
    image:
      "https://assets-global.website-files.com/627967eefc671069b0b94d33/628a5f6b751aa319502b6b63_6286a3d01be394a445241140_orthopedics-1-1024x683.jpeg",
    icon: FiActivity,
    color: "bg-orange-50 text-orange-600",
    alt: "Orthopedic doctor examining a patient's knee",
  },
  {
    name: "Ophthalmology",
    subtitle: "Eye care & vision",
    description:
      "Eye examinations, vision testing, and professional eye care.",
    image:
      "https://images.pexels.com/photos/6749710/pexels-photo-6749710.jpeg?auto=compress&cs=tinysrgb&w=1000",
    icon: FiEye,
    color: "bg-sky-50 text-sky-600",
    alt: "Eye specialist examining a patient using an eye-testing machine",
  },
  {
    name: "Pulmonology",
    subtitle: "Lung & respiratory care",
    description:
      "Respiratory consultations and care for breathing-related conditions.",
    image:
      "https://images.pexels.com/photos/8460221/pexels-photo-8460221.jpeg?auto=compress&cs=tinysrgb&w=1000",
    icon: FiWind,
    color: "bg-teal-50 text-teal-600",
    alt: "Doctor checking a patient's chest using a stethoscope",
  },
  {
    name: "Diagnostics",
    subtitle: "Testing & medical imaging",
    description:
      "Diagnostic imaging and medical testing to support clinical evaluation.",
    image:
      "https://edusofthealth.com/assets/images/fixed-xray-machines-banner.jpg",
    icon: FiMonitor,
    color: "bg-blue-50 text-blue-600",
    alt: "Radiologist reviewing X-ray images on a diagnostic monitor",
  },
];


const doctors = [
  {
    name: "Dr. Sarah Ahmed",
    specialty: "Cardiology Specialist",
    experience: "12+ years experience",
    image: image("photo-1559839734-2b71ea197ec2", 600),
    alt: "Female doctor portrait",
  },
  {
    name: "Dr. Michael Rahman",
    specialty: "Neurology Specialist",
    experience: "10+ years experience",
    image: image("photo-1612349317150-e413f6a5b16d", 600),
    alt: "Male doctor portrait",
  },
  {
    name: "Dr. Emily Wilson",
    specialty: "Ophthalmology Specialist",
    experience: "9+ years experience",
    image: image("photo-1594824476967-48c8b964273f", 600),
    alt: "Female healthcare professional portrait",
  },
  {
    name: "Dr. James Anderson",
    specialty: "Orthopedic Specialist",
    experience: "15+ years experience",
    image: image("photo-1622253692010-333f2da6031d", 600),
    alt: "Male healthcare professional portrait",
  },
];

const packages = [
  {
    name: "Basic Health Checkup",
    description: "Essential tests for a general overview of your health.",
    features: [
      "General physician consultation",
      "Blood pressure check",
      "Blood sugar test",
      "Basic health assessment",
    ],
    popular: false,
  },
  {
    name: "Comprehensive Checkup",
    description: "A more detailed health assessment with essential screenings.",
    features: [
      "Physician consultation",
      "Complete blood count",
      "Blood sugar and lipid profile",
      "Kidney and liver function tests",
    ],
    popular: true,
  },
  {
    name: "Executive Health Checkup",
    description: "A broader preventive health assessment for adults.",
    features: [
      "Priority consultation",
      "Comprehensive blood tests",
      "Cardiac screening",
      "Detailed health report",
    ],
    popular: false,
  },
];

const benefits = [
  {
    icon: FiUsers,
    title: "Patient-first approach",
    description:
      "We focus on understanding every patient's needs and providing attentive care.",
  },
  {
    icon: FiShield,
    title: "Trusted medical care",
    description:
      "A professional environment designed around patient comfort and confidence.",
  },
  {
    icon: FiActivity,
    title: "Modern facilities",
    description:
      "Healthcare services supported by modern equipment and diagnostic facilities.",
  },
  {
    icon: FiClock,
    title: "Convenient appointments",
    description:
      "Simple access to appointment information and healthcare services.",
  },
];

function SectionHeading({
  eyebrow,
  title,
  description,
  center = false,
}) {
  return (
    <div className={`mb-12 ${center ? "text-center" : ""}`}>
      <span className="section-label">{eyebrow}</span>
      <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-[42px]">
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 max-w-2xl text-base leading-7 text-slate-500 ${
            center ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

function Image({ src, alt, className = "" }) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={className}
    />
  );
}

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#f5faff]">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-blue-100/50 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-teal-100/40 blur-3xl" />

      <div className="container-main relative grid items-center gap-12 py-16 md:py-20 lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:py-24">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-teal-500" />
            Your health, our priority
          </div>

          <h1 className="mt-7 text-4xl font-bold leading-[1.13] tracking-tight text-slate-900 sm:text-5xl lg:text-[60px]">
            Compassionate care.
            <span className="mt-2 block text-[#1671bd]">
              Better health.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
            Your health journey deserves attention, understanding, and
            professional care. Discover healthcare services designed around
            you and your family.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/doctors"
              className="inline-flex items-center gap-3 rounded-xl bg-[#1268b3] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-blue-900/15 transition hover:-translate-y-1 hover:bg-[#0b4f91]"
            >
              Find a Doctor
              <FiArrowRight />
            </Link>

            <Link
              href="/health-packages"
              className="inline-flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-6 py-4 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:text-blue-700"
            >
              Explore Services
              <FiArrowUpRight />
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-7 gap-y-4 border-t border-slate-200 pt-7">
            {[
              "Patient-focused care",
              "Experienced professionals",
              "Modern facilities",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 text-sm font-medium text-slate-600"
              >
                <FiCheckCircle className="text-teal-600" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-5 -top-5 h-28 w-28 rounded-3xl border border-blue-200/70" />

          <div className="relative overflow-hidden rounded-[30px] bg-slate-200 shadow-2xl shadow-blue-950/15">
            <Image
              src={image("photo-1519494026892-80bbd2d6fd0d", 1200)}
              alt="Bright, welcoming modern hospital interior"
              className="h-[390px] w-full object-cover sm:h-[490px] lg:h-[540px]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/30 bg-white/90 p-5 shadow-xl backdrop-blur-md sm:bottom-8 sm:left-8 sm:right-8">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-2xl text-blue-700">
                  <FiHeart />
                </div>
                <div>
                  <p className="font-bold text-slate-900">
                    Care that puts you first
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    A welcoming experience at every step.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-5 -right-4 -z-0 h-28 w-28 rounded-full bg-teal-100/80 blur-2xl" />
        </div>
      </div>
    </section>
  );
}

export function StatsSection() {
  const items = [
    { icon: FiUsers, title: "Patient focused", text: "Care with compassion" },
    { icon: FiActivity, title: "Multiple specialties", text: "Care across departments" },
    { icon: FiShield, title: "Professional team", text: "Experienced care providers" },
    { icon: FiHeart, title: "Your wellbeing", text: "At the center of our care" },
  ];

  return (
    <section className="relative z-10 border-y border-slate-100 bg-white">
      <div className="container-main grid grid-cols-2 gap-6 py-8 md:grid-cols-4 md:py-9">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xl text-blue-700">
                <Icon />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">
                  {item.title}
                </p>
                <p className="mt-1 text-xs text-slate-500">{item.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function DepartmentsSection() {
  return (
    <section className="section-padding bg-white" id="departments">
      <div className="container-main">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Our departments"
            title="Healthcare for every need"
            description="Explore our medical specialties and find the right care for your health needs."
          />

          <Link
            href="/about/departments"
            className="mb-12 inline-flex items-center gap-2 text-sm font-bold text-blue-700 transition hover:gap-3"
          >
            View all departments <FiArrowRight />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {departments.map((department) => {
            const Icon = department.icon;

            return (
              <Link
                href="/about/departments"
                key={department.name}
                className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/10"
              >
                <div className="relative h-52 overflow-hidden bg-slate-100">
                  <Image
                    src={department.image}
                    alt={department.alt}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 to-transparent" />

                  <div
                    className={`absolute bottom-4 left-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-xl shadow-lg ${department.color}`}
                  >
                    <Icon />
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-blue-700">
                    {department.subtitle}
                  </p>
                  <h3 className="mt-2 text-xl font-bold text-slate-900">
                    {department.name}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {department.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-sm font-bold text-blue-700">
                    Explore department
                    <FiArrowRight className="transition group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function DoctorsSection() {
  return (
    <section className="section-padding bg-[#f5f9fd]">
      <div className="container-main">
        <SectionHeading
          eyebrow="Meet our doctors"
          title="People behind your care"
          description="Get to know our sample medical professionals and explore the specialists available at our hospital."
          center
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {doctors.map((doctor) => (
            <div
              key={doctor.name}
              className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative h-64 overflow-hidden bg-slate-100">
                <Image
                  src={doctor.image}
                  alt={doctor.alt}
                  className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-950/25 to-transparent" />
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold text-slate-900">
                  {doctor.name}
                </h3>
                <p className="mt-2 text-sm font-semibold text-blue-700">
                  {doctor.specialty}
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                  <FiAward className="text-teal-600" />
                  {doctor.experience}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/doctors"
            className="inline-flex items-center gap-3 rounded-xl bg-[#1268b3] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#0b4f91]"
          >
            Meet all doctors <FiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function PackagesSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-main">
        <SectionHeading
          eyebrow="Health packages"
          title="Take a step towards better health"
          description="Explore sample preventive health packages designed to help you stay informed about your wellbeing."
          center
        />

        <div className="grid items-stretch gap-6 lg:grid-cols-3">
          {packages.map((item) => (
            <div
              key={item.name}
              className={`relative flex flex-col rounded-2xl border p-7 transition hover:-translate-y-1 hover:shadow-xl ${
                item.popular
                  ? "border-blue-300 bg-[#f7fbff] shadow-lg shadow-blue-900/5"
                  : "border-slate-200 bg-white shadow-sm"
              }`}
            >
              {item.popular && (
                <span className="absolute right-6 top-6 rounded-full bg-blue-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-700">
                  Popular choice
                </span>
              )}

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-xl text-blue-700">
                <FiActivity />
              </div>

              <h3 className="mt-6 text-xl font-bold text-slate-900">
                {item.name}
              </h3>
              <p className="mt-3 min-h-12 text-sm leading-6 text-slate-500">
                {item.description}
              </p>

              <div className="my-6 h-px bg-slate-100" />

              <p className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Package includes
              </p>

              <ul className="mt-5 flex-1 space-y-4">
                {item.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-sm text-slate-600"
                  >
                    <FiCheckCircle className="mt-0.5 shrink-0 text-teal-600" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href="/health-packages"
                className={`mt-8 flex items-center justify-center gap-2 rounded-xl px-5 py-4 text-sm font-bold transition ${
                  item.popular
                    ? "bg-[#1268b3] text-white hover:bg-[#0b4f91]"
                    : "border border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:text-blue-700"
                }`}
              >
                View package details <FiArrowRight />
              </Link>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          Package details and availability should be confirmed with the hospital.
        </p>
      </div>
    </section>
  );
}

export function WhyChooseUsSection() {
  return (
    <section className="section-padding overflow-hidden bg-[#f5f9fd]">
      <div className="container-main grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="relative">
          <div className="absolute -left-5 -top-5 h-28 w-28 rounded-3xl bg-blue-100" />
          <div className="relative overflow-hidden rounded-[28px] shadow-xl">
            <Image
              src={image("photo-1576091160399-112ba8d25d1d", 1100)}
              alt="Healthcare professional providing attentive patient care"
              className="h-[390px] w-full object-cover sm:h-[470px]"
            />
          </div>

          <div className="absolute -bottom-6 right-5 max-w-[230px] rounded-2xl border border-slate-100 bg-white p-5 shadow-xl sm:right-8">
            <div className="flex items-center gap-2 text-teal-600">
              <FiHeart className="text-xl" />
              <span className="text-sm font-bold text-slate-900">
                Care with compassion
              </span>
            </div>
            <p className="mt-2 text-xs leading-5 text-slate-500">
              Every patient deserves to feel heard, respected, and cared for.
            </p>
          </div>
        </div>

        <div className="pt-4 lg:pt-0">
          <SectionHeading
            eyebrow="Why choose us"
            title="A better healthcare experience starts here"
            description="Healthcare is about more than treatment. It is about listening, understanding, and supporting people throughout their health journey."
          />

          <div className="space-y-6">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <div key={benefit.title} className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-xl text-blue-700 shadow-sm">
                    <Icon />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">
                      {benefit.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <Link
            href="/about"
            className="mt-9 inline-flex items-center gap-3 rounded-xl bg-[#1268b3] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#0b4f91]"
          >
            Learn about our hospital <FiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  return null;
}

export function AppointmentCTA() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container-main">
        <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#0b4f91] to-[#1679bd] px-7 py-12 text-white sm:px-12 sm:py-16">
          <div className="absolute -right-20 -top-32 h-80 w-80 rounded-full border-[45px] border-white/5" />
          <div className="absolute -bottom-32 right-1/3 h-64 w-64 rounded-full bg-teal-400/10 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-9 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-blue-50">
                <FiCalendar />
                Start your health journey
              </span>

              <h2 className="mt-6 text-3xl font-bold leading-tight sm:text-4xl">
                Your health deserves the right attention.
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-blue-100 sm:text-base">
                Explore our doctors and healthcare services to find the care
                that is right for you.
              </p>
            </div>

            <div className="flex shrink-0 flex-wrap gap-3">
              <Link
                href="/doctors"
                className="inline-flex items-center gap-3 rounded-xl bg-white px-6 py-4 text-sm font-bold text-blue-800 transition hover:-translate-y-1 hover:bg-blue-50"
              >
                Find a Doctor <FiArrowRight />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-3 rounded-xl border border-white/30 bg-white/10 px-6 py-4 text-sm font-bold text-white transition hover:bg-white/20"
              >
                Contact Us <FiPhone />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
