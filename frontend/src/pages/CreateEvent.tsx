import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Image as ImageIcon } from "lucide-react";
import axiosInstance from "@/lib/axiosInstance";  // Assuming you have this set up

const eventSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  location: z.string().min(3, "Location must be at least 3 characters"),
  capacity: z
    .string()
    .min(1, "Capacity is required")
    .transform((val) => Number(val))
    .refine((num) => num > 0, {
      message: "Capacity must be a positive number",
    }),
});

export function CreateEventPage() {
  const navigate = useNavigate();
  const [eventImage, setEventImage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(eventSchema),
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setEventImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: any) => {
    const eventData = {
      title: data.title,
      description: data.description,
      category: "workshop",  // Hardcoded for now, you can extend it with a dropdown
      organizer: "userId",  // Replace with actual user ID (e.g., from Auth context)
      group: null,  // Add group data if needed
      venue: data.location,
      eventDate: new Date(data.date),
      capacity: data.capacity,
    };

    try {
      const response = await axiosInstance.post("/events", eventData);
      console.log("Event Created:", response.data);
      navigate("/events"); // Redirect to events list
    } catch (error) {
      console.error("Error creating event:", error);
      // Handle error appropriately (e.g., show an error message)
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg bg-white p-8 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Create an Event</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Image Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Event Image</label>
            <div className="relative group">
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="eventImageUpload" />
              <label htmlFor="eventImageUpload" className="flex items-center justify-center h-32 w-full rounded-md border-2 border-dashed border-gray-300 cursor-pointer hover:border-blue-500 transition-colors">
                {eventImage ? (
                  <img src={eventImage} alt="Event Preview" className="h-full w-full object-cover rounded-md" />
                ) : (
                  <div className="text-center text-gray-400">
                    <ImageIcon className="mx-auto h-8 w-8" />
                    <p className="mt-1 text-sm">Upload Image</p>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Form Inputs */}
          <div>
            <label className="block text-gray-700">Event Title</label>
            <input {...register("title")} type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600" placeholder="Enter event title" />
            {errors.title?.message && <p className="text-red-500 text-sm">{String(errors.title.message)}</p>}
          </div>

          <div>
            <label className="block text-gray-700">Description</label>
            <textarea {...register("description")} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600" placeholder="Describe your event" />
            {errors.description?.message && <p className="text-red-500 text-sm">{String(errors.description.message)}</p>}
          </div>

          <div>
            <label className="block text-gray-700">Date</label>
            <input {...register("date")} type="date" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600" />
            {errors.date?.message && <p className="text-red-500 text-sm">{String(errors.date.message)}</p>}
          </div>

          <div>
            <label className="block text-gray-700">Location</label>
            <input {...register("location")} type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600" placeholder="Event location" />
            {errors.location?.message && <p className="text-red-500 text-sm">{String(errors.location.message)}</p>}
          </div>

          <div>
            <label className="block text-gray-700">Capacity</label>
            <input {...register("capacity")} type="number" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600" placeholder="Maximum participants" />
            {errors.capacity?.message && <p className="text-red-500 text-sm">{String(errors.capacity.message)}</p>}
          </div>

          <Button type="submit" className="w-full">Create Event</Button>
        </form>
      </div>
    </div>
  );
}

export default CreateEventPage;
