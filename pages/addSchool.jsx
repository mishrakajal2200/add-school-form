
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { useState } from "react";
// import {
//   Loader2,
//   Mail,
//   Phone,
//   MapPin,
//   User,
//   Image as ImageIcon,
//   Building2,
//   Map,
// } from "lucide-react";
// import "../app/globals.css";

// const schema = yup.object({
//   name: yup.string().required("School name is required"),
//   address: yup.string().required("Address is required"),
//   city: yup.string().required("City is required"),
//   state: yup.string().required("State is required"),
//   contact: yup
//     .string()
//     .matches(/^\d{7,15}$/, "Contact must be 7–15 digits")
//     .required("Contact is required"),
//   email_id: yup.string().email("Invalid email").required("Email is required"),
//   image: yup.mixed().test("required", "Image is required", (value) => {
//     return value && value.length > 0;
//   }),
// });

// export default function AddSchool() {
//   const [submitting, setSubmitting] = useState(false);
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm({ resolver: yupResolver(schema) });

//   const onSubmit = async (values) => {
//     try {
//       setSubmitting(true);
//       const fd = new FormData();
//       Object.keys(values).forEach((key) => {
//         if (key === "image") {
//           fd.append("image", values.image[0]);
//         } else {
//           fd.append(key, values[key]);
//         }
//       });

//       const res = await fetch("/api/addSchool", {
//         method: "POST",
//         body: fd,
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data?.message || "Failed");
//       alert("School added successfully ✅");
//       reset();
//     } catch (e) {
//       alert(e.message || "Something went wrong");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-300 p-6">
//   <div className="w-full max-w-3xl rounded-2xl shadow-xl border border-gray-200 
//                   bg-gradient-to-br from-blue-100 via-white to-blue-100 p-10">
//     {/* Heading */}
//     <div className="text-center mb-10">
//       <h1 className="text-3xl font-bold text-gray-900">🏫 Add a New School</h1>
//       <p className="text-gray-600 mt-2">
//         Fill in the details below to register your school.
//       </p>
//     </div>

//     {/* Form */}
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" autoComplete="off">
//       {/* Section 1 */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {[
//           { label: "School Name", icon: User, name: "name", placeholder: "e.g., Green Valley High", color: "text-indigo-500" },
//           { label: "Address", icon: MapPin, name: "address", placeholder: "Street, Area", color: "text-purple-500", full: true },
//           { label: "City", icon: Building2, name: "city", placeholder: "e.g., New York", color: "text-emerald-500" },
//           { label: "State", icon: Map, name: "state", placeholder: "e.g., California", color: "text-pink-500" },
//         ].map(({ label, icon: Icon, name, placeholder, full, color }) => (
//           <div key={name} className={full ? "md:col-span-2" : ""}>
//             <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
//               <Icon size={16} className={color} /> {label}
//             </label>
//             <input
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-gray-900 placeholder-gray-400 
//                          focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-gray-400"
//               placeholder={placeholder}
//               {...register(name)}
//             />
//             {errors[name] && (
//               <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Section 2 */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {[
//           { label: "Contact", icon: Phone, name: "contact", placeholder: "10-digit number", color: "text-orange-500" },
//           { label: "Email", icon: Mail, name: "email_id", placeholder: "school@example.com", color: "text-red-500" },
//         ].map(({ label, icon: Icon, name, placeholder, color }) => (
//           <div key={name}>
//             <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
//               <Icon size={16} className={color} /> {label}
//             </label>
//             <input
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-gray-900 placeholder-gray-400 
//                          focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-gray-400"
//               placeholder={placeholder}
//               {...register(name)}
//             />
//             {errors[name] && (
//               <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Section 3 */}
//       <div>
//         <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
//           <ImageIcon size={16} className="text-teal-500" /> School Image
//         </label>
//         <input
//           type="file"
//           accept="image/*"
//           className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-gray-900 
//                      focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-gray-400"
//           {...register("image")}
//         />
//         {errors.image && (
//           <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
//         )}
//       </div>

