export interface SkillItem {
  name: string;
  level: string; // e.g., "Advanced", "Intermediate"
  icon?: string; // We can use this later for raw svg strings or component references
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: SkillItem[];
  gridClass: string; // This handles the custom sizing for the Bento Grid layout
}