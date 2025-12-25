// components/builder/ProfileImageUpload.tsx

"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Camera, X, Upload } from "lucide-react";
import { useResumeStore } from "@/lib/store/resumeStore";

const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];
const TARGET_SIZE = 400; // 400x400px

export default function ProfileImageUpload() {
  const { currentResume, updateContactInfo } = useResumeStore();
  const [error, setError] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const compressAndResizeImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          if (!ctx) {
            reject(new Error('Could not get canvas context'));
            return;
          }

          // Calculate dimensions to maintain aspect ratio
          let width = img.width;
          let height = img.height;

          // Crop to square (center crop)
          const size = Math.min(width, height);
          const x = (width - size) / 2;
          const y = (height - size) / 2;

          // Set canvas to target size
          canvas.width = TARGET_SIZE;
          canvas.height = TARGET_SIZE;

          // Draw cropped and resized image
          ctx.drawImage(
            img,
            x, y, size, size,  // source
            0, 0, TARGET_SIZE, TARGET_SIZE  // destination
          );

          // Convert to base64 with compression
          const base64 = canvas.toDataURL('image/jpeg', 0.8); // 80% quality
          resolve(base64);
        };

        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = e.target?.result as string;
      };

      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  };

  const handleFileSelect = async (file: File) => {
    setError('');

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError('Please upload a JPG or PNG image');
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      setError('Image size must be less than 3MB');
      return;
    }

    try {
      const base64 = await compressAndResizeImage(file);
      updateContactInfo({ profileImage: base64 });
    } catch (err) {
      setError('Failed to process image. Please try another file.');
      console.error(err);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleRemove = () => {
    updateContactInfo({ profileImage: undefined });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const hasImage = !!currentResume.contactInfo?.profileImage;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Camera className="h-5 w-5 text-primary" />
        <Label className="text-base font-semibold">Profile Photo (Optional)</Label>
      </div>

      <p className="text-sm text-muted-foreground">
        Add a professional headshot for two-column templates (Modern Two-Column, Tech Leader, Infographic Modern)
      </p>

      {hasImage ? (
        <div className="flex items-start gap-4">
          <div className="relative">
            <img
              src={currentResume.contactInfo.profileImage}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-2 border-border"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm text-muted-foreground">
              Image uploaded successfully
            </p>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-4 w-4 mr-2" />
                Change Photo
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleRemove}
              >
                <X className="h-4 w-4 mr-2" />
                Remove
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragging
              ? 'border-primary bg-primary/5'
              : 'border-border hover:border-primary/50'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
              <Camera className="h-10 w-10 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-muted-foreground">
                JPG or PNG (Max 3MB)
              </p>
              <p className="text-xs text-muted-foreground">
                Image will be automatically cropped to 400x400px
              </p>
            </div>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-4 w-4 mr-2" />
              Select Photo
            </Button>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">
          {error}
        </div>
      )}

      <div className="bg-muted/50 rounded-md p-3 space-y-1">
        <p className="text-xs font-medium">💡 Photo Tips:</p>
        <ul className="text-xs text-muted-foreground space-y-0.5 ml-4 list-disc">
          <li>Use a professional headshot with plain background</li>
          <li>Dress professionally and maintain good posture</li>
          <li>Ensure good lighting and clear facial features</li>
          <li>Smile naturally and look directly at camera</li>
          <li>Note: ATS-friendly templates don't display photos</li>
        </ul>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept={ALLOWED_TYPES.join(',')}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