//       {/* Submit */}
//       <div className="flex justify-center">
//         <button
//           type="submit"
//           disabled={submitting}
//           className="w-full md:w-auto px-10 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 
//                      text-white font-semibold text-base shadow-md hover:shadow-lg hover:scale-[1.02] 
//                      transition-all flex items-center gap-2 justify-center"
//         >
//           {submitting ? (
//             <>
//               <Loader2 className="animate-spin" size={20} /> Submitting...
//             </>
//           ) : (
//             "🚀 Submit School"
//           )}
//         </button>
//       </div>
//     </form>
//   </div>
// </div>


//   );
// }




import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import {
  Loader2,
  Mail,
  Phone,
  MapPin,
  User,
  Image as ImageIcon,
  Building2,
  Map,
} from "lucide-react";
import "../app/globals.css";

// ✅ Validation schema
const schema = yup.object({
  name: yup.string().required("School name is required"),
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  contact: yup
    .string()                         
    .matches(/^\d{7,15}$/, "Contact must be 7–15 digits")
    .required("Contact is required"),
  email_id: yup.string().email("Invalid email").required("Email is required"),
  image: yup.mixed().test("required", "Image is required", (value) => {
    return value && value.length > 0;
  }),
});

export default function AddSchool() {
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  // ✅ Submit handler
  const onSubmit = async (values) => {
    try {
      setSubmitting(true);

      const fd = new FormData();
      Object.keys(values).forEach((key) => {
        if (key === "image") {
          fd.append("image", values.image[0]); // send first selected file
        } else {
          fd.append(key, values[key]);
        }
      });

      // Send to backend (which uploads to Cloudinary + saves to MySQL)
      const res = await fetch("/api/addSchool", {
        method: "POST",
        body: fd,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed");

      alert("✅ School added successfully!");
      reset();
    } catch (e) {
      alert(e.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300 p-6">
      <div className="w-full max-w-3xl rounded-2xl shadow-xl border border-gray-200 
                      bg-gradient-to-br from-blue-100 via-white to-blue-100 p-10">
        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">🏫 Add a New School</h1>
          <p className="text-gray-600 mt-2">
            Fill in the details below to register your school.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" autoComplete="off">
          {/* Section 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: "School Name", icon: User, name: "name", placeholder: "e.g., Green Valley High", color: "text-indigo-500" },
              { label: "Address", icon: MapPin, name: "address", placeholder: "Street, Area", color: "text-purple-500", full: true },
              { label: "City", icon: Building2, name: "city", placeholder: "e.g., New York", color: "text-emerald-500" },
              { label: "State", icon: Map, name: "state", placeholder: "e.g., California", color: "text-pink-500" },
            ].map(({ label, icon: Icon, name, placeholder, full, color }) => (
              <div key={name} className={full ? "md:col-span-2" : ""}>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Icon size={16} className={color} /> {label}
                </label>
                <input
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-gray-900 placeholder-gray-400 
                             focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-gray-400"
                  placeholder={placeholder}
                  {...register(name)}
                />
                {errors[name] && (
                  <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>
                )}
              </div>
            ))}
          </div>

          {/* Section 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: "Contact", icon: Phone, name: "contact", placeholder: "10-digit number", color: "text-orange-500" },
              { label: "Email", icon: Mail, name: "email_id", placeholder: "school@example.com", color: "text-red-500" },
            ].map(({ label, icon: Icon, name, placeholder, color }) => (
              <div key={name}>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Icon size={16} className={color} /> {label}
                </label>
                <input
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-gray-900 placeholder-gray-400 
                             focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-gray-400"
                  placeholder={placeholder}
                  {...register(name)}
                />
                {errors[name] && (
                  <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>
                )}
              </div>
            ))}
          </div>

          {/* Section 3 */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <ImageIcon size={16} className="text-teal-500" /> School Image
            </label>
            <input
              type="file"
              accept="image/*"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-gray-900 
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-gray-400"
              {...register("image")}
            />
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
            )}
          </div>

          {/* Submit */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={submitting}
              className="w-full md:w-auto px-10 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 
                         text-white font-semibold text-base shadow-md hover:shadow-lg hover:scale-[1.02] 
                         transition-all flex items-center gap-2 justify-center"
            >
              {submitting ? (
                <>
                  <Loader2 className="animate-spin" size={20} /> Submitting...
                </>
              ) : (
                "🚀 Submit School"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
