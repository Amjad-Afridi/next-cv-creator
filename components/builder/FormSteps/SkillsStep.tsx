// components/builder/FormSteps/SkillsStep.tsx

"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { skillsSchema, SkillsFormData } from "@/lib/validations/resumeSchema";
import { useResumeStore } from "@/lib/store/resumeStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, ArrowLeft, X, Lightbulb, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, KeyboardEvent } from "react";
import { SkillItem } from "@/lib/types/resume";

export default function SkillsStep() {
  const { currentResume, updateSkills, setCurrentStep } = useResumeStore();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SkillsFormData>({
    resolver: zodResolver(skillsSchema),
    defaultValues: {
      technical: currentResume.skills?.technical || [],
      soft: currentResume.skills?.soft || [],
      languages: currentResume.skills?.languages || [],
      tools: currentResume.skills?.tools || [],
    },
  });

  const onSubmit = (data: SkillsFormData) => {
    updateSkills(data);
    setCurrentStep(6); // Move to optional sections step
  };

  const handleBack = () => {
    // Save current data before going back
    const currentData = watch();
    updateSkills(currentData);
    setCurrentStep(4);
  };

  const handleSkip = () => {
    updateSkills({
      technical: [],
      soft: [],
      languages: [],
      tools: [],
    });
    setCurrentStep(6);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Skills
          </CardTitle>
          <CardDescription>
            Add your skills - type and press Enter to add each skill
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Technical Skills */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Technical Skills</CardTitle>
          <CardDescription>
            Programming languages, frameworks, technologies
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Controller
            name="technical"
            control={control}
            render={({ field }) => (
              <SkillInput
                skills={field.value}
                onChange={field.onChange}
                placeholder="e.g., JavaScript, React, Node.js, Python..."
                suggestions={[
                  "JavaScript", "Python", "Java", "React", "Node.js", 
                  "TypeScript", "C++", "SQL", "MongoDB", "AWS"
                ]}
                levels={['Beginner', 'Intermediate', 'Advanced', 'Expert']}
              />
            )}
          />
        </CardContent>
      </Card>

      {/* Soft Skills */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Soft Skills</CardTitle>
          <CardDescription>
            Communication, leadership, problem-solving abilities
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Controller
            name="soft"
            control={control}
            render={({ field }) => (
              <SkillInput
                skills={field.value}
                onChange={field.onChange}
                placeholder="e.g., Leadership, Communication, Problem Solving..."
                suggestions={[
                  "Leadership", "Communication", "Problem Solving", 
                  "Teamwork", "Time Management", "Critical Thinking",
                  "Adaptability", "Creativity"
                ]}
                levels={['Beginner', 'Intermediate', 'Advanced', 'Expert']}
              />
            )}
          />
        </CardContent>
      </Card>

      {/* Languages */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Languages</CardTitle>
          <CardDescription>
            Spoken languages and proficiency levels
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Controller
            name="languages"
            control={control}
            render={({ field }) => (
              <SkillInput
                skills={field.value}
                onChange={field.onChange}
                placeholder="e.g., English, Spanish, French..."
                suggestions={[
                  "English", "Spanish", "French", "German", 
                  "Mandarin", "Arabic", "Hindi", "Portuguese"
                ]}
                levels={['Native', 'Fluent', 'Professional', 'Intermediate', 'Basic']}
                showLevelByDefault={true}
              />
            )}
          />
        </CardContent>
      </Card>

      {/* Tools & Software */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Tools & Software</CardTitle>
          <CardDescription>
            Software, platforms, and tools you're proficient in
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Controller
            name="tools"
            control={control}
            render={({ field }) => (
              <SkillInput
                skills={field.value}
                onChange={field.onChange}
                placeholder="e.g., Git, Docker, Figma, Adobe Photoshop..."
                suggestions={[
                  "Git", "Docker", "Figma", "Adobe Photoshop", 
                  "Jira", "Slack", "VS Code", "Postman"
                ]}
                levels={['Beginner', 'Intermediate', 'Advanced', 'Expert']}
              />
            )}
          />
        </CardContent>
      </Card>

      {/* Tips */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <Lightbulb className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-2">
              <p className="font-medium text-blue-900 text-sm">Tips for adding skills:</p>
              <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                <li>Focus on skills relevant to your target job</li>
                <li>Include both hard skills (technical) and soft skills</li>
                <li>Be honest - only list skills you're actually proficient in</li>
                <li>Use industry-standard terminology</li>
                <li>Add proficiency levels to better showcase your expertise</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between gap-4">
        <Button type="button" variant="outline" onClick={handleBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="flex gap-2">
          <Button type="button" variant="ghost" onClick={handleSkip}>
            Skip for Now
          </Button>
          <Button type="submit">
            Next: Optional Sections
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </form>
  );
}

// Reusable Skill Input Component with Tags and Levels
interface SkillInputProps {
  skills: SkillItem[];
  onChange: (skills: SkillItem[]) => void;
  placeholder: string;
  suggestions?: string[];
  levels?: string[];
  showLevelByDefault?: boolean;
}

function SkillInput({ 
  skills, 
  onChange, 
  placeholder, 
  suggestions = [], 
  levels = [],
  showLevelByDefault = false 
}: SkillInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const addSkill = (skillName: string, level?: string) => {
    const trimmedSkill = skillName.trim();
    if (trimmedSkill && !skills.some(s => s.name === trimmedSkill)) {
      const newSkill: SkillItem = {
        name: trimmedSkill,
        level: level as any,
      };
      onChange([...skills, newSkill]);
      setInputValue("");
      setShowSuggestions(false);
    }
  };

  const removeSkill = (skillToRemove: string) => {
    onChange(skills.filter((skill) => skill.name !== skillToRemove));
  };

  const updateSkillLevel = (skillName: string, level: string) => {
    onChange(
      skills.map((skill) =>
        skill.name === skillName ? { ...skill, level: level as any } : skill
      )
    );
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill(inputValue);
    } else if (e.key === "Backspace" && !inputValue && skills.length > 0) {
      // Remove last skill when backspace is pressed on empty input
      removeSkill(skills[skills.length - 1].name);
    }
  };

  const filteredSuggestions = suggestions.filter(
    (suggestion) =>
      !skills.some(s => s.name === suggestion) &&
      suggestion.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div className="space-y-3">
      {/* Input Field */}
      <div className="relative">
        <Input
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setShowSuggestions(e.target.value.length > 0);
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(inputValue.length > 0)}
          onBlur={() => {
            // Delay to allow clicking suggestions
            setTimeout(() => setShowSuggestions(false), 200);
          }}
          placeholder={placeholder}
          className="w-full"
        />

        {/* Suggestions Dropdown */}
        {showSuggestions && filteredSuggestions.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-40 overflow-y-auto">
            {filteredSuggestions.slice(0, 5).map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => addSkill(suggestion)}
                className="w-full px-4 py-2 text-left text-sm hover:bg-slate-100 transition"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>

      <p className="text-xs text-slate-500">
        Type and press <kbd className="px-1.5 py-0.5 text-xs bg-slate-100 border rounded">Enter</kbd> to add a skill
      </p>

      {/* Skills Display */}
      {skills.length > 0 && (
        <div className="space-y-2">
          {skills.map((skill) => (
            <div 
              key={skill.name} 
              className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg border"
            >
              <Badge
                variant="secondary"
                className="pl-3 pr-1 py-1.5 text-sm flex items-center gap-1 flex-shrink-0"
              >
                {skill.name}
                <button
                  type="button"
                  onClick={() => removeSkill(skill.name)}
                  className="ml-1 rounded-full hover:bg-slate-300 p-0.5 transition"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>

              {/* Level Selector */}
              {levels.length > 0 && (
                <Select
                  value={skill.level || ""}
                  onValueChange={(value) => updateSkillLevel(skill.name, value)}
                >
                  <SelectTrigger className="w-[140px] h-8 text-xs">
                    <SelectValue placeholder="Add level" />
                  </SelectTrigger>
                  <SelectContent>
                    {levels.map((level) => (
                      <SelectItem key={level} value={level} className="text-xs">
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          ))}
        </div>
      )}

      {skills.length === 0 && (
        <p className="text-sm text-slate-400 text-center py-4 border rounded-lg bg-slate-50">
          No skills added yet. Start typing to add skills!
        </p>
      )}
    </div>
  );
}