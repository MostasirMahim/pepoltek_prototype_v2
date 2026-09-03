"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  CURRENT_TALENT_PROFILE,
  RACHEL_HIGGINS_PROFILE,
  ACTIVE_SPRINT_PIPELINES,
  UPCOMING_INTERVIEWS,
  CandidateProfile,
  SprintPipelineItem,
  UpcomingInterview,
} from "@/data/talentDashboardData";

export type PersonaType = "alex" | "rachel";

interface CandidatePersonaContextType {
  activePersona: PersonaType;
  setActivePersona: (persona: PersonaType) => void;
  currentProfile: CandidateProfile;
  updateCurrentProfile: (data: Partial<CandidateProfile>) => void;
  isOpenToPods: boolean;
  setIsOpenToPods: (val: boolean) => void;
  pipelines: SprintPipelineItem[];
  interviews: UpcomingInterview[];
}

const CandidatePersonaContext = createContext<CandidatePersonaContextType | undefined>(undefined);

export function CandidatePersonaProvider({ children }: { children: React.ReactNode }) {
  const [activePersona, setActivePersona] = useState<PersonaType>("alex");
  const [alexProfile, setAlexProfile] = useState<CandidateProfile>(CURRENT_TALENT_PROFILE);
  const [rachelProfile, setRachelProfile] = useState<CandidateProfile>(RACHEL_HIGGINS_PROFILE);

  const currentProfile = activePersona === "alex" ? alexProfile : rachelProfile;
  const [isOpenToPods, setIsOpenToPods] = useState(currentProfile.isOpenToPods);

  const updateCurrentProfile = (updated: Partial<CandidateProfile>) => {
    if (activePersona === "alex") {
      setAlexProfile((prev) => ({ ...prev, ...updated }));
    } else {
      setRachelProfile((prev) => ({ ...prev, ...updated }));
    }
  };

  // Prioritize pipelines based on active persona
  const pipelines = activePersona === "alex"
    ? ACTIVE_SPRINT_PIPELINES
    : [ACTIVE_SPRINT_PIPELINES[1], ACTIVE_SPRINT_PIPELINES[0], ACTIVE_SPRINT_PIPELINES[2]];

  const interviews = activePersona === "alex"
    ? UPCOMING_INTERVIEWS
    : [UPCOMING_INTERVIEWS[1], UPCOMING_INTERVIEWS[0]];

  useEffect(() => {
    setIsOpenToPods(currentProfile.isOpenToPods);
  }, [currentProfile]);

  return (
    <CandidatePersonaContext.Provider
      value={{
        activePersona,
        setActivePersona,
        currentProfile,
        updateCurrentProfile,
        isOpenToPods,
        setIsOpenToPods,
        pipelines,
        interviews,
      }}
    >
      {children}
    </CandidatePersonaContext.Provider>
  );
}

export function useCandidatePersona() {
  const context = useContext(CandidatePersonaContext);
  if (!context) {
    throw new Error("useCandidatePersona must be used within a CandidatePersonaProvider");
  }
  return context;
}
