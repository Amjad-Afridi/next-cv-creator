// components/builder/OptionalSections/InterestsSection.tsx

"use client";

import { useResumeStore } from "@/lib/store/resumeStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

// Common interest suggestions
const INTEREST_SUGGESTIONS = [
  "Photography",
  "Traveling",
  "Reading",
  "Blogging",
  "Open Source",
  "Volunteering",
  "Music",
  "Sports",
  "Cooking",
  "Gaming",
  "Art",
  "Hiking",
  "Yoga",
  "Running",
  "Chess",
  "Writing",
  "Public Speaking",
  "Mentoring",
  "Community Building",
];

export default function InterestsSection() {
  const { currentResume } = useResumeStore();
  const [interests, setInterests] = useState<string[]>(
    currentResume.interests || []
  );
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Auto-save interests
  useEffect(() => {
    const timer = setTimeout(() => {
      useResumeStore.setState((state) => ({
        currentResume: {
          ...state.currentResume,
          interests,
        },
      }));
    }, 500);
    return () => clearTimeout(timer);
  }, [interests]);

  const addInterest = (interest: string) => {
    const trimmed = interest.trim();
    if (trimmed && !interests.includes(trimmed)) {
      setInterests([...interests, trimmed]);
      setInputValue("");
      setShowSuggestions(false);
    }
  };

  const removeInterest = (index: number) => {
    setInterests(interests.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addInterest(inputValue);
    }
  };

  // Filter suggestions based on input and what's already added
  const filteredSuggestions = INTEREST_SUGGESTIONS.filter(
    (suggestion) =>
      !interests.includes(suggestion) &&
      suggestion.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="p-4 border rounded-lg space-y-4 bg-gradient-to-br from-background to-muted/20">
        <div className="flex items-start gap-2">
          <Sparkles className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <h4 className="font-medium text-sm">Interests & Hobbies</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Add your personal interests to show personality and cultural fit. This humanizes your CV!
            </p>
          </div>
        </div>

        {/* Interest Input */}
        <div className="space-y-2">
          <Label htmlFor="interest-input">Add Interests</Label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Input
                id="interest-input"
                placeholder="Type an interest and press Enter (e.g., Photography, Open Source)"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  setShowSuggestions(e.target.value.length > 0);
                }}
                onKeyDown={handleKeyDown}
                onFocus={() => setShowSuggestions(inputValue.length > 0)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              />

              {/* Suggestions Dropdown */}
              {showSuggestions && filteredSuggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-background border rounded-md shadow-lg max-h-48 overflow-y-auto">
                  {filteredSuggestions.slice(0, 8).map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      className="w-full text-left px-3 py-2 hover:bg-muted text-sm transition-colors"
                      onClick={() => addInterest(suggestion)}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <Button
              type="button"
              variant="secondary"
              size="icon"
              onClick={() => addInterest(inputValue)}
              disabled={!inputValue.trim()}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Press <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">Enter</kbd> to add
          </p>
        </div>

        {/* Display Added Interests */}
        {interests.length > 0 && (
          <div className="space-y-2">
            <Label>Your Interests ({interests.length})</Label>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="px-3 py-1.5 text-sm flex items-center gap-1.5"
                >
                  {interest}
                  <button
                    type="button"
                    onClick={() => removeInterest(index)}
                    className="hover:text-destructive transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Quick Add Suggestions */}
        {interests.length === 0 && !inputValue && (
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Quick Add (Popular)</Label>
            <div className="flex flex-wrap gap-2">
              {INTEREST_SUGGESTIONS.slice(0, 10).map((suggestion) => (
                <Button
                  key={suggestion}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addInterest(suggestion)}
                  className="text-xs h-7"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Helper Tips */}
        <div className="bg-muted/50 rounded-md p-3 space-y-1">
          <p className="text-xs font-medium">💡 Tips:</p>
          <ul className="text-xs text-muted-foreground space-y-0.5 ml-4 list-disc">
            <li>Include 3-5 interests that show personality</li>
            <li>Mention hobbies relevant to the job (e.g., Open Source for developers)</li>
            <li>Avoid controversial topics</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
