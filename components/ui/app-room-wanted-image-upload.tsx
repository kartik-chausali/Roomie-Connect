'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Cross2Icon } from "@radix-ui/react-icons"
import { InputData } from './app-room-wanted-room-wanted-form'


interface ImageUploadProps {
  images: File[] | undefined
  setInputData: React.Dispatch<React.SetStateAction<InputData>>
}

export function ImageUpload({ images, setInputData }: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files.length> 0) {
      handleFiles(e.target.files)
    }
  }

  const handleFiles = (files: FileList) => {
    const newImages = Array.from(files)
    setInputData((prev) => ({...prev , images: [...prev.images , ...newImages]}))
   
  }

  const removeImage = (index: number) => {
    setInputData((prev) => ({...prev , images : prev.images.filter((_, i) => i !== index) }))
  }

  return (
    <div>
      <div 
        className={`border-2 border-dashed rounded-lg p-4 text-center ${dragActive ? 'border-primary' : 'border-gray-300'}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          onChange={handleChange}
          accept="image/*"
          className="hidden"
          id="image-upload"
        />
        <label htmlFor="image-upload" className="cursor-pointer">
          <div className="space-y-2">
            <p>Drag and drop images here, or click to select files</p>
           
          </div>
        </label>
      </div>
      {images && images.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {images.map((image, index) => {
            const previewImage = URL.createObjectURL(image);
            return <div key={index} className="relative">
              <img src={previewImage} alt={`Uploaded ${index + 1}`} className="w-full h-32 object-cover rounded-lg" />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-1 right-1"
                onClick={() => removeImage(index)}
              >
                <Cross2Icon className="h-4 w-4" />
              </Button>
            </div>
})}
        </div>
      )}
    </div>
  )
}